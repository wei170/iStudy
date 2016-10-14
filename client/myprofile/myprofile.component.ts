import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { User, Profile } from '../_models/index';
import { UserService, ProfileService } from '../_services/index';
import { DashboardComponent } from '../dashboard/dashboard.component';


@Component({
    moduleId: module.id,
    templateUrl: 'myprofile.component.html'
})

export class MyProfileComponent {
    currentUser: User;
    myProfile: Observable<Profile>;

    constructor(
        private dashboardComponent: DashboardComponent,
        private userService: UserService,
        private profileService: ProfileService
    ) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.myProfile = profileService.getProfile();
    }

}
