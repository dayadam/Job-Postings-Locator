//const db = require("../models");

//linkedIn search
const search = require("../jobs-api/linked-in-search.js");

module.exports = function(app) {
  app.get("/api/job-search", function(req, res) {
      search().jobSearch();
  });
};
