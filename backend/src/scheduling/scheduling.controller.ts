import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { SchedulingService } from './scheduling.service';

@Controller('scheduling')
export class SchedulingController {
    constructor(private readonly schedulingService: SchedulingService) { }

    @Get('mentor/:mentorId/slots')
    getMentorSlots(@Param('mentorId') mentorId: string) {
        return this.schedulingService.getMentorSlots(Number(mentorId));
    }

    @Post('mentor/:mentorId/slots')
    createTimeSlot(
        @Param('mentorId') mentorId: string,
        @Body() body: { startAt: string; endAt: string },
    ) {
        return this.schedulingService.createTimeSlot(
            Number(mentorId),
            new Date(body.startAt),
            new Date(body.endAt),
        );
    }

    @Post('book')
    bookSession(
        @Body() body: { studentId: number; mentorId: number; slotId: number; meetLink: string },
    ) {
        return this.schedulingService.bookSession(
            body.studentId,
            body.mentorId,
            body.slotId,
            body.meetLink,
        );
    }

    @Patch('cancel/:sessionId')
    cancelSession(
        @Param('sessionId') sessionId: string,
        @Body() body: { cancelledBy: 'student' | 'mentor' },
    ) {
        return this.schedulingService.cancelSession(Number(sessionId), body.cancelledBy);
    }

    @Get('mentors/free-slots')
    getMentorsWithSlots() {
        return this.schedulingService.getMentorsWithSlots();
    }
}
