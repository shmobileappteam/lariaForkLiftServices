import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { Colors } from '../src/theme/colors';

export default function RootLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: Colors.background },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />

        {/* Onboarding */}
        <Stack.Screen name="onboarding/splash" />
        <Stack.Screen name="onboarding/slides" />

        {/* Auth */}
        <Stack.Screen name="auth/get-started" />
        <Stack.Screen name="auth/login" />
        <Stack.Screen name="auth/register" />
        <Stack.Screen name="auth/forgot-password" />
        <Stack.Screen name="auth/otp" />

        {/* Booking inner screens */}
        <Stack.Screen name="booking/services" />
        <Stack.Screen name="booking/service-detail" />
        <Stack.Screen name="booking/book-appointment" />
        <Stack.Screen name="booking/booking-details" />
        <Stack.Screen name="booking/success" />
        <Stack.Screen name="booking/notifications" />

        {/* E-commerce inner screens */}
        <Stack.Screen name="ecommerce/product-detail" />
        <Stack.Screen name="ecommerce/cart" />
        <Stack.Screen name="ecommerce/checkout" />
        <Stack.Screen name="ecommerce/payment" />
        <Stack.Screen name="ecommerce/order-success" />
        <Stack.Screen name="ecommerce/track-input" />
        <Stack.Screen name="ecommerce/track-order" />
        <Stack.Screen name="ecommerce/orders" />
        <Stack.Screen name="ecommerce/categories" />
        <Stack.Screen name="ecommerce/category-inner" />
        <Stack.Screen name="ecommerce/search" />
        <Stack.Screen name="ecommerce/offers" />
        <Stack.Screen name="ecommerce/favorites" />

        {/* Chat */}
        <Stack.Screen name="chat/conversation" />

        {/* Profile */}
        <Stack.Screen name="profile/edit" />
        <Stack.Screen name="profile/addresses" />
        <Stack.Screen name="profile/add-address" />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}
