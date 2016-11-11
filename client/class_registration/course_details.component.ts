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

}
