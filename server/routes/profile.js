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
			res.status(200).json(languages);
		}
		else {
			res.status(404).send({err: "No Language Found"});
		}
	});
});


/******************************************************
 *           Get Existed Hobbies
 ******************************************************/
router.get('/hobbies', middleware.requireAuthentication, function(req, res){
	db.hobby.findAll().then(function (hobbies) {
		if (hobbies){
			res.status(200).json(hobbies);
		}
		else {
			res.status(404).send({err: "No Hobby Found"});
		}
	});
});


/******************************************************
 *           	Get Profile
 ******************************************************/
router.post('/', middleware.requireAuthentication, function(req, res) {
    /**
     * JSON Format: {
	 * 		"hostName": "...",
	 * 		"requester": "..."
	 * }
     */
    var body = _.pick(req.body, 'hostName', "requester");
	var complete_profile = {};
    db.user.findOne({where: {userName: body.hostName}}).then(function (user) {
       if (user){
           user.getProfile().then(function (profile) {
               if (profile){
				   //check who is viewing the user's profile
				   if (body.requester === body.hostName){
				   		//oneself
						getPublicProfile(complete_profile, profile, res);
				   }
				   else {
				   	// check if two are friends of each other
					db.user.findOne({where: {userName: body.requester}}).then(function (requester) {
						if (requester){
							var result = [];
							result.isFriend = false;
							requester.getFriends().then(function (friends) {
								// check two's association
								checkIfIsFriend(friends, user, result)
									.then(function () {
										if (result.isFriend == true){
											getPublicProfile(complete_profile, profile, res);
										}
										else {
											getPrivateProfile(user, profile, res);
										}
									})
							});
						}
						else {
							res.status(404).send({err: "Requester Not Found"});
						}
					})
				   }
			   }
           });
       }
       else {
           res.status(404).send({err: "User Not Found"});
       }
    });
});

/**
 * Send user the public profile
 * @param complete_profile
 * @param profile
 * @param res
 */
var getPublicProfile = function(complete_profile, profile, res){
	var extra = {};
	complete_profile.extra = extra;
	complete_profile.profile = profile;
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
			res.status(200).json(complete_profile);
		})
	});
};


/**
 * Return user's private profile
 * @param user
 * @param profile
 * @param res
 */
var getPrivateProfile = function(user, profile, res){
	res.status(200).send({
		userName: user.userName,
		nationality: profile.nationality,
		gender: profile.gender
	});
};

/**
 * Check if two are friends
 * @param friends
 * @param host
 * @param result
 */
var checkIfIsFriend = function (friends, host, result) {
	return new Promise(function (resolve, reject) {
		// isFriend by default is false
		var count = 0;
		var len = friends.length;
		friends.map(function (friend) {
			if (friend.userName === host.userName){
				result.isFriend = true;
				resolve();
			}
			count++;
		});
		if (count === len){
			//console.log("res is " + isFriend);
			resolve();
		}
	});
};


/******************************************************
 *           	Update Profile
 ******************************************************/

router.post('/update', middleware.requireAuthentication, function(req, res) {
	/**
	 * JSON Format: {
	 * 		"userName": "...",
	 * 		"major": "...",
	 * 		"nationality": "...",
	 * 		"birthday": "...",
	 * 		"gender": "...",
	 * 		"visibility": "...",
	 * 		"language": "...",
	 * 		"hobby": "..."
	 * }
	 */
	var body = _.pick(req.body, 'userName', 'major', 'nationality', 'birthday', 'gender','visibility', 'language', 'hobby');
    var attributes = {};

    if (body.hasOwnProperty('major')) {
        attributes.major = body.major;
    }

    if (body.hasOwnProperty('birthday')) {
    	// temp fix when bday is empty
    	if (body.birthday != ''){
			attributes.birthday = body.birthday;
		}
		else {
    		console.log("birthday is " + body.birthday);
		}
    }

    if (body.hasOwnProperty('gender')) {
		attributes.gender = body.gender;
	}

	if (body.hasOwnProperty('nationality')){
		attributes.nationality = body.nationality;
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
										if (languages.length > 0){
											profile.setLanguages(languages).then(function () {
												if (body.hobby !== "") {
													// update HOBBY
													var hobby_list = [];
													body.hobby.map(function (hobby) {
														hobby_list.push(hobby.name);
													});

													db.hobby.findAll({where: {name: {$in: hobby_list}}})
														.then(function (hobbies) {
															if (hobbies.length > 0) {
																profile.setHobbies(hobbies).then(function () {
																	res.status(200).send({res: "Profile Updated Successfully"});
																});
															}
															else {
																res.status(404).send({err: "Hobbies Not Found"});
															}
														});
												}
										});


									}
									else {
											res.status(404).send({err: "Languages Not Found"});
										}
									});
							}
						}
					}, function (error) {
						res.status(400).send({err: "Update Fails"});
					});
				}
				else {
					res.status(404).send({err: "That's weird. Profile should have existed..."});
				}
			});
		}
		else {
			res.status(404).send({err: "User Not Found"});
		}
	});
});

module.exports = router;
