const db = require("../models");
//required for password encryption
//const bcrypt = require("bcrypt");
const saltRounds = 10;
const axios = require("axios");
const keys = require("../keys.js");
const joobleKey = keys.jooble.apiKey;

module.exports = function(app) {
  app.get("/api/job-search", function(req, res) {
    const URL = `https://jooble.org/api/${joobleKey}`;
    axios
      .post(URL, {
        keywords: "javascript",
        location: "Atlanta",
        radius: "25",
        salary: "100000",
        page: "1"
      })
      .then(function(answer) {
        res.json(answer.data);
        console.log(answer.data);
      });
  });
  // user creation
  /*     app.post("/api/user/create", function(req, res) {
        bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
            db.User.create({
                userName: req.body.userName,
                email: req.body.email,
                password: hash
            }).then(function(results) {
                res.json(results);
            });
        });
    }); */
};
