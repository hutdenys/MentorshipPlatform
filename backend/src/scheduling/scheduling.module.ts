import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchedulingService } from './scheduling.service';
import { SchedulingController } from './scheduling.controller';
import { TimeSlot } from '../entities/time-slot.entity';
import { Session } from '../entities/session.entity';
import { Review } from '../entities/review.entity';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([TimeSlot, Session, Review]),
        NotificationsModule,
    ],
    providers: [SchedulingService],
    controllers: [SchedulingController],
})
export class SchedulingModule { }
