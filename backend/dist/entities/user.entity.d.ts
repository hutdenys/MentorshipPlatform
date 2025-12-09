import { StudentProfile } from './student-profile.entity';
import { MentorProfile } from './mentor-profile.entity';
import { TimeSlot } from './time-slot.entity';
import { Session } from './session.entity';
import { EmailNotification } from './email-notification.entity';
export declare class User {
    id: number;
    email: string;
    passwordHash: string;
    role: 'student' | 'mentor' | 'admin';
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    studentProfile?: StudentProfile;
    mentorProfile?: MentorProfile;
    timeSlotsAsMentor: TimeSlot[];
    sessionsAsStudent: Session[];
    sessionsAsMentor: Session[];
    emailNotifications: EmailNotification[];
}
