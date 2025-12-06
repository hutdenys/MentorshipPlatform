import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmailNotification } from '../entities/email-notification.entity';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NotificationsService {
    constructor(
        @InjectRepository(EmailNotification)
        private readonly notificationRepo: Repository<EmailNotification>,
    ) { }

    private transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    async sendEmail(to: string, subject: string, text: string) {
        return this.transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
        });
    }

    async queueNotification(data: Partial<EmailNotification>) {
        const notification = this.notificationRepo.create(data);
        return this.notificationRepo.save(notification);
    }

    async markAsSent(id: number) {
        await this.notificationRepo.update(id, { status: 'sent', sentAt: new Date() });
    }
}
