import { User } from './user.entity';
import { TimeSlot } from './time-slot.entity';
import { Review } from './review.entity';
import { EmailNotification } from './email-notification.entity';
export declare class Session {
    id: number;
    student: User;
    mentor: User;
    timeSlot: TimeSlot;
    meetLink: string;
    status: 'scheduled' | 'cancelled_by_student' | 'cancelled_by_mentor' | 'completed';
    createdAt: Date;
    updatedAt: Date;
    review?: Review;
    notifications: EmailNotification[];
}
