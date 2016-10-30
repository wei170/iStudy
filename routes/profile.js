'use strict';
var express = require('express');
var router = express.Router();
var db = require(__dirname + '/../db.js');
var middleware = require(__dirname + '/../middleware.js')(db);
var _ = require('underscore');


// GET profile
router.get('/', middleware.requireAuthentication, function(req, res) {

    db.profile.findOne({where: {user_id: req.user.get('id')}}).then(function(profile) {
        res.json(profile.toPublicJSON());
    }, function(e) {
        res.status(400).json({err: "fail to get profile"});
    });
});



//update profile
router.put('/', middleware.requireAuthentication, function(req, res) {
    var body = _.pick(req.body, 'major', 'language', 'birthday', 'hobby', 'visibility');
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

    if (body.hasOwnProperty('visibility')) {
        attributes.visibility = body.visibility;
    }

    db.profile.findOne({where: {user_id: req.user.get('id')}}).then(function(profile) {

        if (profile) {
            profile.update(attributes).then(function(profile) {
                res.json(profile.toPublicJSON());
            }, function(e) {
                console.log("fail to update profile");
                res.status(400).json(e);
            });
        } else {
            console.log("profile does not exist!");
            res.status(404).send({err: "profile does not exist"});
        }
    }, function() {
        res.status(500).send({err: "Something broke!"});
    });

});

module.exports = router;
