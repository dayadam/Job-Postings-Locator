const axios = require("axios");
//require("./jobs-api/authorization-and-authentication.js")(app);
//{ headers: { Authorization: `Bearer ${user.token}` } }
module.exports = function() {
  return {
    jobSearch: function() {
      console.log(user.token);
      const URL = `https://api.linkedin.com/v1/job-search`;
      axios
        .get(URL )
        .then(x => console.log(x));
    }
  };
};

//need to send accesstoken, maybe in header. how to get access token???
