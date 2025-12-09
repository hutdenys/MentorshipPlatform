"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchedulingService = void 0;
const common_1 = require("@nestjs/common");
const notifications_service_1 = require("../notifications/notifications.service");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const time_slot_entity_1 = require("../entities/time-slot.entity");
const session_entity_1 = require("../entities/session.entity");
const review_entity_1 = require("../entities/review.entity");
let SchedulingService = class SchedulingService {
    constructor(slotRepo, sessionRepo, reviewRepo, notificationsService) {
        this.slotRepo = slotRepo;
        this.sessionRepo = sessionRepo;
        this.reviewRepo = reviewRepo;
        this.notificationsService = notificationsService;
    }
    async getMentorSlots(mentorId) {
        return this.slotRepo.find({ where: { mentor: { id: mentorId } } });
    }
    async createTimeSlot(mentorId, startAt, endAt) {
        const slot = this.slotRepo.create({ mentor: { id: mentorId }, startAt, endAt });
        return this.slotRepo.save(slot);
    }
    async bookSession(studentId, mentorId, slotId, meetLink) {
        var _a, _b;
        const slot = await this.slotRepo.findOne({ where: { id: slotId } });
        if (!slot || slot.status !== 'free')
            throw new common_1.BadRequestException('Slot not available');
        slot.status = 'booked';
        await this.slotRepo.save(slot);
        const session = this.sessionRepo.create({ student: { id: studentId }, mentor: { id: mentorId }, timeSlot: slot, meetLink, status: 'scheduled' });
        const savedSession = await this.sessionRepo.save(session);
        await this.notificationsService.sendEmail(((_a = slot.mentor) === null || _a === void 0 ? void 0 : _a.email) || '', 'Session booked', `Session #${savedSession.id} has been booked by student #${studentId}. Meet link: ${meetLink}`);
        await this.notificationsService.sendEmail(((_b = savedSession.student) === null || _b === void 0 ? void 0 : _b.email) || '', 'Booking confirmation', `Your session #${savedSession.id} with mentor #${mentorId} is confirmed. Meet link: ${meetLink}`);
        return savedSession;
    }
    async cancelSession(sessionId, cancelledBy) {
        var _a, _b;
        const session = await this.sessionRepo.findOne({ where: { id: sessionId }, relations: ['timeSlot', 'student', 'mentor'] });
        if (!session)
            throw new common_1.NotFoundException('Session not found');
        session.status = cancelledBy === 'student' ? 'cancelled_by_student' : 'cancelled_by_mentor';
        await this.sessionRepo.save(session);
        if (session.timeSlot) {
            session.timeSlot.status = 'cancelled';
            await this.slotRepo.save(session.timeSlot);
        }
        await this.notificationsService.sendEmail(((_a = session.mentor) === null || _a === void 0 ? void 0 : _a.email) || '', 'Session cancelled', `Session #${session.id} was cancelled by ${cancelledBy}.`);
        await this.notificationsService.sendEmail(((_b = session.student) === null || _b === void 0 ? void 0 : _b.email) || '', 'Session cancelled', `Your session #${session.id} was cancelled by ${cancelledBy}.`);
        return session;
    }
    async getMentorsWithSlots() {
        return this.slotRepo.find({ where: { status: 'free' }, relations: ['mentor'] });
    }
};
exports.SchedulingService = SchedulingService;
exports.SchedulingService = SchedulingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(time_slot_entity_1.TimeSlot)),
    __param(1, (0, typeorm_1.InjectRepository)(session_entity_1.Session)),
    __param(2, (0, typeorm_1.InjectRepository)(review_entity_1.Review)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        notifications_service_1.NotificationsService])
], SchedulingService);
//# sourceMappingURL=scheduling.service.js.map