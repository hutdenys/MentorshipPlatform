import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(email: string, password: string): Promise<User> {
        const user = await this.userRepo.findOne({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return user;
    }

    async login(user: User) {
        const payload = { sub: user.id, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
            user: { id: user.id, email: user.email, role: user.role },
        };
    }

    async register(email: string, password: string, role: 'student' | 'mentor' | 'admin') {
        const existing = await this.userRepo.findOne({ where: { email } });
        if (existing) throw new UnauthorizedException('Email already registered');
        const passwordHash = await bcrypt.hash(password, 10);
        const user = this.userRepo.create({ email, passwordHash, role });
        await this.userRepo.save(user);
        return this.login(user);
    }
}
