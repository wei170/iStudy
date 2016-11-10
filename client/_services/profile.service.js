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
    ProfileService.prototype.editProfile = function (model) {
        var url = '/profile/update';
        var headers = new http_1.Headers();
        headers.append('Auth', localStorage.getItem('token'));
        var body = {
            "major": model.major,
            "language": model.language,
            "birthday": model.birthday,
            "hobby": model.hobby,
            "visibility": model.visibility
        };
        console.log(body);
        return this.http.post(url, body, {
            headers: headers
        })
            .map(function (res) { return res.json(); });
    };
    return ProfileService;
}());
ProfileService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ProfileService);
exports.ProfileService = ProfileService;
//# sourceMappingURL=profile.service.js.map