import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { Class } from '../_models/index';

@Injectable()
export class CourseService {
    constructor(private http: Http) { }

    searchCourse(course: any) {
        var url = '/course';
        var headers = new Headers();
        headers.append('Auth', localStorage.getItem('token'));
        return this.http.get(url, {
            headers: headers
        })
        .map((res: Response) => this.extractData(res));
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || { };
    }
}
