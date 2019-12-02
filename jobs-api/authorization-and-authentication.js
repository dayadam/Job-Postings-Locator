const keys = require("../keys.js");
const linkedIn = keys.linkedIn;
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;
const passport = require("passport");

module.exports = function(app) {
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });

  passport.use(
    new LinkedInStrategy(
      {
        clientID: linkedIn.id,
        clientSecret: linkedIn.secret,
        callbackURL: "http://localhost:8080/auth/linkedin/callback",
        scope: ["r_emailaddress", "r_liteprofile"],
        state: true
      },
      function(accessToken, refreshToken, profile, done) {
        // asynchronous verification, for effect...
        const user = {
          //email: profile.emails[0].value,
          //name: profile.name.givenName + " " + profile.name.familyName,
          //id: profile.id,
          token: accessToken
        };
        //process.nextTick(function() {
        // To keep the example simple, the user's LinkedIn profile is returned to
        // represent the logged-in user. In a typical application, you would want
        // to associate the LinkedIn account with a user record in your database,
        // and return that user instead.
        //return done(null, profile);
        //});
        console.log(user);
        return done(null, user);
      }
    )
  );

  app.get("/auth/linkedin", passport.authenticate("linkedin"), function(
    req,
    res
  ) {
    // The request will be redirected to LinkedIn for authentication, so this
    // function will not be called.
  });

  app.get(
    "/auth/linkedin/callback",
    passport.authenticate("linkedin", {
      successRedirect: "/",
      failureRedirect: "/login"
    })
  );
};
