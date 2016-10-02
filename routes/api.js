var express = require('express');
var db = require('../db');
var cool = require('cool-ascii-faces');
var app = require('../app');
var seedUsers = require('../models/seedUser');
var  admins = require('../models/admin');

var router = express.Router();

/* Run Api Scripts*/
router.get('/users', function (req, res) {
    db.user.findAll({ where: {id: {gt: 5}}}).then(function (user) {
        res.json(user);
    });
});

router.get('/admin', function (req, res) {
   db.user.bulkCreate(admins).then(function () {
       var emoji = cool();
       res.render('admin', { emoji: emoji });
   });
});

router.get('/seeds', function (req, res) {
    //seed database
    db.user.bulkCreate(seedUsers).then(function() {
        var emoji = cool();
        res.render('seed', { emoji: emoji });
    });
});

module.exports = router;