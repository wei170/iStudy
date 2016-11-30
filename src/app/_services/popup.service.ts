import { Injectable } from '@angular/core';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';

import { ProfileService } from './index'

@Injectable()
export class PopupService {
    private profile: {
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
    };
    constructor(
        private modal: Modal,
        private profileService: ProfileService
    ){}

    popUser(userName: string) {
        this.profileService.getProfile(userName).subscribe(data => {this.profile = data;});
        this.modal.alert()
            .size('lg')
            .showClose(true)
            .title('User Profile')
            .body(
                '<h4>'+userName+'</h4>'+
                '<p>'+this.profile.extra.language + '</p>'+
                '<p>'+this.profile.extra.hobby+'</p>'+
                '<p>'+this.profile.profile.major+'</p>'+
                '<p>'+this.profile.profile.birthday+'</p>'+
                '<p>'+this.profile.profile.nationality+'</p>'+
                '<p>'+this.profile.profile.gender+'</p>'+
                '<p>'+this.profile.profile.visibility+'</p>'            
            )
            .open();
    }
}