import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Profile } from './profile.component';

import { UserService, ProfileService, FriendService, AlertService } from '../_services/index';

export const routes = [
  {path: '', component: Profile, pathMatch: 'full'}
];

@NgModule({
  declarations: [
    // Components / Directives/ Pipes
    Profile
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    UserService,
    ProfileService,
    FriendService,
    AlertService
  ]
})
export default class FormModule {
  static routes = routes;
}
