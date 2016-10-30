import { Professor } from './professor';
import { User } from './user';
import { Rating } from './rating';
import { Resource } from './resource';

export class Class {
    name: string;
    professors: Professor[];
    description: string;
    classmates: User[];
    ratings: Rating[];
    resources: Resource[];
}
