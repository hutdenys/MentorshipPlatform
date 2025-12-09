


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';

type User = {
    id: number;
    email: string;
    role: string;
    createdAt: string;
};

export default function Profile() {
    const [profile, setProfile] = useState<any>(null);
    const [user, setUser] = useState<User | null>(null);
    const userId = Number(localStorage.getItem('userId'));
    const [type, setType] = useState<'student' | 'mentor'>('student');
    const [form, setForm] = useState<any>({});
    const [subjects, setSubjects] = useState<any[]>([]);

    useEffect(() => {
        // get user info (email, role, createdAt)
        axios.get(`http://localhost:5000/api/users/${userId}`).then(res => {
            setUser(res.data);
        });
        if (type === 'student') {
            axios.get(`http://localhost:5000/api/profiles/student/${userId}`).then(res => {
                setProfile(res.data);
                setForm(res.data || {});
            });
        } else {
            axios.get(`http://localhost:5000/api/profiles/mentor/${userId}`).then(res => {
                setProfile(res.data);
                // subjects: array of objects, convert to array of ids for select
                setForm({
                    ...res.data,
                    subjects: Array.isArray(res.data.subjects) ? res.data.subjects.map((s: any) => s.id) : [],
                });
            });
            // get all subjects for select
            axios.get('http://localhost:5000/api/profiles/subjects').then(res => {
                setSubjects(res.data);
            });
        }
    }, [type, userId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type: inputType } = e.target;
        if (name === 'subjects') {
            // For multi-select
            const options = (e.target as HTMLSelectElement).options;
            const selected: number[] = [];
            for (let i = 0; i < options.length; i++) {
                if (options[i].selected) selected.push(Number(options[i].value));
            }
            setForm({ ...form, subjects: selected });
        } else if (inputType === 'number') {
            setForm({ ...form, [name]: value === '' ? '' : Number(value) });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSave = async () => {
        if (type === 'student') {
            await axios.patch(`http://localhost:5000/api/profiles/student/${userId}`, form);
        } else {
            // send subjects as array of ids
            await axios.patch(`http://localhost:5000/api/profiles/mentor/${userId}`, {
                ...form,
                subjects: form.subjects,
            });
        }
        alert('Profile updated!');
    };

    return (
        <div className="container" style={{ marginTop: '4em', maxWidth: 600 }}>
            <h2 style={{ textAlign: 'center', marginBottom: '1em' }}>Профіль</h2>
            <div style={{ marginBottom: '2em', border: '1px solid #eee', borderRadius: 8, padding: 16, background: '#fafbfc' }}>
                <div style={{ marginBottom: 8 }}><b>Email:</b> {user?.email || '-'}</div>
                <div style={{ marginBottom: 8 }}><b>Роль:</b> {user?.role || '-'}</div>
                <div style={{ marginBottom: 8 }}><b>Дата створення:</b> {user?.createdAt ? new Date(user.createdAt).toLocaleString() : '-'}</div>
            </div>

            {type === 'student' ? (
                <div>
                    <label style={{ display: 'block', marginBottom: '1em' }}>
                        Ціль:
                        <input name="goal" value={form.goal || ''} onChange={handleChange} style={{ width: '100%' }} />
                    </label>
                    <label style={{ display: 'block', marginBottom: '1em' }}>
                        Рівень:
                        <input name="level" value={form.level || ''} onChange={handleChange} style={{ width: '100%' }} />
                    </label>
                </div>
            ) : (
                <div>
                    <label style={{ display: 'block', marginBottom: '1em' }}>
                        Біо:
                        <textarea name="bio" value={form.bio || ''} onChange={handleChange} style={{ width: '100%' }} />
                    </label>
                    <label style={{ display: 'block', marginBottom: '1em' }}>
                        Ставка за годину:
                        <input name="ratePerHour" type="number" value={form.ratePerHour || ''} onChange={handleChange} style={{ width: '100%' }} />
                    </label>
                    <label style={{ display: 'block', marginBottom: '1em' }}>
                        Предмети:
                        <select name="subjects" multiple value={form.subjects || []} onChange={handleChange} style={{ width: '100%', minHeight: 80 }}>
                            {subjects.map((s) => (
                                <option key={s.id} value={s.id}>{s.name}</option>
                            ))}
                        </select>
                    </label>
                    <label style={{ display: 'block', marginBottom: '1em' }}>
                        Макс. сесій на день:
                        <input name="maxSessionsPerDay" type="number" value={form.maxSessionsPerDay || ''} onChange={handleChange} style={{ width: '100%' }} />
                    </label>
                </div>
            )}
            <button onClick={handleSave} style={{ marginTop: '1em', background: '#1890ff', color: '#fff', border: 'none', borderRadius: 6, padding: '0.5em 1em', cursor: 'pointer' }}>Зберегти</button>
        </div>
    );
}
