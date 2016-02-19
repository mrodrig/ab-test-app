var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var parse = require('user-agent-parser');
var server = express();
var dbConfig = require('../config.json');

var collectingData = true;
 
server.use(function(req, res, next) {
    MongoClient.connect("mongodb://" + dbConfig.user + ":" + dbConfig.pass + "@ds059115.mongolab.com:59115/ab-test", function(err, db) {
      if (err) {
          return console.log('FAILURE CONNECTING TO DATABASE', req.url, req.headers['user-agent']);
      }
      console.log('connected');
      // Use the data collection
      var abCol = db.collection('data');
      var data = {userAgent: req.headers['user-agent'], uaInfo: parse(req.headers['user-agent']), date: new Date()};
      if (req.url.startsWith('/QR') || req.url.startsWith('/qr')) {
          data.method = 'QR';
          data.testCode = req.url.replace('/QR/', '').replace('/qr/', '');
          res.send('Thanks for participating via QR code!');
      } else if (req.url.startsWith('/URL') || req.url.startsWith('/url')) {
          data.method = 'URL';
          data.testCode = req.url.replace('/URL/', '').replace('/url/', '');
          res.send('Thanks for participating via URL!');
      } else {
          console.log(req.url);
          return res.send('Hello!');
      }
      if (collectingData) {
          abCol.insert(data, function (err, result) {
              if (err) {
                  return console.log('ERROR INSERTING', data);
              } else {
                  console.log('SUCCESS');
              }
              db.close();
          });
      } else {
          db.close();
      }
      next();
    });
});
 
var port = process.env.PORT;
server.listen(port, function() {
    console.log('server listening on port ' + port);
});