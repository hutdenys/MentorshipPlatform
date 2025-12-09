import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentProfile } from '../entities/student-profile.entity';
import { MentorProfile } from '../entities/mentor-profile.entity';
import { Subject } from '../entities/subject.entity';

@Injectable()
export class ProfilesService {
    constructor(
        @InjectRepository(StudentProfile)
        private readonly studentRepo: Repository<StudentProfile>,
        @InjectRepository(MentorProfile)
        private readonly mentorRepo: Repository<MentorProfile>,
        @InjectRepository(Subject)
        private readonly subjectRepo: Repository<Subject>,
    ) { }

    // Student profile CRUD
    async getStudentProfile(userId: number) {
        return this.studentRepo.findOne({ where: { userId } });
    }

    async updateStudentProfile(userId: number, data: Partial<StudentProfile>) {
        await this.studentRepo.update(userId, data);
        return this.getStudentProfile(userId);
    }

    // Mentor profile CRUD
    async getMentorProfile(userId: number) {
        return this.mentorRepo.findOne({ where: { userId }, relations: ['subjects'] });
    }

    async updateMentorProfile(userId: number, data: Partial<MentorProfile>) {
        await this.mentorRepo.update(userId, data);
        return this.getMentorProfile(userId);
    }

    // Subjects
    async getAllSubjects() {
        return this.subjectRepo.find();
    }
}
