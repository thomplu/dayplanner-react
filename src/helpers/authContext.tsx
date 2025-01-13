import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextValue {
    accessToken: string;
    setAccessToken: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [accessToken, setAccessTokenState] = useState<string>(() => {
        // Initialize token from localStorage
        return localStorage.getItem('token') || '';
    });

    const setAccessToken = (token: string) => {
        setAccessTokenState(token);
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    };

    const logout = () => {
        setAccessToken(''); // Clear token
    };

    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook to use AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
