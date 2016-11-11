import { Component, OnInit, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { UserService, AuthenticationService, FriendService, AlertService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'dashboard.component.html',
    styleUrls: [
        'custom-styles.css'
    ]
})

export class DashboardComponent implements OnInit {
    private currentUser = JSON.parse(localStorage.getItem('currentUser'));
    private friendRequests: any[];

    constructor(
        private userService: UserService,
        private elementRef: ElementRef,
        private authService: AuthenticationService,
        private friendService: FriendService,
        private alertService: AlertService
    ) {
    }


    ngOnInit(){
        this.updateMessages();
    }

    updateMessages() {
        this.friendService.getFriendInvitations(this.currentUser.userName).subscribe(
            (data: any) => {
                this.friendRequests = data;
            }
        );
    }

    ngAfterViewInit() {
        this.loadScript("/client/dashboard/custom-scripts.js");
    }

    logout() { this.authService.logout(); }

    loadScript(url: string) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        this.elementRef.nativeElement.appendChild(script);
    }

    accept(req: any) {
        this.friendService.responseToRequest(this.currentUser.userName, req.userName, "1").subscribe (
            (data: any) => {
                this.alertService.success("Accept the friend request");
            },
            (error: any) => {
                this.alertService.error(error);
            }
        )
    }

    decline(req: any) {
        this.friendService.responseToRequest(this.currentUser.userName, req.userName, "2").subscribe (
            (data: any) => {
                this.alertService.success("Decline the friend request");
            },
            (error: any) => {
                this.alertService.error(error);
            }
        )
    }
}
