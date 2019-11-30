const axios = require("axios");
/* require("dotenv").config();
const keys = require("../keys.js");
const linkedIn = keys.linkedIn; */

const URL = `https://www.linkedin.com/oauth/v2/accessToken?grant_type=client_credentials&client_id=78v7xr6w42izz9&client_secret=rGr4a38lTQmWf9vS`;
axios.post(URL).then(function(x) {
  console.log(x);
});

//https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=78v7xr6w42izz9&redirect_uri=http%3A%2F%2Flocalhost%3A8080&scope=r_liteprofile%20r_emailaddress%20w_member_social

const URL = "https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=78v7xr6w42izz9&redirect_uri=http%3A%2F%2Flocalhost%3A8080&scope=r_liteprofile%20r_emailaddress%20w_member_social";
axios.post(URL).then(function(x) {
  console.log(x);
});

//http://localhost:8080/?code=AQTMv_1p2aQlVjRCu00o1ITotjsR5Dd558HQrIJZHXQhT7X5LZuHZMJANYol55xFwwiV2GB0kXnzar6UPXx7oqV7q-03AadwEA0Zwoqrt1WYP0622gq-4CiTXevcf3Jm3SHQnTP5LTbAYpod31KxXgpNK7aL8eBlKlcblir526g-kPEUKBW9fWlqD82vdA

/* const URL = `https://www.linkedin.com/oauth/v2/accessToken?grant_type=client_credentials&client_id=78v7xr6w42izz9&client_secret=rGr4a38lTQmWf9vS`;
axios.post(URL).then(function(x) {
  console.log(x);
}); */

const axios = require("axios");
/* require("dotenv").config();
const keys = require("../keys.js");
const linkedIn = keys.linkedIn; */

