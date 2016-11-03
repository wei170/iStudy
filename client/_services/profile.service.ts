import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ProfileService {
    constructor(private http: Http) { }

    getProfile() {
        var profileUrl = '/profile';
        var headers = new Headers();
        headers.append('Auth', localStorage.getItem('token'));
        return this.http.get(profileUrl, {
            headers: headers
        })
        .map((res: Response) => res.json());
    }

    editProfile(model: any) {
        var url = '/profile';
        var headers = new Headers();
        headers.append('Auth', localStorage.getItem('token'));
        var body = {"language": model.language, "major": model.major, "hobby": model.hobby, "visibility": model.visibility};
        return this.http.put(url, body, {
            headers: headers
        })
        .map((res: Response) => res.json());
    }
}
