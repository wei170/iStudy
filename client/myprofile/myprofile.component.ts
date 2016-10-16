import { Component, OnInit } from '@angular/core';

import { UserService, ProfileService } from '../_services/index';
import { DashboardComponent } from '../dashboard/dashboard.component';


@Component({
    moduleId: module.id,
    templateUrl: 'myprofile.component.html'
})

export class MyProfileComponent implements OnInit{
    currentUser: any = {};
    myProfile: any = {};

    constructor(
        private dashboardComponent: DashboardComponent,
        private userService: UserService,
        private profileService: ProfileService
    ) {
        this.currentUser = this.dashboardComponent.currentUser;
    }

    ngOnInit() {
        this.getProfile();
    }

    getProfile() {
        this.profileService.getProfile()
        .subscribe(
            data => {
                this.myProfile = data;
            }
        );
    }

}
