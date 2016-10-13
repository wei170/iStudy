import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class UserService {
    constructor(private http: Http) { }

    getAll() {
        return this.http.get('/users').map((response: Response) => response.json());
    }

    getById(id) {
        return this.http.get('/users/' + id).map((response: Response) => response.json());
    }

    create(user) {
        return this.http.post('/users/', user).map((response: Response) => response.json());
    }

    update(user) {
        return this.http.put('/users/' + user.id, user).map((response: Response) => response.json());
    }

    delete(id) {
        return this.http.delete('/users/' + id).map((response: Response) => response.json());
    }

}
