const nodemailer = require("nodemailer");
const {
  NODEMAILER_HOST,
  NODEMAILER_PORT,
  NODEMAILER_EMAIL,
  NODEMAILER_PASSWORD,
} = require("../../config/index.js");

const nodeMailerTransport = nodemailer.createTransport({
  host: NODEMAILER_HOST,
  port: NODEMAILER_PORT,
  secure: true,
  auth: {
    user: NODEMAILER_EMAIL,
    pass: NODEMAILER_PASSWORD,
  },
});

module.exports = nodeMailerTransport;
