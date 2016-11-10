'use strict';
var express = require('express');
var router = express.Router();
var db = require(__dirname + '/../db.js');
var middleware = require(__dirname + '/../middleware.js')(db);
var _ = require('underscore');


/******************************************************
 *           Get Existed Language
 ******************************************************/
router.get('/languages', middleware.requireAuthentication, function(req, res){
	db.language.findAll().then(function (languages) {
		if (languages){
			res.json(languages);
		}
		else {
			res.send({err: "No Language Found"});
		}
	});
});


/******************************************************
 *           Get Existed Hobbies
 ******************************************************/
router.get('/hobbies', middleware.requireAuthentication, function(req, res){
	db.hobby.findAll().then(function (hobbies) {
		if (hobbies){
			res.json(hobbies);
		}
		else {
			res.send({err: "No Hobby Found"});
		}
	});
});


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
	var compelete_profile = {};
	var extra = {};
	compelete_profile.extra = extra;
    db.user.findOne({where: {userName: body.userName}}).then(function (user) {
       if (user){
           user.getProfile().then(function (profile) {
               if (profile){
				   compelete_profile.profile = profile;
				   profile.getLanguages().then(function (languages) {
					   if (languages){
						   extra.language = languages;
					   }
					   else{
						   extra.language = "";
					   }
					   profile.getHobbies().then(function (hobbies) {
						   if (hobbies){
							   extra.hobby = hobbies;
						   }
						   else {
							   extra.hobby = "";
						   }
						   res.json(compelete_profile);
					   })
				   })
			   }
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
	 * 		"nation": "...",
	 * 		"birthday": "...",
	 * 		"gender": "...",
	 * 		"visibility": "...",
	 * 		"language": "...",
	 * 		"hobby": "..."
	 * }
	 */
	var body = _.pick(req.body, 'userName', 'major', 'birthday', 'gender','visibility', 'language', 'hobby');
    var attributes = {};

    if (body.hasOwnProperty('major')) {
        attributes.major = body.major;
    }

    if (body.hasOwnProperty('birthday')) {
        attributes.birthday = body.birthday;
    }

    if (body.hasOwnProperty('gender')) {
		attributes.gender = body.gender;
	}

	if (body.hasOwnProperty('nation')){
		attributes.nation = body.nation;
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
							if (body.language !== ""){
								//update LANGUAGE
								var language_list = [];
								body.language.map(function (language) {
									language_list.push(language.name);
								});

								db.language.findAll({where: {name: {$in: language_list}}})
									.then(function (languages) {
										if (languages){
											profile.addLanguages(languages).then(function () {
												if (body.hobby !== ""){
													// update HOBBY
													var hobby_list = [];
													body.hobby.map(function (hobby) {
														hobby_list.push(hobby.name);
													});

													db.hobby.findAll({where: {name: {$in: hobby_list}}})
														.then(function (hobbies) {
															if (hobbies){
																profile.addHobbies(hobbies);
															}
															else {
																res.send({err: "Hobbies Not Found"});
															}
														});
												}
												res.send({res: "Profile Updated Successfully"});
										});


									}
									else {
											res.send({err: "Languages Not Found"});
										}
									});
							}
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
