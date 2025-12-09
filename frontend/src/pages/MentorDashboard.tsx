import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';

export default function MentorDashboard() {
    const [slots, setSlots] = useState<any[]>([]);
    const mentorId = Number(localStorage.getItem('userId'));

    useEffect(() => {
        axios.get(`http://localhost:5000/api/scheduling/mentor/${mentorId}/slots`).then(res => {
            setSlots(res.data);
        });
    }, [mentorId]);

    const [date, setDate] = useState(''); // yyyy-mm-dd
    const [hour, setHour] = useState('08');
    const [minute, setMinute] = useState('00');
    const [duration, setDuration] = useState(60); // тривалість у хвилинах

    const handleCreateSlot = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!date) return;
        // Формуємо startAt з дати, години, хвилини
        const startAt = `${date}T${hour}:${minute}:00`;
        const start = new Date(startAt);
        const end = new Date(start.getTime() + duration * 60000);
        await axios.post(`http://localhost:5000/api/scheduling/mentor/${mentorId}/slots`, {
            startAt: start.toISOString(),
            endAt: end.toISOString(),
        });
        setDate('');
        setHour('08');
        setMinute('00');
        setDuration(60);
        const res = await axios.get(`http://localhost:5000/api/scheduling/mentor/${mentorId}/slots`);
        setSlots(res.data);
    };

    return (
        <div>
            <h2>Mentor Dashboard</h2>
            <h3>Your Time Slots</h3>
            <ul>
                {slots.map((s: any) => {
                    const start = new Date(s.startAt);
                    const end = new Date(s.endAt);
                    const fmt = (d: Date) => d.toLocaleString('uk-UA', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric', hour12: false });
                    return (
                        <li key={s.id}>
                            {fmt(start)} - {fmt(end)} ({s.status})
                        </li>
                    );
                })}
            </ul>
            <h3>Create New Slot</h3>
            <form onSubmit={handleCreateSlot} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    required
                    min={(() => {
                        const d = new Date();
                        return d.toISOString().slice(0, 10);
                    })()}
                />
                <select value={hour} onChange={e => setHour(e.target.value)} required>
                    {Array.from({ length: 15 }, (_, i) => 8 + i).map(h => (
                        <option key={h} value={h.toString().padStart(2, '0')}>{h.toString().padStart(2, '0')}</option>
                    ))}
                </select>
                :
                <select value={minute} onChange={e => setMinute(e.target.value)} required>
                    {['00', '15', '30', '45'].map(m => (
                        <option key={m} value={m}>{m}</option>
                    ))}
                </select>
                <label style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 0 }}>
                    <input type="number" min={15} max={480} step={15} value={duration} onChange={e => setDuration(Number(e.target.value))} required placeholder="Тривалість (хв)" style={{ width: 120 }} />
                    <span style={{ color: '#888', fontSize: 13 }}>Тривалість сесії (хвилин)</span>
                </label>
                <button type="submit">Create Slot</button>
            </form>
        </div>
    );
}
