import { Controller, Post, Body } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
    constructor(private readonly notificationsService: NotificationsService) { }

    @Post('send')
    async sendEmail(@Body() body: { to: string; subject: string; text: string }) {
        return this.notificationsService.sendEmail(body.to, body.subject, body.text);
    }

    @Post('queue')
    async queueNotification(@Body() body: any) {
        return this.notificationsService.queueNotification(body);
    }
}
