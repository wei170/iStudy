var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/login', function(req, res, next) {
    console.log('heree');
  res.render('index', { title: 'iStudy' });
});

router.get('/register', function(req, res, next) {
    console.log('heree');
  res.render('index', { title: 'iStudy' });
});

router.get('/', function(req, res, next) {
    console.log('heree');
  res.render('index', { title: 'iStudy' });
});
router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'signup' });
});

router.get('/forgotpassword', function(req, res, next) {
  res.render('ForgotPassword', { title: 'forgotpassword' });
});

router.get('/signin', function(req, res, next) {
  res.render('signin', { title: 'signin' });
});


module.exports = router;
