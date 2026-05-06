import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);

const demoUser = {
  name: 'Amina Khan',
  email: 'amina@example.com',
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('context-auth-user');
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('context-auth-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('context-auth-user');
    }
  }, [user]);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login: (email, password) => {
        if (email === demoUser.email && password === 'Password123!') {
          setUser(demoUser);
          return { ok: true };
        }

        return { ok: false, message: 'Use amina@example.com / Password123!' };
      },
      logout: () => setUser(null),
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}