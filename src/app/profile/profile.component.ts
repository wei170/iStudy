import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ProfileService, FriendService, AlertService, PopupService } from '../_services/index';

@Component({
  selector: '[profile]',
  moduleId: module.id,
  templateUrl: './profile.template.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./profile.style.scss']
})
export class Profile implements OnInit {
    private toEdit: boolean;
    currentUser: any = JSON.parse(localStorage.getItem('currentUser'));
    friendList: any[];
    private languages: any[];
    private hobbies: any[];
    private majors: any[];

    myProfile: {
        extra: {
            language: {
              name: string;
            }[];
            hobby: {
              name: Date;
            }[];
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

    constructor(
        private alertService: AlertService,
        private profileService: ProfileService,
        private friendService: FriendService,
        private popupService: PopupService
    ) {
      this.toEdit = false;
    }

    /* My Profile */
    ngOnInit() {
        this.getAllChoices();
        this.fetchProfile();
        this.fetchFriendList();
    }

    /**************** Get Basic Info **************/
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
                this.majors = data.value;
            }
        );
    }

    private visibilities = [
        { value: true, display: "Public" },
        { value: false, display: "Private" }
    ];

    /**************** Method-kind *****************/
    /* Edit Profile */
    editProfile() {
        console.log(this.myProfile)
        this.profileService.editProfile(this.currentUser.userName, this.myProfile)
        .subscribe (
            data => {
                // successfully edit the profile
                this.toEdit = false;
                this.alertService.success('Successfully edit the profile');
            },
            err => {
                this.alertService.error(err.message);
            }
        );
    }

    edit() {
      this.toEdit = true;
    }

    cancelEdit() {
        this.toEdit = false;
    }

    unFollow (victim: string) {
        this.friendService.unFriend(this.currentUser.userName, victim).subscribe(
            data => {
                this.alertService.successWT("Unfollow", "Successfully unfollow" + victim);                
            },
            err => {
                this.alertService.error(err);                
            }
        );
    }

    pop(userName: string) {
        this.popupService.popUser(userName);
    }
}
