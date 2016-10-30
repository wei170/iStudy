/// <reference path="../../typings/metismenu/metismenu.d.ts" />
/// <reference path="../../typings/jquery/jquery.d.ts" />

import { Component, OnInit, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'dashboard.component.html',
    styleUrls: [
        './custom-styles.css'
    ]
})

export class DashboardComponent implements OnInit {
    currentUser: any = {};

    constructor(
        private userService: UserService,
        private elementRef: ElementRef
    ) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }


    ngOnInit(){
        //called after the constructor and called  after the first ngOnChanges()
    }

    ngAfterViewInit() {
        this.loadScript("/client/dashboard/custom-scripts.js");
    }

    loadScript(url: string) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        this.elementRef.nativeElement.appendChild(script);
    }
}
