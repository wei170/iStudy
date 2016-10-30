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
var core_1 = require("@angular/core");
var index_1 = require("../_services/index");
var SearchCourseComponent = (function () {
    function SearchCourseComponent(alertService, courseService) {
        this.alertService = alertService;
        this.courseService = courseService;
        this.model = {};
        this.step = 0;
        this.majors = [];
        this.courses = [];
        this.sections = [];
    }
    SearchCourseComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.courseService.getAllMajors().subscribe(function (data) {
            // successfully search all majors
            for (var i = 0; i < data.value.length; i++) {
                _this.majors.push(data.value[i]);
            }
        });
    };
    SearchCourseComponent.prototype.searchCourse = function () {
        var _this = this;
        if (this.step === 0) {
            this.courseService.getMajorCourses(this.model.majorId).subscribe(function (data) {
                _this.step = 1;
                for (var i = 0; i < data.value.length; i++) {
                    _this.courses.push(data.value[i]);
                }
            }, function (error) {
                _this.alertService.error(error);
            });
        }
        else if (this.step === 1) {
            this.courseService.getCoursesDetails(this.model.courseId).subscribe(function (data) {
                _this.step = 2;
                for (var i = 0; i < data.value[0].Sections.length; i++) {
                    _this.sections.push(data.value[0].Sections[i]);
                }
            }, function (error) {
                _this.alertService.error(error);
            });
        }
    };
    // private rmpHandler(professor: string) {
    //     this.professorInfo = this.rmp.getProfessorInfo(professor);
    //     return this.professorInfo;
    // }
    SearchCourseComponent.prototype.back = function () {
        this.step--;
        this.courses = [];
    };
    return SearchCourseComponent;
}());
SearchCourseComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'search_course.component.html'
    }),
    __metadata("design:paramtypes", [index_1.AlertService,
        index_1.CourseService])
], SearchCourseComponent);
exports.SearchCourseComponent = SearchCourseComponent;
//# sourceMappingURL=search_course.component.js.map