import { Entity, PrimaryColumn, OneToOne, JoinColumn, Column } from 'typeorm';
import { User } from './user.entity';

@Entity('student_profiles')
export class StudentProfile {
    @PrimaryColumn({ name: 'user_id' })
    userId!: number;

    @OneToOne(() => User, (u) => u.studentProfile, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @Column({ nullable: true })
    goal!: string;

    @Column({ nullable: true })
    level!: string;
}
