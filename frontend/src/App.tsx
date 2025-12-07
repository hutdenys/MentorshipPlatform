
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import MentorDashboard from './pages/MentorDashboard';
import StudentDashboard from './pages/StudentDashboard';
import Sessions from './pages/Sessions';

// HOC для захисту роутів
const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const token = localStorage.getItem('token');
    const location = useLocation();
    if (!token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return <>{children}</>;
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <>
        <Header />
        <div style={{ maxWidth: 900, margin: '0 auto' }}>{children}</div>
    </>
);

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/profile"
                    element={
                        <RequireAuth>
                            <Layout>
                                <Profile />
                            </Layout>
                        </RequireAuth>
                    }
                />
                <Route
                    path="/mentor"
                    element={
                        <RequireAuth>
                            {localStorage.getItem('role') === 'mentor' ? (
                                <Layout>
                                    <MentorDashboard />
                                </Layout>
                            ) : (
                                <Navigate to="/dashboard" replace />
                            )}
                        </RequireAuth>
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        <RequireAuth>
                            <Layout>
                                <StudentDashboard />
                            </Layout>
                        </RequireAuth>
                    }
                />
                <Route
                    path="/sessions"
                    element={
                        <RequireAuth>
                            <Layout>
                                <Sessions />
                            </Layout>
                        </RequireAuth>
                    }
                />
                <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
        </Router>
    );
}

export default App;
