'use strict';
var Sequelize = require('sequelize');
var mysql = require('mysql');
var bcrypt = require('bcrypt');

var env = process.env.NODE_ENV || 'development';
var db = {};
var sequelize;

// when not setup db config, like creating or define new table, set debug to be 0
//var debug = 1;
var debug = 0;


if (env == 'production') {
    // for heroku
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        //'dialect': 'postgres'
        dialect: 'mysql'
    });
} else {
    // for local
    var config = require('../config/cnf').database;
    sequelize = new Sequelize(config.database, config.uname, config.pwd, config.options);
}

// config tables
db.profile = sequelize.import(__dirname + '/models/Profile');
db.user = sequelize.import(__dirname + '/models/User');
db.professor = sequelize.import(__dirname + '/models/Professor');
db.course = sequelize.import(__dirname + '/models/Course');

// config relationships

// relationship between profile and user
db.user.hasOne(db.profile); // Will add user_id to profile model
db.profile.belongsTo(db.user, {foreignKey: 'user_id'});

db.course.belongsToMany(db.professor, {through: 'course_professor'});
db.professor.belongsToMany(db.course, {through: 'course_professor'});

console.log('User associations: ', Object.keys(db.user.associations));
console.log('Profile associations: ', Object.keys(db.profile.associations));
console.log('Course associations: ', Object.keys(db.course.associations));
console.log('Professor associations: ', Object.keys(db.professor.associations));

db.sequelize = sequelize;

// init all the tables
if (debug){
	db.sequelize
		.query('SET FOREIGN_KEY_CHECKS = 0', {raw: true})
		.then(function(results) {
			db.sequelize.sync({force: true});
		});
    // db.sequelize.sync({force: true}).then();
}
else {
    db.sequelize.sync().then();
}


module.exports = db;


//db.todo = sequelize.import(__dirname + '/models/todo.js');
//db.todo.belongsTo(db.user);
//db.user.hasMany(db.todo);
