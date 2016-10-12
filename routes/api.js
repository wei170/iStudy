var express = require('express');
var db = require('../db');
var cool = require('cool-ascii-faces');
var app = require('../app');
var admins = require('../models/admin');
var seedUsers = require('../models/seedUser');
var seedProfs = require('../models/seedProfessor');
var seedCourses = require('../models/seedCourse');

var sampleProfile = require('../models/seedProfile').p1;

var router = express.Router();
var id;

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
      }else {
          res.send('The profile does not exist!');
      }
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
	var init = function(callback, res, page){
		insertData(insertNewUser, admins);
		insertData(insertNewUser, seedUsers);
		insertData(insertNewProf, seedProfs);
		insertData(insertNewCourse, seedCourses);
		// after inserting all the seeds data, exe this callback function
		callback(res, page);
	};

	init(showPage, res, 'seed');
});

/**
 * Update a user's profile
 */
router.post('/update-profile/:id', function (req, res) {
	db.profile.findOne({where: {user_id: req.params.id}}).then(function (profile) {
		if (profile){
			profile.updateAttributes(sampleProfile).then(function () {
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

/**
 * Function used to insert data to db
 * @param insertFunction: insert function
 * @param data: chunk of data to be inserted
 */
var insertData = function(insertFunction, data){
    if (typeof insertFunction === "function"){
        // insert data
        data.forEach(function (d) {
            insertFunction(d);
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
    res.render(page, { emoji: emoji });
};

/**
 * Function used to insert a new user as well as a profile of that user
 * @param user: user to be inserted
 */
var insertNewUser = function (user){
    db.user.create(user).then(function (user) {
        id = user.id;
        // init profile for new user
        db.profile.create({user_id: id, username: 'maoxia'});
    })
};

/**
 * Function used to insert a new prof to db
 * @param prof: prof to be inserted
 */
var insertNewProf = function(prof){
	db.professor.create(prof).then(function () {
	});
};

/**
 * Function used to insert new course to db
 * @param course: course to be inserted
 */
var insertNewCourse = function(course){
	db.course.create(course).then(function(){
	})
};

module.exports = router;