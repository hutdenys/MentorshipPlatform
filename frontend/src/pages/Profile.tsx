import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Profile() {
    const [profile, setProfile] = useState<any>(null);
    const userId = 2; // TODO: get from auth context
    const [type, setType] = useState<'student' | 'mentor'>('student');
    const [form, setForm] = useState<any>({});

    useEffect(() => {
        if (type === 'student') {
            axios.get(`/api/profiles/student/${userId}`).then(res => {
                setProfile(res.data);
                setForm(res.data || {});
            });
        } else {
            axios.get(`/api/profiles/mentor/${userId}`).then(res => {
                setProfile(res.data);
                setForm(res.data || {});
            });
        }
    }, [type, userId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        if (type === 'student') {
            await axios.patch(`/api/profiles/student/${userId}`, form);
        } else {
            await axios.patch(`/api/profiles/mentor/${userId}`, form);
        }
        alert('Profile updated!');
    };

    return (
        <div>
            <h2>Profile</h2>
            <select value={type} onChange={e => setType(e.target.value as any)}>
                <option value="student">Student</option>
                <option value="mentor">Mentor</option>
            </select>
            {type === 'student' ? (
                <div>
                    <label>Goal: <input name="goal" value={form.goal || ''} onChange={handleChange} /></label>
                    <label>Level: <input name="level" value={form.level || ''} onChange={handleChange} /></label>
                </div>
            ) : (
                <div>
                    <label>Bio: <textarea name="bio" value={form.bio || ''} onChange={handleChange} /></label>
                    <label>Rate per hour: <input name="ratePerHour" type="number" value={form.ratePerHour || ''} onChange={handleChange} /></label>
                    <label>Max sessions/day: <input name="maxSessionsPerDay" type="number" value={form.maxSessionsPerDay || ''} onChange={handleChange} /></label>
                </div>
            )}
            <button onClick={handleSave}>Save</button>
        </div>
    );
}
