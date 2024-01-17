const { UserRepository } = require("./../repositories/index");
const bcrypt = require("bcrypt");
const { signJwt } = require("./../utils/commons/jwt");
const ApiError = require("../utils/errors/ApiError");
const { statusCodes, errors } = require("./../utils/errors/errors");
const generateOtp = require("../utils/commons/generate-otp");
const {
  FORGET_PASSWORD_OTP_EXPIRY,
  FORGET_PASSWORD_OTP_ATTEMPTS,
} = require("./../config/index");
const sendEmail = require("../utils/email/send-email");
const { Op } = require("sequelize");
class UserService {
  static async getUserById(id) {
    try {
      const user = await UserRepository.findUserById(id);
      delete user.dataValues.password;
      return user;
    } catch (err) {
      throw err;
    }
  }
  static async signup(userData) {
    try {
      const user = await UserRepository.signup(userData);
      const token = await signJwt({ id: user.id });
      return { user, token };
    } catch (err) {
      throw err;
    }
  }
  static async delete(id) {
    try {
      await UserRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
  static async login(email, password) {
    try {
      const user = await UserRepository.findUserByEmail(email);
      if (await bcrypt.compare(password, user.password)) {
        delete user.dataValues.password;
        const token = await signJwt({ id: user.id });
        return { user, token };
      } else {
        throw new ApiError(
          "invalid credentials",
          statusCodes.UnauthorizedRequest,
          errors.UnauthorizedRequest
        );
      }
    } catch (err) {
      throw err;
    }
  }
  static async updateProfilePicture(
    user_id,
    avatar_public_id,
    avatar_public_url
  ) {
    try {
      const user = await UserRepository.findUserById(user_id);
      user.avatar_public_id = avatar_public_id;
      user.avatar_public_url = avatar_public_url;
      const updatedUser = await UserRepository.update(user);
      delete user.dataValues.password;
      return updatedUser;
    } catch (err) {
      throw new ApiError(
        err.message,
        statusCodes.ServerError,
        errors.ServerError
      );
    }
  }
  static async changePassword(user_id, oldPlainPassword, newHashedPassword) {
    try {
      const user = await UserRepository.findUserById(user_id);
      if (!(await bcrypt.compare(oldPlainPassword, user.password)))
        throw new ApiError(
          "incorrect old password",
          statusCodes.UnauthorizedRequest,
          errors.UnauthorizedRequest
        );
      user.password = newHashedPassword;
      const updatedUser = await UserRepository.update(user);
      return updatedUser;
    } catch (err) {
      throw err;
    }
  }

  static async forgetPassword(user_email) {
    try {
      const user = await UserRepository.findUserByEmail(user_email);
      if (user.forget_pass_attempts > 0 || user.otp_expires_in < Date.now()) {
        const otp = generateOtp();
        const otpExpiry = Date.now() + FORGET_PASSWORD_OTP_EXPIRY * 60 * 1000;
        await sendEmail({
          email: user.email,
          subject: "Your OTP for password reset for your Connect Acconut",
          html: `<p>Thank you for using Connect.<br/>As part of our security measures, we have generated a One-Time Password (OTP) for you. Please use this OTP to complete the verification process or login securely.<br/>Your OTP: <h3>${otp}</h3><br/>
          
          Please remember that this OTP is valid for a ${FORGET_PASSWORD_OTP_EXPIRY}mintue and should not be shared with anyone. If you did not request this OTP, please contact our support team immediately at support@connect.com.
          <br/><br/>

          Thank you for choosing Connect! If you have any questions or need further assistance, feel free to reach out to our support team.
          <br/><br/>
          Best regards,
          </p>`,
        });
        const hashedOtp = await bcrypt.hash(otp.toString(), 12);
        user.otp = hashedOtp;
        user.otp_expires_in = otpExpiry;
        user.forget_pass_attempts =
          user.forget_pass_attempts === 0
            ? FORGET_PASSWORD_OTP_ATTEMPTS
            : user.forget_pass_attempts - 1;
        const updatedUser = await UserRepository.update(user);
        return updatedUser;
      } else {
        const remainingTimeToReattemptInMinute =
          (Date.now() - user.otp_expires_in) / (1000 * 60);
        throw new ApiError(
          `attempt limit is exhausted , try again letter after ${remainingTimeToReattemptInMinute.toFixed(
            1
          )}`,
          429,
          "TooManyRequest"
        );
      }
    } catch (err) {
      throw err;
    }
  }
  static async resetPassword(user_email, password, otp) {
    try {
      const user = await UserRepository.findUserByEmail(user_email);
      if (!user)
        throw new ApiError(
          "user associated with this email is not registered",
          400,
          "BadRequest"
        );

      if (await bcrypt.compare(otp, user.otp)) {
        user.password = password;
        user.forget_pass_attempts = 3;
        user.otp_expires_in = Date.now();
        user.otp = "";
        const updatedUser = await UserRepository.update(user);
        return updatedUser;
      } else throw new ApiError("incorrect otp", 400, "BadRequest");
    } catch (err) {
      throw err;
    }
  }
  static async getAllUsers(query) {
    console.log(query);
    const keys = Object.keys(query);
    const validFields = ["name", "email", "id"];
    const page_no = query.page_no * 1 || 1;
    const results_per_page = query.results_per_page * 1 || 10;
    let filter = {};
    for (const key of keys)
      if (validFields.includes(key)) filter[key] = query[key];
    const pagination = {
      limit: results_per_page,
      offset: (page_no - 1) * results_per_page,
    };
    if (filter.name) {
      filter.name = { [Op.like]: `%${filter.name}%` };
    }
    try {
      const users = await UserRepository.getMany(filter, pagination);
      return users;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = UserService;
