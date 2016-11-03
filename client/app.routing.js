"use strict";
var router_1 = require("@angular/router");
var index_1 = require("./_guards/index");
var index_2 = require("./login/index");
var index_3 = require("./dashboard/index");
var index_4 = require("./myprofile/index");
var search_course_component_1 = require("./class_registration/search_course.component");
var appRoutes = [
    { path: '', component: index_3.DashboardComponent, canActivate: [index_1.AuthGuard] },
    { path: 'login', component: index_2.LoginComponent },
    { path: 'forgotpassword', component: index_2.ForgotPasswordComponent },
    { path: 'register', component: index_2.RegisterComponent },
    { path: 'dashboard', component: index_3.DashboardComponent,
        children: [
            { path: '', component: index_4.MyProfileComponent },
            { path: 'myprofile', component: index_4.MyProfileComponent },
            { path: 'edit_profile', component: index_4.EditProfileComponent },
            { path: 'class_registration', component: search_course_component_1.SearchCourseComponent }
        ] },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map