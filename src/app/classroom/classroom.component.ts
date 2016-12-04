import { Component, OnInit, ViewEncapsulation, AfterViewInit, OnDestroy } from '@angular/core';

import { ClassroomService, CourseService, AlertService, FriendService, ProfileService, PopupService, ChatService, GroupService } from '../_services/index';
declare var jQuery: any;

@Component({
    selector: '[classroom]',
    moduleId: module.id,
    templateUrl: './classroom.template.html',
    styleUrls: ['./classroom.style.css'],
    encapsulation: ViewEncapsulation.None
})

export class Classroom implements OnInit {
    private userClasses: [{
        name: string;
        active: boolean;
    }];
    private currentUser = JSON.parse(localStorage.getItem('currentUser'));
    private studentList: [{ }];
    private numOfStudents: number;

    private languages: any[] = [];
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

    private groupList: any[] = [];
    private toGroup: boolean = false;

    private memberList: Array<any> = [];

    constructor(
        private classroomService: ClassroomService,
        private profileService: ProfileService,
        private alertService: AlertService,
        private courseService: CourseService,
        private friendService: FriendService,
        private popupService: PopupService,
        private groupService: GroupService
    ) {
    }

    ngOnInit() {
        this.getEnrolledClasses();
        this.getAllChoices();
        this.getGroups();
    }

    ngAfterViewInit() {
        jQuery(window).resize(function() {
            jQuery('.widget').height(jQuery(window).height() - 250);
        });

        jQuery(window).trigger('resize');

        jQuery('.widget').css({overflow: 'auto'});
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

    update(room: any) {
        this.getAllStudents(room);
        this.getNumOfStudents(room);
    }

    sendRequest(reciever: string) {
        this.friendService.sendFriendReq(this.currentUser.userName, reciever).subscribe(
            data => {
                this.alertService.success("Sent Request To " + reciever);
            },
            error => {
                this.alertService.error(JSON.parse(error._body));
            }
        );
    }

    popInfo (userName: string) {
        this.popupService.popUser(userName);
    }

    leaveClass(room: any) {
        this.popupService.popConfirm("Leave Class", "Are you sure to leave the class, "+ this.currentUser.userName + "?")
        .catch(res => console.log("You make a brilliant choice!"))
        .then(res =>  {
            if (res) {
                this.classroomService.leaveClass(room.course, room.professor).subscribe(
                    data => {
                        this.alertService.success("Sucessfully leave the class, peace!");
                        this.getEnrolledClasses();
                    },
                    error => {
                        console.log(error);
                        this.alertService.error(error);
                    }
                )
            }
        });
    }

    /***************** To make a group ******************/
    createGroup() {
        // this.groupService()
        // for (let s in this.studentList) {
        //     if (s.selected) {

        //     }
        // }
        // this.toGroup = false;
    }

    /*********** Get All Group The User Are In **********/
    getGroups() {
        this.groupService.getGroups().subscribe(
            data => {
                this.groupList = data;
            },
            error => {
                this.alertService.error("There is an error when getting your group list.");
            }
        );
    }
}