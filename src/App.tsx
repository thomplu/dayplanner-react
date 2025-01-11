import { api } from './services/api';
import './styles/main.scss';
import { useNavigate, Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from './components/Login/Login';
import CurrentTasks from './pages/CurrentTasks/CurrentTasks';
import Playground from './pages/Playground/Playground';
import { useEffect } from 'react';
import Navigation from './components/Navigation/Navigation';

function NavigationSetup() {
    const navigate = useNavigate();
    useEffect(() => {
        if (!navigate) {
            console.error('useNavigate is not available!');
        }

        api.setOnUnauthorizedHandler(() => {
            navigate('/login'); // Redirect to login on 401/403
        });
    }, [navigate]);

    return null; // This component does not render anything
}

function App() {
    return (
        <BrowserRouter>
            <NavigationSetup /> {/* Setup navigation for API service */}
            <Navigation />
            <Routes>
                <Route path="/" element={<CurrentTasks />} />
                <Route path="login" element={<Login />} />
                <Route path="playground" element={<Playground />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
