import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './_guards/index';
import { RegisterComponent, LoginComponent, ForgotPasswordComponent } from './login/index';
import { DashboardComponent } from './dashboard/index';
import { MyProfileComponent, EditProfileComponent } from './myprofile/index';
import { SearchCourseComponent } from './class_registration/search_course.component';

const appRoutes: Routes = [
    { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'forgotpassword', component: ForgotPasswordComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'dashboard', component: DashboardComponent,
        children:[
            { path: '', component: MyProfileComponent},
            { path: 'myprofile', component: MyProfileComponent },
            { path: 'edit_profile', component: EditProfileComponent },
            { path: 'class_registration', component: SearchCourseComponent }
        ]},

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
