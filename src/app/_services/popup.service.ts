import { Injectable } from '@angular/core';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';

import { ProfileService } from './index'

@Injectable()
export class PopupService {
    private profile: any = {};
    constructor(
        private modal: Modal,
        private profileService: ProfileService
    ){}

    popUser(hostName: string) {
        // this.profile = {};
        this.profileService.getProfile(hostName,  JSON.parse(localStorage.getItem('currentUser')).userName).subscribe(
            data => {
                if (data.profile) {
                    this.modal.alert()
                        .size('lg')
                        .showClose(true)
                        .title('User Public Profile')
                        .body(
                            '<h4>'+hostName+'</h4>'+
                            '<p>'+ data.extra.language + '</p>'+
                            '<p>'+ data.extra.hobby +'</p>'+
                            '<p>'+ data.profile.major +'</p>'+
                            '<p>'+ data.profile.birthday +'</p>'+
                            '<p>'+ data.profile.nationality +'</p>'+
                            '<p>'+ data.profile.gender +'</p>'+
                            '<p>'+ data.profile.visibility +'</p>'            
                        )
                        .open();
                } else {
                    this.modal.alert()
                        .size('lg')
                        .showClose(true)
                        .title('User Private Profile')
                        .body(
                            '<h4>'+hostName+'</h4>'+ '<br><section>' + 
                            '<p>'+ '<strong>Nationality:</strong>&nbsp;' + data.nationality + '</p>'+
                            '<p>'+ '<strong>Gender:</strong>&nbsp;&nbsp;' + data.gender +'</p>' + '</section>'
                        )
                        .open();
                }
            });
    }

    popConfirm(title: string, message: string) {
        return this.modal.confirm()
            .size('lg')
            .titleHtml('<h4 class="modal-title" style="font-size: 22px; color: grey; text-decoration: underline;">' + title + '</h4>')
            .body('<p>'+ message + '</p>')
            .okBtn('Yes')
            .cancelBtn('No')
            .open();
    }
}