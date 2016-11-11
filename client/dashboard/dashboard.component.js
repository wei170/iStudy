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
var DashboardComponent = (function () {
    function DashboardComponent(userService, elementRef, authService, friendService, alertService) {
        this.userService = userService;
        this.elementRef = elementRef;
        this.authService = authService;
        this.friendService = friendService;
        this.alertService = alertService;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    DashboardComponent.prototype.ngOnInit = function () {
        this.updateMessages();
    };
    DashboardComponent.prototype.updateMessages = function () {
        var _this = this;
        this.friendService.getFriendInvitations(this.currentUser.userName).subscribe(function (data) {
            _this.friendRequests = data;
        });
    };
    DashboardComponent.prototype.ngAfterViewInit = function () {
        this.loadScript("/client/dashboard/custom-scripts.js");
    };
    DashboardComponent.prototype.logout = function () { this.authService.logout(); };
    DashboardComponent.prototype.loadScript = function (url) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        this.elementRef.nativeElement.appendChild(script);
    };
    DashboardComponent.prototype.accept = function (req) {
        var _this = this;
        this.friendService.responseToRequest(this.currentUser.userName, req.userName, 1).subscribe(function (data) {
            _this.alertService.success("Accept the friend request");
        }, function (error) {
            _this.alertService.error(error);
        });
    };
    DashboardComponent.prototype.decline = function (req) {
        var _this = this;
        this.friendService.responseToRequest(this.currentUser.userName, req.userName, -1).subscribe(function (data) {
            _this.alertService.success("Decline the friend request");
        }, function (error) {
            _this.alertService.error(error);
        });
    };
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'dashboard.component.html',
        styleUrls: [
            'custom-styles.css'
        ]
    }),
    __metadata("design:paramtypes", [index_1.UserService,
        core_1.ElementRef,
        index_1.AuthenticationService,
        index_1.FriendService,
        index_1.AlertService])
], DashboardComponent);
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map