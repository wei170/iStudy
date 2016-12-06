import { Component, Input } from '@angular/core';
import { CourseService, AlertService } from '../_services/index';
import * as RMPApi from 'rmp-api';


@Component({
    moduleId: module.id,
    selector: 'courseDetails',
    templateUrl: 'course_details.component.html',
    styleUrls: ['../profile/profile.style.scss', 'course_details.style.css'],
    inputs: ['sections']
})

export class CourseDetailsComponent {
    @Input() courseName: string;
    private rmp: any;
    //     fname: string,
    //     lname: string,
    //     quality: string,
    //     easiness: string,
    //     help: string,
    //     grade: string,
    //     comments: any[]
    // } = {
    //     "fname": "",
    //     "lname": "",
    //     "quality": "0",
    //     "easiness": "0",
    //     "help": "0",
    //     "grade": "0",
    //     comments: [],
    // }
    constructor(
        private courseService: CourseService,
        private alertService: AlertService
    ) {}

    joinClass(professor: string) {
        var userName = JSON.parse(localStorage.getItem('currentUser')).userName;
        this.courseService.joinClass(this.courseName, professor, userName).subscribe(
            data => {
                this.alertService.success("Sucessfully join the class!");
            },
            err => {
                this.alertService.error(err);
            }
        )
    }

    getRMP(name: string) {
        let callback = function(professor) {
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

        console.log(RMPApi.get("Dunsmore", callback));
    }
}
