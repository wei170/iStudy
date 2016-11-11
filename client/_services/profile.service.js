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
            "userName": "Maoxia",
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
    return ProfileService;
}());
ProfileService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ProfileService);
exports.ProfileService = ProfileService;
//# sourceMappingURL=profile.service.js.map