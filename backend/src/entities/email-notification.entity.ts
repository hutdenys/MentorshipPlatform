import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    Column,
    CreateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Session } from './session.entity';

@Entity('email_notifications')
export class EmailNotification {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, (u) => u.emailNotifications, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @ManyToOne(() => Session, (s) => s.notifications, {
        onDelete: 'CASCADE',
        nullable: true,
    })
    @JoinColumn({ name: 'session_id' })
    session?: Session;

    @Column({
        type: 'enum',
        enum: ['booking_confirmation', 'booking_cancelled', 'reminder'],
    })
    type!: 'booking_confirmation' | 'booking_cancelled' | 'reminder';

    @Column({
        type: 'enum',
        enum: ['queued', 'sent', 'failed'],
        default: 'queued',
    })
    status!: 'queued' | 'sent' | 'failed';

    @CreateDateColumn()
    createdAt!: Date;

    @Column({ type: 'timestamp', nullable: true })
    sentAt?: Date;

    @Column({ type: 'text', nullable: true })
    errorMessage?: string;
}
