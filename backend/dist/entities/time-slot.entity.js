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
exports.TimeSlot = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const session_entity_1 = require("./session.entity");
let TimeSlot = class TimeSlot {
};
exports.TimeSlot = TimeSlot;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TimeSlot.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (u) => u.timeSlotsAsMentor, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'mentor_id' }),
    __metadata("design:type", user_entity_1.User)
], TimeSlot.prototype, "mentor", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], TimeSlot.prototype, "startAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], TimeSlot.prototype, "endAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['free', 'booked', 'cancelled', 'blocked'],
        default: 'free',
    }),
    __metadata("design:type", String)
], TimeSlot.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], TimeSlot.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => session_entity_1.Session, (s) => s.timeSlot),
    __metadata("design:type", Array)
], TimeSlot.prototype, "sessions", void 0);
exports.TimeSlot = TimeSlot = __decorate([
    (0, typeorm_1.Entity)('time_slots')
], TimeSlot);
//# sourceMappingURL=time-slot.entity.js.map