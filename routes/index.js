var express = require('express');
var db = require('../db');
var router = express.Router();


/* GET home page. */
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
router.get('/dashboard', function(req, res, next) {
  res.render('dashboard', { title: 'dashboard' });
});

router.get('/resetpassword', function(req, res, next) {
  res.render('resetpassword', { title: 'resetpassword' });
});

router.get('/newpassword', function(req, res, next) {
  res.render('newpassword', { title: 'newpassword' });
});

router.get('/dashboard', function(req, res, next) {
	res.render('dashboard', { title: 'dashboard' });
});

router.get('/registration', function(req, res, next) {
	res.render('registration', { title: 'registration' });
});

router.get('/selectprofessor', function(req, res, next) {
	res.render('selectprofessor', { title: 'selectprofessor' });
});

router.get('/meet', function(req, res, next) {
	res.render('meet', { title: 'meet' });
});

router.get('/classmates', function(req, res, next) {
	res.render('classmates', { title: 'classmates' });
});

module.exports = router;
