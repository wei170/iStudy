import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService, ProfileService, AlertService } from '../_services/index';
import { DashboardComponent } from '../dashboard/index';
import { MyProfileComponent } from './index';


@Component({
    moduleId: module.id,
    templateUrl: 'editProfile.component.html',
    providers: [MyProfileComponent]
})

export class EditProfileComponent implements OnInit{
    currentUser: any = {};
    profile: any = {};
    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private userService: UserService,
        private profileService: ProfileService,
        private alertService: AlertService,
        private userProfile: MyProfileComponent,
        private dashboardComponent: DashboardComponent,
    ) {
        this.currentUser = this.userProfile.currentUser;
        this.profile = this.dashboardComponent.currentUser;
    }

    ngOnInit() {}

    editProfile() {
        this.profileService.editProfile(this.model)
            .subscribe (
                data => {
                    // successfully edit the profile
                    this.alertService.success('Successfully edit the profile', true);
                    this.router.navigate(['/dashboard/myprofile']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            );
    }

    private visibilities = [
        { value: true, display: "Public" },
        { value: false, display: "Private" }
    ];
}
