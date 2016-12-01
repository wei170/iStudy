import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class UserService {
    constructor(private http: Http) { }
    
    create(user: any) {
        return this.http.post('/users/', user).map((response: Response) => response.json());
    }

}
