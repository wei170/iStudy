webpackJsonpac__name_([29],{

/***/ "./src/app/classroom/classroom.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var index_1 = __webpack_require__("./src/app/_services/index.ts");
var Classroom = (function () {
    function Classroom(classroomService, profileService, alertService, courseService, friendService) {
        this.classroomService = classroomService;
        this.profileService = profileService;
        this.alertService = alertService;
        this.courseService = courseService;
        this.friendService = friendService;
        this.hasInClass = false;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.roomInfo = {};
        this.languages = [];
        // private majors: any[] = [];
        this.hobbies = [];
        this.preference = {
            "nationality": "",
            "hobby": "",
            "language": ""
        };
    }
    Classroom.prototype.ngOnInit = function () {
        this.getEnrolledClasses();
        this.getAllChoices();
    };
    Classroom.prototype.getEnrolledClasses = function () {
        var _this = this;
        this.classroomService.getUserCourseList().subscribe(function (data) {
            _this.userClasses = data.courses;
        });
    };
    Classroom.prototype.getAllStudents = function () {
        var _this = this;
        this.courseService.getStudents(this.roomInfo.course, this.roomInfo.professor).subscribe(function (data) {
            _this.studentList = data;
        });
    };
    Classroom.prototype.getAllChoices = function () {
        var _this = this;
        this.profileService.getAllLanguages().subscribe(function (data) {
            _this.languages = data;
        });
        this.profileService.getAllHobbies().subscribe(function (data) {
            _this.hobbies = data;
        });
    };
    Classroom.prototype.filterStudents = function () {
        var _this = this;
        this.friendService.filterStudents(this.preference, this.currentUser.userName, this.roomInfo.course, this.roomInfo.professor)
            .subscribe(function (data) {
            _this.studentList = data;
        });
    };
    Classroom.prototype.getNumOfStudents = function () {
        var _this = this;
        this.courseService.getNumOfStudents(this.roomInfo.course, this.roomInfo.professor).subscribe(function (data) {
            _this.numOfStudents = data.number;
        });
    };
    Classroom.prototype.chat = function () {
        this.chatUrl = "/chat.html?name=" + this.currentUser.userName + "&room=" + this.roomInfo.course;
    };
    Classroom.prototype.update = function (room) {
        this.roomInfo = room;
        this.getAllStudents();
        this.getNumOfStudents();
        this.hasInClass = true;
    };
    Classroom.prototype.sendRequest = function (reciever) {
        var _this = this;
        this.friendService.sendFriendReq(this.currentUser.userName, reciever).subscribe(function (data) {
            _this.alertService.success("Sent Request!");
        }, function (error) {
            _this.alertService.error(error);
        });
    };
    Classroom = __decorate([
        core_1.Component({
            selector: '[classroom]',
            moduleId: module.i,
            template: __webpack_require__("./src/app/classroom/classroom.template.html"),
            encapsulation: core_1.ViewEncapsulation.None,
            styles: [__webpack_require__("./src/assets/semantic/src/semantic.less")]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof index_1.ClassroomService !== 'undefined' && index_1.ClassroomService) === 'function' && _a) || Object, (typeof (_b = typeof index_1.ProfileService !== 'undefined' && index_1.ProfileService) === 'function' && _b) || Object, (typeof (_c = typeof index_1.AlertService !== 'undefined' && index_1.AlertService) === 'function' && _c) || Object, (typeof (_d = typeof index_1.CourseService !== 'undefined' && index_1.CourseService) === 'function' && _d) || Object, (typeof (_e = typeof index_1.FriendService !== 'undefined' && index_1.FriendService) === 'function' && _e) || Object])
    ], Classroom);
    return Classroom;
    var _a, _b, _c, _d, _e;
}());
exports.Classroom = Classroom;


/***/ },

/***/ "./src/app/classroom/classroom.module.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var common_1 = __webpack_require__("./node_modules/@angular/common/index.js");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/index.js");
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/index.js");
var classroom_component_1 = __webpack_require__("./src/app/classroom/classroom.component.ts");
var index_1 = __webpack_require__("./src/app/_services/index.ts");
exports.routes = [
    { path: '', component: classroom_component_1.Classroom, pathMatch: 'full' }
];
var FormModule = (function () {
    function FormModule() {
    }
    FormModule.routes = exports.routes;
    FormModule = __decorate([
        core_1.NgModule({
            declarations: [
                // Components / Directives/ Pipes
                classroom_component_1.Classroom
            ],
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                router_1.RouterModule.forChild(exports.routes),
            ],
            providers: [
                index_1.ClassroomService,
                index_1.CourseService,
                index_1.AlertService,
                index_1.FriendService,
                index_1.ProfileService
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], FormModule);
    return FormModule;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FormModule;


/***/ },

/***/ "./src/app/classroom/classroom.template.html":
/***/ function(module, exports) {

module.exports = "<ol class=\"breadcrumb\">\n\t<li class=\"breadcrumb-item\">YOU ARE HERE</li>\n\t<li class=\"active breadcrumb-item\">Classroom</li>\n</ol>\n<h1 class=\"page-title\">Classroom</h1>\n\n<div class=\"col-lg-6 col-xs-12\">\n\t<div class=\"clearfix\">\n\t\t<ul class=\"nav nav-tabs pull-xs-left\" id=\"myTab\" role=\"tablist\" *ngFor=\"let room of userClasses\">\n\t\t\t<li class=\"nav-item\">\n\t\t\t\t<a (click)=\"update(room)\" aria-controls=\"basic\" aria-expanded=\"true\" class=\"nav-link\" data-toggle=\"tab\" href=\"#basic\" id=\"home-tab\" role=\"tab\">{{room.course}}</a>\n\t\t\t</li>\n\t\t</ul>\n\t</div>\n\t<div *ngIf=\"hasInClass\" class=\"tab-content mb-lg\" id=\"myTabContent\">\n\t\t<div aria-expanded=\"true\" aria-labelledby=\"basic-tab\" class=\"tab-pane clearfix active\" id=\"basic\" role=\"tabpanel\">\n\t\t\t<h4>Numbers Of Classmates: {{numOfStudents}}</h4>\n\t\t\t<div class=\"form-group\">\n\n\t\t\t\t<label>Search Friends By</label>\n\n\t\t\t\t<div class=\"checkbox\">\n\n\t\t\t\t\t<label>\n\t\t\t\t\t\t<input class=\"form-control\" placeholder=\"Nationality:\"[(ngModel)]=\"preference.nationality\" type=\"text\" name=\"nationality\">\n\t\t\t\t\t</label>\n\n\t\t\t\t\t<label>\n\t\t\t\t\t\tLanguage:\n\t\t\t\t\t\t<select class=\"selectpicker\" [(ngModel)]=\"preference.language\" name=\"language\" required>\n\t\t\t\t\t\t\t<option *ngFor=\"let language of languages\" [ngValue]=\"language.name\">\n\t\t\t\t\t\t\t{{language.name}}\n\t\t\t\t\t\t\t</option>\n\t\t\t\t\t\t</select>\n\t\t\t\t\t</label>\n\n\n\t\t\t\t\t<label>\n\t\t\t\t\t\tHobby:\n\t\t\t\t\t\t<select class=\"selectpicker\" [(ngModel)]=\"preference.hobby\" name=\"hobby\" required>\n\t\t\t\t\t\t\t<option *ngFor=\"let hobby of hobbies\" [ngValue]=\"hobby.name\">\n\t\t\t\t\t\t\t{{hobby.name}}\n\t\t\t\t\t\t\t</option>\n\t\t\t\t\t\t</select>\n\t\t\t\t\t</label>\n\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class = \"form-group\">\n\n\t\t\t\t<button (click)=\"filterStudents()\" >Search</button>\n\n\t\t\t</div>\n\n\t\t\t<div class=\"list-group\">\n\t\t\t\t<button class=\"list-group-item\" *ngFor=\"let student of studentList\">\n\t\t\t\t\t{{student.userName}}\n\t\t\t\t\t{{student.email}}\n\t\t\t\t\t<button class=\"fa fa-plus\" (click)=\"sendRequest(student.userName)\" aria-hidden=\"true\"></button>\n\t\t\t\t</button>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>"

/***/ },

/***/ "./src/assets/semantic/src/semantic.less":
/***/ function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/walterwei/Desktop/iStudy/src/assets/semantic/src/semantic.less'\n    at Error (native)");

/***/ }

});
//# sourceMappingURL=29.map