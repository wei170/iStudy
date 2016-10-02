var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
var sequelize;
if (env == 'production') {
    // for heroku
    console.log('here');
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        'dialect': 'postgres'
    });
} else {
    //for local
    console.log('local');
    sequelize = new Sequelize(undefined, undefined, undefined, {
        'dialect': 'sqlite', //database type
        'storage': __dirname + '/database/users.sqlite' //storage location
    });
}


// var sequelize = new Sequelize(undefined,undefined,undefined,{
//   'dialect' : 'sqlite',//database type
//   'storage' : __dirname + '/data/dev-todo-api.sqlite' //storage location
// });
var db = {};


//db.todo = sequelize.import(__dirname + '/models/todo.js');
db.user = sequelize.import(__dirname + '/models/user.js');
db.sequelize = sequelize;
//db.todo.belongsTo(db.user);
//db.user.hasMany(db.todo);
db.Sequelize = Sequelize;
module.exports = db;
