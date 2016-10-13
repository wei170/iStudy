'use strict';

var express = require('express');
var router = express.Router();
var db = require(__dirname + '/../db.js');
var _ = require('underscore');

//sign up a new user
router.post('/', function(req, res, next) {
    console.log('-=-=------');
    var body = _.pick(req.body, 'userName', 'email', 'password');

    db.user.create(body).then(function(user) {

        db.profile.create({
            user_id: user.id
        }).then(function(profile) {
            res.json(user.toPublicJSON());
        }, function(e) {
            res.status(400).json(e);


        });


    }, function(e) {
        res.status(400).json(e);
    });

    // console.log('heere');
    // res.status(200).send();
});

router.post('/login', function(req, res) {
    var body = _.pick(req.body, 'email', 'password');

    db.user.authenticate(body).then(function(user) {
        var token = user.generateToken('authentication');
        console.log('token= ' + token);
        if (token) {
            res.header('Auth', token).json(user.toPublicJSON());
        } else {
            res.status(401).send();
        }

    }, function() {
        res.status(401).send();

    });
});

module.exports = router;
