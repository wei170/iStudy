import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class FriendService {
    private headers: any;

    constructor( private http: Http ) {
        this.headers = new Headers();
        this.headers.append('Auth', localStorage.getItem('token'));
    }

    // get friend list
    getFriends (username: string) {
        var url = 'users/get-friends';
        var body = { "userName": username }
        return this.http.post(url, body, { headers: this.headers }).map((res: Response) => res.json());
    }

    // send friend request
    sendFriendReq (senderName: string, receiverName: string) {
        var url = 'users/send-friend-request';
        var body = { "senderName": senderName, "receiverName": receiverName }
        return this.http.post(url, body, { headers: this.headers }).map((res: Response) => res.json());
    }

    // get friend requests
    getFriendReq (username: string) {
        var url = 'users/get-friend-requests';
        var body = { "userName": username }
        return this.http.post(url, body, { headers: this.headers }).map((res: Response) => res.json());
    }

    // get friend invitations
    getFriendInvitations (username: string) {
        var url = 'users/get-friend-invitations';
        var body = { "userName": username }
        return this.http.post(url, body, { headers: this.headers }).map((res: Response) => res.json());
    }

    // Accept Or Decline Request
    // need to update info of status code
    responseToRequest(user: string, sender: string, status_code: number) {
        var url = 'users/invitation-accept-or-not';
        var body = { "sender": sender, "receiver": user, "status_code": status_code}
        return this.http.post(url, body, { headers: this.headers }).map((res: Response) => res.json());
    }

    /**
    * JSON Format: {
    * 		"userName": "...",
    * 		"course": "...",
    * 		"professor": "...",
    * 		"preference" : {
    * 			"nationality": "...",
    * 			"hobby": "...",
    * 			"language": "..."
    * 		}
    */
    filterStudents(preference: any, userName: string, course: string, professor: string) {
        var url = 'users/find-friends';
        var body = {
            "userName": userName,
            "course": course,
            "professor": professor,
            "preference": preference
        }
        return this.http.post(url, body, { headers: this.headers }).map((res: Response) => res.json());
    }

}
