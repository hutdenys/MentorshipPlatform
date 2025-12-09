import {
    Entity,
    PrimaryColumn,
    OneToOne,
    JoinColumn,
    Column,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import { User } from './user.entity';
import { Subject } from './subject.entity';

@Entity('mentor_profiles')
export class MentorProfile {
    @PrimaryColumn({ name: 'user_id' })
    userId!: number;

    @OneToOne(() => User, (u) => u.mentorProfile, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @Column({ type: 'text', nullable: true })
    bio!: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    ratePerHour!: number;

    @Column({ type: 'int', nullable: true })
    maxSessionsPerDay!: number;

    @ManyToMany(() => Subject, (s) => s.mentors)
    @JoinTable({
        name: 'mentor_subjects',
        joinColumn: { name: 'mentor_id', referencedColumnName: 'userId' },
        inverseJoinColumn: { name: 'subject_id', referencedColumnName: 'id' },
    })
    subjects!: Subject[];
}
