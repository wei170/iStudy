import { Component, Input } from '@angular/core';
import { CourseService, AlertService } from '../_services/index';

@Component({
    moduleId: module.id,
    selector: 'courseDetails',
    templateUrl: 'course_details.component.html',
    inputs: ['sections']
})

export class CourseDetailsComponent {
    @Input() courseName: string;
    private rmp: {
        rating: number,
        comments: {}[]
    } = {
        "rating" : 0,
        "comments" : []
    }

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

    getRMP(professor: string) {
        this.courseService.getRMP(this.courseName, professor).subscribe(
            data => {
                this.rmp = data
            }
        );
    }
}
