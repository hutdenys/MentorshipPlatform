import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import MentorCalendar from '../components/MentorCalendar';
import WeeklyCalendar, { CalendarSession } from '../components/WeeklyCalendar';

export default function StudentDashboard() {
    const [mentors, setMentors] = useState<any[]>([]);
    const [selectedMentor, setSelectedMentor] = useState<any | null>(null);
    const [slots, setSlots] = useState<any[]>([]);
    const [sessions, setSessions] = useState<CalendarSession[]>([]);
    const userId = Number(localStorage.getItem('userId'));

    useEffect(() => {
        axios.get('http://localhost:5000/api/scheduling/mentors/free-slots').then(res => {
            setMentors(res.data.map((slot: any) => slot.mentor));
        });
        // Завантажуємо всі сесії користувача (як студент, так і ментор)
        axios.get(`http://localhost:5000/api/users/${userId}`).then(res => {
            const allSessions: CalendarSession[] = [];
            (res.data.sessionsAsStudent || []).forEach((s: any) => {
                allSessions.push({
                    id: s.id,
                    startAt: s.timeSlot?.startAt,
                    endAt: s.timeSlot?.endAt,
                    status: s.status,
                    subject: s.subject?.name,
                    role: 'student',
                    meetLink: s.meetLink,
                    otherUser: { email: s.mentor?.email },
                });
            });
            (res.data.sessionsAsMentor || []).forEach((s: any) => {
                allSessions.push({
                    id: s.id,
                    startAt: s.timeSlot?.startAt,
                    endAt: s.timeSlot?.endAt,
                    status: s.status,
                    subject: s.subject?.name,
                    role: 'mentor',
                    meetLink: s.meetLink,
                    otherUser: { email: s.student?.email },
                });
            });
            setSessions(allSessions);
        });
    }, []);

    const handleMentorSelect = async (mentor: any) => {
        setSelectedMentor(mentor);
        const res = await axios.get(`http://localhost:5000/api/scheduling/mentor/${mentor.id}/slots`);
        setSlots(res.data);
    };

    const handleBook = async (slotId: number) => {
        const studentId = userId;
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
            <WeeklyCalendar sessions={sessions} />
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
