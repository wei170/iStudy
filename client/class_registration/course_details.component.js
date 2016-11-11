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
var CourseDetailsComponent = (function () {
    function CourseDetailsComponent(courseService, alertService) {
        this.courseService = courseService;
        this.alertService = alertService;
        this.courseName = this.major + this.courseNumber;
    }
    CourseDetailsComponent.prototype.joinClass = function (professor) {
        var _this = this;
        var userName = JSON.parse(localStorage.getItem('currentUser')).userName;
        this.courseService.joinClass(this.courseName, professor, userName).subscribe(function (data) {
            _this.alertService.success("Sucessfully join the class!");
        }, function (err) {
            _this.alertService.error(err);
        });
    };
    return CourseDetailsComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], CourseDetailsComponent.prototype, "major", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], CourseDetailsComponent.prototype, "courseNumber", void 0);
CourseDetailsComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'courseDetails',
        templateUrl: 'course_details.component.html',
        inputs: ['sections']
    }),
    __metadata("design:paramtypes", [index_1.CourseService,
        index_1.AlertService])
], CourseDetailsComponent);
exports.CourseDetailsComponent = CourseDetailsComponent;
//# sourceMappingURL=course_details.component.js.map