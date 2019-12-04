const db = require("../models");

const passport = require("../config/passport");
const axios = require("axios");
const keys = require("../keys.js");
const joobleKey = keys.jooble.apiKey;
const googleKey = keys.google.apiKey;
/// there keys arent loading
module.exports = function(app) {
    app.get("/api/job-search", function(req, res) {
        const URL = `https://jooble.org/api/${joobleKey}`;
        console.log(URL);
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
            })
            .catch(function(err) {
                res.status(500).json({ err: err.message });
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
        console.log(joobleKey);
        axios
            .post(`https://jooble.org/api/${joobleKey}`, {
                keywords: "account manager",
                location: "Tampa",
                radius: "50",
                salary: "200000",
                page: "1"
            })
            .then(function(response) {
                console.log(response.data.jobs);
                return companyToLoc(response.data.jobs);
            })
            .then(function(jobs) {
                res.json(jobs);
            })
            .catch(function(err) {
                res.status(500).json({ err: err.message });
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
        const locationRequests = [];
        for (let i = 0; i < jobs.length; i++) {
            const companyName = encodeURI(jobs[i].company);
            const urlString = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${companyName}&inputtype=textquery&fields=formatted_address,name,rating,opening_hours,geometry&locationbias=circle:2000@27.9506,-82.4572&key=${googlekey}`;

            const locationReq = axios.get(urlString).then(function(response) {
                let location = {};
                console.log(response.data.status);
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