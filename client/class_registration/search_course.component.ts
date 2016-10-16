import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService } from '../_services/index';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CourseService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'search_course.component.html'
})

export class SearchCourseComponent implements OnInit{
    private loading: boolean
    private model: any = {};
    constructor(
        private router: Router,
        private alertService: AlertService,
        private courseService: CourseService
    ) {}

    ngOnInit() {}

    private courseNames = [
        { value: "CS", display: "CS" },
        { value: "MGMT", display: "MGMT"},
        { value: "OBHR", display: "OBHR"},
        { value: "MATH", display: "MATH"},
        { value: "PHYS", display: "PHYS"}
    ];

    private searchCourse() {
        this.courseService.searchCourse(this.model)
        .subscribe(
            data => {
                // successfully search the course
                this.router.navigate(['/class_registration']);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            }
        )
    }
}
