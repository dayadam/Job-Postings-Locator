const db = require("../models");
const passport = require("../config/passport");
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
    app.post("/api/signup", function(req, res) {
        db.User.create({
                email: req.body.email,
                password: req.body.password
            })
            .then(function() {
                res.redirect(307, "/api/login");
            })
            .catch(function(err) {
                console.log(err);
                res.json(err);
            });
    });
    // user login post authenticates using the "local" strat in the passport.js
    app.post("/api/login", passport.authenticate("local"), function(req, res) {
        //sends pac the route to redirect to if the user is "logged in"
        res.json("/members");
    });
    // used to get a logged in users data
    app.get("/api/user_data", function(req, res) {
        //send empty json if no user is logged in
        if (!req.user) {
            res.json({});
        } else {
            res.json({
                email: req.user.email,
                id: req.user.id,
                location: req.user.location
            });
        }
    });
    //logout
    app.get("/logout", function(req, res) {
        req.logout();
        res.redirect("/");
    });
};