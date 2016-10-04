var express = require('express');
var db = require('../db');
var cool = require('cool-ascii-faces');
var app = require('../app');
var seedUsers = require('../models/seedUser');
var  admins = require('../models/admin');

var router = express.Router();
var id;

/* Run Api Scripts*/
router.get('/users', function (req, res) {
    db.user.findAll({ where: {id: {gt: 5}}}).then(function (user) {
        res.json(user);
    });
});

router.post('/admin', function (req, res) {
    admins.forEach(function (admin) {
       db.user.create(admin);
    });
    //console.log(profile);
    var emoji = cool();
    res.render('admin', { emoji: emoji });
});

router.post('/seeds', function (req, res) {
    //seed database
    seedUsers.forEach(function (user) {
        insertNewUser(user)
    });
    var emoji = cool();
    res.render('seed', { emoji: emoji });
});


function insertNewUser(user){
    db.user.create(user).then(function (user) {
        id = user.id;
        // init profile for new user
        db.profile.create({user_id: id});
    })
}

module.exports = router;