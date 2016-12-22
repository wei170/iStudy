import { Component, ElementRef, OnInit, Output, EventEmitter } from '@angular/core';
import { AppConfig } from '../../app.config';
import { FriendService, AlertService, PopupService } from '../../_services/index';
import * as moment from '../../../assets/public/javascripts/moment.js';
declare var jQuery: any;

@Component({
    selector: '[notifications]',
    templateUrl: './notifications.template.html'
})
export class Notifications implements OnInit {
    private currentUser = JSON.parse(localStorage.getItem('currentUser'));
    private friendRequests: Array<any> = [];
    private time: any;

    @Output() numOfNotifications = new EventEmitter();

    $el: any;
    config: any;

    constructor(
        el: ElementRef,
        config: AppConfig,
        private friendService: FriendService,
        private alertService: AlertService,
        private popupService: PopupService
    ) {
        this.$el = jQuery(el.nativeElement);
        this.config = config;
    }

    moveNotificationsDropdown(): void {
        jQuery('.sidebar-status .dropdown-toggle').after(jQuery('[notifications]').detach());
    }

    moveBackNotificationsDropdown(): void {
        jQuery('#notifications-dropdown-toggle').after(jQuery('[notifications]').detach());
    }

    ngOnInit(): void {
        this.updateMessages();
        this.config.onScreenSize(['sm', 'xs'], this.moveNotificationsDropdown);
        this.config.onScreenSize(['sm', 'xs'], this.moveBackNotificationsDropdown, false);

        if (this.config.isScreen('sm')) { this.moveNotificationsDropdown(); }
        if (this.config.isScreen('xs')) { this.moveNotificationsDropdown(); }

        jQuery('.sidebar-status').on('show.bs.dropdown', () => {
            jQuery('#sidebar').css('z-index', 2);
        }).on('hidden.bs.dropdown', () => {
            jQuery('#sidebar').css('z-index', '');
        });

        jQuery(document).on('change', '[data-toggle="buttons"] > label', ($event) => {
            let $input = jQuery($event.target).find('input');
            $input.trigger('change');
        });
    }

    // iStudy
    updateMessages() {
        this.time = moment.utc().local().format('h:mm:ss a');
        this.friendService.getFriendInvitations(this.currentUser.id).subscribe(
            (data: any) => {
                this.friendRequests = data;
                this.numOfNotifications.emit(this.friendRequests.length);
            }
        );
    }

    accept(req: any) {
        this.friendService.responseToRequest(this.currentUser.userName, req.userName, 1).subscribe(
            (data: any) => {
                this.alertService.success("Accept the friend request");
                this.updateMessages();
            },
            (error: any) => {
                this.alertService.error(error);
            }
        )
    }

    decline(req: any) {
        this.friendService.responseToRequest(this.currentUser.userName, req.userName, -1).subscribe(
            (data: any) => {
                this.alertService.success("Decline the friend request");
                this.updateMessages();
            },
            (error: any) => {
                this.alertService.error(error);
            }
        )
    }

    popInfo(userName: string, userId: Number) {
        this.popupService.popUser(userName, userId);
    }
}
