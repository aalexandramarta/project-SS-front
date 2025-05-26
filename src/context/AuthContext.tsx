import React, { createContext, useContext, useState } from 'react';

// 👇 Update the types
type UserRole = 'visitor' | 'cane' | null;

type AuthContextType = {
  isLoggedIn: boolean;
  userId: number | null;
  userRole: UserRole;
  login: (id: number, role: UserRole) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [userRole, setUserRole] = useState<UserRole>(null); // 👈 NEW

  const login = (id: number, role: UserRole) => {
    setIsLoggedIn(true);
    setUserId(id);
    setUserRole(role); // 👈 Set the role
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserId(null);
    setUserRole(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userId, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};