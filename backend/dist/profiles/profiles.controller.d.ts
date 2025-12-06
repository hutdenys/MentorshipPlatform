import { ProfilesService } from './profiles.service';
export declare class ProfilesController {
    private readonly profilesService;
    constructor(profilesService: ProfilesService);
    getStudentProfile(userId: string): Promise<import("../entities/student-profile.entity").StudentProfile | null>;
    updateStudentProfile(userId: string, data: any): Promise<import("../entities/student-profile.entity").StudentProfile | null>;
    getMentorProfile(userId: string): Promise<import("../entities/mentor-profile.entity").MentorProfile | null>;
    updateMentorProfile(userId: string, data: any): Promise<import("../entities/mentor-profile.entity").MentorProfile | null>;
    getAllSubjects(): Promise<import("../entities/subject.entity").Subject[]>;
}
