import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './_guards/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { DashboardComponent } from './dashboard/index';
import { MyProfileComponent} from './myprofile/myprofile.component';
import { ClassRegistrationComponent } from './class_registration/class_registration.component';

const appRoutes: Routes = [
    { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'dashboard', component: DashboardComponent,
        children:[
            { path: '', component: MyProfileComponent},
            { path: 'myprofile', component: MyProfileComponent},
            { path: 'class_registration', component: ClassRegistrationComponent}
        ]},

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
