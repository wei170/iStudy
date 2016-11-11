import { Component, OnInit } from '@angular/core';

import { ClassroomService, AlertService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'room.component.html',
    styleUrls: ['room.component.css']
})

export class RoomComponent implements OnInit {
    private userClasses: [{
        name: string;
    }];
    private roomInfo: any = {};
    constructor(
        private classroomService: ClassroomService
    ) {}

    ngOnInit() {
        this.getEnrolledClasses();
    }

    getEnrolledClasses() {
        this.classroomService.getUserCourseList().subscribe(
            data => {
                this.userClasses = data;
            }
        );
    }

    update(room: any) {
        this.roomInfo = room;
    }
}
