import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
    ) { }

    async findAll(): Promise<User[]> {
        return this.userRepo.find();
    }

    async findById(id: number): Promise<User> {
        const user = await this.userRepo.findOne({ where: { id } });
        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    async update(id: number, data: Partial<User>): Promise<User> {
        await this.userRepo.update(id, data);
        return this.findById(id);
    }

    async remove(id: number): Promise<void> {
        await this.userRepo.delete(id);
    }
}
