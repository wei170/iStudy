import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import * as moment from '../../assets/public/javascripts/moment.js';
declare var jQuery: any;

@Injectable()
export class ChatService {
    private name: string = JSON.parse(localStorage.getItem('currentUser')).userName;
    private chatAnchor: string;
    private socket: any;
    constructor() {
        // need to fix if server changed
        this.socket = io()
    }

    connect(room: string) {
        this.socket.emit('joinRoom', {
            name: this.name,
            room: room
        });
    }

    getMessage(room: string) {
        this.socket.on('message', function (message) {
            let momentTimestamp = moment.utc(message.timestamp);
            let $messages = jQuery('#chat-'+ room);
            let $message = jQuery('<li class="list-group-item"></li>');

            $message.append('<p><strong>' + message.name + ' ' + momentTimestamp.local().format('h:mm:ss a') + '</strong></p>');
            $message.append('<p>' + message.text + '</p>');
            $messages.append($message);
        });
    }

    sendMessage(message: string) {
        this.socket.emit('message', {
            name: this.name,
            text: message
        })
    }
}