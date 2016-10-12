import { Event } from './event';
import { User } from './user';

export class Group {
    ID: number;
    name: string;
    users: User[];
    messages: string[];
    events: Event[];
}
