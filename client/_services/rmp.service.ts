import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class RMPService {
    constructor( private http: Http) {}

    getProfessorInfo(name: string) {
        var rmp_url = 'https://api.morph.io/chrisguags/ratemyprofessors/data.json';
        var params = {
            // Keep this key secret!
            key: 'xABz9pgTrRX6JVP6fGfI',
            query: "select * from 'data' where College = 'Purdue' and Name = '" + name + "'"
        };
        return this.http.get(rmp_url + '?' + $.param(params)).map((response: Response) => response.json());
    }
}
