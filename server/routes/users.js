var express = require('express');
var router = express.Router();
var db = require(__dirname + '/../db.js');
var _ = require('underscore');
/* GET users listing. */
router.post('/', function(req, res, next) {
    console.log('-=-=------');
    var body = _.pick(req.body, 'email', 'password');

    db.user.create(body).then(function(user) {
        res.json(user.toPublicJSON());
    }, function(e) {
        res.status(400).json(e);
    });

    // console.log('heere');
    // res.status(200).send();
});

module.exports = router;
