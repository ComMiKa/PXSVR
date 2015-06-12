var https = require('https');

var options = {
  
  hostname: '216.58.217.142',
  port: 443,
  path: '/',
  method: 'GET',
  headers: {
      "host":"google.com",
      "User-Agent" : "Mozilla 5.0"
  }
};

var req = https.request(options, function(res) {
  console.log("statusCode: ", res.statusCode);
  console.log("headers: ", res.headers);

  res.on('data', function(d) {
    process.stdout.write(d);
  });
});
req.end();

req.on('error', function(e) {
  console.error(e);
});