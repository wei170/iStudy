"use strict";
var router_1 = require('@angular/router');
var index_1 = require('./login/index');
var index_2 = require('./_guards/index');
var appRoutes = [
    { path: '', component: index_1.LoginComponent, canActivate: [index_2.AuthGuard] },
    { path: 'login', component: index_1.LoginComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map