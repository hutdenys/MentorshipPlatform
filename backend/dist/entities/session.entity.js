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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const time_slot_entity_1 = require("./time-slot.entity");
const review_entity_1 = require("./review.entity");
const email_notification_entity_1 = require("./email-notification.entity");
let Session = class Session {
};
exports.Session = Session;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Session.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (u) => u.sessionsAsStudent, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'student_id' }),
    __metadata("design:type", user_entity_1.User)
], Session.prototype, "student", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (u) => u.sessionsAsMentor, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'mentor_id' }),
    __metadata("design:type", user_entity_1.User)
], Session.prototype, "mentor", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => time_slot_entity_1.TimeSlot, (slot) => slot.sessions, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'time_slot_id' }),
    __metadata("design:type", time_slot_entity_1.TimeSlot)
], Session.prototype, "timeSlot", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Session.prototype, "meetLink", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['scheduled', 'cancelled_by_student', 'cancelled_by_mentor', 'completed'],
        default: 'scheduled',
    }),
    __metadata("design:type", String)
], Session.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Session.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Session.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => review_entity_1.Review, (r) => r.session),
    __metadata("design:type", review_entity_1.Review)
], Session.prototype, "review", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => email_notification_entity_1.EmailNotification, (n) => n.session),
    __metadata("design:type", Array)
], Session.prototype, "notifications", void 0);
exports.Session = Session = __decorate([
    (0, typeorm_1.Entity)('sessions')
], Session);
//# sourceMappingURL=session.entity.js.map