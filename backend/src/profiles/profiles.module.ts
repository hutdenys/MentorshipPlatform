import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { StudentProfile } from '../entities/student-profile.entity';
import { MentorProfile } from '../entities/mentor-profile.entity';
import { Subject } from '../entities/subject.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([StudentProfile, MentorProfile, Subject]),
    ],
    providers: [ProfilesService],
    controllers: [ProfilesController],
})
export class ProfilesModule { }
