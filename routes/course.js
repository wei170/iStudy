'use strict';
var express = require('express');
var router = express.Router();
var db = require(__dirname + '/../db.js');
var middleware = require(__dirname + '/../middleware.js')(db);
var _ = require('underscore');

/******************************************************
 *  GET all course names along with their descriptions
 ******************************************************/
router.get('/', middleware.requireAuthentication,  function(req, res){
	db.course.findAll({attributes: ['name', 'description']}).then(function (course) {
		res.json(course);
	}, function(e){
		res.status(400).send({err: "fail to get courses"});
	});
});


/**************************************************
 * 			Get Relevant Professors
 **************************************************/
router.post('/', middleware.requireAuthentication, function(req, res){
	var body = _.pick(req.body, 'course_name');
	db.course.findOne({where: {"name": body.course_name}}).then(function(course){
		if (course){
			// found and send user relevant professors
			course.getProfessors().then(function(professors){
				res.json(professors);
			});
		}
		else {
			res.send({err: "Course Not Found :("});
		}
	}, function (err) {
		res.status(400).send(err);
	});
});

/**************************************************
 * 			Get All Classmates
 **************************************************/
router.post('/students', middleware.requireAuthentication, function (req, res) {
	var body = _.pick(req.body, 'course', 'professor');
	db.course.findOne({where: {name: body.course}}).then(function (course) {
		if (course){
			//TODO: two prof with same name might cause problem
			db.professor.findOne({where: {name: body.professor}}).then(function (professor) {
				if (professor){
					db.course_professor.findOne({where: {course_id: course.id, professor_id: professor.id}})
						.then(function (c_u) {
							if (c_u){
								// find course by a specific professor
								c_u.getStudents().then(function (students) {
									if (students){
										res.json(students);
									}
									else {
										console.log('No students joined this course.');
										res.send({err: "No stduents joined this course"});
									}
								});
							}
							else {
								console.log('No such course exits!');
								res.send({err: "No such course :("});
							}
						});
				}
				else {
					console.log('Professor Not Found');
					res.send({err: "Professor Not Found :("});
				}
			});
		}
		else {
			console.log('Course Not Found');
			res.send({err: "Course Not Found :("});
		}
	});
});


module.exports = router;