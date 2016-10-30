import { Component, OnInit } from '@angular/core';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { CourseService, AlertService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'search_course.component.html'
})

export class SearchCourseComponent implements OnInit{
    private loading: boolean;
    private model: any = {};
    private step = 0;
    private majors: any[] = [];
    private courses: any[] = [];
    private sections: any[] = [];
    private professorInfo: any;

    constructor(
        private alertService: AlertService,
        private courseService: CourseService
    ) {
    }

    ngOnInit() {
        this.courseService.getAllMajors().subscribe(
            data => {
                // successfully search all majors
                for (var i = 0; i < data.value.length; i++) {
                    this.majors.push(data.value[i]);
                }
            }
        )

    }

    private searchCourse() {
        if (this.step === 0) {
            this.courseService.getMajorCourses(this.model.majorId).subscribe (
                data => {
                    this.step = 1;
                    for (var i = 0; i < data.value.length; i++) {
                        this.courses.push(data.value[i]);
                    }
                },
                error => {
                    this.alertService.error(error);
                }
            )
        } else if (this.step === 1) {
            this.courseService.getCoursesDetails(this.model.courseId).subscribe (
                data => {
                    this.step = 2;
                    for (var i = 0; i < data.value[0].Sections.length; i++) {
                        this.sections.push(data.value[0].Sections[i]);
                    }
                },
                error => {
                    this.alertService.error(error);
                }
            )
        }
    }

    // private rmpHandler(professor: string) {
    //     this.professorInfo = this.rmp.getProfessorInfo(professor);
    //     return this.professorInfo;
    // }

    private back() {
        this.step--;
        this.courses = [];
    }
}
