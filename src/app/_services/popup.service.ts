import { Injectable } from '@angular/core';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';

import { ProfileService, FriendService, AlertService } from './index'

@Injectable()
export class PopupService {
    private profile: any = {};
    constructor(
        private modal: Modal,
        private profileService: ProfileService,
        private friendService: FriendService,
        private alertService: AlertService
    ){}

    popUser(hostName: string, hostId: Number) {
        // this.profile = {};
        let userName = JSON.parse(localStorage.getItem('currentUser')).userName;
        this.profileService.getProfile(hostName, userName).subscribe(
            (data:any) => {
                if (data.profile) {
                    let languages: string = "";
                    let hobbies: string = "";
                    for (let lan of data.extra.language) {
                        languages += ' '+lan.name;
                    }
                    for (let hob of data.extra.hobby) {
                        hobbies += ' '+hob.name;
                    }
                    this.modal.confirm()
                        .size('lg')
                        .showClose(true)
                        .titleHtml('<h4 class="modal-title"><strong>'+hostName+'</strong>\'s Public Profile' + '</h4>')
                        .body(
                            '<p> <strong>Language:</strong>&nbsp;'+ languages + '</p>'+
                            '<p> <strong>Hobby:</strong>&nbsp;'+ hobbies +'</p>'+
                            '<p> <strong>Majory:</strong>&nbsp;'+ data.profile.major +'</p>'+
                            '<p> <strong>Birthday:</strong>&nbsp;'+ data.profile.birthday +'</p>'+
                            '<p> <strong>Nationality:</strong>&nbsp;'+ data.profile.nationality +'</p>'+
                            '<p> <strong>Gender:</strong>&nbsp;'+ data.profile.gender +'</p>'+
                            '<p> <strong>Visibility:</strong>&nbsp;'+ data.profile.visibility +'</p>'
                        )
                        .okBtn('Add Friend')
                        .cancelBtn('Cancel')
                        .open()
                        .then(dialog => dialog.result)
                        .catch(res => console.log("Cancel"))
                        .then(
                            res => {
                                if (res) {
                                    this.friendService.sendFriendReq(hostId).subscribe(
                                        data => this.alertService.success(data.res),
                                        error => this.alertService.error(JSON.parse(error._body).err)
                                )}
                            }
                        );
                    } else {
                    this.modal.alert()
                        .size('lg')
                        .showClose(true)
                        .titleHtml('<h4 class="modal-title"><strong>'+hostName+'</strong>\'s Private Profile' + '</h4>')
                        .body(
                            '<section>' + 
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
            .open()
            .then(dialog => dialog.result) // dialog has more properties,lets just return the promise for a result. 
            ;
    }

    popError(title: string, message: string) {
        return this.modal.alert()
            .size('md')
            .showClose(true)
            .titleHtml('<h4>' + title + '</h4>')
            .body(
                '<p>Oops: '+ message +'</p>'
            )
            .okBtn('Gotchu')
            .open();
    }

    /****** Need to config body and title yourself and open yourself *****/
    generalPop(title: string, message: string) {
        return this.modal.alert().size('lg').titleHtml(title).body(message).showClose(true).open();
    }
}