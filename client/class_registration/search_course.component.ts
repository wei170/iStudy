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
    private step = 0;

    constructor(
        private router: Router,
        private alertService: AlertService,
        private courseService: CourseService
    ) {}

    ngOnInit() {}

    private majors = [
        { value: "CS", display: "CS" },
        { value: "MGMT", display: "MGMT"},
        { value: "OBHR", display: "OBHR"},
        { value: "MATH", display: "MATH"},
        { value: "PHYS", display: "PHYS"}
    ];

    private courses = [];
    private course: any = {};

    private searchCourse() {
        if (this.step === 0) {
            this.courseService.searchMajor(this.model.major)
            .subscribe(
                data => {
                    // successfully search the course
                    this.step = 1;
                    console.log(JSON.stringify(data));
                    for (var i = 0; i < data.length; i++) {
                        this.courses.push(data[i]);
                    }
                },
                error => {
                    this.alertService.error(error);
                }
            )
        } else if (this.step === 1) {
            this.courseService.searchCourse(this.model.courseName)
            .subscribe (
                data => {
                    this.step = 2;
                    this.course = data;
                },
                error => {
                    this.alertService.error(error);
                }
            )
        }
    }

    private back() {
        this.step = 0;
    }
}
