
import React, { useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const menuBoxStyle: React.CSSProperties = {
    position: 'absolute',
    right: 0,
    top: '100%',
    background: '#fff',
    boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
    borderRadius: 8,
    minWidth: 160,
    zIndex: 100,
    marginTop: 8,
    padding: '0.5em 0',
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #eaeaea',
};

const menuItemStyle: React.CSSProperties = {
    padding: '0.75em 1.5em',
    color: '#333',
    textDecoration: 'none',
    fontWeight: 500,
    background: 'none',
    border: 'none',
    textAlign: 'left',
    cursor: 'pointer',
    transition: 'background 0.15s',
};

const menuItemHoverStyle: React.CSSProperties = {
    ...menuItemStyle,
    background: '#f5f7fa',
};


const getNavLinks = () => {
    const role = localStorage.getItem('role');
    const links = [
        { to: '/dashboard', label: 'Головна' },
        { to: '/sessions', label: 'Сесії' },
    ];
    if (role === 'mentor') {
        links.push({ to: '/mentor', label: 'Ментор' });
    }
    return links;
};

const Header: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const [hovered, setHovered] = useState<string | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    // Check if user is logged in
    const isLoggedIn = Boolean(localStorage.getItem('token'));
    // Дістаємо логін користувача з localStorage (або з контексту, якщо буде)
    const username = localStorage.getItem('username') || '';

    React.useEffect(() => {
        if (!open) return;
        const handler = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [open]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <header style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1em 2em',
            background: '#f5f7fa',
            borderBottom: '1px solid #eaeaea',
            marginBottom: '2em',
            position: 'relative',
            zIndex: 10,
        }}>
            <Link to="/" style={{ fontWeight: 700, fontSize: 22, color: '#1890ff', textDecoration: 'none' }}>
                Mentorship Platform
            </Link>
            {isLoggedIn && (
                <nav style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {getNavLinks().map(link => (
                        <Link
                            key={link.to}
                            to={link.to}
                            style={{
                                color: location.pathname === link.to ? '#1890ff' : '#333',
                                background: location.pathname === link.to ? '#e6f7ff' : 'none',
                                fontWeight: 500,
                                textDecoration: 'none',
                                padding: '0.5em 1.2em',
                                borderRadius: 6,
                                transition: 'background 0.15s',
                                marginRight: 2,
                            }}
                            onMouseEnter={() => setHovered(link.to)}
                            onMouseLeave={() => setHovered(null)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div style={{ position: 'relative' }} ref={menuRef}>
                        <button
                            onClick={() => setOpen((v) => !v)}
                            style={{
                                background: 'none',
                                border: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                fontWeight: 500,
                                fontSize: 16,
                                color: '#333',
                                cursor: 'pointer',
                                padding: '0.5em 1.2em',
                                borderRadius: 6,
                                transition: 'background 0.15s',
                                outline: open ? '2px solid #1890ff' : 'none',
                                gap: 8,
                            }}
                            onMouseEnter={() => setHovered('menu')}
                            onMouseLeave={() => setHovered(null)}
                        >
                            <span style={{
                                width: 32,
                                height: 32,
                                borderRadius: '50%',
                                background: '#e6f7ff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 700,
                                color: '#1890ff',
                                fontSize: 18,
                                marginRight: 4,
                            }}>{username ? username[0].toUpperCase() : '?'}</span>
                            <span style={{ fontSize: 15, fontWeight: 500 }}>{username}</span>
                        </button>
                        {open && (
                            <div style={menuBoxStyle}>
                                <button
                                    style={hovered === 'profile' ? menuItemHoverStyle : menuItemStyle}
                                    onMouseEnter={() => setHovered('profile')}
                                    onMouseLeave={() => setHovered(null)}
                                    onClick={() => { setOpen(false); navigate('/profile'); }}
                                >
                                    Профіль
                                </button>
                                <button
                                    style={hovered === 'logout' ? menuItemHoverStyle : menuItemStyle}
                                    onMouseEnter={() => setHovered('logout')}
                                    onMouseLeave={() => setHovered(null)}
                                    onClick={handleLogout}
                                >
                                    Вийти
                                </button>
                            </div>
                        )}
                    </div>
                </nav>
            )}
        </header>
    );
};

export default Header;
