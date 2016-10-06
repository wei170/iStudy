import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../_services/index';
import { Ng2PageScrollModule } from 'ng2-page-scroll';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html',
    styleUrls: ['newstyle.css', 'normalize.css', 'style.css']
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    error = '';

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private pageScroll: Ng2PageScrollModule
    ) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.email, this.model.password)
        .subscribe(result => {
            if (result === true) {
                this.router.navigate(['/dashboard']);
            } else {
                this.error = 'Username or password is incorrect';
                this.loading = false;
            }
        });
    }
}
