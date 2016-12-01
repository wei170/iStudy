import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, UserService } from '../_services/index';

@Component({
    selector: 'register',
    moduleId: module.id,
    templateUrl: './register.component.html',
    styleUrls: [ './login.style.scss' ],
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'login-page app'
    }
})

export class Register {
    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }

    register() {
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
                data => {
                    // set success message and pass true paramater to persist the message after redirecting to the login page
                    this.alertService.success('Registration successful');
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(JSON.parse(error._body).err.errors[0].message);
                    this.loading = false;
                });
    }
}