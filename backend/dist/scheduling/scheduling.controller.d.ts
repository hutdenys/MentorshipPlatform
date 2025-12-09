import { SchedulingService } from './scheduling.service';
export declare class SchedulingController {
    private readonly schedulingService;
    constructor(schedulingService: SchedulingService);
    getMentorSlots(mentorId: string): Promise<import("../entities/time-slot.entity").TimeSlot[]>;
    createTimeSlot(mentorId: string, body: {
        startAt: string;
        endAt: string;
    }): Promise<import("../entities/time-slot.entity").TimeSlot>;
    bookSession(body: {
        studentId: number;
        mentorId: number;
        slotId: number;
        meetLink: string;
    }): Promise<import("../entities/session.entity").Session>;
    cancelSession(sessionId: string, body: {
        cancelledBy: 'student' | 'mentor';
    }): Promise<import("../entities/session.entity").Session>;
    getMentorsWithSlots(): Promise<import("../entities/time-slot.entity").TimeSlot[]>;
}
