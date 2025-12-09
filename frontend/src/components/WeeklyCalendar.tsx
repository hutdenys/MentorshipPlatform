import React, { useState } from 'react';

export type CalendarSession = {
    id: number;
    startAt: string;
    endAt: string;
    status: string;
    subject?: string;
    role: 'student' | 'mentor';
    meetLink?: string;
    otherUser?: { email: string };
};

function getWeekDays(startDate: Date) {
    const days = [];
    for (let i = 0; i < 7; i++) {
        const d = new Date(startDate);
        d.setDate(startDate.getDate() + i);
        days.push(d);
    }
    return days;
}

function getTimeSlots() {
    const slots = [];
    for (let h = 8; h <= 22; h++) {
        slots.push(`${h.toString().padStart(2, '0')}:00`);
    }
    return slots;
}

export default function WeeklyCalendar({ sessions }: { sessions: CalendarSession[] }) {
    // Початок тижня (понеділок)
    const [weekStart, setWeekStart] = useState(() => {
        const now = new Date();
        const day = now.getDay();
        const monday = new Date(now);
        monday.setDate(now.getDate() - ((day + 6) % 7));
        monday.setHours(0, 0, 0, 0);
        return monday;
    });

    const weekDays = getWeekDays(weekStart);
    const timeSlots = getTimeSlots();

    // Фільтруємо сесії для поточного тижня
    const weekSessions = sessions.filter(s => {
        const start = new Date(s.startAt);
        return start >= weekDays[0] && start < new Date(weekDays[6].getTime() + 24 * 60 * 60 * 1000);
    });

    // Для модалки
    const [selectedSession, setSelectedSession] = useState<CalendarSession | null>(null);

    return (
        <div style={{ margin: '2em 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <button onClick={() => setWeekStart(new Date(weekStart.getTime() - 7 * 24 * 60 * 60 * 1000))}>← Попередній тиждень</button>
                <h3 style={{ margin: 0 }}>
                    Тиждень: {weekDays[0].toLocaleDateString()} – {weekDays[6].toLocaleDateString()}
                </h3>
                <button onClick={() => setWeekStart(new Date(weekStart.getTime() + 7 * 24 * 60 * 60 * 1000))}>Наступний тиждень →</button>
            </div>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid #eee', background: '#fafbfc', width: 80 }}>Час</th>
                            {weekDays.map(day => (
                                <th key={day.toISOString()} style={{ border: '1px solid #eee', background: '#fafbfc', minWidth: 120 }}>
                                    {day.toLocaleDateString('uk-UA', { weekday: 'short', day: '2-digit', month: '2-digit' })}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {timeSlots.map(time => (
                            <tr key={time}>
                                <td style={{ border: '1px solid #eee', background: '#fafbfc', textAlign: 'center' }}>{time}</td>
                                {weekDays.map(day => {
                                    // Знаходимо сесію у цій клітинці
                                    const session = weekSessions.find(s => {
                                        const start = new Date(s.startAt);
                                        return start.getHours() === parseInt(time) && start.getDate() === day.getDate() && start.getMonth() === day.getMonth() && start.getFullYear() === day.getFullYear();
                                    });
                                    if (session) {
                                        const isPast = new Date(session.endAt) < new Date();
                                        return (
                                            <td
                                                key={day.toISOString() + time}
                                                style={{
                                                    border: '1px solid #eee',
                                                    background: isPast ? '#f0f0f0' : '#e6f7ff',
                                                    color: isPast ? '#888' : '#1890ff',
                                                    cursor: 'pointer',
                                                    padding: 4,
                                                }}
                                                onClick={() => setSelectedSession(session)}
                                            >
                                                <div style={{ fontWeight: 600 }}>{session.subject || 'Сесія'}</div>
                                                <div style={{ fontSize: 12 }}>{session.role === 'mentor' ? 'Ментор' : 'Студент'}</div>
                                                <div style={{ fontSize: 12 }}>{session.otherUser?.email}</div>
                                                <div style={{ fontSize: 12 }}>{session.status}</div>
                                            </td>
                                        );
                                    }
                                    return <td key={day.toISOString() + time} style={{ border: '1px solid #eee', background: '#fff' }} />;
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Модалка для деталей сесії */}
            {selectedSession && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.2)', zIndex: 1000 }} onClick={() => setSelectedSession(null)}>
                    <div style={{ background: '#fff', maxWidth: 400, margin: '10vh auto', padding: 24, borderRadius: 8, boxShadow: '0 4px 16px rgba(0,0,0,0.12)' }} onClick={e => e.stopPropagation()}>
                        <h3>Деталі сесії</h3>
                        <div><b>Час:</b> {new Date(selectedSession.startAt).toLocaleString()} – {new Date(selectedSession.endAt).toLocaleString()}</div>
                        <div><b>Роль:</b> {selectedSession.role}</div>
                        <div><b>Інший користувач:</b> {selectedSession.otherUser?.email}</div>
                        <div><b>Статус:</b> {selectedSession.status}</div>
                        {selectedSession.subject && <div><b>Предмет:</b> {selectedSession.subject}</div>}
                        {selectedSession.meetLink && <div><b>Посилання:</b> <a href={selectedSession.meetLink} target="_blank" rel="noopener noreferrer">Перейти</a></div>}
                        <button style={{ marginTop: 16 }} onClick={() => setSelectedSession(null)}>Закрити</button>
                    </div>
                </div>
            )}
        </div>
    );
}
