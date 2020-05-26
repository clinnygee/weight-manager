var request = require("request");
require('dotenv').config();
clientID = 'YOUR_CLIENT_ID'
clientSecret = 'YOUR_CLIENT_SECRET'
console.log(process.env.CLIENT_ID);
console.log(process.env.CLIENT_SECRET);

var options = {
   method: 'POST',
   url: 'https://oauth.fatsecret.com/connect/token',
   method : 'POST',
   auth : {
      user : process.env.CLIENT_ID,
      password : process.env.CLIENT_SECRET,
   },
   headers: { 'content-type': 'application/json'},
   form: {
      'grant_type': 'client_credentials',
      'scope' : 'basic'
   },
   json: true
};

request(options, function (error, response, body) {
    // console.log(response);
   if (error) throw new Error(error);

   console.log(body);
   console.log(body.access_token);
   process.env.JWT = body.access_token;
});

