const express = require("express");
const app = express();
const { env } = require("./config");
const cors = require("cors");
const home = require("./api/routes/home");
const persons = require("./api/routes/persons");

// middleware
app.use((req, res, next) => {
  req.author = req.path.split("/")[2];
  next();
});

if (env !== "prod") {
  app.use(cors());
}

app.use("/", home);
app.use("/persons", persons);

module.exports = app;
