import { Repository } from 'typeorm';
import { StudentProfile } from '../entities/student-profile.entity';
import { MentorProfile } from '../entities/mentor-profile.entity';
import { Subject } from '../entities/subject.entity';
export declare class ProfilesService {
    private readonly studentRepo;
    private readonly mentorRepo;
    private readonly subjectRepo;
    constructor(studentRepo: Repository<StudentProfile>, mentorRepo: Repository<MentorProfile>, subjectRepo: Repository<Subject>);
    getStudentProfile(userId: number): Promise<StudentProfile | null>;
    updateStudentProfile(userId: number, data: Partial<StudentProfile>): Promise<StudentProfile | null>;
    getMentorProfile(userId: number): Promise<MentorProfile | null>;
    updateMentorProfile(userId: number, data: Partial<MentorProfile>): Promise<MentorProfile | null>;
    getAllSubjects(): Promise<Subject[]>;
}
