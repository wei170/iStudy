var express = require('express');
var db = require('../db');
var cool = require('cool-ascii-faces');
var app = require('../app');
var admins = require('../models/admin');
var seedUsers = require('../models/seedUser');
var seedProfs = require('../models/seedProfessor');
var seedCourses = require('../models/seedCourse');
var seedCourseProssor = require('../models/seedCourseProfessor');
var seedCourseStudent = require('../models/seedCourseStudent');
var seedFriends = require('../models/seedFriends');
var seedLanguages = require('../models/seedLanguages');
var seedHobbies = require('../models/seedHobbies');
var Promise = require('bluebird');
var router = express.Router();

// _______________________  /_
// ___  __ \  __ \_  ___/  __/
// __  /_/ / /_/ /(__  )/ /_
// _  .___/\____//____/ \__/
// /_/

/**************************************************
 * Seed init data as users, admins, courses, profs
 **************************************************/
router.post('/seeds', function (req, res) {
	initDB()
		.then(showPage(res, 'seed'));
});


/**************************************************
 * 			Link Professor with Course
 **************************************************/
router.post('/link_prof_course', function (req, res) {
	linkCourseAndProf()
		.then(showPage(res, 'seed'));
});

/**************************************************
 * 			Link Student with Course
 **************************************************/
router.post('/link_course_student', function (req, res) {
	linkCourseAndStudent()
		.then(res.send({res: 'Linked Students With Courses Successfully'}));
});

/**************************************************
 * 				Link Users
 **************************************************/
router.post('/link_users', function (req, res) {
	linkUsers()
		.then(res.send({res: "Linked Users Successfully"}));
});



//TODO: parse attributes with multiple values in Profile

// ___  __/___  ________________  /___(_)____________
// __  /_ _  / / /_  __ \  ___/  __/_  /_  __ \_  __ \
// _  __/ / /_/ /_  / / / /__ / /_ _  / / /_/ /  / / /
// /_/    \__,_/ /_/ /_/\___/ \__/ /_/  \____//_/ /_/

/**
 * Seed data into database, return a promise
 */
var initDB = function(){
	return new Promise(function(resolve, reject){
		insertData(insertNewUser, admins)
			.then(insertData(insertNewProf, seedProfs))
			.then(insertData(insertNewUser, seedUsers))
			.then(insertData(insertNewCourse, seedCourses))
			.then(insertData(insertNewLanguages, seedLanguages))
			.then(insertData(insertNewHobbies, seedHobbies));
	});
};

/**
 * Function used to insert data to db
 * @param insertFunction: insert function
 * @param data: chunk of data to be inserted
 * @return a promise
 */
var insertData = function(insertFunction, data){
    if (typeof insertFunction === "function"){
		return new Promise(function (resolve, reject) {
			var count = 0;
			var number = data.length;
			// insert data
			data.forEach(function (d) {
				count++;
				insertFunction(d);
			});
			if (count === number){
				resolve();
			}
		});
    }else {
		console.log('The first param passed in is not function');
	}
};

/**
 * Function showing responding page to users
 * @param res: response
 * @param page: html source page name
 */
var showPage = function(res, page){
    var emoji = cool();
    res.status(200).render(page, { emoji: emoji });
};

/**
 * Function used to insert a new user as well as a profile of that user
 * @param user: user to be inserted
 */
var insertNewUser = function (user){
	db.user.create(user).then(function (user) {
		id = user.id;
		// init profile for new user
		db.profile.create({user_id: id});
	});
};

/**
 * Function used to insert a new prof to db
 * @param prof: prof to be inserted
 */
var insertNewProf = function(prof){
	db.professor.create(prof).then(function(){});
};

/**
 * Function used to insert new course to db
 * @param course: course to be inserted
 */
var insertNewCourse = function(course){
	db.course.create(course).then(function(){});
};

/**
 * Function used to insert new languages to db
 * @param language
 */
var insertNewLanguages = function (language) {
	db.language.create(language).then(function (){});
};

/**
 * Function used to insert new hobbies to db
 * @param hobby
 */
var insertNewHobbies = function (hobby) {
	db.hobby.create(hobby).then(function () {});
};


/**
 * Function used to link course with professors
 * Return a promise
 */
var linkCourseAndProf = function () {
	return new Promise(function(resolve, reject){
		seedCourseProssor.map(function (linking) {
			var course = linking.course;
			var professor = linking.professor;
			db.course.findOne({where: {name: course}}).then(function (course) {
				if (course){
					db.professor.findOne({where: {name: professor}}).then(function (prof) {
						if (prof){
							course.addProfessor(prof);
						}
						else {
							console.log('Professor Not Found :(');
						}
					});
				}
				else {
					console.log('Course Not Found :(');
				}
			});
		});
	});
};

/**
 * Function used to link students with courses
 * return a promise
 */
var linkCourseAndStudent = function () {
	return new Promise(function (resolve, reject) {
		seedCourseStudent.map(function (linking) {
			var course = linking.course;
			var professor = linking.professor;
			var userName = linking.userName;
			db.user.findOne({where: {userName: userName}}).then(function (user) {
				if (user){
					db.course.findOne({where: {name: course}}).then(function (course) {
						if (course){
							db.professor.findOne({where: {name: professor}}).then(function (professor){
								if (professor){
									db.course_professor.findOne({where: {course_id: course.id, professor_id: professor.id}}).then(function (c_u){
										if (c_u){
											user.addCourse(c_u);
										}
										else {
											console.log("No Such Course :(");
										}
									});
								}
								else {
									console.log("Professor Not Found :(");
								}
							});
						}
						else {
							console.log("Course Not Found :(");
						}
					});
				}
				else {
					console.log("User Not Found :(");
				}
			});
		});
	});
};

/**
 * Link user with user
 * return a promise
 */
var linkUsers = function () {
	return new Promise(function (resolve, reject) {
		seedFriends.map(function (linking) {
			var u_id = linking.user_id;
			var f_id = linking.friend_id;
			db.user.findById(u_id).then(function (user) {
				if (user){
					db.user.findById(f_id).then(function (friend) {
						console.log('Map ' + user.userName + ', ' + friend.userName);
						if (friend) {
							user.addFriend(friend);
						}
					});
				}
			});
		});
	});
};

module.exports = router;