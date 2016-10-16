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
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
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
        __metadata('design:paramtypes', [http_1.Http])
    ], PasswordService);
    return PasswordService;
}());
exports.PasswordService = PasswordService;
//# sourceMappingURL=password.service.js.map