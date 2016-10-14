'use strict';

var express = require('express');
var router = express.Router();
var db = require(__dirname + '/../db.js');
var _ = require('underscore');
var randomstring = require("randomstring");
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

router.delete('/reset', function(req, res, next) {
    console.log('-=-=------');
    var query = req.query;
    var where = {};

    if (query.hasOwnProperty('email') && query.email.length > 0) {
        console.log('here -----');
        where.email = {
            $like: '%' + query.email + '%'
        };
    }
    db.user.findAll({
        where: where
    }).then(function(users) {
        var newPassword = randomstring.generate(8);
        users[0].update({
            'password': newPassword
        }).then(function(user) {
            res.json(newPassword);

        }, function(e) {
            res.status(400).json(e);
        });
        //users[0].setDataValue('password','66666');

    }, function(e) {
        res.status(500).send();
    });
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
