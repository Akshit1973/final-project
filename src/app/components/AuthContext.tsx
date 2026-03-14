import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  username: string;
  name?: string;
  level: string;
  progress: number;
  avatarColor: string;
  bio?: string;
  rating: number;
  totalSwaps: number;
  hoursExchanged: number;
  skills: Array<{ id: string; name: string; type: string; category: string }>;
  sentSwaps: any[];
  receivedSwaps: any[];
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string) => Promise<void>;
  signup: (username: string, email: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        try {
          // Fetch fresh data from server
          const res = await fetch(`/api/users/${parsed.id}`);
          if (res.ok) {
            const fresh = await res.json();
            setUser(fresh);
            localStorage.setItem('user', JSON.stringify(fresh));
          } else {
            setUser(parsed);
          }
        } catch {
          setUser(parsed);
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (email: string) => {
    // In a real app, you'd verify password on backend
    // For this demo, we'll just check if user exists
    const res = await fetch('/api/users');
    const users: User[] = await res.json();
    const found = users.find(u => u.email === email);
    
    if (found) {
      // Get full user data with relations
      const fullRes = await fetch(`/api/users/${found.id}`);
      const fullUser = await fullRes.json();
      setUser(fullUser);
      localStorage.setItem('user', JSON.stringify(fullUser));
    } else {
      throw new Error('User not found');
    }
  };

  const signup = async (username: string, email: string) => {
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email }),
    });
    
    if (res.ok) {
      const newUser = await res.json();
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
    } else {
      const error = await res.json();
      throw new Error(error.error || 'Signup failed');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const refreshUser = async () => {
    if (!user) return;
    try {
      const res = await fetch(`/api/users/${user.id}`);
      if (res.ok) {
        const fresh = await res.json();
        setUser(fresh);
        localStorage.setItem('user', JSON.stringify(fresh));
      }
    } catch (err) {
      console.error("Failed to refresh user", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
