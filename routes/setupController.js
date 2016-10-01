var seedUsers = require('../models/seedUser');
var db = require('../db');
var cool = require('cool-ascii-faces');

module.exports = function (app) {
    app.get('/api/seeds', function (req, res) {
        //seed database
        db.connection.sync({force:true}).then(function () {
            return db.user.bulkCreate(seedUsers);
        }).catch(function (err) {
            console.log(err);
        });
        var emoji = cool();
        res.render('seed', { emoji: emoji });
    });
};