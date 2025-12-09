import { User } from './user.entity';
import { Session } from './session.entity';
export declare class EmailNotification {
    id: number;
    user: User;
    session?: Session;
    type: 'booking_confirmation' | 'booking_cancelled' | 'reminder';
    status: 'queued' | 'sent' | 'failed';
    createdAt: Date;
    sentAt?: Date;
    errorMessage?: string;
}
