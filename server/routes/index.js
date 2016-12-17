var express = require('express');
var db = require('../db');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('heree');
    res.render('index', { title: 'iStudy' });
});

module.exports = router;
