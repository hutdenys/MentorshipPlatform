import {
    Entity,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
    Column,
    CreateDateColumn,
} from 'typeorm';
import { Session } from './session.entity';

@Entity('reviews')
export class Review {
    @PrimaryGeneratedColumn()
    id!: number;

    @OneToOne(() => Session, (s) => s.review, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'session_id' })
    session!: Session;

    @Column({ type: 'int' })
    rating!: number;

    @Column({ type: 'text', nullable: true })
    comment!: string;

    @CreateDateColumn()
    createdAt!: Date;
}
