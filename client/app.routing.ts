import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './_guards/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { Dashboard } from './dashboard/index';

const appRoutes: Routes = [
    { path: 'dashboard', component: Dashboard, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },


    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
