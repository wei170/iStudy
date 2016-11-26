import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Login } from './login.component';
import { Register } from './register.component';
import { ForgotPassword } from './forgot_password.component';
import { AlertService, AuthenticationService, UserService, PasswordService } from '../_services/index';

export const routes = [
  { path: '', component: Login, pathMatch: 'full' },
  { path: 'register', component: Register },
  { path: 'reset', component: ForgotPassword }
];

@NgModule({
  declarations: [
    Login,
    Register,
    ForgotPassword
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    AlertService, 
    AuthenticationService,
    UserService,
    PasswordService
  ]
})
export default class LoginModule {
  static routes = routes;
}
