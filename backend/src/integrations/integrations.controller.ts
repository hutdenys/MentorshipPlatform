import { Controller, Get, Param } from '@nestjs/common';
import { IntegrationsService } from './integrations.service';

@Controller('integrations')
export class IntegrationsController {
    constructor(private readonly integrationsService: IntegrationsService) { }

    @Get('meet-link/:sessionId')
    getMeetLink(@Param('sessionId') sessionId: string) {
        return { link: this.integrationsService.generateMeetLink(Number(sessionId)) };
    }
}
