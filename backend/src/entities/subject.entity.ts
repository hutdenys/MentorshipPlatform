import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import { MentorProfile } from './mentor-profile.entity';

@Entity('subjects')
export class Subject {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    name!: string;

    @ManyToMany(() => MentorProfile, (m) => m.subjects)
    mentors!: MentorProfile[];
}
