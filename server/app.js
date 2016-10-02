var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');

var PORT = process.env.PORT || 6000;

var app = express();
//newley installed
var _ = require('underscore');
var bcrypt = require('bcrypt');
var db = require('./db.js');
//var middleware = require('./middleware.js')(db);

app.set('port', PORT);
//sync sqlize
// db.sequelize.sync({
//     force: true
// });
// view engine setup
// app.engine("html", require("ejs").__express); // or   app.engine("html",require("ejs").renderFile);
// //app.set("view engine","ejs");
// app.set('view engine', 'html');
// app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.set('views', path.join(__dirname, '../public/'));
app.engine("html", require("ejs").__express);
app.set('view engine', 'html');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../')));


//set route
app.use('/', routes);
app.use('/users', users);

// app.use('/client', express.static(path.join(__dirname, '../client')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

db.sequelize.sync({force:true}).then(function() {

});

module.exports = app;
