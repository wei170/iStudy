var express = require('express');
var db = require('../db');
var cool = require('cool-ascii-faces');
var app = require('../app');
var admins = require('../models/admin');
var seedUsers = require('../models/seedUser');

var router = express.Router();
var id;

/* Run Api Scripts*/
router.get('/users', function (req, res) {
    db.user.findAll({ where: {id: {gt: 0}}}).then(function (user) {
        res.json(user);
    });
});

/**
 * Insert Admins to db
 */
router.post('/admins', function (req, res) {
    insertData(insertNewUser, admins, showPage, res, 'admin');
});

/**
 * Seed database
 */
router.post('/seeds', function (req, res) {
    insertData(insertNewUser, seedUsers, showPage, res, 'seed');
});

/**
 * Function used to insert data to db
 * @param insertFunction: insert function
 * @param data: chunk of data to be inserted
 * @param callback: callback function
 * @param res: response
 * @param page: html source page name
 */
var insertData = function(insertFunction, data, callback, res, page){
    if (typeof insertFunction === "function" && typeof callback === "function"){
        // insert data
        data.forEach(function (d) {
            insertFunction(d);
        });
        // show page
        callback(res, page);
    }
};

/**
 * Function showing responding page to users
 * @param res: response
 * @param page: html source page name
 */
var showPage = function(res, page){
    var emoji = cool();
    res.render(page, { emoji: emoji });
};

/**
 * Function used to insert a new user as well as a profile of that user
 * @param user: user to be inserted
 */
var insertNewUser = function (user){
    db.user.create(user).then(function (user) {
        id = user.id;
        // init profile for new user
        db.profile.create({user_id: id});
    })
};

module.exports = router;