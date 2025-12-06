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
exports.EmailNotification = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const session_entity_1 = require("./session.entity");
let EmailNotification = class EmailNotification {
};
exports.EmailNotification = EmailNotification;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], EmailNotification.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (u) => u.emailNotifications, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], EmailNotification.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => session_entity_1.Session, (s) => s.notifications, {
        onDelete: 'CASCADE',
        nullable: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'session_id' }),
    __metadata("design:type", session_entity_1.Session)
], EmailNotification.prototype, "session", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['booking_confirmation', 'booking_cancelled', 'reminder'],
    }),
    __metadata("design:type", String)
], EmailNotification.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['queued', 'sent', 'failed'],
        default: 'queued',
    }),
    __metadata("design:type", String)
], EmailNotification.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], EmailNotification.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], EmailNotification.prototype, "sentAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], EmailNotification.prototype, "errorMessage", void 0);
exports.EmailNotification = EmailNotification = __decorate([
    (0, typeorm_1.Entity)('email_notifications')
], EmailNotification);
//# sourceMappingURL=email-notification.entity.js.map