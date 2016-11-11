import { Component, OnInit } from '@angular/core';

import { UserService, ProfileService, AlertService } from '../_services/index';
import { DashboardComponent } from '../dashboard/dashboard.component';


@Component({
    moduleId: module.id,
    templateUrl: 'myprofile.component.html'
})

export class MyProfileComponent implements OnInit{
    currentUser: any = {};
    myProfile: {
        extra: any;
        profile: any;
    } = {
        extra: {},
        profile: {}
    }

    constructor(
        private alertService: AlertService,
        private profileService: ProfileService
    ) {
    }

    ngOnInit() {
        this.fetchProfile();
    }

    fetchProfile() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.profileService.getProfile(this.currentUser.userName)
        .subscribe(
            data => {
                this.myProfile = data;
                console.log(this.myProfile.profile.major);
            },
            error => {
                this.alertService.error(error);
            }
        );

    }

}
