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
        this.courseNames = [
            { value: "CS", display: "CS" },
            { value: "MGMT", display: "MGMT" },
            { value: "OBHR", display: "OBHR" },
            { value: "MATH", display: "MATH" },
            { value: "PHYS", display: "PHYS" }
        ];
    }
    SearchCourseComponent.prototype.ngOnInit = function () { };
    SearchCourseComponent.prototype.searchCourse = function () {
        var _this = this;
        this.courseService.searchCourse(this.model)
            .subscribe(function (data) {
            // successfully search the course
            _this.router.navigate(['/class_registration']);
        }, function (error) {
            _this.alertService.error(error);
            _this.loading = false;
        });
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