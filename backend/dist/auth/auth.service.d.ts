import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly userRepo;
    private readonly jwtService;
    constructor(userRepo: Repository<User>, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<User>;
    login(user: User): Promise<{
        access_token: string;
        user: {
            id: number;
            email: string;
            role: "student" | "mentor" | "admin";
        };
    }>;
    register(email: string, password: string, role: 'student' | 'mentor' | 'admin'): Promise<{
        access_token: string;
        user: {
            id: number;
            email: string;
            role: "student" | "mentor" | "admin";
        };
    }>;
}
