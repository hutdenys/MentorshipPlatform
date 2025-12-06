import { Session } from './session.entity';
export declare class Review {
    id: number;
    session: Session;
    rating: number;
    comment: string;
    createdAt: Date;
}
