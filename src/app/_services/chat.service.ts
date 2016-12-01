import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class ChatService {
    constructor(private http: Http) { }
    
    create(url: string) {
        return this.http.get(url).map((response: Response) => response);
    }
}