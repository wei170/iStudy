'use strict';
var express = require('express');
var router = express.Router();
var db = require(__dirname + '/../db.js');
var middleware = require(__dirname + '/../middleware.js')(db);

//GET all course names along with their descriptions
router.get('/', function(req, res){
	db.course.findAll({attributes: ['name', 'description']}).then(function (course) {
		res.json(course);
	}, function(e){
		res.status(400).json(e);
	});
});


//GET relevant professors based on name of a course
router.get('/:course_name', function(req, res){
	console.log(req.params.course_name);
	db.course.findOne({where: {"name": req.params.course_name}}).then(function(course){
		if (course){
			// found and send user relevant professors
			course.getProfessors().then(function(professors){
				res.json(professors);
			});
		}
		else {
			res.send("Course Not Found :(");
		}
	});
});

module.exports = router;