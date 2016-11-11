import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService, AlertService } from '../_services/index';

@Component({
    moduleId: module.id,
    selector: 'classroom',
    templateUrl: 'classroom.html'
})

export class ClassroomComponent implements OnInit{
    private currentUser = JSON.parse(localStorage.getItem('currentUser'));
    private chatUrl: string;
    private studentList: [{ }];
    @Input() roomInfo: any;
    constructor(
        private router: Router,
        private courseService: CourseService
    ) {
    }

    ngOnInit() {
        this.getAllStudents();
    }

    chat() {
        this.chatUrl = "/chat.html?name=" + this.currentUser.userName + "&room=" + this.roomInfo.course;
    }

    getAllStudents() {
        console.log(this.roomInfo.professor);
        this.courseService.getStudents(this.roomInfo.course, this.roomInfo.professor).subscribe(
            data => {
                console.log(data);
                this.studentList = data;
            }
        );
    }
}
