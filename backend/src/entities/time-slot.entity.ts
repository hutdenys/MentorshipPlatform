import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    Column,
    CreateDateColumn,
    OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Session } from './session.entity';

@Entity('time_slots')
export class TimeSlot {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, (u) => u.timeSlotsAsMentor, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'mentor_id' })
    mentor!: User;

    @Column({ type: 'timestamp' })
    startAt!: Date;

    @Column({ type: 'timestamp' })
    endAt!: Date;

    @Column({
        type: 'enum',
        enum: ['free', 'booked', 'cancelled', 'blocked'],
        default: 'free',
    })
    status!: 'free' | 'booked' | 'cancelled' | 'blocked';

    @CreateDateColumn()
    createdAt!: Date;

    @OneToMany(() => Session, (s) => s.timeSlot)
    sessions!: Session[];
}
