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
var router_1 = require("@angular/router");
var index_1 = require("../_services/index");
var index_2 = require("../dashboard/index");
var index_3 = require("./index");
var EditProfileComponent = (function () {
    function EditProfileComponent(router, userService, profileService, alertService, userProfile, dashboardComponent) {
        this.router = router;
        this.userService = userService;
        this.profileService = profileService;
        this.alertService = alertService;
        this.userProfile = userProfile;
        this.dashboardComponent = dashboardComponent;
        this.currentUser = {};
        this.profile = {};
        this.model = {};
        this.visibilities = [
            { value: true, display: "Public" },
            { value: false, display: "Private" }
        ];
        this.currentUser = this.userProfile.currentUser;
        this.profile = this.dashboardComponent.currentUser;
    }
    EditProfileComponent.prototype.ngOnInit = function () { };
    EditProfileComponent.prototype.editProfile = function () {
        var _this = this;
        this.profileService.editProfile(this.model)
            .subscribe(function (data) {
            // successfully edit the profile
            _this.alertService.success('Successfully edit the profile');
            _this.router.navigate(['/dashboard/myprofile']);
        }, function (error) {
            _this.alertService.error(error);
        });
    };
    return EditProfileComponent;
}());
EditProfileComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'editProfile.component.html'
    }),
    __metadata("design:paramtypes", [router_1.Router,
        index_1.UserService,
        index_1.ProfileService,
        index_1.AlertService,
        index_3.MyProfileComponent,
        index_2.DashboardComponent])
], EditProfileComponent);
exports.EditProfileComponent = EditProfileComponent;
//# sourceMappingURL=editProfile.component.js.map