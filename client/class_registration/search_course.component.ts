import { Component, OnInit } from '@angular/core';

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

    private courseName: string;

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
            this.courseName = this.model.majorInfo.Abbreviation + this.model.courseInfo.Number;
            console.log(this.courseName);
            this.courseService.getCourseDetails(this.courseName).subscribe (
                data => {
                    this.step = 2;
                    this.sections = data;
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
