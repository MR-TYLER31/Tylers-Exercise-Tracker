const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const db = require("./models");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/exercisedb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const routes = require("./controller/api-routes.js");

app.use(routes);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
