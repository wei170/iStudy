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
        private profileService: ProfileService
    ) {
    }

    ngOnInit() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.profileService.getProfile()
        .subscribe(
            data => {
                this.myProfile = data;
            },
            error => {
                this.alertService.error(error);
            }
        );
    }

}
