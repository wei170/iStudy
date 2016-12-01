import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CourseService {
    private apiUrl = 'https://api.purdue.io/odata';
    private termId = 'c543a529-fed4-4fd0-b185-bd403106b4ea';
    constructor(private http: Http) {
    }

    /**************************************************
     * 				Class Searching
     **************************************************/
    getAllMajors() {
        let filterUrl = '/Subjects/?$filter=(Courses/any(c:%20c/Classes/any(cc:%20cc/Term/TermId%20eq%20';
        let abbrOrder = ')))&$orderby=Abbreviation%20asc';
        let detailedUrl = this.apiUrl + filterUrl + this.termId + abbrOrder;
        return this.http.get(detailedUrl).map((res: Response) => res.json());
    }

    getMajorCourses(majorId: string) {
        // todo: need to change later
        let filterUrl = '/Courses/?$filter=(Classes/any(c:%20c/Term/TermId%20eq%20';
        let major = '))%20and%20Subject/SubjectId%20eq%20' + majorId;
        let order = '&$orderby=Number%20asc';
        let detailedUrl = this.apiUrl + filterUrl + this.termId + major + order;
        return this.http.get(detailedUrl).map((res: Response) => res.json());
    }
    //
    // getCoursesDetails(courseId: string) {
    //     let filterUrl = '/Classes?$filter=Course/CourseId%20eq%20';
    //     let midUrl = '%20and%20Term/TermId%20eq%20';
    //     let expand = '&$expand=Term,Sections($expand=Meetings($expand=Instructors,Room($expand=Building)))';
    //     let detailedUrl = this.apiUrl + filterUrl + courseId + midUrl + this.termId + expand;
    //     return this.http.get(detailedUrl)
    //         .map((res: Response) => res.json());
    // }

    /**************************************************
     * 				Classrooms
     **************************************************/
     /**
     * Join a class
     * JSON Format:
     * {
     * 	"course": "...",
     * 	"professor": "...",
     * 	"userName": "..."
     * }
     */
     joinClass(courseName: string, professor: string, userName: string) {
         let url = '/course/join';
         let body = { "course" : courseName, "professor": professor, "userName": userName};
         let headers = new Headers();
         headers.append('Auth', localStorage.getItem('token'));
        return this.http.post(url, body, { headers: headers }) .map((res: Response) => res.json());

     }
     getCourseDetails(courseName: string) {
         let url = '/course';
         let body = { "course": courseName };
         let headers = new Headers();
         headers.append('Auth', localStorage.getItem('token'));
        return this.http.post(url, body, { headers: headers }) .map((res: Response) => res.json());

     }
     getStudents(courseName: string, professor: string) {
         let url = '/course/students';
         let body = { "course" : courseName, "professor": professor};
         let headers = new Headers();
         headers.append('Auth', localStorage.getItem('token'));
        return this.http.post(url, body, { headers: headers }) .map((res: Response) => res.json());
     }

     getNumOfStudents(courseName: string, professor: string) {
         let url = '/course/number-of-students';
         let body = { "course" : courseName, "professor": professor};
         let headers = new Headers();
         headers.append('Auth', localStorage.getItem('token'));
        return this.http.post(url, body, { headers: headers }) .map((res: Response) => res.json());
     }

     getRMP(courseName: string, professor: string) {
         let url = '/course/get-RMP';
         let body = { "course" : courseName, "professor": professor};
         let headers = new Headers();
         headers.append('Auth', localStorage.getItem('token'));
        return this.http.post(url, body, { headers: headers }) .map((res: Response) => res.json());
     }
}
