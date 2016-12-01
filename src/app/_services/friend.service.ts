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

    /*********************** Get, Add, Request or Filter Friend ***********************/
    // get friend list
    getFriends (username: string) {
        let url = 'users/get-friends';
        let body = { "userName": username }
        return this.http.post(url, body, { headers: this.headers }).map((res: Response) => res.json());
    }

    // send friend request
    sendFriendReq (senderName: string, receiverName: string) {
        let url = 'users/send-friend-request';
        let body = { "senderName": senderName, "receiverName": receiverName }
        return this.http.post(url, body, { headers: this.headers }).map((res: Response) => res.json());
    }

    // get friend requests
    getFriendReq (username: string) {
        let url = 'users/get-friend-requests';
        let body = { "userName": username }
        return this.http.post(url, body, { headers: this.headers }).map((res: Response) => res.json());
    }

    // get friend invitations
    getFriendInvitations (username: string) {
        let url = 'users/get-friend-invitations';
        let body = { "userName": username }
        return this.http.post(url, body, { headers: this.headers }).map((res: Response) => res.json());
    }

    // Accept Or Decline Request
    // need to update info of status code
    responseToRequest(user: string, sender: string, status_code: number) {
        let url = 'users/invitation-accept-or-not';
        let body = { "sender": sender, "receiver": user, "status_code": status_code}
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
        let url = 'users/find-friends';
        let body = {
            "userName": userName,
            "course": course,
            "professor": professor,
            "preference": preference
        }
        return this.http.post(url, body, { headers: this.headers }).map((res: Response) => res.json());
    }

    /************* Delete Friend *************/
    unFriend(murder: string, victim: string) {
        /**
         * JSON Format: {
         * 		"userName": "...",
         * 		"friendName": "..."
         * }
	     */
        let url = 'users/delete-friend';
        let body = { "userName": murder, "friendName": victim}
        return this.http.post(url, body, { headers: this.headers }).map((res: Response) => res.json());         
    }
}
