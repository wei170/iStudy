import { User } from './user';
export class Rating {
    category: string;
    rank: number;
    comment: string;
    positives: User[];
    negatives: User[];
}
