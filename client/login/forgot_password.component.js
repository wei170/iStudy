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
var ForgotPasswordComponent = (function () {
    function ForgotPasswordComponent(router, passwordService, alertService) {
        this.router = router;
        this.passwordService = passwordService;
        this.alertService = alertService;
        this.model = {};
        this.sent = false;
        this.verified = false;
    }
    ForgotPasswordComponent.prototype.ngOnInit = function () { };
    ForgotPasswordComponent.prototype.forgotPassword = function () {
        var _this = this;
        if (!this.sent) {
            this.passwordService.forgotPassword(this.model)
                .subscribe(function (data) {
                _this.sent = true;
                _this.alertService.success("Sent verification code to your email!");
            }, function (error) {
                _this.alertService.error(error);
            });
        }
        else if (this.sent && !this.verified) {
            this.passwordService.verificationCheck(this.model)
                .subscribe(function (data) {
                _this.verified = true;
                _this.alertService.success("Reset your password");
            }, function (error) {
                _this.alertService.error(error);
            });
        }
        else {
            this.passwordService.resetPassword(this.model)
                .subscribe(function (data) {
                _this.alertService.success("Successfully reset the password!");
                _this.router.navigate(['/']);
            });
        }
    };
    ForgotPasswordComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'forgot_password.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, index_1.PasswordService, index_1.AlertService])
    ], ForgotPasswordComponent);
    return ForgotPasswordComponent;
}());
exports.ForgotPasswordComponent = ForgotPasswordComponent;
//# sourceMappingURL=forgot_password.component.js.map