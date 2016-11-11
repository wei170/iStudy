'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var _ = require('underscore');
var bcrypt = require('bcrypt');
var db = require('./db');
var http = require('http').Server(express);
var io = require('socket.io')(http);
var moment = require('moment');
//~(˘▾˘~)
var cool = require('cool-ascii-faces');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine("html", require("ejs").__express);
app.set('view engine', 'html');



var clientInfo = {};

// Sends current users to provided socket
function sendCurrentUsers(socket) {
    var info = clientInfo[socket.id];
    var users = [];

    if (typeof info === 'undefined') {
        return;
    }

    Object.keys(clientInfo).forEach(function(socketId) {
        var userInfo = clientInfo[socketId];

        if (info.room === userInfo.room) {
            users.push(userInfo.name);
        }
    });

    socket.emit('message', {
        name: 'System',
        text: 'Current users: ' + users.join(', '),
        timestamp: moment().valueOf()
    });
}

io.on('connection', function(socket) {
    console.log('User connected via socket.io!');

    socket.on('disconnect', function() {
        var userData = clientInfo[socket.id];

        if (typeof userData !== 'undefined') {
            socket.leave(userData.room);
            io.to(userData.room).emit('message', {
                name: 'System',
                text: userData.name + ' has left!',
                timestamp: moment().valueOf()
            });
            delete clientInfo[socket.id];
        }
    });

    socket.on('joinRoom', function(req) {
        clientInfo[socket.id] = req;
        socket.join(req.room);
        socket.broadcast.to(req.room).emit('message', {
            name: 'System',
            text: req.name + ' has joined!',
            timestamp: moment().valueOf()
        });
        socket.emit('message', {
            name: 'System',
            text: 'Welcome to the iStudy chat room:' + req.room,
            timestamp: moment().valueOf()
        });

        //sendHistory();

    });

    socket.on('message', function(message) {
        console.log('Message received: ' + message.text);

        if (message.text === '@currentUsers') {
            sendCurrentUsers(socket);
        } else {
            var currentMessage = clientInfo[clientInfo[socket.id].room];
            // currentMessage.
            // currentMessage.text=message.text;
            // currentMessage.timestamp=moment().valueOf();
            message.timestamp = moment().valueOf();
            io.to(clientInfo[socket.id].room).emit('message', message);
        }
    });

    // timestamp property - JavaScript timestamp (milliseconds)


});


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './')));

//set up routes
var routes = require('./routes/index');
var users = require('./routes/users');
var api = require('./routes/api');
var profile = require('./routes/profile');
var course = require('./routes/course');

app.use('/users', users);
app.use('/api', api);
app.use('/profile', profile);
app.use('/course', course);
app.use('/', routes);


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

module.exports = app;
