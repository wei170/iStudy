var express = require('express');
var db = require('../db');
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


router.get('/chat.html', function(req, res, next) {
    console.log('heree');
  res.render('chat', { title: 'iStudy' });
});

router.get('/dashboard', function(req, res, next) {
    console.log('heree');
  res.render('index', { title: 'iStudy' });
});

//TODO: remove insecure routes from sprint 1
router.get('/dashboard/myprofile', function(req, res, next) {
    console.log('heree');
  res.render('index', { title: 'iStudy' });
});

router.get('/dashboard/class_registration', function(req, res, next) {
    console.log('heree');
  res.render('index', { title: 'iStudy' });
});

router.get('/dashboard/rooms', function(req, res, next) {
    console.log('heree');
  res.render('index', { title: 'iStudy' });
});

router.get('/forgotpassword', function(req, res, next) {
  res.render('index', { title: 'iStudy' });
});

module.exports = router;
