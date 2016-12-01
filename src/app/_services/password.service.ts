import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PasswordService {
    constructor(private http: Http) { }

    verificationCheck(model: any) {
        let url = '/users/checkcode';
        let body = {
            "email": model.email,
            "verificationcode": model.verificationcode
        };

        return this.http.post(url, body);
    }

    forgotPassword(model: any) {
        let url = '/users/reset?email=' + model.email;
        let body = {
            "email": model.email
        };

        return this.http.post(url, body)
        .map((res: Response) => this.extractData(res));
    }


    resetPassword(model: any) {
        let url = '/users/newpassword';
        let body = {
            "email": model.email,
            "newpassword": model.newpassword
        };
        return this.http.put(url, body)
        .map((res: Response) => this.extractData(res));
    }

    private extractData(res: Response) {
        let body = res.json();
        localStorage.setItem('profile', JSON.stringify(body));
        return body.data || { };
    }
}
