import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { User, Profile } from '../_models/index';
import { UserService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'dashboard.component.html',
    styleUrls: [
        '/feature\ content/assets/js/morris/morris-0.4.3.min.css',
        '/feature\ content/assets/css/custom-styles.css'
    ]
})

export class DashboardComponent implements OnInit {
    currentUser: User;

    constructor(
        private userService: UserService,
    ) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }


    ngOnInit(){
        //called after the constructor and called  after the first ngOnChanges()
    }



}
