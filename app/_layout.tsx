import { Redirect, Slot, usePathname } from 'expo-router';
import { AuthProvider, useAuth } from '../src/context/AuthContext';

function ProtectedLayout() {
  const { isLoggedIn, userRole } = useAuth();
  const pathname = usePathname();

  const publicRoutes = ['/', '/login', '/signup', '/visitor-login', '/choice-screen', '/visitor-choice', '/visitor-signup'];

  // If not logged in and trying to access a protected route
  if (!isLoggedIn && !publicRoutes.includes(pathname)) {
    return <Redirect href="/login" />;
  }

  // Prevent visitors from seeing cane login
  if (isLoggedIn && userRole === 'visitor' && pathname === '/login') {
    return <Redirect href="/visitorMenu" />;
  }

  // Prevent cane users from seeing visitor login
  if (isLoggedIn && userRole === 'cane' && pathname === '/visitor-login') {
    return <Redirect href="/menu" />;
  }

  return <Slot />;
}

export default function Layout() {
  return (
    <AuthProvider>
      <ProtectedLayout />
    </AuthProvider>
  );
}