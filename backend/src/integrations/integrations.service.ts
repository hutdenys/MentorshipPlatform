import { Injectable } from '@nestjs/common';

@Injectable()
export class IntegrationsService {
    generateMeetLink(sessionId: number): string {
        return `https://meet.example.com/session/${sessionId}`;
    }
}
