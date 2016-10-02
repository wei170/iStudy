'use strict';
var Sequelize = require('sequelize');
var mysql = require('mysql');
var bcrypt = require('bcrypt');

var env = process.env.NODE_ENV || 'development';
var db = {};
var sequelize;
var debug = 1;


if (env == 'production') {
    // for heroku
    console.log('here');
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        //'dialect': 'postgres'
        dialect: 'mysql'
    });
} else {
    // for local
    var config = require('./config/cnf').database;
    sequelize = new Sequelize(config.database, config.uname, config.pwd, config.options);
}

// config tables
db.user = sequelize.import(__dirname + '/models/User');
db.profile = sequelize.import(__dirname + '/models/Profile');

// config relationships
db.user.hasOne(db.profile, {
    // foreignKey: 'pid',
    as: 'user_profile'
});
db.profile.belongsTo(db.user);
db.sequelize = sequelize;


// init all the tables
if (debug){
    db.sequelize.sync({force: true}).then();
}
else {
    db.sequelize.sync().then();
}


module.exports = db;


//db.todo = sequelize.import(__dirname + '/models/todo.js');
//db.todo.belongsTo(db.user);
//db.user.hasMany(db.todo);
