import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ChatService, GroupService } from '../../../_services/index';

@Component({

  selector: '[chat-message]',
  templateUrl: './chat-message.template.html'
})
export class ChatMessage {
  @Input() open: boolean;
  @Input() roomName: string;
  @Output() chatMessageClosed = new EventEmitter();
  newMessage: string = '';
  private userName: string = JSON.parse(localStorage.getItem('currentUser')).userName;

  closeChatArea(): void {
    this.open = false;
    this.chatMessageClosed.emit('');
  }

  message: any;
  private memberList: any[] = [];
  private chatService: any;

  constructor(
  ) {
    this.chatService = new ChatService();
  }

  ngOnInit() {
    this.connect();
    this.getMessage();
  }

  ngOnDestroy() {
    this.chatService.disconnect();
  }

  connect() { this.chatService.connect(this.roomName); }

  getMessage() { this.chatService.getMessage(this.roomName); }

  sendMessage() {
    console.log(this.newMessage);
    this.chatService.sendMessage(this.roomName, this.newMessage);
    this.newMessage = "";
  }

}
