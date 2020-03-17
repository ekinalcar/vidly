const debug = require("debug")("app:startup");
const config = require("config");
const morgan = require("morgan");
const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const genres = require("./routes/genres");

const app = express();

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  debug("morgan enabled");
}
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/genres", genres);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
