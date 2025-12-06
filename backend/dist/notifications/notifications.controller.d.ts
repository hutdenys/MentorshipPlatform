import { NotificationsService } from './notifications.service';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    sendEmail(body: {
        to: string;
        subject: string;
        text: string;
    }): Promise<import("nodemailer/lib/smtp-transport").SentMessageInfo>;
    queueNotification(body: any): Promise<import("../entities/email-notification.entity").EmailNotification>;
}
