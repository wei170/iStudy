import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, AuthenticationService } from '../_services/index';

@Component({
  selector: 'login',
  styleUrls: [ './login.style.scss' ],
  templateUrl: './login.template.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'login-page app'
  }
})
export class Login implements OnInit {
  model: any = {};
  loading = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) { }

  ngOnInit() {
      // reset login status
      this.authenticationService.logout();
  }

  login() {
      this.loading = true;
      this.authenticationService.login(this.model.email, this.model.password)
          .subscribe(
              data => {
                  this.router.navigate(['/app/dashboard']);
              },
              error => {
                this.alertService.error("There is an error of your email or your password!");
                this.loading = false;
              });
  }
}
