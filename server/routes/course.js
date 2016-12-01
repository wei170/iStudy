'use strict';
var express = require('express');
var router = express.Router();
var db = require(__dirname + '/../db.js');
var middleware = require(__dirname + '/../middleware.js')(db);
var _ = require('underscore');
var Promise = require('bluebird');

/******************************************************
 *  GET all course names along with their descriptions
 ******************************************************/
router.get('/', middleware.requireAuthentication,  function(req, res){
	db.course.findAll({attributes: ['name', 'description']}).then(function (courses) {
		if (courses){
			res.status(200).json(courses);
		}
		else {
			res.status(404).send({err: "fail to get courses"});
		}

	}, function(error){
		res.status(400).send({err: error});
	});
});

/**************************************************
 * 			Get Relevant Professors
 **************************************************/
router.post('/', middleware.requireAuthentication, function(req, res){
	/**
	 * JSON Format:
	 * {
	 * 	"course": "..."
	 * }
	 */
	var body = _.pick(req.body, 'course');
	db.course.findOne({where: {"name": body.course}}).then(function(course){
		if (course){
			// found and send user relevant professors
			course.getProfessors().then(function(professors){
				res.status(200).json(professors);
			});
		}
		else {
			res.status(404).send({err: "Course Not Found :("});
		}
	}, function (err) {
		res.status(400).send(err);
	});
});


/**************************************************
 * 				Get Course ID
 **************************************************/
router.post('/get-course-id', middleware.requireAuthentication, function(req, res){
	/**
	 * JSON Format:
	 * {
	 * 	"course": "...",
	 * 	"professor": "..."
	 * }
	 */
	var body = _.pick(req.body, 'course', 'professor');
	db.course.findOne({where: {name: body.course}}).then(function (course) {
		if (course){
			db.professor.findOne({where: {name: body.professor}}).then(function (professor){
				if (professor){
					db.course_professor.findOne({where: {course_id: course.id, professor_id: professor.id}})
						.then(function (aCourse) {
							if (aCourse){
								res.send({course_id: aCourse.id});
							}
							else {
								res.status(404).send({err: "No Such Course"});
							}
						})
				}
				else {
					res.status(404).send({err: "Professor Not Found :("});
				}
			});
		}
		else {
			res.status(404).send({err: "Course Not Found :("});
		}
	})
});


/**************************************************
 * 				Join A Class
 **************************************************/
router.post('/join', middleware.requireAuthentication, function (req, res) {
	/**
	 * JSON Format:
	 * {
	 * 	"course": "...",
	 * 	"professor": "...",
	 * 	"userName": "..."
	 * }
	 */
	var body = _.pick(req.body, 'course', 'professor', 'userName');
	db.course.findOne({where: {name: body.course}}).then(function (course) {
		if (course){
			//TODO: two prof with same name might cause problem
			// *Note: course name set to be unique
			db.professor.findOne({where: {name: body.professor}}).then(function (professor) {
				if (professor){
					db.course_professor.findOne({where: {course_id: course.id, professor_id: professor.id}})
						.then(function (c_u) {
							if (c_u){
								// first find the actual course the student wants to join
								db.user.findOne({where: {userName: body.userName}}).then(function (user) {
									if (user){
										// add user as a student to the course
										user.addCourse(c_u);
										console.log('user ', body.userName, ' has joined the class ', body.course, ' by ', body.professor);
										res.status(200).send({res: "Join the class successfully"});
									}
									else {
										res.status(400).send({err: "No such user :("});
									}
								});
							}else{
								res.status(400).send({err: "No such course :("});
							}
						});
				}
				else {
					res.status(400).send({err: "Professor Not Found :("});
				}
			});
		}
		else{
			res.status(400).send({err: "Course Not Found :("});
		}
	});
});

/**************************************************
 * 				Leave A Class
 **************************************************/
router.post('/leave', middleware.requireAuthentication, function (req, res) {
	/**
	 * JSON Format:
	 * {
	 * 	"course": "...",
	 * 	"professor": "...",
	 * 	"userName": "..."
	 * }
	 */
	var body = _.pick(req.body, 'course', 'professor', 'userName');
	db.course.findOne({where: {name: body.course}}).then(function (course) {
		if (course){
			//TODO: two prof with same name might cause problem
			// *Note: course name set to be unique
			db.professor.findOne({where: {name: body.professor}}).then(function (professor) {
				if (professor){
					db.course_professor.findOne({where: {course_id: course.id, professor_id: professor.id}})
						.then(function (c_u) {
							if (c_u){
								// first find the actual course the student wants to join
								db.user.findOne({where: {userName: body.userName}}).then(function (user) {
									if (user){
										// remove the user from the course
										db.course_student.findOne({where: {user_id: user.id, course_professor_id: c_u.id}})
											.then(function (item) {
												if (item){
													item.destroy().then(function () {
														res.status(200).send({res: "Leave the course successfully!"});
													});
												}
												else {
													res.status(404).send({err: "User is not in that course"});
												}

											});
									}
									else {
										res.status(400).send({err: "No such user :("});
									}
								});
							}else{
								res.status(400).send({err: "No such course :("});
							}
						});
				}
				else {
					res.status(400).send({err: "Professor Not Found :("});
				}
			});
		}
		else{
			res.status(400).send({err: "Course Not Found :("});
		}
	});
});


/**************************************************
 * 			Get All Students
 **************************************************/
router.post('/students', middleware.requireAuthentication, function (req, res) {
	/**
	 * JSON Format:
	 * {
	 * 	"course": "course name"
	 * 	"professor": "professor name"
	 * }
	 */
	var body = _.pick(req.body, 'course', 'professor');
	db.course.findOne({where: {name: body.course}}).then(function (course) {
		if (course){
			//TODO: two prof with same name might cause problem
			// *Note: course name set to be unique
			db.professor.findOne({where: {name: body.professor}}).then(function (professor) {
				if (professor){
					db.course_professor.findOne({where: {course_id: course.id, professor_id: professor.id}})
						.then(function (c_u) {
							if (c_u){
								// find course by a specific professor
								c_u.getStudents().then(function (students) {
									if (students){
										res.status(200).json(students);
									}
									else {
										res.status(404).send({err: "No stduents joined this course"});
									}
								});
							}
							else {
								res.status(404).send({err: "No such course :("});
							}
						});
				}
				else {
					res.status(404).send({err: "Professor Not Found :("});
				}
			});
		}
		else {
			res.status(404).send({err: "Course Not Found :("});
		}
	});
});


/**************************************************
 * 		Get Number Of Students In One Class
 **************************************************/
router.post('/number-of-students', middleware.requireAuthentication, function (req, res) {
	/**
	 * JSON Format:
	 * {
	 * 	"course": "course name"
	 * 	"professor": "professor name"
	 * }
	 */
	var body = _.pick(req.body, 'course', 'professor');
	db.course.findOne({where: {name: body.course}}).then(function (course) {
		if (course){
			//TODO: two prof with same name might cause problem
			// *Note: course name set to be unique
			db.professor.findOne({where: {name: body.professor}}).then(function (professor) {
				if (professor){
					db.course_professor.findOne({where: {course_id: course.id, professor_id: professor.id}})
						.then(function (c_u) {
							if (c_u){
								// find course by a specific professor
								c_u.getStudents().then(function (students) {
									if (students){
										res.status(200).send({number: students.length});
									}
									else {
										res.status(404).send({err: "No stduents joined this course"});
									}
								});
							}
							else {
								res.status(404).send({err: "No such course :("});
							}
						});
				}
				else {
					res.status(404).send({err: "Professor Not Found :("});
				}
			});
		}
		else {
			res.status(404).send({err: "Course Not Found :("});
		}
	});
});


/**************************************************
 * 			Get User Course List
 **************************************************/
router.post('/get-class-list', middleware.requireAuthentication, function(req, res){
	/**
	 * JSON Format:
	 * {
	 * 	"userName": "..."
	 * 	}
	 */
	var course_ids = [];
	var professor_ids = [];
	var course_list = {};
	var courses = [];
	course_list.courses = courses;

	var body = _.pick(req.body, 'userName');
	db.user.findOne({where: {userName: body.userName}}).then(function (user) {
		if (user){
			console.log(user.userName);
			user.getCourses().then(function (c_ids) {
				if (c_ids){
					c_ids.map(function (c_id) {
						course_ids.push(c_id.course_id);
						professor_ids.push(c_id.professor_id);
					});

					db.course.findAll({where: {id: {$in: course_ids}}}).then(function (course_names) {
						if (course_names){
							db.professor.findAll({where: {id: {$in: professor_ids}}}).then(function (professor_names){
								if (professor_names){
									for (var i = 0; i < professor_names.length; i++){
										courses.push(
											{
												"course": course_names[i].name,
												"professor": professor_names[i].name
											}
										)
									}
									res.status(200).send(course_list);
								}
								else {
									res.status(404).send({err: "Professors Not Found"});
								}
							})
						}
						else {
							res.status(404).send({err: "Courses Not Found"});
						}
					});
				}
				else {
					res.status(404).send({err: "User Didn't Attend Any Course Yet :("});
				}
			});
		}
		else{
			res.status(404).send({err: "User Not Found :("});
		}
	});
});


/**************************************************
 * 				Get RMP
 **************************************************/
router.post('/get-RMP', middleware.requireAuthentication, function(req, res){
	/**
	 * JSON Format:
	 * {
	 * 	"course": "...",
	 * 	"professor": "...",
	 *
	 * 	}
	 */
	var RMP = {};
	var r;
	var c = [];
	RMP.rating = r;
	RMP.comments = c;
	var finished = false;
	var body = _.pick(req.body, 'course', 'professor');
	db.course.findOne({where: {name: body.course}}).then(function (course) {
		if (course){
			db.professor.findOne({where: {name: body.professor}}).then(function (professor) {
				if (professor){
					db.course_professor.findOne({where: {course_id: course.id, professor_id: professor.id}})
						.then(function (c_p) {
							if (c_p){
								c_p.getComments().then(function (comments) {
									//console.log(comments);
									if (comments){
										retrieveRatingAndComments(res, c_p,RMP);
									}
								});
							}
							else {
								res.status(404).send({err: "No Such Course"});
							}
						});
				}
				else {
					res.status(404).send({err: "Professor Not Found"});
				}
			})
		}
		else{
			res.status(404).send({err: "Course Not Found"});
		}
	})
});

/**
 * Get rating score and comments of a Course
 * @param res
 * @param c_p
 * @param RMP
 */
var retrieveRatingAndComments = function (res, c_p, RMP) {
	return new Promise(function (resolve, reject) {
		var len = -1;
		RMP.rating = c_p.rating;
		c_p.getComments().then(function (comments) {
			if (comments){
				len = comments.length;
				comments.map(function (c) {
					RMP.comments.push(c);
				});
			}
			if (RMP.comments.length === len){
				res.status(200).send(RMP);
				resolve();
			}
		});
	});
};

module.exports = router;