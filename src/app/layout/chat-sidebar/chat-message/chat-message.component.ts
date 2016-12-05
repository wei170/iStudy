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
  private privateRoom: string;
  private newMessage: string = '';
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
  }

  ngOnChanges() {
    this.privateRoom = this.roomName > this.userName ? this.userName+" & "+this.roomName : this.roomName+" & "+this.userName;
      console.log(this.roomName);
    console.log(this.privateRoom);
    this.chatService = new ChatService();
    this.connect();
    this.getMessage();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.chatService.disconnect();
  }

  connect() {
    this.chatService.connect(this.privateRoom); 
  }

  getMessage() { this.chatService.getMessage(this.privateRoom); }

  sendMessage() {
    console.log(this.newMessage);
    this.chatService.sendMessage(this.privateRoom, this.newMessage);
    this.newMessage = "";
  }

}
