import { User } from './user.entity';
import { Subject } from './subject.entity';
export declare class MentorProfile {
    userId: number;
    user: User;
    bio: string;
    ratePerHour: number;
    maxSessionsPerDay: number;
    subjects: Subject[];
}
