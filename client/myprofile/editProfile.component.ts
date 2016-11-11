import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProfileService, AlertService } from '../_services/index';
import { MyProfileComponent } from './index';


@Component({
    moduleId: module.id,
    templateUrl: 'editProfile.component.html'
})

export class EditProfileComponent implements OnInit{
    private model: {
        userName: any;
        major: string;
        hobby: any[];
        language: any[];
        birthday: string;
        visibility: boolean
    };
    private currentUser: any = {};
    private profile: any = {};

    private languages: any[];
    private hobbies: any[];
    private majors: any[];

    constructor(
        private router: Router,
        private profileService: ProfileService,
        private alertService: AlertService
    ) {
    }

    ngOnInit() {
        this.fetchProfile();
        this.getAllChoices();
    }

    fetchProfile() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.model.userName = this.currentUser.userName;
        this.profileService.getProfile(this.currentUser.userName)
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

    getAllChoices() {
        this.profileService.getAllLanguages().subscribe(
            data => {
                this.languages = data;
            }
        );
        this.profileService.getAllHobbies().subscribe(
            data => {
                this.hobbies = data;
            }
        );
        this.profileService.getAllMajors().subscribe(
            data => {
                console.log(data.value);
                this.majors = data.value;
            }
        );
    }

    private visibilities = [
        { value: true, display: "Public" },
        { value: false, display: "Private" }
    ];
}
