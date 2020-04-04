require("express-async-errors");
const winston = require("winston");
const debug = require("debug")("app:startup");
const morgan = require("morgan");
const express = require("express");

const app = express();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logFile.log" })
  ]
});

process.on("uncaughtException", ex => {
  console.log("we have an uncaughtException!!");
  logger.info(ex.message);
});

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  debug("morgan enabled");
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
