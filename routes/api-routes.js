const db = require("../models");
const passport = require("../config/passport");

module.exports = function(app) {
    //user sign up route
    app.post("/api/signup", function(req, res) {
        db.User.create({
            email: req.body.email,
            password: req.body.password
        }).then(function() {
            res.json("it worked?");
        });
    });
};