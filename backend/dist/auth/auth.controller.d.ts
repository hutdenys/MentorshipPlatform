import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        access_token: string;
        user: {
            id: number;
            email: string;
            role: "student" | "mentor" | "admin";
        };
    }>;
    register(body: {
        email: string;
        password: string;
        role: 'student' | 'mentor' | 'admin';
    }): Promise<{
        access_token: string;
        user: {
            id: number;
            email: string;
            role: "student" | "mentor" | "admin";
        };
    }>;
}
