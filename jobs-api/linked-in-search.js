const axios = require("axios");
//require("./jobs-api/authorization-and-authentication.js")(app);
//{ headers: { Authorization: `Bearer ${user.token}` } }

//require Models //or require all in sever and pass thru

//headrs: token


module.exports = function() {
  return {
    jobSearch: function() {
      //console.log(user.token);
      const URL = `https://api.linkedin.com/v1/job-search`;
      //const token = gettoken()

      axios
        .get(URL,  )
        .then(x => console.log(x));
    }
  };
};

//need to send accesstoken, maybe in header. how to get access token???
