import React, { useState } from 'react';
import axios from 'axios';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<'student' | 'mentor' | 'admin'>('student');
    const [error, setError] = useState('');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            await axios.post('/api/auth/register', { email, password, role });
            window.location.href = '/login';
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
                <select value={role} onChange={e => setRole(e.target.value as any)}>
                    <option value="student">Student</option>
                    <option value="mentor">Mentor</option>
                    <option value="admin">Admin</option>
                </select>
                <button type="submit">Register</button>
            </form>
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
    );
}
