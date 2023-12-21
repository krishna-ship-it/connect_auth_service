const transporter = require("./node-mailer-config");
const { NODEMAILER_EMAIL } = require("./../../config/index");
const ApiError = require("../errors/ApiError");
const sendEmail = async (options) => {
  try {
    const info = await transporter.sendMail({
      from: NODEMAILER_EMAIL,
      to: options.email,
      subject: options.subject,
      html: options.html,
    });
  } catch (err) {
    throw new ApiError(`${err.message}`, 500, "serverError");
  }
};

module.exports = sendEmail;
