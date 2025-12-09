import { Repository } from 'typeorm';
import { EmailNotification } from '../entities/email-notification.entity';
export declare class NotificationsService {
    private readonly notificationRepo;
    constructor(notificationRepo: Repository<EmailNotification>);
    private transporter;
    sendEmail(to: string, subject: string, text: string): Promise<import("nodemailer/lib/smtp-transport").SentMessageInfo>;
    queueNotification(data: Partial<EmailNotification>): Promise<EmailNotification>;
    markAsSent(id: number): Promise<void>;
}
