const express = require("express");

const documents = require("../routes/documents");
const users = require("../routes/users");
const sourceDocuments = require("../routes/sourceDocuments");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/documents", documents);
  app.use("/api/users", users);
  app.use("/api/sourceDocuments", sourceDocuments);
};
