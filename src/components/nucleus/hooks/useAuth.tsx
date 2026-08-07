import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { User } from '../types/auth';
import type { AuthContextValue } from '../types/auth';



const AuthContext = createContext<AuthContextValue | undefined>(undefined);




export function AuthProvider( { children }: {children: ReactNode }) {
    const[token , setToken] = useState<string | null >(() => localStorage.getItem('token'));
    const[user, setUser] = useState<User | null>(() => {
        const stored = localStorage.getItem("user");
        return stored ? (JSON.parse(stored) as User): null;
    });


    useEffect(() => {
        if(token) localStorage.setItem('token', token);
        else localStorage.removeItem('token');
    }, [token]);


    useEffect(() => {
        if(user) localStorage.setItem('user', JSON.stringify(user));
        else localStorage.removeItem('user');
    }, [user]);



    function login(newToken: string , newUser: User) {
        setToken(newToken);
        setUser(newUser);
    }

    function logout() {
        setToken(null);
        setUser(null);
    }

    return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
    );
}


// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
