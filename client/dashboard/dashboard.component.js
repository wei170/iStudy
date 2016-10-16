/// <reference path="../../typings/jquery/jquery.d.ts" />
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
var index_1 = require('../_services/index');
var DashboardComponent = (function () {
    function DashboardComponent(userService, elementRef) {
        this.userService = userService;
        this.elementRef = elementRef;
        this.currentUser = {};
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    DashboardComponent.prototype.ngOnInit = function () {
        //called after the constructor and called  after the first ngOnChanges()
    };
    DashboardComponent.prototype.ngAfterViewInit = function () {
        this.loadScript("/feature content/assets/js/jquery-1.10.2.js");
        this.loadScript("/feature content/assets/js/bootstrap.min.js");
        this.loadScript("/feature content/assets/js/jquery.metisMenu.js");
        this.loadScript("/feature content/assets/js/morris/raphael-2.1.0.min.js");
        this.loadScript("/feature content/assets/js/morris/morris.js");
        this.loadScript("/feature content/assets/js/custom-scripts.js");
    };
    DashboardComponent.prototype.loadScript = function (url) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        this.elementRef.nativeElement.appendChild(script);
    };
    DashboardComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'dashboard.component.html',
            styleUrls: [
                '/feature\ content/assets/js/morris/morris-0.4.3.min.css',
                '/feature\ content/assets/css/custom-styles.css'
            ]
        }), 
        __metadata('design:paramtypes', [index_1.UserService, core_1.ElementRef])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map