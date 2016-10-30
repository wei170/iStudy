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
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var CourseService = (function () {
    function CourseService(http) {
        this.http = http;
        this.apiUrl = 'http://api.purdue.io/odata';
        this.termId = 'c543a529-fed4-4fd0-b185-bd403106b4ea';
    }
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
    CourseService.prototype.getCoursesDetails = function (courseId) {
        var filterUrl = '/Classes?$filter=Course/CourseId%20eq%20';
        var midUrl = '%20and%20Term/TermId%20eq%20';
        var expand = '&$expand=Term,Sections($expand=Meetings($expand=Instructors,Room($expand=Building)))';
        var detailedUrl = this.apiUrl + filterUrl + courseId + midUrl + this.termId + expand;
        return this.http.get(detailedUrl).map(function (res) { return res.json(); });
    };
    return CourseService;
}());
CourseService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], CourseService);
exports.CourseService = CourseService;
//# sourceMappingURL=course.service.js.map