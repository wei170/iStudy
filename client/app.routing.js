"use strict";
var router_1 = require('@angular/router');
var index_1 = require('./_guards/index');
var index_2 = require('./login/index');
var index_3 = require('./register/index');
var index_4 = require('./dashboard/index');
var myprofile_component_1 = require('./myprofile/myprofile.component');
var class_registration_component_1 = require('./class_registration/class_registration.component');
var appRoutes = [
    { path: '', component: index_4.DashboardComponent, canActivate: [index_1.AuthGuard] },
    { path: 'login', component: index_2.LoginComponent },
    { path: 'register', component: index_3.RegisterComponent },
    { path: 'dashboard', component: index_4.DashboardComponent,
        children: [
            { path: '', component: myprofile_component_1.MyProfileComponent },
            { path: 'myprofile', component: myprofile_component_1.MyProfileComponent },
            { path: 'class_registration', component: class_registration_component_1.ClassRegistrationComponent }
        ] },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map