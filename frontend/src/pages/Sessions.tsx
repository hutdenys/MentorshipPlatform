import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Sessions() {
    const [sessions, setSessions] = useState<any[]>([]);
    const userId = 2; // TODO: get from auth context

    useEffect(() => {
        axios.get(`/api/users/${userId}`).then(res => {
            setSessions([...(res.data.sessionsAsStudent || []), ...(res.data.sessionsAsMentor || [])]);
        });
    }, [userId]);

    const handleCancel = async (sessionId: number, cancelledBy: 'student' | 'mentor') => {
        await axios.patch(`/api/scheduling/cancel/${sessionId}`, { cancelledBy });
        alert('Session cancelled!');
        // Refresh sessions
        const res = await axios.get(`/api/users/${userId}`);
        setSessions([...(res.data.sessionsAsStudent || []), ...(res.data.sessionsAsMentor || [])]);
    };

    return (
        <div>
            <h2>My Sessions</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Mentor</th>
                        <th>Student</th>
                        <th>Time Slot</th>
                        <th>Status</th>
                        <th>Meet Link</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {sessions.map(s => (
                        <tr key={s.id}>
                            <td>{s.id}</td>
                            <td>{s.mentor?.email}</td>
                            <td>{s.student?.email}</td>
                            <td>{s.timeSlot ? `${new Date(s.timeSlot.startAt).toLocaleString()} - ${new Date(s.timeSlot.endAt).toLocaleString()}` : '-'}</td>
                            <td>{s.status}</td>
                            <td>{s.meetLink}</td>
                            <td>
                                {s.status === 'scheduled' ? (
                                    <button onClick={() => handleCancel(s.id, s.student?.id === userId ? 'student' : 'mentor')}>Cancel</button>
                                ) : (
                                    <span>-</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
