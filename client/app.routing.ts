import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/index';
import { AuthGuard } from './_guards/index';

const appRoutes: Routes = [
    { path: '', component: LoginComponent, canActivate: [AuthGuard] },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
