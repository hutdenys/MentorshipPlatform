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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const student_profile_entity_1 = require("./student-profile.entity");
const mentor_profile_entity_1 = require("./mentor-profile.entity");
const time_slot_entity_1 = require("./time-slot.entity");
const session_entity_1 = require("./session.entity");
const email_notification_entity_1 = require("./email-notification.entity");
let User = class User {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "passwordHash", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['student', 'mentor', 'admin'],
    }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => student_profile_entity_1.StudentProfile, (p) => p.user),
    __metadata("design:type", student_profile_entity_1.StudentProfile)
], User.prototype, "studentProfile", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => mentor_profile_entity_1.MentorProfile, (p) => p.user),
    __metadata("design:type", mentor_profile_entity_1.MentorProfile)
], User.prototype, "mentorProfile", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => time_slot_entity_1.TimeSlot, (slot) => slot.mentor),
    __metadata("design:type", Array)
], User.prototype, "timeSlotsAsMentor", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => session_entity_1.Session, (s) => s.student),
    __metadata("design:type", Array)
], User.prototype, "sessionsAsStudent", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => session_entity_1.Session, (s) => s.mentor),
    __metadata("design:type", Array)
], User.prototype, "sessionsAsMentor", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => email_notification_entity_1.EmailNotification, (n) => n.user),
    __metadata("design:type", Array)
], User.prototype, "emailNotifications", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)('users')
], User);
//# sourceMappingURL=user.entity.js.map