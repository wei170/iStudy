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

    constructor(
        private chatService: ChatService,
        private groupService: GroupService,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        this.connect();
        this.getMessage();
    }

    ngOnDestroy() {
        this.chatService.disconnect();
    }

    connect() { this.chatService.connect(this.roomName); }

    getMessage() { this.chatService.getMessage(this.roomName); }

    sendMessage() { this.chatService.sendMessage(this.roomName, this.message); }

    /************** Leave a group ***************/
    leaveGroup(groupname: string) {
        this.groupService.leaveGroup(groupname);
        this.alertService.success("Sucessfully leave " + groupname + " .");
    }
}