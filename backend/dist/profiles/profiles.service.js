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
exports.ProfilesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const student_profile_entity_1 = require("../entities/student-profile.entity");
const mentor_profile_entity_1 = require("../entities/mentor-profile.entity");
const subject_entity_1 = require("../entities/subject.entity");
let ProfilesService = class ProfilesService {
    constructor(studentRepo, mentorRepo, subjectRepo) {
        this.studentRepo = studentRepo;
        this.mentorRepo = mentorRepo;
        this.subjectRepo = subjectRepo;
    }
    async getStudentProfile(userId) {
        return this.studentRepo.findOne({ where: { userId } });
    }
    async updateStudentProfile(userId, data) {
        await this.studentRepo.update(userId, data);
        return this.getStudentProfile(userId);
    }
    async getMentorProfile(userId) {
        return this.mentorRepo.findOne({ where: { userId }, relations: ['subjects'] });
    }
    async updateMentorProfile(userId, data) {
        await this.mentorRepo.update(userId, data);
        return this.getMentorProfile(userId);
    }
    async getAllSubjects() {
        return this.subjectRepo.find();
    }
};
exports.ProfilesService = ProfilesService;
exports.ProfilesService = ProfilesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(student_profile_entity_1.StudentProfile)),
    __param(1, (0, typeorm_1.InjectRepository)(mentor_profile_entity_1.MentorProfile)),
    __param(2, (0, typeorm_1.InjectRepository)(subject_entity_1.Subject)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ProfilesService);
//# sourceMappingURL=profiles.service.js.map