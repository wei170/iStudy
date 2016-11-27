webpackJsonpac__name_([1],{

/***/ "./src/app/_services/alert.service.ts":
/***/ function(module, exports) {

"use strict";
"use strict";
var AlertService = (function () {
    function AlertService() {
    }
    AlertService.prototype.ngOnInit = function () {
    };
    AlertService.prototype.success = function (message) {
        Messenger().post({
            message: message,
            type: 'success',
            showCloseButton: true
        });
        return false;
    };
    AlertService.prototype.error = function (message) {
        var i;
        Messenger().run({
            errorMessage: message,
            action: function (opts) {
                if (++i < 3) {
                    return opts.error({
                        status: 500,
                        readyState: 0,
                        responseText: 0
                    });
                }
                else {
                    return opts.success();
                }
            }
        });
        return false;
    };
    AlertService.prototype.info = function (message) {
        var msg = Messenger().post({
            message: 'Launching thermonuclear war...',
            actions: {
                cancel: {
                    label: 'cancel launch',
                    action: function () {
                        return msg.update({
                            message: 'Thermonuclear war averted',
                            type: 'success',
                            actions: false
                        });
                    }
                }
            }
        });
        return false;
    };
    return AlertService;
}());
exports.AlertService = AlertService;


/***/ },

/***/ "./src/app/_services/authentication.service.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var http_1 = __webpack_require__("./node_modules/@angular/http/index.js");
var AuthenticationService = (function () {
    function AuthenticationService(http) {
        this.http = http;
    }
    AuthenticationService.prototype.login = function (email, password) {
        var url = 'users/login';
        var body = { "email": email, "password": password };
        return this.http.post(url, body)
            .map(function (response) {
            if (response.status < 200 || response.status >= 300) {
                response.json();
            }
            else {
                // login successful if there's a jwt token in the response
                var user = response.json();
                // console.log(response.headers.get('Auth'));
                if (user) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    localStorage.setItem('token', response.headers.get('Auth'));
                }
            }
        });
    };
    AuthenticationService.prototype.logout = function () {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
    };
    AuthenticationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object])
    ], AuthenticationService);
    return AuthenticationService;
    var _a;
}());
exports.AuthenticationService = AuthenticationService;


/***/ },

/***/ "./src/app/_services/classroom.service.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var http_1 = __webpack_require__("./node_modules/@angular/http/index.js");
var ClassroomService = (function () {
    function ClassroomService(http) {
        this.http = http;
        this.headers = new http_1.Headers();
        this.headers.append('Auth', localStorage.getItem('token'));
    }
    /**
     * JSON Format:
     * {
     * 	"userName": "..."
     * 	}
     */
    ClassroomService.prototype.getUserCourseList = function () {
        var url = '/course/get-class-list';
        var userName = JSON.parse(localStorage.getItem('currentUser')).userName;
        var body = { "userName": userName };
        return this.http.post(url, body, { headers: this.headers }).map(function (res) { return res.json(); });
    };
    /**
     * JSON Format:
     * {
     * 	"course": "course name"
     * 	"professor": "professor name"
     * }
     */
    ClassroomService.prototype.getAllStudents = function (courseName, professor) {
        var url = '/course/get-class-list';
        var userName = JSON.parse(localStorage.getItem('currentUser')).userName;
        var body = { "course": courseName, "professor": professor };
        return this.http.post(url, body, { headers: this.headers }).map(function (res) { return res.json(); });
    };
    ClassroomService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object])
    ], ClassroomService);
    return ClassroomService;
    var _a;
}());
exports.ClassroomService = ClassroomService;


/***/ },

/***/ "./src/app/_services/course.service.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var http_1 = __webpack_require__("./node_modules/@angular/http/index.js");
__webpack_require__("./node_modules/rxjs/add/operator/map.js");
var CourseService = (function () {
    function CourseService(http) {
        this.http = http;
        this.apiUrl = 'https://api.purdue.io/odata';
        this.termId = 'c543a529-fed4-4fd0-b185-bd403106b4ea';
    }
    /**************************************************
     * 				Class Searching
     **************************************************/
    CourseService.prototype.getAllMajors = function () {
        var filterUrl = '/Subjects/?$filter=(Courses/any(c:%20c/Classes/any(cc:%20cc/Term/TermId%20eq%20';
        var abbrOrder = ')))&$orderby=Abbreviation%20asc';
        var detailedUrl = this.apiUrl + filterUrl + this.termId + abbrOrder;
        return this.http.get(detailedUrl).map(function (res) { return res.json(); });
    };
    CourseService.prototype.getMajorCourses = function (majorId) {
        // todo: need to change later
        var filterUrl = '/Courses/?$filter=(Classes/any(c:%20c/Term/TermId%20eq%20';
        var major = '))%20and%20Subject/SubjectId%20eq%20' + majorId;
        var order = '&$orderby=Number%20asc';
        var detailedUrl = this.apiUrl + filterUrl + this.termId + major + order;
        return this.http.get(detailedUrl).map(function (res) { return res.json(); });
    };
    //
    // getCoursesDetails(courseId: string) {
    //     var filterUrl = '/Classes?$filter=Course/CourseId%20eq%20';
    //     var midUrl = '%20and%20Term/TermId%20eq%20';
    //     var expand = '&$expand=Term,Sections($expand=Meetings($expand=Instructors,Room($expand=Building)))';
    //     var detailedUrl = this.apiUrl + filterUrl + courseId + midUrl + this.termId + expand;
    //     return this.http.get(detailedUrl)
    //         .map((res: Response) => res.json());
    // }
    /**************************************************
     * 				Classrooms
     **************************************************/
    /**
    * Join a class
    * JSON Format:
    * {
    * 	"course": "...",
    * 	"professor": "...",
    * 	"userName": "..."
    * }
    */
    CourseService.prototype.joinClass = function (courseName, professor, userName) {
        var url = '/course/join';
        var body = { "course": courseName, "professor": professor, "userName": userName };
        var headers = new http_1.Headers();
        headers.append('Auth', localStorage.getItem('token'));
        return this.http.post(url, body, { headers: headers }).map(function (res) { return res.json(); });
    };
    CourseService.prototype.getCourseDetails = function (courseName) {
        var url = '/course';
        var body = { "course": courseName };
        var headers = new http_1.Headers();
        headers.append('Auth', localStorage.getItem('token'));
        return this.http.post(url, body, { headers: headers }).map(function (res) { return res.json(); });
    };
    CourseService.prototype.getStudents = function (courseName, professor) {
        var url = '/course/students';
        var body = { "course": courseName, "professor": professor };
        var headers = new http_1.Headers();
        headers.append('Auth', localStorage.getItem('token'));
        return this.http.post(url, body, { headers: headers }).map(function (res) { return res.json(); });
    };
    CourseService.prototype.getNumOfStudents = function (courseName, professor) {
        var url = '/course/number-of-students';
        var body = { "course": courseName, "professor": professor };
        var headers = new http_1.Headers();
        headers.append('Auth', localStorage.getItem('token'));
        return this.http.post(url, body, { headers: headers }).map(function (res) { return res.json(); });
    };
    CourseService.prototype.getRMP = function (courseName, professor) {
        var url = '/course/get-RMP';
        var body = { "course": courseName, "professor": professor };
        var headers = new http_1.Headers();
        headers.append('Auth', localStorage.getItem('token'));
        return this.http.post(url, body, { headers: headers }).map(function (res) { return res.json(); });
    };
    CourseService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object])
    ], CourseService);
    return CourseService;
    var _a;
}());
exports.CourseService = CourseService;


/***/ },

/***/ "./src/app/_services/friend.service.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var http_1 = __webpack_require__("./node_modules/@angular/http/index.js");
__webpack_require__("./node_modules/rxjs/add/operator/map.js");
var FriendService = (function () {
    function FriendService(http) {
        this.http = http;
        this.headers = new http_1.Headers();
        this.headers.append('Auth', localStorage.getItem('token'));
    }
    // get friend list
    FriendService.prototype.getFriends = function (username) {
        var url = 'users/get-friends';
        var body = { "userName": username };
        return this.http.post(url, body, { headers: this.headers }).map(function (res) { return res.json(); });
    };
    // send friend request
    FriendService.prototype.sendFriendReq = function (senderName, receiverName) {
        var url = 'users/send-friend-request';
        var body = { "senderName": senderName, "receiverName": receiverName };
        return this.http.post(url, body, { headers: this.headers }).map(function (res) { return res.json(); });
    };
    // get friend requests
    FriendService.prototype.getFriendReq = function (username) {
        var url = 'users/get-friend-requests';
        var body = { "userName": username };
        return this.http.post(url, body, { headers: this.headers }).map(function (res) { return res.json(); });
    };
    // get friend invitations
    FriendService.prototype.getFriendInvitations = function (username) {
        var url = 'users/get-friend-invitations';
        var body = { "userName": username };
        return this.http.post(url, body, { headers: this.headers }).map(function (res) { return res.json(); });
    };
    // Accept Or Decline Request
    // need to update info of status code
    FriendService.prototype.responseToRequest = function (user, sender, status_code) {
        var url = 'users/invitation-accept-or-not';
        var body = { "sender": sender, "receiver": user, "status_code": status_code };
        return this.http.post(url, body, { headers: this.headers }).map(function (res) { return res.json(); });
    };
    /**
    * JSON Format: {
    * 		"userName": "...",
    * 		"course": "...",
    * 		"professor": "...",
    * 		"preference" : {
    * 			"nationality": "...",
    * 			"hobby": "...",
    * 			"language": "..."
    * 		}
    */
    FriendService.prototype.filterStudents = function (preference, userName, course, professor) {
        var url = 'users/find-friends';
        var body = {
            "userName": userName,
            "course": course,
            "professor": professor,
            "preference": preference
        };
        return this.http.post(url, body, { headers: this.headers }).map(function (res) { return res.json(); });
    };
    FriendService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object])
    ], FriendService);
    return FriendService;
    var _a;
}());
exports.FriendService = FriendService;


/***/ },

/***/ "./src/app/_services/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/app/_services/authentication.service.ts"));
__export(__webpack_require__("./src/app/_services/user.service.ts"));
__export(__webpack_require__("./src/app/_services/alert.service.ts"));
__export(__webpack_require__("./src/app/_services/profile.service.ts"));
__export(__webpack_require__("./src/app/_services/course.service.ts"));
__export(__webpack_require__("./src/app/_services/password.service.ts"));
__export(__webpack_require__("./src/app/_services/rmp.service.ts"));
__export(__webpack_require__("./src/app/_services/friend.service.ts"));
__export(__webpack_require__("./src/app/_services/classroom.service.ts"));


/***/ },

/***/ "./src/app/_services/password.service.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var http_1 = __webpack_require__("./node_modules/@angular/http/index.js");
__webpack_require__("./node_modules/rxjs/add/operator/map.js");
var PasswordService = (function () {
    function PasswordService(http) {
        this.http = http;
    }
    PasswordService.prototype.verificationCheck = function (model) {
        var url = '/users/checkcode';
        var body = {
            "email": model.email,
            "verificationcode": model.verificationcode
        };
        return this.http.post(url, body);
    };
    PasswordService.prototype.forgotPassword = function (model) {
        var _this = this;
        var url = '/users/reset?email=' + model.email;
        var body = {
            "email": model.email
        };
        return this.http.post(url, body)
            .map(function (res) { return _this.extractData(res); });
    };
    PasswordService.prototype.resetPassword = function (model) {
        var _this = this;
        var url = '/users/newpassword';
        var body = {
            "email": model.email,
            "newpassword": model.newpassword
        };
        return this.http.put(url, body)
            .map(function (res) { return _this.extractData(res); });
    };
    PasswordService.prototype.extractData = function (res) {
        var body = res.json();
        localStorage.setItem('profile', JSON.stringify(body));
        return body.data || {};
    };
    PasswordService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object])
    ], PasswordService);
    return PasswordService;
    var _a;
}());
exports.PasswordService = PasswordService;


/***/ },

/***/ "./src/app/_services/profile.service.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var http_1 = __webpack_require__("./node_modules/@angular/http/index.js");
__webpack_require__("./node_modules/rxjs/add/operator/map.js");
var ProfileService = (function () {
    function ProfileService(http) {
        this.http = http;
    }
    /**
    * JSON Format: {
    * 		"userName": "...",
    * }
    */
    ProfileService.prototype.getProfile = function (userName) {
        var profileUrl = '/profile';
        var body = { "userName": userName };
        var headers = new http_1.Headers();
        headers.append('Auth', localStorage.getItem('token'));
        return this.http.post(profileUrl, body, {
            headers: headers
        })
            .map(function (res) { return res.json(); });
    };
    /**
     * JSON Format: {
     * 		"userName": "...",
     * 		"major": "...",
     * 		"language": "...",
     * 		"birthday": "...",
     *		"hobby": "...",
     * 		"visibility": "..."
     * }
     */
    ProfileService.prototype.editProfile = function (userName, profile) {
        var url = '/profile/update';
        var headers = new http_1.Headers();
        headers.append('Auth', localStorage.getItem('token'));
        var body = {
            "userName": userName,
            "major": profile.profile.major,
            "visibility": profile.profile.visibility,
            "birthday": profile.profile.birthday,
            "gender": profile.profile.gender,
            "nation": profile.profile.nationality,
            "language": profile.extra.language,
            "hobby": profile.extra.hobby
        };
        console.log(body);
        return this.http.post(url, body, {
            headers: headers
        })
            .map(function (res) { return res.json(); });
    };
    ProfileService.prototype.getAllLanguages = function () {
        var url = '/profile/languages';
        var headers = new http_1.Headers();
        headers.append('Auth', localStorage.getItem('token'));
        return this.http.get(url, { headers: headers }).map(function (res) { return res.json(); });
    };
    ProfileService.prototype.getAllHobbies = function () {
        var url = '/profile/hobbies';
        var headers = new http_1.Headers();
        headers.append('Auth', localStorage.getItem('token'));
        return this.http.get(url, { headers: headers }).map(function (res) { return res.json(); });
    };
    ProfileService.prototype.getAllMajors = function () {
        var apiUrl = 'http://api.purdue.io/odata';
        var termId = 'c543a529-fed4-4fd0-b185-bd403106b4ea';
        var filterUrl = '/Subjects/?$filter=(Courses/any(c:%20c/Classes/any(cc:%20cc/Term/TermId%20eq%20';
        var abbrOrder = ')))&$orderby=Abbreviation%20asc';
        var detailedUrl = apiUrl + filterUrl + termId + abbrOrder;
        return this.http.get(detailedUrl).map(function (res) { return res.json(); });
    };
    ProfileService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object])
    ], ProfileService);
    return ProfileService;
    var _a;
}());
exports.ProfileService = ProfileService;


/***/ },

/***/ "./src/app/_services/rmp.service.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var http_1 = __webpack_require__("./node_modules/@angular/http/index.js");
__webpack_require__("./node_modules/rxjs/add/operator/map.js");
var RMPService = (function () {
    function RMPService(http) {
        this.http = http;
    }
    RMPService.prototype.getProfessorInfo = function (name) {
        var rmp_url = 'https://api.morph.io/chrisguags/ratemyprofessors/data.json';
        var params = {
            // Keep this key secret!
            key: 'xABz9pgTrRX6JVP6fGfI',
            query: "select * from 'data' where College = 'Purdue' and Name = '" + name + "'"
        };
        return this.http.get(rmp_url + '?' + $.param(params)).map(function (response) { return response.json(); });
    };
    RMPService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object])
    ], RMPService);
    return RMPService;
    var _a;
}());
exports.RMPService = RMPService;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/jquery/dist/jquery.js")))

/***/ },

/***/ "./src/app/_services/user.service.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var http_1 = __webpack_require__("./node_modules/@angular/http/index.js");
var UserService = (function () {
    function UserService(http) {
        this.http = http;
    }
    UserService.prototype.create = function (user) {
        return this.http.post('/users/', user).map(function (response) { return response.json(); });
    };
    UserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object])
    ], UserService);
    return UserService;
    var _a;
}());
exports.UserService = UserService;


/***/ },

/***/ "./src/app/login/forgot_password.component.html":
/***/ function(module, exports) {

module.exports = "<div class=\"container\">\n\t<main id=\"content\" class=\"widget-login-container\" role=\"main\">\n\t<div class=\"row\">\n\t\t<div class=\"col-xl-4 col-md-6 col-xs-10 offset-xl-4 offset-md-3 offset-xs-1\">\n\t\t\t<h5 class=\"widget-login-logo animated fadeInUp\">\n\t\t\t\t<i class=\"fa fa-circle text-warning\"></i>\n\t\t\t\tiStudy\n\t\t\t\t<i class=\"fa fa-circle text-warning\"></i>\n\t\t\t</h5>\n\t\t\t<section class=\"widget widget-login animated fadeInUp\">\n\t\t\t\t<header>\n\t\t\t\t\t<h3>Reset Password</h3>\n\t\t\t\t</header>\n\t\t\t\t<div class=\"widget-body\">\n\n\t\t\t\t\t<form class=\"login-form mt-lg\" (ngSubmit)=\"f.form.valid && forgotPassword()\" #f=\"ngForm\" novalidate>\n\t\t\t\t\t\t<div class=\"form-group\" *ngIf=\"!sent && !verified\">\n\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" name=\"email\" [(ngModel)]=\"model.email\" placeholder=\"Email\" required>\n                            <div *ngIf=\"f.submitted && !email\" class=\"help-block\">email is required</div>\n\t\t\t\t\t\t</div>\n\n                        <div class=\"form-group\" *ngIf=\"sent\">\n\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" name=\"email\" disabled=\"disabled\" id=\"disabled-input\" placeholder=\"{{model.email}}\" required>\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t<div class=\"form-group\" *ngIf=\"sent && !verified\">\n\t\t\t\t\t\t\t<input class=\"form-control\" type=\"text\" name=\"password\" [(ngModel)]=\"model.verificationcode\" placeholder=\"Your Verification Code In Your Email\" required>\n                            <div *ngIf=\"f.submitted && !verificationcode\" class=\"help-block\">code is required</div>\n\t\t\t\t\t\t</div>\n\n                        <div class=\"form-group\" *ngIf=\"verified\">\n\t\t\t\t\t\t\t<input class=\"form-control\" type=\"password\" name=\"newpassword\" [(ngModel)]=\"model.newpassword\" placeholder=\"New Password\" required>\n                            <div *ngIf=\"f.submitted && !newpassword\" class=\"help-block\">password is required</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"clearfix\">\n\t\t\t\t\t\t\t<div class=\"btn-toolbar pull-xs-right m-t-1\">\n\t\t\t\t\t\t\t\t<button [disabled]=\"loading\" class=\"btn btn-inverse btn-sm\" type=\"submit\">Submit</button>\n\t\t\t\t\t\t\t\t<img *ngIf=\"loading\" src=\"data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==\" />\n\t\t\t\t\t\t\t\t<button [routerLink]=\"['/login']\" class=\"btn btn-default btn-sm\">\n\t\t\t\t\t\t\t\t\tBack\n\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"row m-t-1\">\n                            <div class=\"col-md-6 pull-md-6\"></div>\n\t\t\t\t\t\t\t<div class=\"col-md-6 pull-md-6\">\n\t\t\t\t\t\t\t\t<a class=\"mr-n-lg\" [routerLink]=\"['/login/register']\">Don't have an account?</a>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</form>\n\t\t\t\t</div>\n\t\t\t</section>\n\t\t</div>\n\t</div>\n\t</main>\n\t<footer class=\"page-footer\">\n\t\t2016 &copy; iStudy Team\n\t</footer>\n</div>"

/***/ },

/***/ "./src/app/login/forgot_password.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/index.js");
var index_1 = __webpack_require__("./src/app/_services/index.ts");
var ForgotPassword = (function () {
    function ForgotPassword(router, passwordService, alertService) {
        this.router = router;
        this.passwordService = passwordService;
        this.alertService = alertService;
        this.model = {
            "email": "",
            "verificationcode": "",
            "newpassword": ""
        };
        this.sent = false;
        this.verified = false;
        this.loading = false;
    }
    ForgotPassword.prototype.ngOnInit = function () { };
    ForgotPassword.prototype.forgotPassword = function () {
        var _this = this;
        if (!this.sent) {
            this.passwordService.forgotPassword(this.model)
                .subscribe(function (data) {
                _this.sent = true;
                _this.loading = false;
                _this.alertService.success("Sent verification code to your email!");
            }, function (error) {
                _this.alertService.error(error);
            });
        }
        else if (this.sent && !this.verified) {
            this.passwordService.verificationCheck(this.model)
                .subscribe(function (data) {
                _this.verified = true;
                _this.loading = false;
                _this.alertService.success("Reset your password");
            }, function (error) {
                _this.alertService.error(error);
            });
        }
        else {
            this.passwordService.resetPassword(this.model)
                .subscribe(function (data) {
                _this.loading = false;
                _this.alertService.success("Successfully reset the password!");
                _this.router.navigate(['/login']);
            });
        }
    };
    ForgotPassword = __decorate([
        core_1.Component({
            moduleId: module.i,
            template: __webpack_require__("./src/app/login/forgot_password.component.html"),
            styles: [__webpack_require__("./src/app/login/login.style.scss")],
            encapsulation: core_1.ViewEncapsulation.None,
            host: {
                class: 'login-page app'
            }
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object, (typeof (_b = typeof index_1.PasswordService !== 'undefined' && index_1.PasswordService) === 'function' && _b) || Object, (typeof (_c = typeof index_1.AlertService !== 'undefined' && index_1.AlertService) === 'function' && _c) || Object])
    ], ForgotPassword);
    return ForgotPassword;
    var _a, _b, _c;
}());
exports.ForgotPassword = ForgotPassword;


/***/ },

/***/ "./src/app/login/login.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/index.js");
var index_1 = __webpack_require__("./src/app/_services/index.ts");
var Login = (function () {
    function Login(router, authenticationService, alertService) {
        this.router = router;
        this.authenticationService = authenticationService;
        this.alertService = alertService;
        this.model = {};
        this.loading = false;
    }
    Login.prototype.ngOnInit = function () {
        // reset login status
        this.authenticationService.logout();
    };
    Login.prototype.login = function () {
        var _this = this;
        this.loading = true;
        this.authenticationService.login(this.model.email, this.model.password)
            .subscribe(function (data) {
            _this.router.navigate(['/app/dashboard']);
        }, function (error) {
            _this.alertService.error(error);
            _this.loading = false;
        });
    };
    Login = __decorate([
        core_1.Component({
            selector: 'login',
            styles: [__webpack_require__("./src/app/login/login.style.scss")],
            template: __webpack_require__("./src/app/login/login.template.html"),
            encapsulation: core_1.ViewEncapsulation.None,
            host: {
                class: 'login-page app'
            }
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object, (typeof (_b = typeof index_1.AuthenticationService !== 'undefined' && index_1.AuthenticationService) === 'function' && _b) || Object, (typeof (_c = typeof index_1.AlertService !== 'undefined' && index_1.AlertService) === 'function' && _c) || Object])
    ], Login);
    return Login;
    var _a, _b, _c;
}());
exports.Login = Login;


/***/ },

/***/ "./src/app/login/login.module.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var common_1 = __webpack_require__("./node_modules/@angular/common/index.js");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/index.js");
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/index.js");
var login_component_1 = __webpack_require__("./src/app/login/login.component.ts");
var register_component_1 = __webpack_require__("./src/app/login/register.component.ts");
var forgot_password_component_1 = __webpack_require__("./src/app/login/forgot_password.component.ts");
var index_1 = __webpack_require__("./src/app/_services/index.ts");
exports.routes = [
    { path: '', component: login_component_1.Login, pathMatch: 'full' },
    { path: 'register', component: register_component_1.Register },
    { path: 'reset', component: forgot_password_component_1.ForgotPassword }
];
var LoginModule = (function () {
    function LoginModule() {
    }
    LoginModule.routes = exports.routes;
    LoginModule = __decorate([
        core_1.NgModule({
            declarations: [
                login_component_1.Login,
                register_component_1.Register,
                forgot_password_component_1.ForgotPassword
            ],
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                router_1.RouterModule.forChild(exports.routes),
            ],
            providers: [
                index_1.AlertService,
                index_1.AuthenticationService,
                index_1.UserService,
                index_1.PasswordService
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], LoginModule);
    return LoginModule;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LoginModule;


/***/ },

/***/ "./src/app/login/login.style.scss":
/***/ function(module, exports) {

module.exports = "/***********************************/\n/**             LOGIN             **/\n/***********************************/\n.login-page {\n  background-color: #ddd; }\n\n.login-page .page-footer {\n  margin-bottom: 25px;\n  font-size: 13px;\n  color: #818a91;\n  text-align: center; }\n  @media (min-height: 600px) {\n    .login-page .page-footer {\n      position: absolute;\n      bottom: 0;\n      left: 0;\n      right: 0; } }\n\n.widget-login-container {\n  padding-top: 10%; }\n\n.widget-login-logo {\n  margin-top: 15px;\n  margin-bottom: 15px;\n  text-align: center;\n  font-weight: 400; }\n  .widget-login-logo .fa-circle {\n    font-size: 13px;\n    margin: 0 20px; }\n\n.widget-login {\n  padding: 30px; }\n  .widget-login > header h1, .widget-login > header h2, .widget-login > header h3, .widget-login > header h4, .widget-login > header h5, .widget-login > header h6 {\n    font-weight: 400;\n    text-align: center; }\n\n.widget-login-info {\n  font-size: 13px;\n  color: #888;\n  margin-top: 1px;\n  margin-bottom: 0;\n  text-align: center; }\n  .widget-login-info.abc-checkbox {\n    margin-left: -25px; }\n\n.login-form .form-control {\n  font-size: 13px;\n  border: none;\n  background-color: #eceeef; }\n  .login-form .form-control:focus {\n    background-color: #ddd; }\n"

/***/ },

/***/ "./src/app/login/login.template.html":
/***/ function(module, exports) {

module.exports = "<div class=\"container\">\r\n\t<main id=\"content\" class=\"widget-login-container\" role=\"main\">\r\n\t<div class=\"row\">\r\n\t\t<div class=\"col-xl-4 col-md-6 col-xs-10 offset-xl-4 offset-md-3 offset-xs-1\">\r\n\t\t\t<h5 class=\"widget-login-logo animated fadeInUp\">\r\n\t\t\t\t<i class=\"fa fa-circle text-gray\"></i>\r\n\t\t\t\tiStudy\r\n\t\t\t\t<i class=\"fa fa-circle text-warning\"></i>\r\n\t\t\t</h5>\r\n\t\t\t<section class=\"widget widget-login animated fadeInUp\">\r\n\t\t\t\t<header>\r\n\t\t\t\t\t<h3>Login to iStudy</h3>\r\n\t\t\t\t</header>\r\n\t\t\t\t<div class=\"widget-body\">\r\n\r\n\t\t\t\t\t<form class=\"login-form mt-lg\" (ngSubmit)=\"f.form.valid && login()\" #f=\"ngForm\" novalidate>\r\n\t\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" id=\"exampleInputEmail1\" name=\"email\" [(ngModel)]=\"model.email\"placeholder=\"Email\" required>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t\t<input class=\"form-control\" id=\"pswd\" type=\"password\" name=\"password\" [(ngModel)]=\"model.password\" placeholder=\"Password\" required>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"clearfix\">\r\n\t\t\t\t\t\t\t<div class=\"btn-toolbar pull-xs-right m-t-1\">\r\n\t\t\t\t\t\t\t\t<button [disabled]=\"loading\" class=\"btn btn-inverse btn-sm\" (click)=\"login()\">Login</button>\r\n\t\t\t\t\t\t\t\t<img *ngIf=\"loading\" src=\"data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==\" />\r\n\t\t\t\t\t\t\t\t<button [routerLink]=\"['/login/reset']\" class=\"btn btn-default btn-sm\">\r\n\t\t\t\t\t\t\t\t\tReset Password\r\n\t\t\t\t\t\t\t\t</button>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"row m-t-1\">\r\n\t\t\t\t\t\t\t<div class=\"col-md-6 push-md-6\">\r\n\t\t\t\t\t\t\t\t<div class=\"clearfix\">\r\n\t\t\t\t\t\t\t\t\t<div class=\"abc-checkbox widget-login-info pull-xs-right\">\r\n\t\t\t\t\t\t\t\t\t\t<input type=\"checkbox\" id=\"checkbox1\" value=\"1\">\r\n\t\t\t\t\t\t\t\t\t\t<label for=\"checkbox1\">Keep me signed in </label>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t<div class=\"col-md-6 pull-md-6\">\r\n\t\t\t\t\t\t\t\t<a class=\"mr-n-lg\" [routerLink]=\"['/login/register']\">Don't have an account?</a>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</form>\r\n\t\t\t\t</div>\r\n\t\t\t</section>\r\n\t\t</div>\r\n\t</div>\r\n\t</main>\r\n\t<footer class=\"page-footer\">\r\n\t\t2016 &copy; iStudy Team\r\n\t</footer>\r\n</div>\r\n"

/***/ },

/***/ "./src/app/login/register.component.html":
/***/ function(module, exports) {

module.exports = "<div class=\"container\">\n\t<main id=\"content\" class=\"widget-login-container\" role=\"main\">\n\t<div class=\"row\">\n\t\t<div class=\"col-xl-4 col-md-6 col-xs-10 offset-xl-4 offset-md-3 offset-xs-1\">\n\t\t\t<h5 class=\"widget-login-logo animated fadeInUp\">\n\t\t\t\t<i class=\"fa fa-circle text-warning\"></i>\n\t\t\t\tiStudy\n\t\t\t\t<i class=\"fa fa-circle text-grey\"></i>\n\t\t\t</h5>\n\t\t\t<section class=\"widget widget-login animated fadeInUp\">\n\t\t\t\t<header>\n\t\t\t\t\t<h3>Create an Account</h3>\n\t\t\t\t</header>\n\t\t\t\t<div class=\"widget-body\">\n\t\t\t\t\t<form class=\"login-form mt-lg\" (ngSubmit)=\"f.form.valid && register()\" #f=\"ngForm\" novalidate>\n\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" name=\"email\" [(ngModel)]=\"model.userName\" placeholder=\"Username\" required>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" id=\"exampleInputEmail1\" name=\"email\" [(ngModel)]=\"model.email\" placeholder=\"Email\" required>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t<input class=\"form-control\" id=\"pswd\" type=\"password\" name=\"password\" [(ngModel)]=\"model.password\" placeholder=\"Password\" required>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"clearfix\">\n\t\t\t\t\t\t\t<div class=\"btn-toolbar pull-xs-right m-t-1\">\n\t\t\t\t\t\t\t\t<button [disabled]=\"loading\" class=\"btn btn-inverse btn-sm\" (click)=\"register()\">Register</button>\n\t\t\t\t\t\t\t\t<img *ngIf=\"loading\" src=\"data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==\" />\n\t\t\t\t\t\t\t\t<button [routerLink]=\"['/login']\" class=\"btn btn-default btn-sm\">\n\t\t\t\t\t\t\t\t\tLogin\n\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</form>\n\t\t\t\t</div>\n\t\t\t</section>\n\t\t</div>\n\t</div>\n\t</main>\n\t<footer class=\"page-footer\">\n\t\t2016 &copy; iStudy Team\n\t</footer>\n</div>\n"

/***/ },

/***/ "./src/app/login/register.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/index.js");
var index_1 = __webpack_require__("./src/app/_services/index.ts");
var Register = (function () {
    function Register(router, userService, alertService) {
        this.router = router;
        this.userService = userService;
        this.alertService = alertService;
        this.model = {};
        this.loading = false;
    }
    Register.prototype.register = function () {
        var _this = this;
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(function (data) {
            // set success message and pass true paramater to persist the message after redirecting to the login page
            _this.alertService.success('Registration successful', true);
            _this.router.navigate(['/login']);
        }, function (error) {
            _this.alertService.error(error);
            _this.loading = false;
        });
    };
    Register = __decorate([
        core_1.Component({
            selector: 'register',
            moduleId: module.i,
            template: __webpack_require__("./src/app/login/register.component.html"),
            styles: [__webpack_require__("./src/app/login/login.style.scss")],
            encapsulation: core_1.ViewEncapsulation.None,
            host: {
                class: 'login-page app'
            }
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object, (typeof (_b = typeof index_1.UserService !== 'undefined' && index_1.UserService) === 'function' && _b) || Object, (typeof (_c = typeof index_1.AlertService !== 'undefined' && index_1.AlertService) === 'function' && _c) || Object])
    ], Register);
    return Register;
    var _a, _b, _c;
}());
exports.Register = Register;


/***/ }

});
//# sourceMappingURL=1.map