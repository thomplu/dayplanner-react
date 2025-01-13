import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { AuthProvider } from './helpers/authContext';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </StrictMode>
);
