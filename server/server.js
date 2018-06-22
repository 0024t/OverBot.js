var _ = require('underscore');
var express = require('express');
var http = require('http');
var uuid = require('node-uuid');
var cors = require('./cors');
var app = express();
var server = http.createServer(app);
var shell = require('shelljs');
var path = require("path");
var fs = require('fs');

var conf = require('./server.json');

var products = require(conf.products);
var basket = [];

var sessions = {};

var context = '/rest';
var authHeader = 'Auth-Token';
var botIsStarted = false;

app.use(express.bodyParser());
app.use(cors);

fs.readFile('../index.html', function (err, html) {

  if (err) {
    console.log(err);
  } else {

  }
});

app.get(context + '/index', function (req, res) {
  res.sendfile(path.resolve('../index.html'));
});

app.get(context + '/images/background_image.jpg', function (req, res) {
  res.sendfile(path.resolve('../images/background_image.jpg'));
});

app.get(context + '/images/ok.png', function (req, res) {
  res.sendfile(path.resolve('../images/ok.png'));
});

app.get(context + '/images/forbidden.png', function (req, res) {
  res.sendfile(path.resolve('../images/forbidden.png'));
});

app.get(context + '/images/loading.png', function (req, res) {
  res.sendfile(path.resolve('../images/loading.png'));
});

app.get(context + '/css/style.css', function (req, res) {
  res.sendfile(path.resolve('../css/style.css'));
});

app.get(context + '/actions/status', function (req, res) {
  if (botIsStarted == true) {
    res.send("ok")
  } else {
    res.send("forbidden");
  }
});

app.get(context + '/actions/start', function (req, res) {
  if (botIsStarted == false) {
    shell.exec('runBot.sh');
    botIsStarted = true
    res.send(200)
  } else {
    res.send(500);
  };
});

app.get(context + '/actions/stop', function (req, res) {
  fs.readFile("../txts/pid.txt", 'utf8', function (err, data) {
    console.log(data);
    try {
      process.kill(data)
      botIsStarted = false;
    } catch (error) {
      console.log("Failed to stop program")
    }
    res.send(200);
  });
});

server.listen(conf.port);
console.log('Express server listening on port', server.address().port);