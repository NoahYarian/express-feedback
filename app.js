var express = require('express');
var app = express();

var fs = require('fs');
var morgan = require('morgan');
var lessCSS = require('less-middleware');
var bodyParser = require('body-parser');

var routes = require('./routes/routes');
var feedback = require('./routes/feedback');
var thanks = require('./routes/thanks');

app.set('view engine', 'ejs');
app.locals.title = 'Noah Yarian';

app.use(lessCSS('public'));
app.use(bodyParser.urlencoded({extended: true}));

var logStream = fs.createWriteStream('access.log', {flags: 'a'});
app.use(morgan('combined', {stream: logStream}));
app.use(morgan('dev'));

app.use(function (req, res, next) {
  var client = require('./lib/loggly.js')('incoming');
  client.log({
    ip: req.ip,
    date: new Date(),
    url: req.url,
    method: req.method,
    status: res.statusCode
  });
  next();
});

// routes
app.use('/', routes);
app.use('/contact', contact);
app.use('/thanks', thanks);

app.use(function (req, res) {
  // 400s before 500s
  res.status(403);
  res.send("Sorry! You can't go there.");
});

app.use(function (err, req, res, next) {
  // 500s after 400s
  console.log('err.stack: ', err.stack);
  res.status(500).send("Whoops! Looks like there's a problem on my end.");

  var client = require('./lib/loggly.js')('error');
  client.log({
    ip: req.ip,
    date: new Date(),
    url: req.url,
    method: req.method,
    status: res.statusCode
  });
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%d', host, port);
});
