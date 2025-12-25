import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Layout({ children }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    return (
        <div className="min-h-screen flex flex-col">
            <nav className="bg-gray-800 text-white p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-xl font-bold">InsureTech Platform</h1>
                    <div className="flex items-center space-x-4">
                        <span>Welcome, {user?.username} ({user?.role})</span>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </nav>
            <main className="flex-grow container mx-auto p-4">
                {children}
            </main>
        </div>
    );
}
