import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { Class } from '../_models/index';

@Injectable()
export class CourseService {
    constructor(private http: Http) { }

    searchMajor(major: string) {
        // todo: need to change later
        var url = '/course';
        var headers = new Headers();
        headers.append('Auth', localStorage.getItem('token'));
        return this.http.get(url, {
            headers: headers
        })
        .map((res: Response) => res.json());
    }

    searchCourse(courseName: string) {
        var url = '/course/' + courseName;
        var headers = new Headers();
        headers.append('Auth', localStorage.getItem('token'));
        return this.http.get(url, {
            headers: headers
        })
        .map((res: Response) => res.json());
    }

}
