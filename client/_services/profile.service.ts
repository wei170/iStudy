import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class ProfileService {
    constructor(private http: Http) { }

    getProfile() {
        console.log("check");
        var profileUrl = 'profile/';
        return this.http.get(profileUrl)
            .map(this.extractData);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || { };
    }
}
