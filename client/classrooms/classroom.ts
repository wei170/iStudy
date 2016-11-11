import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService, AlertService } from '../_services/index';

@Component({
    moduleId: module.id,
    selector: 'classroom',
    templateUrl: 'classroom.html'
})

export class ClassroomComponent {
    private currentUser = JSON.parse(localStorage.getItem('currentUser'));
    private chatUrl: string;
    @Input() roomInfo: any;
    constructor( private router: Router) {
    }

    chat() {
        this.chatUrl = "/chat.html?name=" + this.currentUser.userName + "&room=" + this.roomInfo.name;
    }
}
