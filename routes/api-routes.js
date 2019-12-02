const db = require("../models");
//required for password encryption
const bcrypt = require("bcrypt");
const saltRounds = 10;

//linkedIn search
const search = require("../jobs-api/linked-in-search.js");

module.exports = function(app) {

  app.get("/api/job-search", function(req, res) {
      search().jobSearch();
  });
  
    // user creation
    app.post("/api/user/create", function(req, res) {
        bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
            db.User.create({
                userName: req.body.userName,
                email: req.body.email,
                password: hash
            }).then(function(results) {
                res.json(results);
            });
        });
    });
};
