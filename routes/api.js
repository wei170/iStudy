var express = require('express');
var db = require('../db');
var cool = require('cool-ascii-faces');
var app = require('../app');
var admins = require('../models/admin');
var seedUsers = require('../models/seedUser');
var seedProfs = require('../models/seedProfessor');
var seedCourses = require('../models/seedCourse');
var Promise = require('bluebird');


var sampleProfile = require('../models/seedProfile').p1;

var router = express.Router();

/* Run Api Scripts*/

// __  ____/__  ____/__  __/
// _  / __ __  __/  __  /
// / /_/ / _  /___  _  /
// \____/  /_____/  /_/
router.get('/users', function (req, res) {
    db.user.findAll({ where: {id: {gt: 0}}}).then(function (user) {
        res.json(user);
    });
});

/**
 * Get user's profile by user_id
 */
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

/**
 * Seed init data as users, admins, courses, profs
 */
router.post('/seeds', function (req, res) {
	initDB()
		.then(showPage(res, 'seed'));
});


/**
 * Test
 */
router.post('/link_prof_course', function (req, res) {
	linkCourseAndProf()
		.then(showPage(res, 'seed'));
});




/**
 * Update a user's profile
 */
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


//TODO: parse attributes with multiple values in Profile

// ___  __/___  ________________  /___(_)____________
// __  /_ _  / / /_  __ \  ___/  __/_  /_  __ \_  __ \
// _  __/ / /_/ /_  / / / /__ / /_ _  / / /_/ /  / / /
// /_/    \__,_/ /_/ /_/\___/ \__/ /_/  \____//_/ /_/


var initDB = function(){
	return new Promise(function(resolve, reject){
		insertData(insertNewUser, admins)
			.then(insertData(insertNewProf, seedProfs))
			.then(insertData(insertNewUser, seedUsers))
			.then(insertData(insertNewCourse, seedCourses));
		resolve();
	});
}

/**
 * Function used to insert data to db
 * @param insertFunction: insert function
 * @param data: chunk of data to be inserted
 */
var insertData = function(insertFunction, data){
    if (typeof insertFunction === "function"){
		console.log('++++++++++++++++++++++++++++++++++++++++\n');
		return new Promise(function (resolve, reject) {
			// insert data
			data.forEach(function (d) {
				insertFunction(d);
			});
			resolve();
		});
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
 */
var linkCourseAndProf = function () {
	// cs381
	return new Promise(function(resolve, reject){
		db.course.findOne({where: {name: 'cs381'}}).then(function (course) {
			db.professor.findOne({where: {name: 'Greg N. Frederickson'}}).then(function(prof){
				course.addProfessor(prof);
			});
			db.professor.findOne({where: {name: 'Susanne E. Hambrusch'}}).then(function(prof){
				course.addProfessor(prof);
			});
		});
		// cs307
		db.course.findOne({where: {name: 'cs307'}}).then(function (course){
			db.professor.findOne({where: {name: 'H. E. Dunsmore'}}).then(function(prof){
				course.addProfessor(prof);
			});
		});
	});
};

module.exports = router;