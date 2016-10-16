import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, PasswordService } from '../_services/index';


@Component({
    moduleId: module.id,
    templateUrl: 'forgot_password.component.html'
})

export class ForgotPasswordComponent implements OnInit {
    model: any = {};
    private sent = false;
    private verified = false;

    constructor(
        private router: Router,
        private passwordService: PasswordService,
        private alertService: AlertService) { }

    ngOnInit() {}

    forgotPassword() {
        if (!this.sent) {
            this.passwordService.forgotPassword(this.model)
            .subscribe(
                data => {
                    this.sent = true;
                    this.alertService.success("Sent verification code to your email!");
                },
                error => {
                    this.alertService.error(error);
                }
            )
        }
        else if (this.sent && !this.verified) {
            this.passwordService.verificationCheck(this.model)
            .subscribe(
                data => {
                    this.verified = true;
                    this.alertService.success("Reset your password");
                },
                error => {
                    this.alertService.error(error);
                }
            )
        }
        else {
            this.passwordService.resetPassword(this.model)
            .subscribe (
                data => {
                    this.alertService.success("Successfully reset the password!");
                    this.router.navigate(['/'])
                }
            )
        }
    }
}
