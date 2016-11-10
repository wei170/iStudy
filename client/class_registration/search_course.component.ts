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
    private major: any;
    private number: any;
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
            this.courseService.getMajorCourses(this.model.majorInfo.SubjectId).subscribe (
                data => {
                    this.step = 1;
                    this.courses = [];// empty the array first
                    for (var i = 0; i < data.value.length; i++) {
                        this.courses.push(data.value[i]);
                    }
                },
                error => {
                    this.alertService.error(error.err);
                }
            )
        } else if (this.step === 1) {
            this.courseService.getCoursesDetails(this.model.courseInfo.CourseId).subscribe (
                data => {
                    this.step = 2;
                    this.sections = []; // empty it
                    for (var i = 0; i < data.value.length; i++) {
                        for (var j = 0; j < data.value[i].Sections.length; j++) {
                            if (data.value[i].Sections[j].Type === "Lecture") {
                                this.sections.push(data.value[i].Sections[j]);
                            }
                        }
                    }
                },
                error => {
                    this.alertService.error(error.err);
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
    }
}
