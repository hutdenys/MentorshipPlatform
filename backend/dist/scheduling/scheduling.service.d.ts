import { NotificationsService } from '../notifications/notifications.service';
import { Repository } from 'typeorm';
import { TimeSlot } from '../entities/time-slot.entity';
import { Session } from '../entities/session.entity';
import { Review } from '../entities/review.entity';
export declare class SchedulingService {
    private readonly slotRepo;
    private readonly sessionRepo;
    private readonly reviewRepo;
    private readonly notificationsService;
    constructor(slotRepo: Repository<TimeSlot>, sessionRepo: Repository<Session>, reviewRepo: Repository<Review>, notificationsService: NotificationsService);
    getMentorSlots(mentorId: number): Promise<TimeSlot[]>;
    createTimeSlot(mentorId: number, startAt: Date, endAt: Date): Promise<TimeSlot>;
    bookSession(studentId: number, mentorId: number, slotId: number, meetLink: string): Promise<Session>;
    cancelSession(sessionId: number, cancelledBy: 'student' | 'mentor'): Promise<Session>;
    getMentorsWithSlots(): Promise<TimeSlot[]>;
}
