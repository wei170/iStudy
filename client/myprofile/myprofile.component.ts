import { Component, OnInit } from '@angular/core';

import { UserService, ProfileService, AlertService } from '../_services/index';
import { DashboardComponent } from '../dashboard/dashboard.component';


@Component({
    moduleId: module.id,
    templateUrl: 'myprofile.component.html'
})

export class MyProfileComponent implements OnInit{
    currentUser: any = {};
    myProfile: any = {};

    constructor(
        private alertService: AlertService,
        private userService: UserService,
        private profileService: ProfileService,
        private dashboardComponent: DashboardComponent
    ) {
        this.currentUser = this.dashboardComponent.currentUser;
        this.profileService.getProfile()
        .subscribe(
            data => {
                this.myProfile = JSON.parse(localStorage.getItem('profile'));
                // todo: need to update this local storage method later
                // console.log(JSON.stringify(data));
                // console.log(JSON.parse(localStorage.getItem('profile')));
            },
            error => {
                this.alertService.error(error);
            }
        );
    }

    ngOnInit() {}

}
