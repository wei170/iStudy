import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

@Injectable()
export class UserService {
    constructor(private http: Http) { }
    
    create(user: any) {
        return this.http.post('/users/', user).map((response: Response) => response.json());
    }
    /************** Search a user in the entire school ******************/
    searchUser(name: string) {
        // name is the user BE searched
        let url = 'users/search-user';
        let body = { "userName": name}
        let headers = new Headers();
        headers.append('Auth', localStorage.getItem('token'));
        return this.http.post(url, body, { headers: headers }).map((res: Response) => res.json());      
    }
}
