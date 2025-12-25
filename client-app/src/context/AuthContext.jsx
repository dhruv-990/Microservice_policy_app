import { createContext, useState, useEffect, useContext } from 'react';
import api from '../lib/axios';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                // Ideally validate with backend, but for speed just decode
                setUser({ ...decoded, token });
                // Optional: Fetch full user profile
            } catch (e) {
                console.error("Invalid token", e);
                logout();
            }
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const { data } = await api.post('/auth/login', { email, password });
        localStorage.setItem('token', data.token);
        const decoded = jwtDecode(data.token);
        setUser({ ...decoded, token: data.token, ...data });
    };

    const register = async (username, email, password, role) => {
        const { data } = await api.post('/auth/register', { username, email, password, role });
        localStorage.setItem('token', data.token);
        const decoded = jwtDecode(data.token);
        setUser({ ...decoded, token: data.token, ...data });
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
