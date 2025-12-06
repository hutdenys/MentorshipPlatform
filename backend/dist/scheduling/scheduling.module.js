"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchedulingModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const scheduling_service_1 = require("./scheduling.service");
const scheduling_controller_1 = require("./scheduling.controller");
const time_slot_entity_1 = require("../entities/time-slot.entity");
const session_entity_1 = require("../entities/session.entity");
const review_entity_1 = require("../entities/review.entity");
const notifications_module_1 = require("../notifications/notifications.module");
let SchedulingModule = class SchedulingModule {
};
exports.SchedulingModule = SchedulingModule;
exports.SchedulingModule = SchedulingModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([time_slot_entity_1.TimeSlot, session_entity_1.Session, review_entity_1.Review]),
            notifications_module_1.NotificationsModule,
        ],
        providers: [scheduling_service_1.SchedulingService],
        controllers: [scheduling_controller_1.SchedulingController],
    })
], SchedulingModule);
//# sourceMappingURL=scheduling.module.js.map