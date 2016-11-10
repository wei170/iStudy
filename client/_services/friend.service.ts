import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

@Injectable()
export class FriendService {
    private messages: any[];
    private headers: any;

    constructor( private http: Http ) {
        this.headers = new Headers();
        this.headers.append('Auth', localStorage.getItem('token'));
    }

    // get friend list
    getFriends (username: string) {
        var url = 'users/get-friends';
        var body = { "userName": username }
        return this.http.post(url, body, { headers: this.headers }).map((res: Response) => {res.json();});
    }

    // send friend request
    sendFriendReq (senderName: string, receiverName: string) {
        var url = 'users/send-friend-request';
        var body = { "senderName": senderName, "receiverName": receiverName }
        return this.http.post(url, body, { headers: this.headers }).map((res: Response) => {res.json();});
    }

    // get friend requests
    getFriendReq (username: string) {
        var url = 'users/get-friend-requests';
        var body = { "userName": username }
        return this.http.post(url, body, { headers: this.headers }).map((res: Response) => {res.json();});
    }

    // get friend invitations
    getFriendInvitations (username: string) {
        var url = 'users/get-friend-invitations';
        var body = { "userName": username }
        return this.http.post(url, body, { headers: this.headers }).map((res: Response) => {res.json();});
    }

    // Accept Or Decline Request
    // need to update info of status code
    responseToRequest(sender: string, receiver: string, status_code:string) {
        var url = 'users/get-friend-invitations';
        var body = { "sender": sender, "receiver": receiver, "status_code": status_code}
        return this.http.post(url, body, { headers: this.headers }).map((res: Response) => {res.json();});
    }

}
