import * as Notifications from 'expo-notifications';
import { Redirect, Slot, usePathname, useRouter } from 'expo-router';
import { Accelerometer, AccelerometerMeasurement } from 'expo-sensors';
import { useEffect } from 'react';
import { Platform } from 'react-native'; // ✅ Added
import { AuthProvider, useAuth } from '../src/context/AuthContext';

// Configure foreground notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

let fallStartTime: number | null = null;

function ProtectedLayout() {
  const { isLoggedIn, userRole } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const publicRoutes = [
    '/', '/login', '/signup', '/visitor-login',
    '/choice-screen', '/visitor-choice', '/visitor-signup'
  ];

  // Notification permission
  useEffect(() => {
    const requestNotificationPermission = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to send notifications was denied.');
      }
    };
    requestNotificationPermission();
  }, []);

  // 🔥 Fall Detection (mobile only)
  useEffect(() => {
    if (Platform.OS === 'web') return; // ✅ Prevents crash on web

    const FALL_THRESHOLD_LOW = 0.5;
    const FALL_THRESHOLD_HIGH = 2.5;
    const MAX_TIME_BETWEEN = 1500;

    const detectFall = ({ x, y, z }: AccelerometerMeasurement) => {
      const totalForce = Math.sqrt(x * x + y * y + z * z);

      if (totalForce < FALL_THRESHOLD_LOW && !fallStartTime) {
        fallStartTime = Date.now();
      }

      if (
        totalForce > FALL_THRESHOLD_HIGH &&
        fallStartTime &&
        Date.now() - fallStartTime <= MAX_TIME_BETWEEN
      ) {
        fallStartTime = null;
        router.replace('/fall-detected'); // Adjust path if needed
      }

      if (fallStartTime && Date.now() - fallStartTime > MAX_TIME_BETWEEN) {
        fallStartTime = null;
      }
    };

    Accelerometer.setUpdateInterval(100);
    const subscription = Accelerometer.addListener(detectFall);

    return () => {
      subscription.remove();
    };
  }, []);

  // Access protection
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