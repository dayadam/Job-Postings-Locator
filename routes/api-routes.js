const db = require("../models");
//required for password encryption
//const bcrypt = require("bcrypt");
const saltRounds = 10;
//const passport = require("passport");
const axios = require("axios");

//linkedIn search
//const search = require("../jobs-api/linked-in-search.js");
const keys = require("../keys.js");
const joobleKey = keys.jooble.apiKey;

module.exports = function(app) {
  app.get("/api/job-search", function(req, res) {
    //console.log(req.user);
    const URL = `https://jooble.org/api/${joobleKey}`;
    //const URL = `https://api.linkedin.com/v2/me`;
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
    //search().jobSearch();
    // });
    //res.json(req.user);
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
