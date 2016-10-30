import { Injectable } from '@angular/core';
import * as RMP from 'rmp-api';
import 'rxjs/add/operator/map';

@Injectable()
export class RMPService {
    constructor( private rmp: RMP ) {}

    getProfessorInfo(name: string) {
        var callback = function(professor: any) {
            if (professor === null) {
                console.log("No professor found.");
                return;
            }
            console.log("Name: " + professor.fname + " " + professor.lname);
            console.log("University: "+ professor.university);
            console.log("Quality: " + professor.quality);
            console.log("Easiness: " + professor.easiness);
            console.log("Helpfulness: " + professor.help);
            console.log("Average Grade: " + professor.grade);
            console.log("Chili: " + professor.chili);
            console.log("URL: " + professor.url);
            console.log("First comment: " + professor.comments[0]);
        };
        this.rmp.get(name, callback);
        return callback;
    }
}
