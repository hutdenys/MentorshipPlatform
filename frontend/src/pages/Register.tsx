import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<'student' | 'mentor' | 'admin'>('student');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Email format validation
    const isEmailValid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
    const isPasswordValid = password.length >= 6;

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!isEmailValid) {
            setError('Некоректний email');
            return;
        }
        if (!isPasswordValid) {
            setError('Пароль має бути не менше 6 символів');
            return;
        }
        setLoading(true);
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', { email, password, role });
            if (res.data && res.data.user && res.data.user.id) {
                localStorage.setItem('userId', res.data.user.id.toString());
                localStorage.setItem('username', res.data.user.email);
                localStorage.setItem('role', res.data.user.role);
                localStorage.setItem('token', res.data.access_token);
                window.location.href = '/dashboard';
            } else {
                window.location.href = '/login';
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Реєстрація не вдалася');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ marginTop: '4em' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '1em' }}>Реєстрація</h2>
            <form onSubmit={handleRegister}>
                <input
                    type="email"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setError(''); }}
                    placeholder="Email"
                    required
                    style={{ width: '100%' }}
                    autoComplete="username"
                />
                <input
                    type="password"
                    value={password}
                    onChange={e => { setPassword(e.target.value); setError(''); }}
                    placeholder="Пароль"
                    required
                    style={{ width: '100%' }}
                    autoComplete="new-password"
                    minLength={6}
                />
                <div style={{ fontSize: '0.95em', color: '#888', marginBottom: '1em' }}>
                    Пароль має бути не менше 6 символів
                </div>
                <select
                    value={role}
                    onChange={e => setRole(e.target.value as any)}
                    style={{ width: '100%' }}
                >
                    <option value="student">Студент</option>
                    <option value="mentor">Ментор</option>
                    <option value="admin">Адмін</option>
                </select>
                <button
                    type="submit"
                    style={{ width: '100%', marginBottom: '1em' }}
                    disabled={loading || !email || !password}
                >
                    {loading ? 'Завантаження...' : 'Зареєструватися'}
                </button>
            </form>
            {error && <div style={{ color: 'red', textAlign: 'center', marginBottom: '1em' }}>{error}</div>}
            <div style={{ textAlign: 'center' }}>
                <span>Вже є акаунт? </span>
                <Link to="/login">Увійти</Link>
            </div>
        </div>
    );
}
