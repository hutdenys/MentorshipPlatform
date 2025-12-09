import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { TimeSlot } from './time-slot.entity';
import { Review } from './review.entity';
import { EmailNotification } from './email-notification.entity';

@Entity('sessions')
export class Session {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, (u) => u.sessionsAsStudent, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'student_id' })
    student!: User;

    @ManyToOne(() => User, (u) => u.sessionsAsMentor, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'mentor_id' })
    mentor!: User;

    @ManyToOne(() => TimeSlot, (slot) => slot.sessions, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'time_slot_id' })
    timeSlot!: TimeSlot;

    @Column()
    meetLink!: string;

    @Column({
        type: 'enum',
        enum: ['scheduled', 'cancelled_by_student', 'cancelled_by_mentor', 'completed'],
        default: 'scheduled',
    })
    status!: 'scheduled' | 'cancelled_by_student' | 'cancelled_by_mentor' | 'completed';

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @OneToOne(() => Review, (r) => r.session)
    review?: Review;

    @OneToMany(() => EmailNotification, (n) => n.session)
    notifications!: EmailNotification[];
}
