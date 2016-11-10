import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProfileService, AlertService } from '../_services/index';
import { MyProfileComponent } from './index';


@Component({
    moduleId: module.id,
    templateUrl: 'editProfile.component.html'
})

export class EditProfileComponent implements OnInit{
    model: any = {};
    currentUser: any = {};
    profile: any = {};

    constructor(
        private router: Router,
        private profileService: ProfileService,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.profileService.getProfile(this.model)
        .subscribe(
            data => {
                this.profile = data;
            },
            err => {
                this.alertService.error(err);
            }
        );
    }

    editProfile() {
        this.profileService.editProfile(this.model)
            .subscribe (
                data => {
                    // successfully edit the profile
                    this.alertService.success('Successfully edit the profile');
                    this.router.navigate(['/dashboard/myprofile']);
                },
                err => {
                    this.alertService.error(err.message);
                }
            );
    }

    private visibilities = [
        { value: true, display: "Public" },
        { value: false, display: "Private" }
    ];
}
