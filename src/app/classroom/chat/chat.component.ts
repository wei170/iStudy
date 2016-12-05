import { Component, OnInit, ViewEncapsulation, Input, OnDestroy } from '@angular/core';

import { ChatService, AlertService, GroupService } from '../../_services/index';

@Component({
    selector: 'chat',
    moduleId: module.id,
    templateUrl: './chat.template.html',
    encapsulation: ViewEncapsulation.None
})

export class Chat implements OnInit {
    @Input() roomName: string;
    @Input() type: number; // 1: class Rnadom chat; 2: group chat
    message: any;
    private memberList: any[] = [];
    private chatService: any;

    constructor(
        private groupService: GroupService,
        private alertService: AlertService
    ) {
        this.chatService = new ChatService();
    }

    ngOnInit() {
        this.connect();
        this.getMessage();
        this.getMembers();
    }

    ngOnDestroy() {
        this.chatService.disconnect();
    }

    connect() { this.chatService.connect(this.roomName); }

    getMessage() { this.chatService.getMessage(this.roomName); }

    sendMessage() { 
        this.chatService.sendMessage(this.roomName, this.message); 
        this.message = "";
    }

    /************** Leave a group ***************/
    leaveGroup() {
        this.groupService.leaveGroup(this.roomName).subscribe(
            data => {
                this.alertService.success("Sucessfully leave " + this.roomName + " .");
            }
        );
    }

    /************** Get memberlist ***************/
    getMembers() {
        if (this.type === 2) {
            this.groupService.getMembers(this.roomName).subscribe(
                data => {
                    this.memberList = data.people;
                },
                error => {
                    console.log(error);
                }
            );
        }
    }
}