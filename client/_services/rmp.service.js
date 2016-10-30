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
var RMP = require("rmp-api");
require("rxjs/add/operator/map");
var RMPService = (function () {
    function RMPService(rmp) {
        this.rmp = rmp;
    }
    RMPService.prototype.getProfessorInfo = function (name) {
        var callback = function (professor) {
            if (professor === null) {
                console.log("No professor found.");
                return;
            }
            console.log("Name: " + professor.fname + " " + professor.lname);
            console.log("University: " + professor.university);
            console.log("Quality: " + professor.quality);
            console.log("Easiness: " + professor.easiness);
            console.log("Helpfulness: " + professor.help);
            console.log("Average Grade: " + professor.grade);
            console.log("Chili: " + professor.chili);
            console.log("URL: " + professor.url);
            console.log("First comment: " + professor.comments[0]);
        };
        this.rmp.get(name, callback);
        return callback;
    };
    return RMPService;
}());
RMPService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof RMP !== "undefined" && RMP) === "function" && _a || Object])
], RMPService);
exports.RMPService = RMPService;
var _a;
//# sourceMappingURL=rmp.service.js.map