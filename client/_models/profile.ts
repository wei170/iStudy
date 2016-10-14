import { Class } from './class';
import { User } from './user';
import { Resource } from './resource';
import { Post } from './post';

export class Profile {
    profilePicture: File;
    classes: Class[];
    details: string;
    posts: Post[];
    friends: User[];
    contributions: Resource[];
    major: string;
    language: string;
}
