const express = require("express");
const app = express();
const dotenv = require("dotenv");
const expressUploader = require("express-fileupload");
const { v2: cloudinary } = require("cloudinary");
const cors = require("cors");
dotenv.config();
const {
  PORT,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_SECRET_KEY,
} = require("./config/index");
const { UserRoutes } = require("./routes/v1/index.js");
const errorHanlder = require("./utils/commons/errorHandler.js");

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_SECRET_KEY,
});

const allowedOrigins = ["http://localhost:5173"];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);
app.use(expressUploader({ useTempFiles: true }));
app.use(express.json());
app.use("/api/v1/users", UserRoutes);
app.use(errorHanlder);

app.listen(PORT, () => {
  console.log(`server started at port ${PORT}`);
});
