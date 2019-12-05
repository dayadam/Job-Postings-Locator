const db = require("../models");
const passport = require("../config/passport");
const axios = require("axios");
const joobleKey = process.env.JOOBLE_API_KEY;
const googleKey = process.env.GOOGLE_API_KEY;

module.exports = function(app) {
  //get jobs
  app.get("/api/search", function(req, res) {
    const city = "Atlanta";
    axios
      .post(`https://jooble.org/api/${joobleKey}`, {
        keywords: "Front End Developer",
        location: "Atlanta",
        radius: "50",

        page: "1",
        searchMode: "1"
      })
      .then(function(response) {
        return companyToLoc(response.data.jobs, city);
      })
      .then(function(jobs) {
        res.json(jobs);
      })
      .catch(function(err) {
        res.status(500).json({ err: err.message });
      });
  });
  app.post("/api/job-search", function(req, res) {
    const URL = `https://jooble.org/api/${joobleKey}`;

    axios
      .post(
        URL,
        /* {
        keywords: "javascript",
        location: "Atlanta",
        radius: "25",
        salary: "100000",
        page: "1"
      } */ req.body
      )
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

  async function companyToLoc(jobs, city) {
    const locationRequests = [];

    for (let i = 0; i < jobs.length; i++) {
      const companyName = encodeURI(jobs[i].company);
      const urlString = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${companyName},${city}&inputtype=textquery&fields=formatted_address,geometry&key=${googleKey}`;

      const locationReq = axios.get(urlString).then(function(response) {
        let location = {};

        if (response.data.status !== "ZERO_RESULTS") {
          location.address = response.data.candidates[0].formatted_address;
          location.lat = response.data.candidates[0].geometry.location.lat;
          location.lng = response.data.candidates[0].geometry.location.lng;
        }

        return location;
      });
      locationRequests.push(locationReq);
    }
    const locations = await Promise.all(locationRequests);
    for (let i = 0; i < locations.length; i++) {
      jobs[i].location = locations[i];
    }
    return jobs;
  }
};
