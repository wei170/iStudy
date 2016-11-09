'use strict';
var express = require('express');
var router = express.Router();
var db = require(__dirname + '/../db.js');
var middleware = require(__dirname + '/../middleware.js')(db);
var _ = require('underscore');


/******************************************************
 *           	Get Profile
 ******************************************************/
router.post('/', middleware.requireAuthentication, function(req, res) {
    /**
     * JSON Format: {
	 * 		"userName": "...",
	 * }
     */
    var body = _.pick(req.body, 'userName');
    db.user.findOne({where: {userName: body.userName}}).then(function (user) {
       if (user){
           user.getProfile().then(function (profile) {
               res.json(profile);
           });
       }
       else {
           res.send({error: "User Not Found"});
       }
    });
});



/******************************************************
 *           	Update Profile
 ******************************************************/

router.post('/update', middleware.requireAuthentication, function(req, res) {
	/**
	 * JSON Format: {
	 * 		"userName": "...",
	 * 		"major": "...",
	 * 		"language": "...",
	 * 		"birthday": "...",
	 *		"hobby": "...",
	 * 		"visibility": "..."
	 * }
	 */
	var body = _.pick(req.body, 'userName', 'major', 'language', 'birthday', 'hobby', 'visibility');
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
	db.user.findOne({where: {userName: body.userName}}).then(function(user){
		if (user){
			user.getProfile().then(function (profile) {
				if (profile){
					profile.updateAttributes(attributes).then(function (profile) {
						if (profile){
							res.json(profile);
						}
					}, function (e) {
						res.send({err: "Fail to update profile"});
					});
				}
				else {
					res.send({err: "That's weird. Profile should have existed..."});
				}
			});
		}
		else {
			res.send({err: "User Not Found"});
		}
	});
});

module.exports = router;
