const axios = require("axios");

module.exports = function() {
  return {
    jobSearch: function() {
      const URL = `https://api.linkedin.com/v1/job-search`;
      axios.get(URL).then(x => console.log(x));
    }
  };
};

//need to send accesstoken, maybe in header. how to get access token???