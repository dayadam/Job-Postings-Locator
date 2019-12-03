const db = require("../models");
//required for password encryption
//const bcrypt = require("bcrypt");
const saltRounds = 10;
const passport = require("passport");
const axios = require("axios");

//linkedIn search
const search = require("../jobs-api/linked-in-search.js");

module.exports = function(app) {
  app.get("/api/job-search", function(req, res) {
    console.log(req.user);
    const URL = `https://api.linkedin.com/v2/recommendedJobs?q=byMember`;
    //const URL = `https://api.linkedin.com/v2/me`;
    axios
      .get(URL, { headers: { Authorization: `Bearer ${req.user.token}` } })
      .then(x => console.log(x));
    //search().jobSearch();
    // });
    res.json(req.user);
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
