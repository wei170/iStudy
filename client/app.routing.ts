import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './_guards/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';

const appRoutes: Routes = [
    { path: '', component: LoginComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },


    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
