var express = require('express');
var db = require('../db');
var cool = require('cool-ascii-faces');
var app = require('../app');
var admins = require('../models/admin');
var seedUsers = require('../models/seedUser');
var seedProfs = require('../models/seedProfessor');
var seedCourses = require('../models/seedCourse');
var seedCourseProfessor = require('../models/seedCourseProfessor');
var seedCourseStudent = require('../models/seedCourseStudent');
var seedFriends = require('../models/seedFriends');
var seedLanguages = require('../models/seedLanguages');
var seedHobbies = require('../models/seedHobbies');
var seedComments = require('../models/seedComments');
var seedCourseComment = require('../models/seedCourseComment');
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
router.post('/seeds', function(req, res) {
    initDB()
        .then(showPage(res, 'seed'), function(e) {
            res.status(404).send({
                err: e
            });
        });
});


/**************************************************
 * 			Link Professor with Course
 **************************************************/
router.post('/link_prof_course', function(req, res) {
    linkCourseAndProf(res)
        .then(function() {
            res.status(200).send({
                res: "linked Prof with Course Successfully"
            });
        });
});

/**************************************************
 * 			Link Student with Course
 **************************************************/
router.post('/link_course_student', function(req, res) {
    linkCourseAndStudent(res)
        .then(res.status(200).send({
            res: 'Linked Students With Courses Successfully'
        }));
});

/**************************************************
 * 				Link Users
 **************************************************/
router.post('/link_users', function(req, res) {
    linkUsers(res)
        .then(res.status(200).send({
            res: "Linked Users Successfully"
        }));
});

/**************************************************
 * 				Link Course with Comments
 **************************************************/
router.post('/link_course_comment', function(req, res) {
    linkCourseAndComments().then(function(data) {
        res.status(200).send({
            res: 'Linked Course with Comments Successfully'
        });
    }, function(err) {
        res.status(404).send(err);
    });
});

/**************************************************
 * 				Link Course with Ratings
 **************************************************/
router.post('/link_course_rating', function(req, res) {
    addRating(res)
        .then(res.status(200).send({
            res: "Added Rating Successfully"
        }));
});

// ___  __/___  ________________  /___(_)____________
// __  /_ _  / / /_  __ \  ___/  __/_  /_  __ \_  __ \
// _  __/ / /_/ /_  / / / /__ / /_ _  / / /_/ /  / / /
// /_/    \__,_/ /_/ /_/\___/ \__/ /_/  \____//_/ /_/

/**
 * Seed data into database, return a promise
 */
var initDB = function() {
    return new Promise(function(resolve, reject) {
        insertData(insertNewUser, admins)
            .then(insertData(insertNewProf, seedProfs))
            .then(insertData(insertNewUser, seedUsers))
            .then(insertData(insertNewCourse, seedCourses))
            .then(insertData(insertNewLanguages, seedLanguages))
            .then(insertData(insertNewHobbies, seedHobbies))
            .then(insertData(insertNewComments, seedComments));
    });
};

/**
 * Function used to insert data to db
 * @param insertFunction: insert function
 * @param data: chunk of data to be inserted
 * @return a promise
 */
var insertData = function(insertFunction, data) {
    if (typeof insertFunction === "function") {
        return new Promise(function(resolve, reject) {
            var count = 0;
            var number = data.length;
            // insert data
            data.forEach(function(d) {
                count++;
                insertFunction(d);
            });
            if (count === number) {
                resolve();
            }
        });
    } else {
        console.log('The first param passed in is not function');
    }
};

/**
 * Function showing responding page to users
 * @param res: response
 * @param page: html source page name
 */
var showPage = function(res, page) {
    var emoji = cool();
    res.render(page, {
        emoji: emoji
    });
};

/**
 * Function used to insert a new user as well as a profile of that user
 * @param user: user to be inserted
 */
var insertNewUser = function(user) {
    db.user.create(user).then(function(user) {
        id = user.id;
        // init profile for new user
        db.profile.create({
            user_id: id
        });
    });
};

/**
 * Function used to insert a new prof to db
 * @param prof: prof to be inserted
 */
var insertNewProf = function(prof) {
    db.professor.create(prof).then(function() {});
};

/**
 * Function used to insert new course to db
 * @param course: course to be inserted
 */
var insertNewCourse = function(course) {
    db.course.create(course).then(function() {});
};

/**
 * Function used to insert new languages to db
 * @param language
 */
var insertNewLanguages = function(language) {
    db.language.create(language).then(function() {});
};

/**
 * Function used to insert new hobbies to db
 * @param hobby
 */
var insertNewHobbies = function(hobby) {
    db.hobby.create(hobby).then(function() {});
};

/**
 * Function used to insert new comment to db
 * @param comment
 */
var insertNewComments = function(comment) {
    db.comment.create(comment).then(function() {});
};


/**
 * Function used to link course with professors
 * Return a promise
 */
var linkCourseAndProf = function(res) {
    return new Promise(function(resolve, reject) {
        var count = 0;
        var len = seedCourseProfessor.length;
        seedCourseProfessor.map(function(linking) {
            count++;
            var course = linking.course;
            var professor = linking.professor;
            db.course.findOne({
                where: {
                    name: course
                }
            }).then(function(course) {
                if (course) {
                    db.professor.findOne({
                        where: {
                            name: professor
                        }
                    }).then(function(prof) {
                        if (prof) {
                            course.addProfessor(prof);
                        } else {
                            res.status(404).send({
                                err: 'Professor Not Found  '
                            });
                        }
                    });
                } else {
                    res.status(404).send({
                        err: 'Course Not Found  '
                    });
                }
            });
        });
        if (count === len) {
            resolve();
        }
    });
};

/**
 * Add Rating to each course
 * @param res
 */
var addRating = function(res) {
    return new Promise(function(resolve, reject) {
        var attributes = {};
        seedCourseProfessor.map(function(c_p) {
            var professor = c_p.professor;
            var course = c_p.course;
            var rating = c_p.rating;
            db.course.findOne({
                where: {
                    name: course
                }
            }).then(function(c) {
                if (c) {
                    db.professor.findOne({
                        where: {
                            name: professor
                        }
                    }).then(function(p) {
                        if (p) {
                            db.course_professor.findOne({
                                    where: {
                                        course_id: c.id,
                                        professor_id: p.id
                                    }
                                })
                                .then(function(theCourse) {
                                    attributes.rating = rating;
                                    theCourse.updateAttributes(attributes).then(function(theCourse) {});
                                });
                        } else {
                            res.status(404).send({
                                err: 'Professor Not Found  '
                            });
                        }
                    });
                } else {
                    res.status(404).send({
                        err: 'Course Not Found '
                    });
                }
            })

        });
    });
};

/**
 * Function used to link students with courses
 * return a promise
 */
var linkCourseAndStudent = function(res) {
    return new Promise(function(resolve, reject) {
        var number = seedCourseStudent.length;
        var count = 0;
        seedCourseStudent.map(function(linking) {
            var course = linking.course;
            var professor = linking.professor;
            var userName = linking.userName;
            db.user.findOne({
                where: {
                    userName: userName
                }
            }).then(function(user) {
                if (user) {
                    db.course.findOne({
                        where: {
                            name: course
                        }
                    }).then(function(course) {
                        if (course) {
                            db.professor.findOne({
                                where: {
                                    name: professor
                                }
                            }).then(function(professor) {
                                if (professor) {
                                    db.course_professor.findOne({
                                        where: {
                                            course_id: course.id,
                                            professor_id: professor.id
                                        }
                                    }).then(function(c_u) {
                                        if (c_u) {
                                            count++;
                                            user.addCourse(c_u);
                                        } else {
                                            res.status(404).send({
                                                err: "No Such Course  "
                                            });
                                        }
                                    });
                                } else {
                                    res.status(404).send({
                                        err: "Professor Not Found  "
                                    });
                                }
                            });
                        } else {
                            res.status(404).send({
                                err: "Course Not Found  "
                            });
                        }
                    });
                } else {
                    console.log(userName);
                    res.status(404).send({
                        err: "User Not Found  "
                    });
                }
            });
        });
        if (count === number) {
            resolve();
        }
    });
};

/**
 * Link user with user
 * return a promise
 */
var linkUsers = function(res) {
    return new Promise(function(resolve, reject) {
        seedFriends.map(function(linking) {
            var u_id = linking.user_id;
            var f_id = linking.friend_id;
            db.user.findById(u_id).then(function(user) {
                if (user) {
                    db.user.findById(f_id).then(function(friend) {
                        //console.log('Map ' + user.userName + ', ' + friend.userName);
                        if (friend) {
                            user.addFriend(friend);
                        } else {
                            res.status(404).send({
                                err: "Friend Not Found  "
                            });
                        }
                    });
                }
            });
        });
    });
};

/**
 * Link comments with courses
 * @param res
 */
var linkCourseAndComments = function(res) {
    return new Promise(function(resolve, reject) {
        seedCourseComment.map(function(linking) {
            var course_id = linking.course_id;
            var comment_id = linking.comment_id;
            db.course_professor.findById(course_id).then(function(course) {
                if (course) {
                    db.comment.findById(comment_id).then(function(comment) {
                        if (comment) {
                            course.addComment(comment);
                            resolve();
                        } else {
                            //	res.status(404).send({err: "Comment Not Found  "});
                            reject({
                                err: "Comment Not Found :"
                            });

                        }
                    })
                } else {
                    // res.status(404).send({
                    //     err: "Course Not Found  "
                    // });

                    reject({
                        err: "Course Not Found"
                    });
                }
            });
        });
    });
};

module.exports = router;
