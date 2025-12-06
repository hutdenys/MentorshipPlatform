import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
export declare class UsersService {
    private readonly userRepo;
    constructor(userRepo: Repository<User>);
    findAll(): Promise<User[]>;
    findById(id: number): Promise<User>;
    update(id: number, data: Partial<User>): Promise<User>;
    remove(id: number): Promise<void>;
}
