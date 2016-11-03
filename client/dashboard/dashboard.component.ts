/// <reference path="../../typings/metismenu/metismenu.d.ts" />

import { Component, OnInit, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { UserService, AuthenticationService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'dashboard.component.html',
    styleUrls: [
        'custom-styles.css'
    ]
})

export class DashboardComponent implements OnInit {
    currentUser: any = {};

    constructor(
        private userService: UserService,
        private elementRef: ElementRef,
        private authService: AuthenticationService
    ) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }


    ngOnInit(){}

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
}
