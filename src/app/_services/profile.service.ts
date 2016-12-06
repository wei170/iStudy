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
        let profileUrl = '/profile';
        let body = { "hostName": hostName, "requester": requester };
        let headers = new Headers();
        headers.append('Auth', localStorage.getItem('token'));
        return this.http.post(profileUrl, body, {
            headers: headers
        }).map(
            (res: Response) => {
                res = res.json();
                if (res.profile && res.profile.birthday && res.profile.birthday != "") {
                    res.profile.birthday = res.profile.birthday.substring(0, 10);
                }
                return res;
            }
        );
    }

    /**
	 * JSON Format: {
	 * 		"userName": "...",
	 * 		"major": "...",
	 * 		"language": "...",
	 * 		"birthday": "...",
	 *		"hobby": "...",
	 * 		"visibility": "..."
     *      "nationality": "..."
	 * }
	 */
    editProfile(userName: string, profile: any) {
        let url = '/profile/update';
        let headers = new Headers();
        headers.append('Auth', localStorage.getItem('token'));
        let body = {
            "userName": userName,
            "major": profile.profile.major,
            "visibility": profile.profile.visibility,
            "birthday": profile.profile.birthday,
            "gender": profile.profile.gender,
            "nation": profile.profile.nationality,
            "language": profile.extra.language,
            "hobby": profile.extra.hobby,
            "nationality": profile.profile.nationality
        };
        return this.http.post(url, body, {
            headers: headers
        })
            .map((res: Response) => res.json());
    }

    getAllLanguages() {
        let url = '/profile/languages';
        let headers = new Headers();
        headers.append('Auth', localStorage.getItem('token'));
        return this.http.get(url, { headers: headers }).map((res: Response) => res.json());
    }

    getAllHobbies() {
        let url = '/profile/hobbies';
        let headers = new Headers();
        headers.append('Auth', localStorage.getItem('token'));
        return this.http.get(url, { headers: headers }).map((res: Response) => res.json());
    }

    getAllMajors() {
        let apiUrl = 'http://api.purdue.io/odata';
        let termId = 'c543a529-fed4-4fd0-b185-bd403106b4ea';
        let filterUrl = '/Subjects/?$filter=(Courses/any(c:%20c/Classes/any(cc:%20cc/Term/TermId%20eq%20';
        let abbrOrder = ')))&$orderby=Abbreviation%20asc';
        let detailedUrl = apiUrl + filterUrl + termId + abbrOrder;
        return this.http.get(detailedUrl).map((res: Response) => res.json());
    }
}
