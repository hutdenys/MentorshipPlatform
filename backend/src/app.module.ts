
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';
import { SchedulingModule } from './scheduling/scheduling.module';
import { NotificationsModule } from './notifications/notifications.module';
import { IntegrationsModule } from './integrations/integrations.module';
import { User } from './entities/user.entity';
import { MentorProfile } from './entities/mentor-profile.entity';
import { StudentProfile } from './entities/student-profile.entity';
import { Subject } from './entities/subject.entity';
import { Session } from './entities/session.entity';
import { TimeSlot } from './entities/time-slot.entity';
import { Review } from './entities/review.entity';
import { EmailNotification } from './entities/email-notification.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mariadb',
            host: process.env.DB_HOST || 'db',
            port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
            username: process.env.DB_USERNAME || 'mentorship',
            password: process.env.DB_PASSWORD || 'mentorshippass',
            database: process.env.DB_DATABASE || 'mentorship',
            entities: [
                User,
                MentorProfile,
                StudentProfile,
                Subject,
                Session,
                TimeSlot,
                Review,
                EmailNotification,
            ],
            synchronize: true,
        }),
        AuthModule,
        UsersModule,
        ProfilesModule,
        SchedulingModule,
        NotificationsModule,
        IntegrationsModule,
    ],
})
export class AppModule { }
