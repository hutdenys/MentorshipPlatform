import { User } from './user.entity';
import { Session } from './session.entity';
export declare class TimeSlot {
    id: number;
    mentor: User;
    startAt: Date;
    endAt: Date;
    status: 'free' | 'booked' | 'cancelled' | 'blocked';
    createdAt: Date;
    sessions: Session[];
}
