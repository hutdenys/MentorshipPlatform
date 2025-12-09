import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Email format validation
    const isEmailValid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
    const isPasswordValid = password.length >= 6;

    const handleLogin = async (e: React.FormEvent) => {
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
            const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            localStorage.setItem('token', res.data.access_token);
            if (res.data.user && res.data.user.id) {
                localStorage.setItem('userId', res.data.user.id.toString());
                localStorage.setItem('username', res.data.user.email);
                localStorage.setItem('role', res.data.user.role);
            }
            window.location.href = '/dashboard';
        } catch (err: any) {
            setError(err.response?.data?.message || 'Невірний email або пароль');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ marginTop: '4em' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '1em' }}>Вхід</h2>
            <form onSubmit={handleLogin}>
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
                    autoComplete="current-password"
                    minLength={6}
                />
                <button
                    type="submit"
                    style={{ width: '100%', marginBottom: '1em' }}
                    disabled={loading || !email || !password}
                >
                    {loading ? 'Завантаження...' : 'Увійти'}
                </button>
            </form>
            {error && <div style={{ color: 'red', textAlign: 'center', marginBottom: '1em' }}>{error}</div>}
            <div style={{ textAlign: 'center' }}>
                <span>Немає акаунта? </span>
                <Link to="/register">Зареєструватися</Link>
            </div>
        </div>
    );
}
