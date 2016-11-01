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

module.exports = router;