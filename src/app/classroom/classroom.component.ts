import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ClassroomService, CourseService, AlertService, FriendService, ProfileService } from '../_services/index';
import { Select2Module } from 'ng2-select2';

@Component({
  selector: '[classroom]',
  moduleId: module.id,
  templateUrl: './classroom.template.html',
  encapsulation: ViewEncapsulation.None
})

export class Classroom implements OnInit {
    private userClasses: [{
        name: string;
        active: boolean;
    }];
    private hasInClass: boolean = false;
    private chatUrl: string;
    private currentUser = JSON.parse(localStorage.getItem('currentUser'));
    private roomInfo: any = {};
    private studentList: [{ }];
    private numOfStudents: number;

    private languages: any[] = [];
    // private majors: any[] = [];
    private hobbies: any[] = [];

    private preference: {
        nationality: string;
        hobby: string;
        language: string;
    }= {
        "nationality": "",
        "hobby": "",
        "language": ""
    }
    constructor(
        private classroomService: ClassroomService,
        private profileService: ProfileService,
        private alertService: AlertService,
        private courseService: CourseService,
        private friendService: FriendService
    ) {}

    ngOnInit() {
        this.getEnrolledClasses();
        this.getAllChoices();
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
            }
        );
    }

    getAllChoices() {
        this.profileService.getAllLanguages().subscribe(
            data => {
                this.languages = data;
            }
        );
        this.profileService.getAllHobbies().subscribe(
            data => {
                this.hobbies = data;
            }
        );
    }

    filterStudents() {
        this.friendService.filterStudents(this.preference, this.currentUser.userName, this.roomInfo.course, this.roomInfo.professor)
        .subscribe(
            data => {
                this.studentList = data;
            }
        );
    }

    getNumOfStudents() {
        this.courseService.getNumOfStudents(this.roomInfo.course, this.roomInfo.professor).subscribe(
            data => {
                this.numOfStudents = data.number;
            }
        );
    }

    chat() {
        this.chatUrl = "/chat.html?name=" + this.currentUser.userName + "&room=" + this.roomInfo.course;
    }

    update(room: any) {
        this.roomInfo = room;
        this.getAllStudents();
        this.getNumOfStudents();
        this.hasInClass = true;
    }

    sendRequest(reciever: string) {
        this.friendService.sendFriendReq(this.currentUser.userName, reciever).subscribe(
            data => {
                this.alertService.success("Sent Request!")
            },
            error => {
                this.alertService.error("Cannot add yourself!");
            }
        );
    }

}