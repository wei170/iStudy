import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

import { ChatService } from '../../_services/index';

@Component({
    selector: 'chat',
    moduleId: module.id,
    templateUrl: './chat.template.html',
    encapsulation: ViewEncapsulation.None
})

export class Chat implements OnInit {
    @Input() roomName: string;
    message: any;

    constructor(private chatService: ChatService) {
    }

    ngOnInit() {
        this.connet();
        this.getMessage();
    }

    connet() { this.chatService.connect(this.roomName); }

    getMessage() { this.chatService.getMessage(this.roomName); }

    sendMessage() { this.chatService.sendMessage(this.message); }
}