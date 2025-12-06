import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    OneToMany,
} from 'typeorm';
import { StudentProfile } from './student-profile.entity';
import { MentorProfile } from './mentor-profile.entity';
import { TimeSlot } from './time-slot.entity';
import { Session } from './session.entity';
import { EmailNotification } from './email-notification.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    email!: string;

    @Column()
    passwordHash!: string;

    @Column({
        type: 'enum',
        enum: ['student', 'mentor', 'admin'],
    })
    role!: 'student' | 'mentor' | 'admin';

    @Column({ default: true })
    isActive!: boolean;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @OneToOne(() => StudentProfile, (p) => p.user)
    studentProfile?: StudentProfile;

    @OneToOne(() => MentorProfile, (p) => p.user)
    mentorProfile?: MentorProfile;

    @OneToMany(() => TimeSlot, (slot) => slot.mentor)
    timeSlotsAsMentor!: TimeSlot[];

    @OneToMany(() => Session, (s) => s.student)
    sessionsAsStudent!: Session[];

    @OneToMany(() => Session, (s) => s.mentor)
    sessionsAsMentor!: Session[];

    @OneToMany(() => EmailNotification, (n) => n.user)
    emailNotifications!: EmailNotification[];
}
