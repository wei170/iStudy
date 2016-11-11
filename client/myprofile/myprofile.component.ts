import { Component, OnInit } from '@angular/core';

import { UserService, ProfileService, FriendService, AlertService } from '../_services/index';
import { DashboardComponent } from '../dashboard/dashboard.component';


@Component({
    moduleId: module.id,
    templateUrl: 'myprofile.component.html'
})

export class MyProfileComponent implements OnInit{
    currentUser: any = JSON.parse(localStorage.getItem('currentUser'));
    myProfile: {
        extra: {
            language: string[];
            hobby: string[];
        },
        profile: {
            major: string;
            birthday: string;
            nationality: string;
            gender: string;
            visibility: boolean;
        }
    } = {
        "extra": {
            "language": [],
            "hobby": []
        },
        "profile": {
            "major": "Unknown",
            "birthday": "",
            "nationality": "Unknown",
            "gender": "Unknown",
            "visibility": true,
        }
}
    friendList: any[];

    constructor(
        private alertService: AlertService,
        private profileService: ProfileService,
        private friendService: FriendService
    ) {
    }

    ngOnInit() {
        this.fetchProfile();
        this.fetchFriendList();
    }

    fetchProfile() {
        this.profileService.getProfile(this.currentUser.userName)
        .subscribe(
            data => {
                this.myProfile = data;
                // console.log(this.myProfile.profile.major);
            },
            error => {
                this.alertService.error(error);
            }
        );

    }

    fetchFriendList() {
        this.friendService.getFriends(this.currentUser.userName).subscribe(
            data => {
                this.friendList = data;
            }
        );
    }

}
