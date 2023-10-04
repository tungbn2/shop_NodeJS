const compression = require("compression");
const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const { countConnection, checkOverLoad } = require("./helpers/check.connect");
const app = express();

// add env file
require("dotenv").config();

// init middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// init db
require("./dbs/init.mongodb");
countConnection();
checkOverLoad();

// init routes
app.get("/home", (req, res, next) => {
  return res.status(200).json({
    message: "Hello, world!",
  });
});

app.use("/", require("./routes"));

// handle errors
app.use((res, req, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  const status = error.status || 500;
  return res.status(status).json({
    status: "error",
    code: status,
    message: error.message,
  });
});

module.exports = app;
