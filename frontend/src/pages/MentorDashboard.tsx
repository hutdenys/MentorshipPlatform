import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';

export default function MentorDashboard() {
    const [slots, setSlots] = useState<any[]>([]);
    const mentorId = 1; // TODO: get from auth context

    useEffect(() => {
        axios.get(`http://localhost:5000/api/scheduling/mentor/${mentorId}/slots`).then(res => {
            setSlots(res.data);
        });
    }, [mentorId]);

    const [startAt, setStartAt] = useState('');
    const [endAt, setEndAt] = useState('');

    const handleCreateSlot = async (e: React.FormEvent) => {
        e.preventDefault();
        await axios.post(`http://localhost:5000/api/scheduling/mentor/${mentorId}/slots`, { startAt, endAt });
        setStartAt('');
        setEndAt('');
        const res = await axios.get(`http://localhost:5000/api/scheduling/mentor/${mentorId}/slots`);
        setSlots(res.data);
    };

    return (
        <div>
            <h2>Mentor Dashboard</h2>
            <h3>Your Time Slots</h3>
            <ul>
                {slots.map((s: any) => (
                    <li key={s.id}>
                        {new Date(s.startAt).toLocaleString()} - {new Date(s.endAt).toLocaleString()} ({s.status})
                    </li>
                ))}
            </ul>
            <h3>Create New Slot</h3>
            <form onSubmit={handleCreateSlot}>
                <input type="datetime-local" value={startAt} onChange={e => setStartAt(e.target.value)} required />
                <input type="datetime-local" value={endAt} onChange={e => setEndAt(e.target.value)} required />
                <button type="submit">Create Slot</button>
            </form>
        </div>
    );
}
