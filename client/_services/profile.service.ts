import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class ProfileService {
    constructor(private http: Http) { }

    getProfile() {
        var headers = new Headers();
        headers.append('Auth', localStorage.getItem('token'));
        console.log(localStorage.getItem('hereeeee'));
        console.log(localStorage.getItem('token'));
        var profileUrl = 'profile/';
        return this.http.get(profileUrl, {
            headers: headers
        })
            .map(this.extractData);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }
}
