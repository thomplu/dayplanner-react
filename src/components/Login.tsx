import { useState } from 'react';
import { api } from '../services/api';
import { Navigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [navigateToDashboard, setNavigateToDashboard] = useState<boolean>(false)

    const handleLogin = async () => {
        if (!username.trim()) return;
        if (!password.trim()) return;

        try {
            await api.login({ username: username, password: password });
            setNavigateToDashboard(true)

        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    if (navigateToDashboard) {
        return <Navigate to="/" />;
    }

    return (
        <div>
            <div>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Add a new task"
                />
                {/*<button onClick={handleAddTask}>Add Task</button>*/}
            </div>
            <div>
                <input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Add a new task"
                />
                <button onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
};

export default Login;