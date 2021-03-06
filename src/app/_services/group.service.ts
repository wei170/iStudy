import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

@Injectable()
export class GroupService {
    private headers: any;

    constructor( private http: Http ) {
        this.headers = new Headers();
        this.headers.append('Auth', localStorage.getItem('token'));
    }

    /************** Create a group ***************/
    /**
    * JSON Format:
        { 
            "groupName" : "....",
            "members":[
                {"userName":"..."},
                {"userName":"..."},
                {"userName":"..."}...
            ]
        }
    */
    createGroup(groupName: string, members: Array<any>) {
        let url = 'users/create-group';
        let body = {
            "groupName": groupName,
            "members": members
        };
        return this.http.post(url, body, { headers: this.headers }).map((res: Response) => res);
    }

    /****************** Get groups *****************/
    getGroups() {
        let url = 'users/get-groups';
        return this.http.get(url, { headers: this.headers }).map((res: Response) => res.json());
    }

    /***************** Leave a group *****************/
    leaveGroup(name: string) {
        let url = 'users/leave-group?groupName=' + name;
        return this.http.delete(url, { headers: this.headers }).map((res: Response) => res);
    }

    /************** Get Members ***************/
    getMembers(groupname: string) {
        let url = 'users/get-members?groupName=' + groupname;
        return this.http.get(url, { headers: this.headers }).map((res: Response) => res.json());
    }
}