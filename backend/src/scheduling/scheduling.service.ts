import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { NotificationsService } from '../notifications/notifications.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TimeSlot } from '../entities/time-slot.entity';
import { Session } from '../entities/session.entity';
import { Review } from '../entities/review.entity';

@Injectable()
export class SchedulingService {
    constructor(
        @InjectRepository(TimeSlot)
        private readonly slotRepo: Repository<TimeSlot>,
        @InjectRepository(Session)
        private readonly sessionRepo: Repository<Session>,
        @InjectRepository(Review)
        private readonly reviewRepo: Repository<Review>,
        private readonly notificationsService: NotificationsService,
    ) { }

    // Mentor time slots
    async getMentorSlots(mentorId: number) {
        return this.slotRepo.find({ where: { mentor: { id: mentorId } } });
    }

    async createTimeSlot(mentorId: number, startAt: Date, endAt: Date) {
        const slot = this.slotRepo.create({ mentor: { id: mentorId }, startAt, endAt });
        return this.slotRepo.save(slot);
    }

    // Session booking
    async bookSession(studentId: number, mentorId: number, slotId: number, meetLink: string) {
        const slot = await this.slotRepo.findOne({ where: { id: slotId } });
        if (!slot || slot.status !== 'free') throw new BadRequestException('Slot not available');
        slot.status = 'booked';
        await this.slotRepo.save(slot);
        const session = this.sessionRepo.create({ student: { id: studentId }, mentor: { id: mentorId }, timeSlot: slot, meetLink, status: 'scheduled' });
        const savedSession = await this.sessionRepo.save(session);
        // Email notification
        await this.notificationsService.sendEmail(
            slot.mentor?.email || '',
            'Session booked',
            `Session #${savedSession.id} has been booked by student #${studentId}. Meet link: ${meetLink}`
        );
        await this.notificationsService.sendEmail(
            savedSession.student?.email || '',
            'Booking confirmation',
            `Your session #${savedSession.id} with mentor #${mentorId} is confirmed. Meet link: ${meetLink}`
        );
        return savedSession;
    }

    // Session cancellation
    async cancelSession(sessionId: number, cancelledBy: 'student' | 'mentor') {
        const session = await this.sessionRepo.findOne({ where: { id: sessionId }, relations: ['timeSlot', 'student', 'mentor'] });
        if (!session) throw new NotFoundException('Session not found');
        session.status = cancelledBy === 'student' ? 'cancelled_by_student' : 'cancelled_by_mentor';
        await this.sessionRepo.save(session);
        if (session.timeSlot) {
            session.timeSlot.status = 'cancelled';
            await this.slotRepo.save(session.timeSlot);
        }
        // Email notification
        await this.notificationsService.sendEmail(
            session.mentor?.email || '',
            'Session cancelled',
            `Session #${session.id} was cancelled by ${cancelledBy}.`
        );
        await this.notificationsService.sendEmail(
            session.student?.email || '',
            'Session cancelled',
            `Your session #${session.id} was cancelled by ${cancelledBy}.`
        );
        return session;
    }

    // Mentor discovery
    async getMentorsWithSlots() {
        // This would typically join with User and MentorProfile
        return this.slotRepo.find({ where: { status: 'free' }, relations: ['mentor'] });
    }
}
