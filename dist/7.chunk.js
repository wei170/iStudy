webpackJsonpac__name_([7],{

/***/ "./src/app/profile/profile.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var index_1 = __webpack_require__("./src/app/_services/index.ts");
var Profile = (function () {
    function Profile(alertService, profileService, friendService, popupService) {
        this.alertService = alertService;
        this.profileService = profileService;
        this.friendService = friendService;
        this.popupService = popupService;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.newlanguage = {};
        this.newhobby = {};
        this.myProfile = {
            "extra": {
                "language": [],
                "hobby": []
            },
            "profile": {
                "major": "Unknown",
                "birthday": "",
                "nationality": "Unknown",
                "gender": "Unknown",
                "visibility": true,
            }
        };
        this.visibilities = [
            { value: true, display: "Public" },
            { value: false, display: "Private" }
        ];
        this.toEdit = false;
    }
    /* My Profile */
    Profile.prototype.ngOnInit = function () {
        this.getAllChoices();
        this.fetchProfile();
        this.fetchFriendList();
    };
    /**************** Get Basic Info **************/
    Profile.prototype.fetchProfile = function () {
        var _this = this;
        this.profileService.getProfile(this.currentUser.userName, this.currentUser.userName)
            .subscribe(function (data) {
            _this.myProfile = data;
            // console.log(this.myProfile.profile.major);
        }, function (error) {
            _this.alertService.error(JSON.parse(error._body).err);
        });
    };
    Profile.prototype.fetchFriendList = function () {
        var _this = this;
        this.friendService.getFriends(this.currentUser.userName).subscribe(function (data) {
            _this.friendList = data;
        });
    };
    Profile.prototype.getAllChoices = function () {
        var _this = this;
        this.profileService.getAllLanguages().subscribe(function (data) {
            _this.languages = data;
        });
        this.profileService.getAllHobbies().subscribe(function (data) {
            _this.hobbies = data;
        });
        this.profileService.getAllMajors().subscribe(function (data) {
            _this.majors = data.value;
        });
    };
    /**************** Method-kind *****************/
    /* Edit Profile */
    Profile.prototype.editProfile = function () {
        var _this = this;
        if (this.newlanguage.name)
            this.myProfile.extra.language.push(this.newlanguage);
        if (this.newhobby.name)
            this.myProfile.extra.hobby.push(this.newhobby);
        this.profileService.editProfile(this.currentUser.userName, this.myProfile)
            .subscribe(function (data) {
            // successfully edit the profile
            _this.toEdit = false;
            _this.alertService.success('Successfully edit the profile');
            _this.fetchProfile();
        }, function (error) {
            _this.alertService.error(JSON.parse(error._body).err);
        });
    };
    Profile.prototype.edit = function () {
        this.toEdit = true;
    };
    Profile.prototype.cancelEdit = function () {
        this.toEdit = false;
    };
    Profile.prototype.unFollow = function (victim) {
        var _this = this;
        this.friendService.unFriend(this.currentUser.userName, victim).subscribe(function (data) {
            _this.alertService.successWT("Unfollow", "Successfully unfollow" + victim);
            _this.fetchFriendList();
        }, function (err) {
            console.log(err);
            _this.alertService.error(err);
        });
    };
    Profile.prototype.pop = function (userName) {
        this.popupService.popUser(userName);
    };
    Profile = __decorate([
        core_1.Component({
            selector: '[profile]',
            moduleId: module.i,
            template: __webpack_require__("./src/app/profile/profile.template.html"),
            encapsulation: core_1.ViewEncapsulation.None,
            styles: [__webpack_require__("./src/app/profile/profile.style.scss")]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof index_1.AlertService !== 'undefined' && index_1.AlertService) === 'function' && _a) || Object, (typeof (_b = typeof index_1.ProfileService !== 'undefined' && index_1.ProfileService) === 'function' && _b) || Object, (typeof (_c = typeof index_1.FriendService !== 'undefined' && index_1.FriendService) === 'function' && _c) || Object, (typeof (_d = typeof index_1.PopupService !== 'undefined' && index_1.PopupService) === 'function' && _d) || Object])
    ], Profile);
    return Profile;
    var _a, _b, _c, _d;
}());
exports.Profile = Profile;


/***/ },

/***/ "./src/app/profile/profile.module.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var common_1 = __webpack_require__("./node_modules/@angular/common/index.js");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/index.js");
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/index.js");
var profile_component_1 = __webpack_require__("./src/app/profile/profile.component.ts");
exports.routes = [
    { path: '', component: profile_component_1.Profile, pathMatch: 'full' }
];
var FormModule = (function () {
    function FormModule() {
    }
    FormModule.routes = exports.routes;
    FormModule = __decorate([
        core_1.NgModule({
            declarations: [
                // Components / Directives/ Pipes
                profile_component_1.Profile
            ],
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                router_1.RouterModule.forChild(exports.routes),
            ],
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], FormModule);
    return FormModule;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FormModule;


/***/ },

/***/ "./src/app/profile/profile.style.scss":
/***/ function(module, exports) {

module.exports = "/***********************************/\n/**          Post Links           **/\n/***********************************/\n.post-links {\n  margin-bottom: 0;\n  font-size: 0.875rem;\n  padding-left: 0; }\n  .post-links::after {\n    content: \"\";\n    display: table;\n    clear: both; }\n  .post-links > li {\n    float: left;\n    list-style: none; }\n    .post-links > li + li:before {\n      color: #999;\n      content: \"\\25cf\";\n      padding: 0 8px; }\n    .post-links > li > a {\n      text-decoration: none;\n      color: #999999; }\n      .post-links > li > a:hover {\n        color: #999999; }\n  .post-links.no-separator > li + li {\n    margin-left: 12px; }\n    .post-links.no-separator > li + li:before {\n      content: normal; }\n\n/***********************************/\n/**          Post Comments           **/\n/***********************************/\n.post-comments {\n  font-size: 0.875rem;\n  padding-left: 0; }\n  .post-comments::after {\n    content: \"\";\n    display: table;\n    clear: both; }\n  .post-links + .post-comments {\n    margin-top: 0.5rem; }\n  .post-comments > li {\n    padding: 10px;\n    border-top: 1px solid #e7e7e7;\n    list-style: none; }\n    .post-comments > li::after {\n      content: \"\";\n      display: table;\n      clear: both; }\n    .post-comments > li:last-child {\n      padding-bottom: 0; }\n  .post-comments p:last-child {\n    margin-bottom: 0; }\n  .post-comments .avatar {\n    margin-top: 1px; }\n  .post-comments .author {\n    margin-top: 0;\n    margin-bottom: 2px;\n    color: #7ca9dd; }\n  .post-comments .comment-body {\n    overflow: auto; }\n  .post-comments h6.author > small {\n    font-size: 11px; }\n  .widget > footer .post-comments {\n    margin-left: -20px;\n    margin-right: -20px; }\n\n/***********************************/\n/**           Post User           **/\n/***********************************/\n.post-user {\n  position: relative; }\n  .post-user::after {\n    content: \"\";\n    display: table;\n    clear: both; }\n  .post-user img {\n    border: 3px solid white; }\n\n/***********************************/\n/**           Profile             **/\n/***********************************/\n.user-profile .label {\n  padding: 5px; }\n\n.post-user-profile {\n  margin-top: -75px; }\n  .post-user-profile .contacts {\n    display: block;\n    margin-top: 25px;\n    margin-left: -10px;\n    margin-right: -10px;\n    padding-left: 0;\n    text-align: center; }\n    .post-user-profile .contacts > li {\n      display: inline-block;\n      line-height: 2.2;\n      list-style: none;\n      text-align: left;\n      margin: 0 10px; }\n      @media (min-width: 992px) {\n        .post-user-profile .contacts > li {\n          width: 150px;\n          white-space: nowrap; } }\n      .post-user-profile .contacts > li > a {\n        color: #a2a2a2;\n        text-decoration: none; }\n        .post-user-profile .contacts > li > a:hover, .post-user-profile .contacts > li > a:focus {\n          color: #555555; }\n    .post-user-profile .contacts .fa {\n      font-size: 1.25rem;\n      vertical-align: middle; }\n\n.stats-row-profile .stat-item {\n  border-left: 0;\n  padding-left: 15px;\n  text-align: center; }\n  @media (min-width: 992px) {\n    .stats-row-profile .stat-item {\n      padding-right: 0; } }\n  .stats-row-profile .stat-item .value {\n    font-size: 28px;\n    font-weight: 300; }\n\n.activities h3 {\n  margin-left: 20px; }\n\n.activities .event {\n  margin-top: 1rem;\n  width: 100%; }\n\n.event {\n  background: #fff;\n  border-radius: 0.25rem;\n  padding: 20px 20px 0;\n  position: relative; }\n  .event .post-comments {\n    margin-left: -20px;\n    margin-right: -20px; }\n  .event > footer {\n    margin: 20px -20px 0;\n    padding: 10px 20px;\n    border-bottom-left-radius: 0.25rem;\n    border-bottom-right-radius: 0.25rem;\n    background-color: #f3f3f3; }\n    .event > footer::after {\n      content: \"\";\n      display: table;\n      clear: both; }\n    .event > footer .thumb {\n      margin-left: 10px; }\n\n.event-heading {\n  margin: 0 0 2px;\n  font-weight: 600; }\n  .event-heading > a {\n    text-decoration: none;\n    color: #7ca9dd; }\n  .event-heading > small {\n    font-weight: 600; }\n    .event-heading > small > a {\n      text-decoration: none;\n      color: #999999; }\n\n.event-map {\n  display: block;\n  height: 200px;\n  margin: 0 -20px -20px;\n  overflow: visible !important; }\n\n.event-image {\n  margin: 0 -20px -20px;\n  max-height: 260px;\n  overflow: hidden; }\n  .event-image > img {\n    max-width: 100%; }\n"

/***/ },

/***/ "./src/app/profile/profile.template.html":
/***/ function(module, exports) {

module.exports = "<ol class=\"breadcrumb\">\r\n\t<li class=\"breadcrumb-item\">YOU ARE HERE</li>\r\n\t<li class=\"active breadcrumb-item\">Profile</li>\r\n</ol>\r\n<h1 class=\"page-title\">User - <span class=\"fw-semi-bold\">Profile</span></h1>\r\n<div grid>\r\n\t<div class=\"row profile\" grid-demo>\r\n\t\t<!--<div class=\"col-lg-6 col-xs-12\">\r\n\t\t<section class=\"widget\">\r\n\t\t\t<div class=\"widget-body\">\r\n\t\t\t\t<div class=\"widget-top-overflow text-white\">\r\n\t\t\t\t\t<div class=\"height-250 overflow-hidden\">\r\n\t\t\t\t\t\t<img class=\"img-fluid\" src=\"assets/img/pictures/19.jpg\">\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class=\"btn-toolbar\">\r\n\t\t\t\t\t\t<a href=\"#\" class=\"btn btn-outline btn-sm pull-right\">\r\n\t\t\t\t\t\t\t<i class=\"fa fa-twitter mr-xs\"></i>\r\n\t\t\t\t\t\t\tFollow\r\n\t\t\t\t\t\t</a>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class=\"row\">\r\n\t\t\t\t\t<div class=\"col-md-5 col-xs-12 text-xs-center\">\r\n\t\t\t\t\t\t<div class=\"post-user post-user-profile\">\r\n\t\t\t\t\t\t\t<span class=\"thumb-xlg\">\r\n\t\t\t\t\t\t\t\t<img class=\"img-circle\" src=\"assets/img/people/a5.jpg\" alt=\"...\">\r\n\t\t\t\t\t\t\t</span>\r\n\t\t\t\t\t\t\t<h5 class=\"fw-normal\"><span class=\"fw-semi-bold\">{{currentUser.userName}}</span></h5>\r\n\t\t\t\t\t\t\t<p>UI/UX designer</p>\r\n\t\t\t\t\t\t\t<a href=\"#\" class=\"btn btn-danger btn-sm mt\">\r\n\t\t\t\t\t\t\t\t&nbsp;Send\r\n\t\t\t\t\t\t\t\t<i class=\"fa fa-envelope ml-xs\"></i>&nbsp;\r\n\t\t\t\t\t\t\t</a>\r\n\t\t\t\t\t\t\t<ul class=\"contacts\">\r\n\t\t\t\t\t\t\t\t<li><i class=\"fa fa-phone fa-fw mr-xs\"></i><a href=\"#\"> +375 29 555-55-55</a></li>\r\n\t\t\t\t\t\t\t\t<li><i class=\"fa fa-envelope fa-fw mr-xs\"></i><a href=\"#\"> {{currentUser.email}} </a></li>\r\n\t\t\t\t\t\t\t\t<li><i class=\"fa fa-map-marker fa-fw mr-xs\"></i><a href=\"#\"> West Lafayette, IN </a></li>\r\n\t\t\t\t\t\t\t</ul>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class=\"col-md-7 col-xs-12\">\r\n\t\t\t\t\t\t<div class=\"stats-row stats-row-profile mt text-xs-right\">\r\n\t\t\t\t\t\t\t<div class=\"stat-item\">\r\n\t\t\t\t\t\t\t\t<p class=\"value text-xs-right\">251</p>\r\n\t\t\t\t\t\t\t\t<h6 class=\"name\">Posts</h6>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class=\"stat-item\">\r\n\t\t\t\t\t\t\t\t<p class=\"value text-xs-right\">9.38%</p>\r\n\t\t\t\t\t\t\t\t<h6 class=\"name\">Conversion</h6>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class=\"stat-item\">\r\n\t\t\t\t\t\t\t\t<p class=\"value text-xs-right\">842</p>\r\n\t\t\t\t\t\t\t\t<h6 class=\"name\">Followers</h6>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<p class=\"text-xs-right mt-lg\">\r\n\t\t\t\t\t\t<a href=\"#\" class=\"tag tag-warning\"> UI/UX </a>\r\n\t\t\t\t\t\t<a href=\"#\" class=\"tag tag-danger ml-xs\"> Web Design </a>\r\n\t\t\t\t\t\t<a href=\"#\" class=\"tag tag-default ml-xs\"> Mobile Apps </a>\r\n\t\t\t\t\t\t</p>\r\n\t\t\t\t\t\t<p class=\"lead mt-lg\">\r\n\t\t\t\t\t\tMy name is Adam Johns and here is my new Sing user profile page.\r\n\t\t\t\t\t\t</p>\r\n\t\t\t\t\t\t<p>\r\n\t\t\t\t\t\tI love reading people's summaries page especially those who are in the same industry as me.\r\n\t\t\t\t\t\tSometimes it's much easier to find your concentration during the night.\r\n\t\t\t\t\t\t</p>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</section>\r\n\t</div>-->\r\n\r\n\t\t<div class=\"col-lg-6 widget-container ui-sortable\">\r\n\t\t\t<section class=\"widget\" widget>\r\n\t\t\t\t<header class=\"ui-sortable-handle\">\r\n\t\t\t\t\t<h6>\r\n\t\t\t\t\t\tPersonal Profile\r\n\t\t\t\t\t</h6>\r\n\t\t\t\t\t<div class=\"widget-controls\">\r\n\t\t\t\t\t\t<a data-widgster=\"load\" href=\"#\" title=\"\" data-original-title=\"Reload\" class=\"\"><i class=\"fa fa-refresh\"></i></a>\r\n\t\t\t\t\t\t<a data-widgster=\"expand\" href=\"#\" title=\"\" style=\"display: none;\" data-original-title=\"Expand\"><i class=\"glyphicon glyphicon-chevron-up\"></i></a>\r\n\t\t\t\t\t\t<a data-widgster=\"collapse\" href=\"#\" title=\"\" data-original-title=\"Collapse\" class=\"\"><i class=\"glyphicon glyphicon-chevron-down\"></i></a>\r\n\t\t\t\t\t\t<a data-widgster=\"fullscreen\" href=\"#\" title=\"\" data-original-title=\"Full Screen\" class=\"\"><i class=\"glyphicon glyphicon-fullscreen\"></i></a>\r\n\t\t\t\t\t\t<a data-widgster=\"restore\" href=\"#\" title=\"\" style=\"display: none;\" data-original-title=\"Restore\"><i class=\"glyphicon glyphicon-resize-small\"></i></a>\r\n\t\t\t\t\t\t<a data-widgster=\"close\" href=\"#\" title=\"\" data-original-title=\"Close\"><i class=\"glyphicon glyphicon-remove\"></i></a>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</header>\r\n\t\t\t\t<div class=\"widget-body\">\r\n\t\t\t\t\t<form class=\"form-horizontal\" role=\"form\" (ngSubmit)=\"editProfile\">\r\n\t\t\t\t\t\t<fieldset>\r\n\t\t\t\t\t\t\t<legend><strong>{{currentUser.userName}}</strong>'s form</legend>\r\n\r\n\t\t\t\t\t\t\t<div class=\"form-group row\">\r\n\t\t\t\t\t\t\t\t<label class=\"col-md-4  col-form-label text-md-right\" for=\"simple-select\">Major</label>\r\n\t\t\t\t\t\t\t\t<div class=\"col-md-7 \">\r\n\t\t\t\t\t\t\t\t\t<select class=\"form-control\" id=\"simple-select\" [(ngModel)]=\"myProfile.profile.major\" [disabled]=\"!toEdit\" name=\"major\">\r\n\t\t\t\t\t\t\t\t\t<option *ngFor=\"let major of majors\" [value]=\"major.Abbreviation\">\r\n\t\t\t\t\t\t\t\t\t{{major.Abbreviation}}\r\n\t\t\t\t\t\t\t\t\t</option>\r\n\t\t\t\t\t\t\t\t</select>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t<div class=\"form-group row\">\r\n\t\t\t\t\t\t\t\t<label for=\"normal-field\" class=\"col-md-4  col-form-label text-md-right\">Language</label>\r\n\t\t\t\t\t\t\t\t<div class=\"col-md-7 \">\r\n\t\t\t\t\t\t\t\t\t<span class=\"help-block\" *ngFor=\"let language of myProfile.extra.language\">{{language.name}}</span>\r\n\t\t\t\t\t\t\t\t\t<input type=\"text\" id=\"normal-field\" [disabled]=\"!toEdit\" class=\"form-control\" placeholder=\"New language\" [(ngModel)]=\"newlanguage.name\"\r\n\t\t\t\t\t\t\t\t\t\tname=\"language\">\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class=\"form-group row\">\r\n\t\t\t\t\t\t\t\t<label for=\"normal-field\" class=\"col-md-4  col-form-label text-md-right\">Hobby</label>\r\n\t\t\t\t\t\t\t\t<div class=\"col-md-7 \">\r\n\t\t\t\t\t\t\t\t\t<span id=\"helpBlock\" class=\"help-block\" *ngFor=\"let hobby of myProfile.extra.hobby\">{{hobby.name}}</span>\r\n\t\t\t\t\t\t\t\t\t<input type=\"text\" id=\"normal-field\" [disabled]=\"!toEdit\" class=\"form-control\" placeholder=\"New hobby\" [(ngModel)]=\"newhobby.name\"\r\n\t\t\t\t\t\t\t\t\t\tname=\"hobby\">\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class=\"form-group row\">\r\n\t\t\t\t\t\t\t\t<label for=\"normal-field\" class=\"col-md-4  col-form-label text-md-right\">Birthday</label>\r\n\t\t\t\t\t\t\t\t<div class=\"col-md-7 \">\r\n\t\t\t\t\t\t\t\t\t<input type=\"text\" id=\"normal-field\" [disabled]=\"!toEdit\" class=\"form-control\" placeholder=\"yyyy-MM-dd {{myProfile.profile.birthday}}\"\r\n\t\t\t\t\t\t\t\t\t\t[(ngModel)]=\"myProfile.profile.birthday\" name=\"birthday\">\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class=\"form-group row\">\r\n\t\t\t\t\t\t\t\t<label for=\"normal-field\" class=\"col-md-4  col-form-label text-md-right\">Gender</label>\r\n\t\t\t\t\t\t\t\t<div class=\"col-md-7 \">\r\n\t\t\t\t\t\t\t\t\t<input type=\"text\" id=\"normal-field\" [disabled]=\"!toEdit\" class=\"form-control\" placeholder=\"{{myProfile.profile.gender}}\"\r\n\t\t\t\t\t\t\t\t\t\t[(ngModel)]=\"myProfile.profile.gender\" name=\"gender\">\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class=\"form-group row\">\r\n\t\t\t\t\t\t\t\t<label for=\"normal-field\" class=\"col-md-4  col-form-label text-md-right\">Nationality</label>\r\n\t\t\t\t\t\t\t\t<div class=\"col-md-7 \">\r\n\t\t\t\t\t\t\t\t\t<input type=\"text\" id=\"normal-field\" [disabled]=\"!toEdit\" class=\"form-control\" placeholder=\"{{myProfile.profile.nationality}}\"\r\n\t\t\t\t\t\t\t\t\t\t[(ngModel)]=\"myProfile.profile.nationality\" name=\"nationality\">\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class=\"form-group row\">\r\n\t\t\t\t\t\t\t\t<label for=\"normal-field\" class=\"col-md-4  col-form-label text-md-right\">Visibility</label>\r\n\t\t\t\t\t\t\t\t<div class=\"col-md-7 \">\r\n\t\t\t\t\t\t\t\t\t<input type=\"text\" id=\"normal-field\" [disabled]=\"!toEdit\" class=\"form-control\" placeholder=\"{{myProfile.profile.visibility}}\"\r\n\t\t\t\t\t\t\t\t\t\t[(ngModel)]=\"myProfile.profile.visibility\" name=\"visibility\">\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</fieldset>\r\n\t\t\t\t\t\t<div class=\"form-actions\">\r\n\t\t\t\t\t\t\t<div class=\"row\">\r\n\t\t\t\t\t\t\t\t<div class=\"offset-md-4 offset-sm-4 offset-xs-4 offset-lg-4\">\r\n\t\t\t\t\t\t\t\t\t<button type=\"submit\" *ngIf=\"toEdit === false\" class=\"btn btn-primary\" (click)=\"edit()\">Edit Profile</button>\r\n\t\t\t\t\t\t\t\t\t<button type=\"submit\" *ngIf=\"toEdit === true\" class=\"btn btn-primary\" (click)=\"editProfile()\">Save Changes</button>\r\n\t\t\t\t\t\t\t\t\t<button type=\"button\" *ngIf=\"toEdit === true\" class=\"btn btn-inverse\" (click)=\"cancelEdit()\">Cancel</button>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</form>\r\n\t\t\t\t</div>\r\n\t\t\t</section>\r\n\t\t</div>\r\n\r\n\t\t<!--<div class=\"col-lg-6 widget-container ui-sortable\">\r\n\t\t<section class=\"widget\" widget>\r\n\t\t\t<header class=\"ui-sortable-handle\">\r\n\t\t\t\t<h6>\r\n\t\t\t\t\tActivities\r\n\t\t\t\t</h6>\r\n\t\t\t\t<div class=\"widget-controls\">\r\n\t\t\t\t\t<a data-widgster=\"load\" href=\"#\" title=\"\" data-original-title=\"Reload\" class=\"\"><i class=\"fa fa-refresh\"></i></a>\r\n\t\t\t\t\t<a data-widgster=\"expand\" href=\"#\" title=\"\" style=\"display: none;\" data-original-title=\"Expand\"><i class=\"glyphicon glyphicon-chevron-up\"></i></a>\r\n\t\t\t\t\t<a data-widgster=\"collapse\" href=\"#\" title=\"\" data-original-title=\"Collapse\" class=\"\"><i class=\"glyphicon glyphicon-chevron-down\"></i></a>\r\n\t\t\t\t\t<a data-widgster=\"fullscreen\" href=\"#\" title=\"\" data-original-title=\"Full Screen\" class=\"\"><i class=\"glyphicon glyphicon-fullscreen\"></i></a>\r\n\t\t\t\t\t<a data-widgster=\"restore\" href=\"#\" title=\"\" style=\"display: none;\" data-original-title=\"Restore\"><i class=\"glyphicon glyphicon-resize-small\"></i></a>\r\n\t\t\t\t\t<a data-widgster=\"close\" href=\"#\" title=\"\" data-original-title=\"Close\"><i class=\"glyphicon glyphicon-remove\"></i></a>\r\n\t\t\t\t</div>\r\n\t\t\t</header>\r\n\t\t\t<section class=\"event\">\r\n\t\t\t\t<span class=\"thumb-sm avatar pull-left mr-sm\">\r\n\t\t\t\t\t<img class=\"img-circle\" src=\"assets/img/people/a5.jpg\" alt=\"...\">\r\n\t\t\t\t</span>\r\n\t\t\t\t<h5 class=\"event-heading\"><a href=\"#\">Bob Nilson</a> <small><a href=\"#\">@nils</a></small></h5>\r\n\t\t\t\t<p class=\"text-muted\">February 22, 2014 at 01:59 PM</p>\r\n\t\t\t\t<p class=\"fs-mini\">\r\n\t\t\t\tThere is no such thing as maturity. There is instead an ever-evolving process of maturing.\r\n\t\t\t\tBecause when there is a maturity, there is ...\r\n\t\t\t\t</p>\r\n\t\t\t\t<footer>\r\n\t\t\t\t\t<ul class=\"post-links\">\r\n\t\t\t\t\t\t<li><a href=\"#\">1 hour</a></li>\r\n\t\t\t\t\t\t<li><a href=\"#\"><span class=\"text-danger\"><i class=\"fa fa-heart\"></i> Like</span></a></li>\r\n\t\t\t\t\t\t<li><a href=\"#\">Comment</a></li>\r\n\t\t\t\t\t</ul>\r\n\t\t\t\t</footer>\r\n\t\t\t</section>\r\n\t\t\t<section class=\"event\">\r\n\t\t\t\t<h5 class=\"event-heading\"><a href=\"#\">Jessica Smith</a> <small>@jess</small></h5>\r\n\t\t\t\t<p class=\"text-muted\">February 22, 2014 at 01:59 PM</p>\r\n\t\t\t\t<p class=\"fs-mini\">\r\n\t\t\t\tCheck out this awesome photo I made in Italy last summer. Seems it was lost somewhere deep inside\r\n\t\t\t\tmy brand new HDD 40TB. Thanks god I found it!\r\n\t\t\t\t</p>\r\n\t\t\t\t<footer>\r\n\t\t\t\t\t<div class=\"clearfix\">\r\n\t\t\t\t\t\t<ul class=\"post-links mt-sm pull-left\">\r\n\t\t\t\t\t\t\t<li><a href=\"#\">1 hour</a></li>\r\n\t\t\t\t\t\t\t<li><a href=\"#\"><span class=\"text-danger\"><i class=\"fa fa-heart-o\"></i> Like</span></a></li>\r\n\t\t\t\t\t\t\t<li><a href=\"#\">Comment</a></li>\r\n\t\t\t\t\t\t</ul>\r\n\r\n\t\t\t\t\t\t<span class=\"thumb thumb-sm pull-right\">\r\n\t\t\t\t\t\t\t<a href=\"#\">\r\n\t\t\t\t\t\t\t\t<img class=\"img-circle\" src=\"assets/img/people/a1.jpg\">\r\n\t\t\t\t\t\t\t</a>\r\n\t\t\t\t\t\t</span>\r\n\t\t\t\t\t\t<span class=\"thumb thumb-sm pull-right\">\r\n\t\t\t\t\t\t\t<a href=\"#\"><img class=\"img-circle\" src=\"assets/img/people/a5.jpg\"></a>\r\n\t\t\t\t\t\t</span>\r\n\t\t\t\t\t\t<span class=\"thumb thumb-sm pull-right\">\r\n\t\t\t\t\t\t\t<a href=\"#\"><img class=\"img-circle\" src=\"assets/img/people/a3.jpg\"></a>\r\n\t\t\t\t\t\t</span>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<ul class=\"post-comments mt-sm\">\r\n\t\t\t\t\t\t<li>\r\n\t\t\t\t\t\t\t<span class=\"thumb-xs avatar pull-left mr-sm\">\r\n\t\t\t\t\t\t\t\t<img class=\"img-circle\" src=\"assets/img/people/a1.jpg\" alt=\"...\">\r\n\t\t\t\t\t\t\t</span>\r\n\t\t\t\t\t\t\t<div class=\"comment-body\">\r\n\t\t\t\t\t\t\t\t<h6 class=\"author fs-sm fw-semi-bold\">Ignacio Abad <small>6 mins ago</small></h6>\r\n\t\t\t\t\t\t\t\t<p>Hey, have you heard anything about that?</p>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</li>\r\n\t\t\t\t\t\t<li>\r\n\t\t\t\t\t\t\t<span class=\"thumb-xs avatar pull-left mr-sm\">\r\n\t\t\t\t\t\t\t\t<img class=\"img-circle\" src=\"assets/img/avatar.png\" alt=\"...\">\r\n\t\t\t\t\t\t\t</span>\r\n\t\t\t\t\t\t\t<div class=\"comment-body\">\r\n\t\t\t\t\t\t\t\t<input class=\"form-control form-control-sm\" type=\"text\" placeholder=\"Write your comment...\">\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</li>\r\n\t\t\t\t\t</ul>\r\n\t\t\t\t</footer>\r\n\t\t\t</section>\r\n\t\t\t<form class=\"mt\" action=\"#\">\r\n\t\t\t\t<div class=\"form-group mb-0\">\r\n\t\t\t\t\t<label class=\"sr-only\" for=\"new-event\">New event</label>\r\n\t\t\t\t\t<textarea class=\"form-control\" id=\"new-event\" placeholder=\"Post something...\" rows=\"3\"></textarea>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class=\"btn-toolbar\">\r\n\t\t\t\t\t<div class=\"btn-group\">\r\n\t\t\t\t\t\t<a href=\"#\" class=\"btn btn-sm btn-gray\">\r\n\t\t\t\t\t\t\t<i class=\"fa fa-camera fa-lg\"></i>\r\n\t\t\t\t\t\t</a>\r\n\t\t\t\t\t\t<a href=\"#\" class=\"btn btn-sm btn-gray\">\r\n\t\t\t\t\t\t\t<i class=\"fa fa-map-marker fa-lg\"></i>\r\n\t\t\t\t\t\t</a>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<button type=\"submit\" class=\"btn btn-danger btn-sm pull-right\">Post</button>\r\n\t\t\t\t</div>\r\n\t\t\t</form>\r\n\t\t</section>\r\n\t</div>-->\r\n\r\n\t\t<div class=\"col-lg-6 widget-container ui-sortable\">\r\n\t\t\t<section class=\"widget\" widget>\r\n\t\t\t\t<header class=\"ui-sortable-handle\">\r\n\t\t\t\t\t<h6>\r\n\t\t\t\t\t\tFriends\r\n\t\t\t\t\t</h6>\r\n\t\t\t\t\t<div class=\"widget-controls\">\r\n\t\t\t\t\t\t<a data-widgster=\"load\" href=\"#\" title=\"\" (click)=\"fetchFriendList()\" data-original-title=\"Reload\" class=\"\"><i class=\"fa fa-refresh\"></i></a>\r\n\t\t\t\t\t\t<a data-widgster=\"expand\" href=\"#\" title=\"\" style=\"display: none;\" data-original-title=\"Expand\"><i class=\"glyphicon glyphicon-chevron-up\"></i></a>\r\n\t\t\t\t\t\t<a data-widgster=\"collapse\" href=\"#\" title=\"\" data-original-title=\"Collapse\" class=\"\"><i class=\"glyphicon glyphicon-chevron-down\"></i></a>\r\n\t\t\t\t\t\t<a data-widgster=\"fullscreen\" href=\"#\" title=\"\" data-original-title=\"Full Screen\" class=\"\"><i class=\"glyphicon glyphicon-fullscreen\"></i></a>\r\n\t\t\t\t\t\t<a data-widgster=\"restore\" href=\"#\" title=\"\" style=\"display: none;\" data-original-title=\"Restore\"><i class=\"glyphicon glyphicon-resize-small\"></i></a>\r\n\t\t\t\t\t\t<a data-widgster=\"close\" href=\"#\" title=\"\" data-original-title=\"Close\"><i class=\"glyphicon glyphicon-remove\"></i></a>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</header>\r\n\t\t\t\t<div class=\"widget-body no-padding\">\r\n\t\t\t\t\t<div class=\"list-group list-group-lg\">\r\n\t\t\t\t\t\t<div class=\"list-group-item\" href=\"#\" *ngFor=\"let friend of friendList\">\r\n\t\t\t\t\t\t\t<span class=\"thumb-sm pull-xs-left mr\">\r\n\t\t\t\t\t\t\t<a href=\"#\"><img alt=\"...\" class=\"img-circle\" src=\"assets/img/avatar.png\" (click)=\"pop(friend.userName)\"></a>\r\n\t\t\t\t\t\t</span>\r\n\t\t\t\t\t\t\t<span class=\"pull-xs-right\"><button class=\"btn btn-danger\" (click)=\"unFollow(friend.userName)\">Unfollow</button></span>\r\n\t\t\t\t\t\t\t<h6 class=\"no-margin\" (click)=\"pop(friend.userName)\"><a href=\"#\">{{friend.userName}}</a></h6>\r\n\t\t\t\t\t\t\t<small class=\"text-muted\">{{friend.email}}</small>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</section>\r\n\t\t</div>\r\n\r\n\t</div>\r\n</div>"

/***/ }

});
//# sourceMappingURL=7.map