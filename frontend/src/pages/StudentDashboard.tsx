import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import MentorCalendar from '../components/MentorCalendar';

export default function StudentDashboard() {
    const [mentors, setMentors] = useState<any[]>([]);
    const [selectedMentor, setSelectedMentor] = useState<any | null>(null);
    const [slots, setSlots] = useState<any[]>([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/scheduling/mentors/free-slots').then(res => {
            setMentors(res.data.map((slot: any) => slot.mentor));
        });
    }, []);

    const handleMentorSelect = async (mentor: any) => {
        setSelectedMentor(mentor);
        const res = await axios.get(`http://localhost:5000/api/scheduling/mentor/${mentor.id}/slots`);
        setSlots(res.data);
    };

    const handleBook = async (slotId: number) => {
        // TODO: Replace with real studentId and meetLink logic
        const studentId = 2;
        const mentorId = selectedMentor?.id;
        const meetLink = `https://meet.example.com/session/${slotId}`;
        await axios.post('http://localhost:5000/api/scheduling/book', { studentId, mentorId, slotId, meetLink });
        alert('Session booked!');
        // Refresh slots
        const res = await axios.get(`http://localhost:5000/api/scheduling/mentor/${mentorId}/slots`);
        setSlots(res.data);
    };

    return (
        <div>
            <h2>Student Dashboard</h2>
            <h3>Mentors</h3>
            <ul>
                {mentors.map((m: any) => (
                    <li key={m.id}>
                        <button onClick={() => handleMentorSelect(m)}>{m.email}</button>
                    </li>
                ))}
            </ul>
            {selectedMentor && (
                <MentorCalendar slots={slots} onBook={handleBook} />
            )}
        </div>
    );
}
