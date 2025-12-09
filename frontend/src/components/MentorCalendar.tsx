import React from 'react';

export default function MentorCalendar({ slots, onBook }: { slots: any[]; onBook: (slotId: number) => void }) {
    return (
        <div>
            <h4>Mentor Calendar</h4>
            <table>
                <thead>
                    <tr>
                        <th>Start</th>
                        <th>End</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {slots.map(slot => (
                        <tr key={slot.id}>
                            <td>{new Date(slot.startAt).toLocaleString()}</td>
                            <td>{new Date(slot.endAt).toLocaleString()}</td>
                            <td>{slot.status}</td>
                            <td>
                                {slot.status === 'free' ? (
                                    <button onClick={() => onBook(slot.id)}>Book</button>
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
