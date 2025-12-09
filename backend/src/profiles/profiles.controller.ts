import { Controller, Get, Param, Patch, Body } from '@nestjs/common';
import { ProfilesService } from './profiles.service';

@Controller('profiles')
export class ProfilesController {
    constructor(private readonly profilesService: ProfilesService) { }

    @Get('student/:userId')
    getStudentProfile(@Param('userId') userId: string) {
        return this.profilesService.getStudentProfile(Number(userId));
    }

    @Patch('student/:userId')
    updateStudentProfile(@Param('userId') userId: string, @Body() data: any) {
        return this.profilesService.updateStudentProfile(Number(userId), data);
    }

    @Get('mentor/:userId')
    getMentorProfile(@Param('userId') userId: string) {
        return this.profilesService.getMentorProfile(Number(userId));
    }

    @Patch('mentor/:userId')
    updateMentorProfile(@Param('userId') userId: string, @Body() data: any) {
        return this.profilesService.updateMentorProfile(Number(userId), data);
    }

    @Get('subjects')
    getAllSubjects() {
        return this.profilesService.getAllSubjects();
    }
}
