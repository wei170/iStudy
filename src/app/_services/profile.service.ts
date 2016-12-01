import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ProfileService {
    constructor(private http: Http) { }

    /**
     * JSON Format: {
	 * 		"hostName": "...",
	 * 		"requester": "..."
	 * }
     */
    getProfile(hostName: string, requester: string) {
        var profileUrl = '/profile';
        var body = { "hostName": hostName, "requester": requester};
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
    editProfile(userName: string, profile: any) {
        var url = '/profile/update';
        var headers = new Headers();
        headers.append('Auth', localStorage.getItem('token'));
        var body = {
            "userName": userName,
            "major": profile.profile.major,
            "visibility": profile.profile.visibility,
            "birthday": profile.profile.birthday,
            "gender": profile.profile.gender,
            "nation": profile.profile.nationality,
            "language": profile.extra.language,
            "hobby": profile.extra.hobby
        };
        console.log(body);
        return this.http.post(url, body, {
            headers: headers
        })
        .map((res: Response) => res.json());
    }

    getAllLanguages() {
        var url = '/profile/languages';
        var headers = new Headers();
        headers.append('Auth', localStorage.getItem('token'));
        return this.http.get(url, {headers: headers}).map((res: Response) => res.json());
    }

    getAllHobbies() {
        var url = '/profile/hobbies';
        var headers = new Headers();
        headers.append('Auth', localStorage.getItem('token'));
        return this.http.get(url, {headers: headers}).map((res: Response) => res.json());
    }

    getAllMajors() {
        var apiUrl = 'http://api.purdue.io/odata';
        var termId = 'c543a529-fed4-4fd0-b185-bd403106b4ea';
        var filterUrl = '/Subjects/?$filter=(Courses/any(c:%20c/Classes/any(cc:%20cc/Term/TermId%20eq%20';
        var abbrOrder = ')))&$orderby=Abbreviation%20asc';
        var detailedUrl = apiUrl + filterUrl + termId + abbrOrder;
        return this.http.get(detailedUrl).map((res: Response) => res.json());
    }
}
