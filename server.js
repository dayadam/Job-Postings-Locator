// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
const env = require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 8080;

// Requiring our models for syncing
const db = require("./models");

// Sets up the Express app to handle data parsing (middleware)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

//initializing session
const sessionStore = new SequelizeStore({
    db: db.sequelize
});

app.use(
    session({
        secret: "keyboard cat",
        store: sessionStore,
        resave: false,
        saveUninitialized: false
    })
);
sessionStore.sync();
app.use(passport.initialize());
app.use(passport.session());

// Routes
// =============================================================
require("./routes/html-routes.js")(app); // how crucial are html routes?
require("./routes/api-routes.js")(app); //may need more api routes?

// Syncing our sequelize models and then starting our Express app
// And listening for requests
// =============================================================
//{ force: true }
db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});