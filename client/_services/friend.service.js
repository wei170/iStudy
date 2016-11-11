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
var FriendService = (function () {
    function FriendService(http) {
        this.http = http;
        this.headers = new http_1.Headers();
        this.headers.append('Auth', localStorage.getItem('token'));
    }
    // get friend list
    FriendService.prototype.getFriends = function (username) {
        var url = 'users/get-friends';
        var body = { "userName": username };
        return this.http.post(url, body, { headers: this.headers }).map(function (res) { return res.json(); });
    };
    // send friend request
    FriendService.prototype.sendFriendReq = function (senderName, receiverName) {
        var url = 'users/send-friend-request';
        var body = { "senderName": senderName, "receiverName": receiverName };
        return this.http.post(url, body, { headers: this.headers }).map(function (res) { return res.json(); });
    };
    // get friend requests
    FriendService.prototype.getFriendReq = function (username) {
        var url = 'users/get-friend-requests';
        var body = { "userName": username };
        return this.http.post(url, body, { headers: this.headers }).map(function (res) { return res.json(); });
    };
    // get friend invitations
    FriendService.prototype.getFriendInvitations = function (username) {
        var url = 'users/get-friend-invitations';
        var body = { "userName": username };
        return this.http.post(url, body, { headers: this.headers }).map(function (res) { return res.json(); });
    };
    // Accept Or Decline Request
    // need to update info of status code
    FriendService.prototype.responseToRequest = function (user, sender, status_code) {
        var url = 'users/invitation-accept-or-not';
        var body = { "sender": sender, "receiver": user, "status_code": status_code };
        return this.http.post(url, body, { headers: this.headers }).map(function (res) { return res.json(); });
    };
    return FriendService;
}());
FriendService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], FriendService);
exports.FriendService = FriendService;
//# sourceMappingURL=friend.service.js.map