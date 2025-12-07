

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';

interface Session {
    id: number;
    status: string;
    mentor?: { email: string; id: number };
    student?: { email: string; id: number };
    timeSlot?: { startAt: string; endAt: string };
    meetLink?: string;
}

const TABS = [
    { key: 'scheduled', label: 'Майбутні' },
    { key: 'completed', label: 'Завершені' },
    { key: 'cancelled', label: 'Скасовані' },
    { key: 'all', label: 'Всі' },
];

export default function Sessions() {
    const [sessions, setSessions] = useState<Session[]>([]);
    const [tab, setTab] = useState('scheduled');
    const [loading, setLoading] = useState(false);
    const userId = Number(localStorage.getItem('userId'));

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5000/api/users/${userId}`).then(res => {
            const all = [...(res.data.sessionsAsStudent || []), ...(res.data.sessionsAsMentor || [])];
            setSessions(tab === 'all' ? all : all.filter(s => s.status === tab));
        }).finally(() => setLoading(false));
    }, [userId, tab]);

    const handleCancel = async (sessionId: number, cancelledBy: 'student' | 'mentor') => {
        setLoading(true);
        await axios.patch(`http://localhost:5000/api/scheduling/cancel/${sessionId}`, { cancelledBy });
        // Refresh sessions
        const res = await axios.get(`http://localhost:5000/api/users/${userId}`);
        const all = [...(res.data.sessionsAsStudent || []), ...(res.data.sessionsAsMentor || [])];
        setSessions(tab === 'all' ? all : all.filter(s => s.status === tab));
        setLoading(false);
    };

    return (
        <div className="container" style={{ marginTop: '4em', maxWidth: 700 }}>
            <h2 style={{ textAlign: 'center', marginBottom: '1em' }}>Сесії</h2>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2em' }}>
                {TABS.map(t => (
                    <button
                        key={t.key}
                        className={tab === t.key ? 'tab-active' : 'tab'}
                        style={{ marginRight: 10, padding: '0.5em 1.5em', borderRadius: 8, border: '1px solid #ccc', background: tab === t.key ? '#e6f7ff' : '#fff', cursor: 'pointer' }}
                        onClick={() => setTab(t.key)}
                    >
                        {t.label}
                    </button>
                ))}
            </div>
            {loading ? (
                <div style={{ textAlign: 'center', marginTop: '2em' }}>Завантаження...</div>
            ) : sessions.length === 0 ? (
                <div style={{ textAlign: 'center', marginTop: '2em', color: '#888' }}>Сесій не знайдено</div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5em' }}>
                    {sessions.map((s: any) => (
                        <div key={s.id} style={{ border: '1px solid #eee', borderRadius: 12, padding: '1.5em', background: '#fafcff', boxShadow: '0 2px 8px #eee' }}>
                            <div style={{ fontWeight: 500, fontSize: 18, marginBottom: 8 }}>
                                {s.timeSlot ? `${new Date(s.timeSlot.startAt).toLocaleString()} — ${new Date(s.timeSlot.endAt).toLocaleString()}` : '-'}
                            </div>
                            <div style={{ marginBottom: 6 }}>
                                <span style={{ marginRight: 16 }}>Статус: <b>{s.status}</b></span>
                                {s.mentor && <span style={{ marginRight: 16 }}>Ментор: <b>{s.mentor.email}</b></span>}
                                {s.student && <span>Студент: <b>{s.student.email}</b></span>}
                            </div>
                            {s.meetLink && (
                                <a href={s.meetLink} target="_blank" rel="noopener noreferrer" style={{ color: '#1890ff', marginRight: 16 }}>Перейти до зустрічі</a>
                            )}
                            {s.status === 'scheduled' && (
                                <button
                                    style={{ marginLeft: 0, background: '#ff4d4f', color: '#fff', border: 'none', borderRadius: 6, padding: '0.5em 1em', cursor: 'pointer' }}
                                    onClick={() => handleCancel(s.id, s.student?.id === userId ? 'student' : 'mentor')}
                                >
                                    Скасувати
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
