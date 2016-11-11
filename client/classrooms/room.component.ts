import { Component, OnInit } from '@angular/core';

import { ClassroomService, CourseService, AlertService, FriendService } from '../_services/index';

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
        private alertService: AlertService,
        private courseService: CourseService,
        private friendService: FriendService
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
    }

    update(room: any) {
        this.roomInfo = room;
        this.getAllStudents();
    }

    sendRequest(reciever: string) {
        this.friendService.sendFriendReq(this.currentUser.userName, reciever).subscribe(
            data => {
                this.alertService.success("Sent Request!")
            },
            error => {
                this.alertService.error(error);
            }
        );
    }

}
