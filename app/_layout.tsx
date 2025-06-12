import * as Notifications from 'expo-notifications';
import { Redirect, Slot, usePathname } from 'expo-router';
import { useEffect } from 'react';
import { AuthProvider, useAuth } from '../src/context/AuthContext';

// Configure foreground notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true, // 👈 required in recent versions
    shouldShowList: true    // 👈 required in recent versions
  }),
});

function ProtectedLayout() {
  const { isLoggedIn, userRole } = useAuth();
  const pathname = usePathname();

  const publicRoutes = ['/', '/login', '/signup', '/visitor-login', '/choice-screen', '/visitor-choice', '/visitor-signup'];

  // Request permission once
  useEffect(() => {
    const requestNotificationPermission = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to send notifications was denied.');
      }
    };
    requestNotificationPermission();
  }, []);

  if (!isLoggedIn && !publicRoutes.includes(pathname)) {
    return <Redirect href="/" />;
  }

  if (isLoggedIn && userRole === 'visitor' && pathname === '/login') {
    return <Redirect href="/visitor-menu" />;
  }

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