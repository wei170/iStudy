import { Component, OnInit, ViewEncapsulation, ElementRef } from '@angular/core';

import { ClassroomService, CourseService, AlertService, FriendService, ProfileService, PopupService } from '../_services/index';
import { Select2Module } from 'ng2-select2';
declare var jQuery: any;

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
    private chatUrl: string;
    private currentUser = JSON.parse(localStorage.getItem('currentUser'));
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
        private friendService: FriendService,
        private popupService: PopupService
    ) {}

    ngOnInit() {
        // jQuery('chatContent').load(this.)
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

    getAllStudents(room: any) {
        this.courseService.getStudents(room.course, room.professor).subscribe(
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

    filterStudents(room: any) {
        this.friendService.filterStudents(this.preference, this.currentUser.userName, room.course, room.professor)
        .subscribe(
            data => {
                this.studentList = data;
            }
        );
    }

    getNumOfStudents(room: any) {
        this.courseService.getNumOfStudents(room.course, room.professor).subscribe(
            data => {
                this.numOfStudents = data.number;
            }
        );
    }

    chat(room: any) {
        this.chatUrl = "/chat.html?name=" + this.currentUser.userName + "&room=" + room.course;
    }

    update(room: any) {
        this.getAllStudents(room);
        this.getNumOfStudents(room);
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

    popInfo (userName: string) {
        this.popupService.popUser(userName);
    }

}