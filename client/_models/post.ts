import { User } from './user';
import { Resource } from './resource';

export class Post {
    title: string;
    time: number;
    author: User;
    type: string;
    content: string;
    resources: Resource[];
}
