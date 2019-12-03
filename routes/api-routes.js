const db = require("../models");
//pulls in our passport file
const passport = require("../config/passport");

module.exports = function(app) {
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