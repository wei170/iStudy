import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html',
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    error = '';

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
    ) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
    }

    login() {
        // console.log("called the login func in component.ts");
        this.loading = true;
        this.authenticationService.login(this.model.email, this.model.password)
        .subscribe(result: boolean => {
            if (result === true) {
                this.router.navigate(['/dashboard']);
            } else {
                this.error = 'Username or password is incorrect';
                this.loading = false;
            }
        });
    }
}
