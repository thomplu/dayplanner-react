import React from 'react';
import { api } from './services/api';
import './styles/main.scss'
import { useNavigate, Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function NavigationSetup() {
    const navigate = useNavigate();
    React.useEffect(() => {
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
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="login" element={<Login />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
