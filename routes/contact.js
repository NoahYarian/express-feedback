var express = require('express');
var router = express.Router();
var sendEmail = require('../lib/nodemailer');

router.get('/', function (req, res) {
  res.render('templates/contact');
});

router.post('/submit', function (req, res) {
  console.log(req.body);
  sendEmail(req.body);
  res.redirect('thanks');
});

router.get('/thanks', function (req, res) {
  res.render('templates/thanks');
});

module.exports = router;
