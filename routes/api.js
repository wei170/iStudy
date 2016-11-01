var express = require('express');
var db = require('../db');
var cool = require('cool-ascii-faces');
var app = require('../app');
var admins = require('../models/admin');
var seedUsers = require('../models/seedUser');
var seedProfs = require('../models/seedProfessor');
var seedCourses = require('../models/seedCourse');
var seedCourseProssor = require('../models/seedCourseProfessor');
var Promise = require('bluebird');


var sampleProfile = require('../models/seedProfile').p1;

var router = express.Router();

// __  ____/__  ____/__  __/
// _  / __ __  __/  __  /
// / /_/ / _  /___  _  /
// \____/  /_____/  /_/

/**************************************************
 *				Get All Users
 **************************************************/
router.get('/users', function (req, res) {
    db.user.findAll({ where: {id: {gt: 0}}}).then(function (user) {
        res.json(user);
    });
});

/**************************************************
 *			Get user's profile by user_id
 **************************************************/
router.get('/user-profile/:id', function(req, res){
    db.profile.findOne({where: {user_id: req.params.id}}).then(function(profile){
      if (profile){
          res.json(profile);
		  console.log(profile.getDataValue('hobby'));
		  console.log(db.profile.getterMethods.hobby);
      }else {
          res.send('The profile does not exist!');
      }
   });
});

/**************************************************
 *			Get user's pwd by user_id
 **************************************************/
router.get('/pwd/:id', function(req, res){
	db.user.findOne({where: {id: req.params.id}}).then(function(user){
		console.log(user.password);
	});
});


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
 * 				Update a user's profile
 **************************************************/
router.post('/update-profile/:id', function (req, res) {
	db.profile.findOne({where: {user_id: req.params.id}}).then(function (profile) {
		if (profile){
			profile.updateAttributes(sampleProfile).then(function (profile) {
				res.json(profile);
			});
		}
		else {
			res.send('The profile does not exist!');
		}
	});
});

/**************************************************
 * 				User Join a Class
 **************************************************/
router.post('/join/', function (req, res) {
	var c_id = 1;
	var u_id = 1;
	db.user.findOne({where: {id: u_id}}).then(function (user) {
		if (user){
			db.course_professor.findOne({where: {id: c_id}}).then(function (course) {
				if (course){
					// if a profile exists, the user or the student exists
					course.addStudent(user).then(function () {
						res.send({res: "joined class successfully"});
					});
				}
				else {
					console.log('Course Not Found :(');
					res.send({err: "Course Not Found"});
				}
			});
		}
		else {
			console.log('User Not Found :(');
			res.send({err: "User Not Found"});
		}
	});
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
			.then(insertData(insertNewCourse, seedCourses));
		resolve();
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
			// insert data
			data.forEach(function (d) {
				insertFunction(d);
			});
			resolve();
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

module.exports = router;