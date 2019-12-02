// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 8080;

// Requiring our models for syncing
const db = require("./models");

// Sets up the Express app to handle data parsing (middleware)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//initializing session
app.use(
  session({ secret: "keyboard cat", resave: false, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());

// Static directory
app.use(express.static("public"));

//jobs api
require("./jobs-api/authorization-and-authentication.js")(app);

// Routes
// =============================================================
//require("./routes/html-routes.js")(app); // how crucial are html routes?
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
