const axios = require("axios");
//require Models //or require all in sever and pass thru

module.exports = function() {
  return {
    jobSearch: function() {
      const URL = `https://api.linkedin.com/v1/job-search`;
      axios
        .get(URL  )
        .then(x => console.log(x));
    }
  };
};