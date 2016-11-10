import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

@Injectable()
export class ClassroomService {
    private headers: any;
    constructor(private http: Http) {
        this.headers = new Headers();
        this.headers.append('Auth', localStorage.getItem('token'));
    }

    /**
	 * JSON Format:
	 * {
	 * 	"userName": "..."
	 * 	}
	 */
    getUserCourseList() {
        var url = '/course/get-class-list';
        var userName = JSON.parse(localStorage.getItem('currentUser')).userName;
        var body = { "userName": userName };
       return this.http.post(url, body, { headers: this.headers }) .map((res: Response) => res.json());
    }

    /**
	 * JSON Format:
	 * {
	 * 	"course": "course name"
	 * 	"professor": "professor name"
	 * }
	 */
    getAllStudents(courseName: string, professor: string) {
        var url = '/course/get-class-list';
        var userName = JSON.parse(localStorage.getItem('currentUser')).userName;
        var body = { "course": courseName, "professor": professor };
       return this.http.post(url, body, { headers: this.headers }) .map((res: Response) => res.json());
    }
}
