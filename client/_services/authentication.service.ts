import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }

    login(email: string, password: string) {
        var url = 'users/login';
        var body = {"email": email, "password": password};
        return this.http.post(url, body)
        .map((response: Response) => {
            if(response.status < 200 || response.status >= 300) {
                response.json();
            }  else {
                // login successful if there's a jwt token in the response
                let user = response.json();
                // console.log(response.headers.get('Auth'));
                if (user) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    localStorage.setItem('token', response.headers.get('Auth'));
                }
            }
        });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
    }
}
