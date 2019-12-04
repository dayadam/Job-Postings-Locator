const db = require("../models");
const passport = require("../config/passport");
const axios = require("axios");
const keys = require("../keys.js");
const joobleKey = keys.jooble.apiKey;

module.exports = function(app) {
  app.post("/api/job-search", function(req, res) {
    const URL = `https://jooble.org/api/${joobleKey}`;

    axios
      .post(URL, /* {
        keywords: "javascript",
        location: "Atlanta",
        radius: "25",
        salary: "100000",
        page: "1"
      } */ req.body)
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

  //get jobs
  app.get("/api/search", function(req, res) {
    axios
      .post(`https://jooble.org/api/${joobleKey}`, {
        keywords: "account manager",
        location: "London",
        radius: "50",
        salary: "200000",
        page: "1"
      })
      .then(function(response) {
        let rawData = response.data.jobs;

        const newJobs = companyToLoc(rawData);
        newJobs.then(jobs => {
          res.json(jobs);
        });
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

  async function companyToLoc(jobs) {
    for (let i = 0; i < jobs.length; i++) {
      let location = {};
      const urlString =
        "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=" +
        jobs[i].company +
        "&inputtype=textquery&fields=formatted_address,name,rating,opening_hours,geometry&key=AIzaSyD55BLnIxH-0YxxKYDu2PpsYSGYEk4Xt4Q";
      await axios.get(urlString).then(function(response) {
        location.address = response.data.candidates[0].formatted_address;
        //console.log(response.data.candidates[0].formatted_address);
        //location.loc = response.data.candidates[0].geometry.location.lat;
        location.lat = response.data.candidates[0].geometry.location.lat;
        location.lng = response.data.candidates[0].geometry.location.lng;
        //console.log(response.data.candidates[0].geometry.location);
      });
      jobs[i].location = location;
    }
    // )
    //console.log();
    return jobs;
  }
};
