import { Component, OnInit } from '@angular/core';

import { ClassroomService, CourseService, AlertService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'room.component.html',
    styleUrls: ['room.component.css']
})

export class RoomComponent implements OnInit {
    private userClasses: [{
        name: string;
    }];
    private chatUrl: string;
    private currentUser = JSON.parse(localStorage.getItem('currentUser'));
    private roomInfo: any = {};
    private studentList: [{ }];
    constructor(
        private classroomService: ClassroomService,
        private courseService: CourseService
    ) {}

    ngOnInit() {
        this.getEnrolledClasses();
    }

    getEnrolledClasses() {
        this.classroomService.getUserCourseList().subscribe(
            data => {
                this.userClasses = data.courses;
            }
        );
    }

    getAllStudents() {
        this.courseService.getStudents(this.roomInfo.course, this.roomInfo.professor).subscribe(
            data => {
                this.studentList = data;
                console.log(this.studentList[0]);
            }
        );
    }

    chat() {
        this.chatUrl = "/chat.html?name=" + this.currentUser.userName + "&room=" + this.roomInfo.course;
        console.log("check");
    }

    update(room: any) {
        this.roomInfo = room;
        this.getAllStudents();
    }

}
