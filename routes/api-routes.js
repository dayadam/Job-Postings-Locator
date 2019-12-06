const db = require("../models");
const passport = require("../config/passport");
const axios = require("axios");
//set these in .env file
const joobleKey = process.env.JOOBLE_API_KEY;
const googleKey = process.env.GOOGLE_API_KEY;
module.exports = function(app) {
    //get jobs with location data

    app.put("/api/search", function(req, res) {
        const searchLoc = req.body.location;
        const jobs = {};
        axios
            .post(`https://jooble.org/api/${joobleKey}`, {
                keywords: req.body.keywords,
                location: req.body.location,
                radius: req.body.radius,

                page: "1",
                searchMode: "1"
            })
            .then(function(response) {
                const jobs = response.data.jobs;

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
                console.log("timed out sending cached data");
                getCacheData(res, searchLoc, req.body.keywords, jobs);
            });
    });
    //get jobs without location data this link isnt really need the /api/search will
    // send this info if it cant find it in db or api call. this is for testing
    app.get("/api/job-search", function(req, res) {
        const URL = `https://jooble.org/api/${joobleKey}`;

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
    // main bulk of the app, its async because we need to make multiple calls to google places
    // we need them all to return before we move on.
    async function companyToLoc(res, jobs, searchLoc, keywords) {
        const locationRequests = [];
        // this whill check if we sent data.
        let dataSent = false;
        // if the call is taking too long we can set a time to send the database data.
        setTimeout(function() {
            //if the data has been found we dont need to grab the db data so we check
            //if the data has already beed grabbed and do nothing if it has.
            if (dataSent === false) {
                getCacheData(res, searchLoc, keywords, jobs);
            }
        }, 30000);
        //takes the incoming jobs and makes a call to the google places api thehn adds the log / lat to the object
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
            //adds each promise to an array
            locationRequests.push(locationReq);
        }
        //waits till all the promises come in then adds the jobs
        const locations = await Promise.all(locationRequests);
        for (let i = 0; i < locations.length; i++) {
            jobs[i].location = locations[i];
        }
        //tells the timeout function we have already sent data.
        dataSent = true;
        // adds the found data to the database
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
                console.log("no datafound in db sending jobs without long and lat");
                res.json(jobs);
            }
        });
    }

    function createCacheData(keywords, searchLoc, jobs) {
        db.Search.create({
                search: keywords.toLowerCase(),
                location: searchLoc.toLowerCase(),
                jobs: JSON.stringify(jobs)
            })
            .then(function(user) {
                console.log("success", user.toJSON());
            })
            .catch(function(err) {
                // print the error details
                console.log(err);
            });
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
