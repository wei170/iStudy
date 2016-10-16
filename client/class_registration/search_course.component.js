"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var index_1 = require('../_services/index');
var index_2 = require('../_services/index');
var SearchCourseComponent = (function () {
    function SearchCourseComponent(router, alertService, courseService) {
        this.router = router;
        this.alertService = alertService;
        this.courseService = courseService;
        this.model = {};
        this.step = 0;
        this.majors = [
            { value: "CS", display: "CS" },
            { value: "MGMT", display: "MGMT" },
            { value: "OBHR", display: "OBHR" },
            { value: "MATH", display: "MATH" },
            { value: "PHYS", display: "PHYS" }
        ];
        this.courses = [];
        this.course = {};
    }
    SearchCourseComponent.prototype.ngOnInit = function () { };
    SearchCourseComponent.prototype.searchCourse = function () {
        var _this = this;
        if (this.step === 0) {
            this.courseService.searchMajor(this.model.major)
                .subscribe(function (data) {
                // successfully search the course
                _this.step = 1;
                console.log(JSON.stringify(data));
                for (var i = 0; i < data.length; i++) {
                    _this.courses.push(data[i]);
                }
            }, function (error) {
                _this.alertService.error(error);
            });
        }
        else if (this.step === 1) {
            this.courseService.searchCourse(this.model.courseName)
                .subscribe(function (data) {
                _this.step = 2;
                _this.course = data;
            }, function (error) {
                _this.alertService.error(error);
            });
        }
    };
    SearchCourseComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'search_course.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, index_1.AlertService, index_2.CourseService])
    ], SearchCourseComponent);
    return SearchCourseComponent;
}());
exports.SearchCourseComponent = SearchCourseComponent;
//# sourceMappingURL=search_course.component.js.map