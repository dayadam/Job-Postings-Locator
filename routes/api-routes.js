const db = require("../models");
//required for password encryption
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = function(app) {
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