'use strict';
var Sequelize = require('sequelize');
var mysql = require('mysql');
var bcrypt = require('bcrypt');

var env = process.env.NODE_ENV || 'development';
var db = {};
var sequelize;


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
    sequelize = new Sequelize(
        config.database,
        config.uname,
        config.pwd,
        config.options
    );
}

db.user = sequelize.import(__dirname + '/models/User');
//db.profile = sequelize.import(__dirname + '/models/Profile');
db.sequelize = sequelize;
// init all the tables
db.sequelize.sync({force: true}).then();
module.exports = db;


// var sequelize = new Sequelize(undefined,undefined,undefined,{
//   'dialect' : 'sqlite',//database type
//   'storage' : __dirname + '/data/dev-todo-api.sqlite' //storage location
// });

//db.todo = sequelize.import(__dirname + '/models/todo.js');
//db.todo.belongsTo(db.user);
//db.user.hasMany(db.todo);
