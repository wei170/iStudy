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
	 * 	"id": ...
	 * 	}
	 */
    getUserCourseList() {
        let url = '/course/get-class-list';
        let userId = JSON.parse(localStorage.getItem('currentUser')).id;
        let body = { "id": userId };
       return this.http.post(url, body, { headers: this.headers }).map((res: Response) => res.json());
    }

    /**
	 * JSON Format:
	 * {
	 * 	"course": "course name"
	 * 	"professor": "professor name"
	 * }
	 */
    getAllStudents(courseName: string, professor: string) {
        let url = '/course/get-class-list';
        let userName = JSON.parse(localStorage.getItem('currentUser')).userName;
        let body = { "course": courseName, "professor": professor };
       return this.http.post(url, body, { headers: this.headers }).map((res: Response) => res.json());
    }

    /**
	 * JSON Format:
	 * {
	 * 	"course": "...",
	 * 	"professor": "...",
	 * 	"id": ...
	 * }
	 */
    leaveClass(course: string, professor: string) {
        let url = '/course/leave';
        let userId = JSON.parse(localStorage.getItem('currentUser')).id;
        let body = { "course": course, "professor": professor, "id": userId};
       return this.http.post(url, body, { headers: this.headers }).map((res: Response) => res.json());
    }
}
