import { api } from './services/api';
import './styles/main.scss';
import { useNavigate, Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from './components/Login/Login';
import CurrentTasks from './pages/CurrentTasks/CurrentTasks';
import Playground from './pages/Playground/Playground';
import { useEffect } from 'react';
import Navigation from './components/Navigation/Navigation';
import CompletedTasks from './pages/CompletedTask/CompletedTasks';
import UpcomingTasks from './pages/UpcomingTask/UpcomingTasks';
import { useAuth } from './helpers/authContext';

function NavigationSetup() {
    const navigate = useNavigate();
    const { logout } = useAuth();
    useEffect(() => {
        if (!navigate) {
            console.error('useNavigate is not available!');
        }

        api.setOnUnauthorizedHandler(() => {
            logout();
            navigate('/login');
        });
    }, [navigate]);

    return null;
}

function App() {
    const { accessToken } = useAuth();
    return (
        <BrowserRouter>
            <NavigationSetup /> {/* Setup navigation for API service */}
            {accessToken ? <Navigation /> : null}
            <div className="content">
                <Routes>
                    <Route path="/" element={<CurrentTasks />} />
                    <Route path="completed" element={<CompletedTasks />} />
                    <Route path="upcoming" element={<UpcomingTasks />} />
                    <Route path="login" element={<Login />} />
                    <Route path="playground" element={<Playground />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
