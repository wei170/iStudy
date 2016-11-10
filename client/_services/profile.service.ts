import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ProfileService {
    constructor(private http: Http) { }

     /**
     * JSON Format: {
     * 		"userName": "...",
     * }
     */
    getProfile(userName: string) {
        var profileUrl = '/profile';
        var body = { "userName": userName }
        var headers = new Headers();
        headers.append('Auth', localStorage.getItem('token'));
        return this.http.post(profileUrl, body, {
            headers: headers
        })
        .map((res: Response) => res.json());
    }

    /**
	 * JSON Format: {
	 * 		"userName": "...",
	 * 		"major": "...",
	 * 		"language": "...",
	 * 		"birthday": "...",
	 *		"hobby": "...",
	 * 		"visibility": "..."
	 * }
	 */
    editProfile(model: any) {
        var url = '/profile/update';
        var headers = new Headers();
        headers.append('Auth', localStorage.getItem('token'));
        var body = {
            "major": model.major,
            "language": model.language,
            "birthday": model.birthday,
            "hobby": model.hobby,
            "visibility": model.visibility
        };
        console.log(body);
        return this.http.post(url, body, {
            headers: headers
        })
        .map((res: Response) => res.json());
    }
}
