import { Injectable, Output } from '@angular/core';
import * as io from 'socket.io-client';
import * as moment from '../../assets/public/javascripts/moment.js';
declare var jQuery: any;

@Injectable()
export class ChatService {
    private name: string = JSON.parse(localStorage.getItem('currentUser')).userName;
    private chatAnchor: string;
    private socket: any;
    messageList: Array<any> = [];
    constructor() {
        // need to fix if server changed
    }

    connect(room: string) {
        this.socket = new io()
        this.socket.emit('joinRoom', {
            name: this.name,
            room: room
        });
    }

    getMessage(room: string) {
        this.socket.on('message', (message) => {
            let momentTimestamp = moment.utc(message.timestamp);
            this.messageList.push({
                "name": message.name,
                "time": momentTimestamp.local().format('h:mm:ss a'),
                "message": message.text
            });
        });
    }

    sendMessage(room, message: string) {
        this.socket.emit('message', {
            name: this.name,
            text: message
        })
    }

    disconnect() {
        this.socket.disconnect();
    }
}