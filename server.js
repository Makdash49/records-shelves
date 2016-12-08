var express = require('express');

var envFile = require('node-env-file');
envFile('./config/development.env');

var amazon = require('amazon-product-api');
var amazonData;
var client = amazon.createClient({
  awsId: process.env.AWS_ID,
  awsSecret: process.env.AWS_SECRET,
  awsTag: "Todo App"
});

client.itemSearch({
  // director: 'Quentin Tarantino',
  // actor: 'Samuel L. Jackson',
  // searchIndex: 'DVD',
  // audienceRating: 'R',
  // responseGroup: 'ItemAttributes,Offers,Images'
  keywords: 'Robocop miniature'
}).then(function(results){
  console.log(JSON.stringify(results[0]["ItemAttributes"][0]["Title"][0]));
  amazonData = results
}).catch(function(err){
  console.log(err);
});


//Create our app

var app = express();
const PORT = process.env.PORT || 3000;

app.use(function (req, res, next) {
  if (req.headers['x-forwarded-proto'] === 'https') {
    res.redirect('http://' + req.hostname + req.url);
  } else {
    next();
  }
});

app.use(express.static('public'));

app.listen(PORT, function () {
  console.log('Express server is up on port ' + PORT);
});
