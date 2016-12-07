import { Component, Input } from '@angular/core';
import { CourseService, AlertService, PopupService } from '../_services/index';
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
    private purdueRMP: any;
    private rmp: {
        fname: string,
        lname: string,
        quality: string,
        easiness: string,
        help: string,
        grade: string,
        url: string,
        university: string
        comments: any[]
    } = {
        "fname": "",
        "lname": "",
        "quality": "0",
        "easiness": "0",
        "help": "0",
        "grade": "0",
        "url": "",
        "university": "",
        comments: [],
    }
    constructor(
        private courseService: CourseService,
        private alertService: AlertService,
        private popup: PopupService
    ) {
        this.purdueRMP = RMPApi("Purdue University")("West Lafayette");
    }

    joinClass(professor: string) {
        var userName = JSON.parse(localStorage.getItem('currentUser')).userName;
        this.courseService.joinClass(this.courseName, professor, userName).subscribe(
            data => {
                data.subscribe(
                    data => {
                        this.alertService.success("Sucessfully join the class!")
                    }
                );
            },
            err => {
                this.alertService.error(err);
            }
        )
    }

    getRMP(name: string) {
        let fullName = name.split(" ");
        name = fullName[0]+" "+fullName[fullName.length-1];
        this.purdueRMP.get(name, (professor) => {
            if (professor === null) {
                this.popup.generalPop('<h4 class="modal-title">Sorry :(</h4>', '<p>Professor Not Found!</p>')
                return;
            }
            
            this.rmp = professor;
            this.popup.generalPop(
                '<h4 class="modal-title"><strong>' + this.rmp.fname+ " " + this.rmp.lname + '</strong><br>from '+ this.rmp.university + '</h4>', 
                '<p>Quality: '+this.rmp.quality+'</p><p>Easiness: ' + this.rmp.easiness + '</p><p>Helpfulness: ' + this.rmp.help + 
                '</p><p>Average Grade: ' + this.rmp.grade + '</p>' + 'First comment: ' + this.rmp.comments[0]+ '</p>' + 
                '<a href="' + this.rmp.url + '">Go to ' + this.rmp.lname + '\'s RateMyProfessor page!</a><p>');
        });
    }
}
