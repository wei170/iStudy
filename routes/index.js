var express = require('express');
var db = require('../db');
var router = express.Router();

/* GET home page. */
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('heree');
    res.render('index', { title: 'iStudy' });
});

router.get('/login', function(req, res, next) {
    console.log('heree');
  res.render('index', { title: 'iStudy' });
});

router.get('/register', function(req, res, next) {
    console.log('heree');
  res.render('index', { title: 'iStudy' });
});

router.get('/dashboard', function(req, res, next) {
    console.log('heree');
  res.render('index', { title: 'iStudy' });
});

router.get('/forgotpassword', function(req, res, next) {
  res.render('ForgotPassword', { title: 'forgotpassword' });
});

module.exports = router;
