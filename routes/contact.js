var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.render('templates/contact');
});

router.post('/submit', function (req, res) {
  console.log(req.body);
  res.redirect('/thanks');
});

module.exports = router;
