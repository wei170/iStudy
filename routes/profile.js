'use strict';
var express = require('express');
var router = express.Router();
var db = require(__dirname + '/../db.js');
var middleware = require(__dirname + '/../middleware.js')(db);
var _ = require('underscore');


// GET profile
router.get('/', middleware.requireAuthentication, function(req, res) {

    db.profile.findById(req.user.get('id')).then(function(profile) {
        res.json(profile.toPublicJSON());
    }, function(e) {
        res.status(400).json(e);
    });
});

//update profile
router.put('/', middleware.requireAuthentication, function(req, res) {
    var body = _.pick(req.body, 'major', 'language', 'birthday', 'hobby');
    var attributes = {};

    if (body.hasOwnProperty('major')) {
        attributes.major = body.major;
    }

    if (body.hasOwnProperty('language')) {
        attributes.language = body.language;
    }

    if (body.hasOwnProperty('birthday')) {
        attributes.birthday = body.birthday;
    }

    if (body.hasOwnProperty('hobby')) {
        attributes.hobby = body.hobby;
    }

    db.profile.findById(req.user.get('id')).then(function(profile) {
    
        if (profile) {
            profile.update(attributes).then(function(profile) {
                res.json(profile.toPublicJSON());
            }, function(e) {
                res.status(400).json(e);
            });
        } else {
            res.status(404).send();
        }
    }, function() {
        res.status(500).send();
    });

});

module.exports = router;
