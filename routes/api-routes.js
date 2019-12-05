const db = require("../models");
const passport = require("../config/passport");
const axios = require("axios");

const joobleKey = process.env.JOOBLE_API;
const googleKey = process.env.GOOGLE_API;

module.exports = function(app) {
    //get jobs with location data
    app.put("/api/search", function(req, res) {
        const searchLoc = req.body.location;
        axios
            .post(`https://jooble.org/api/${joobleKey}`, {
                keywords: req.body.keywords,
                location: req.body.location,
                radius: req.body.radius,

                page: "1",
                searchMode: "1"
            })
            .then(function(response) {
                return companyToLoc(
                    res,
                    response.data.jobs,
                    searchLoc,
                    req.body.keywords
                );
            })
            .then(function(jobs) {
                res.json(jobs);
            })
            .catch(function(err) {
                res.status(500).json({ err: err.message });
            });
    });
    //get jobs without location data
    app.get("/api/job-search", function(req, res) {
        const URL = `https://jooble.org/api/${joobleKey}`;
        console.log(URL);
        axios
            .post(URL, {
                keywords: "manager",
                location: "Atlanta",
                radius: "25",
                salary: "100000",
                page: "1"
            })
            .then(function(answer) {
                res.json(answer.data);
            })
            .catch(function(err) {
                res.json("hello!");
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
    //test route
    app.get("/api/test", function(req, res) {
        db.Search.findOne({ where: { id: 1 } }).then(function(response) {
            res.json(JSON.parse(response.jobs));
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

    async function companyToLoc(res, jobs, searchLoc, keywords) {
        const locationRequests = [];
        let timer = false;

        setTimeout(function() {
            if (timer === false) {
                getCacheData(res, searchLoc, keywords, jobs);
            }
        }, 20000);
        for (let i = 0; i < jobs.length; i++) {
            const companyName = encodeURI(jobs[i].company);
            const urlString = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${companyName},${searchLoc}&inputtype=textquery&fields=formatted_address,geometry&key=${googleKey}`;

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
        timer = true;
        createCacheData(keywords, searchLoc, jobs);
        return jobs;
    }

    function getCacheData(res, searchLoc, keyword, jobs) {
        const fixedLoc = searchLoc.toLowerCase();
        const fixedKeyword = keyword.toLowerCase();
        db.Search.findOne({
            where: { location: fixedLoc, search: fixedKeyword }
        }).then(function(response) {
            if (response) {
                res.json(JSON.parse(response.jobs));
            } else {
                res.json(jobs);
            }
        });
    }

    function createCacheData(keywords, searchLoc, jobs) {
        console.log(jobs);

        db.Search.create({
            search: keywords.toLowerCase(),
            location: searchLoc,
            jobs: JSON.stringify(jobs)
        });
    }
};