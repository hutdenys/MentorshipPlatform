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
exports.SchedulingController = void 0;
const common_1 = require("@nestjs/common");
const scheduling_service_1 = require("./scheduling.service");
let SchedulingController = class SchedulingController {
    constructor(schedulingService) {
        this.schedulingService = schedulingService;
    }
    getMentorSlots(mentorId) {
        return this.schedulingService.getMentorSlots(Number(mentorId));
    }
    createTimeSlot(mentorId, body) {
        return this.schedulingService.createTimeSlot(Number(mentorId), new Date(body.startAt), new Date(body.endAt));
    }
    bookSession(body) {
        return this.schedulingService.bookSession(body.studentId, body.mentorId, body.slotId, body.meetLink);
    }
    cancelSession(sessionId, body) {
        return this.schedulingService.cancelSession(Number(sessionId), body.cancelledBy);
    }
    getMentorsWithSlots() {
        return this.schedulingService.getMentorsWithSlots();
    }
};
exports.SchedulingController = SchedulingController;
__decorate([
    (0, common_1.Get)('mentor/:mentorId/slots'),
    __param(0, (0, common_1.Param)('mentorId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SchedulingController.prototype, "getMentorSlots", null);
__decorate([
    (0, common_1.Post)('mentor/:mentorId/slots'),
    __param(0, (0, common_1.Param)('mentorId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], SchedulingController.prototype, "createTimeSlot", null);
__decorate([
    (0, common_1.Post)('book'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SchedulingController.prototype, "bookSession", null);
__decorate([
    (0, common_1.Patch)('cancel/:sessionId'),
    __param(0, (0, common_1.Param)('sessionId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], SchedulingController.prototype, "cancelSession", null);
__decorate([
    (0, common_1.Get)('mentors/free-slots'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SchedulingController.prototype, "getMentorsWithSlots", null);
exports.SchedulingController = SchedulingController = __decorate([
    (0, common_1.Controller)('scheduling'),
    __metadata("design:paramtypes", [scheduling_service_1.SchedulingService])
], SchedulingController);
//# sourceMappingURL=scheduling.controller.js.map