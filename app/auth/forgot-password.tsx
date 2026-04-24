import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../src/theme/colors';
import { PrimaryButton } from '../../src/components/common/Button';
import { AppInput } from '../../src/components/common/Input';
import { Spacing } from '../../src/theme/spacing';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.texture}>
        {Array.from({ length: 40 }).map((_, i) => (
          <View key={i} style={[styles.stripe, { top: i * 25 - 200, transform: [{ rotate: '-45deg' }] }]} />
        ))}
      </View>

      <ScrollView contentContainerStyle={[styles.content, { paddingTop: insets.top + 20 }]} keyboardShouldPersistTaps="handled">
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/images/Logo.png')} style={styles.logoImage} resizeMode="contain" />
        </View>

        <Text style={styles.heading}>Password Reset</Text>
        <Text style={styles.subheading}>
          Enter your email address and we'll send you a verification code to reset your password.
        </Text>

        <AppInput placeholder="Email Address" icon="email-outline" value={email} onChangeText={setEmail} keyboardType="email-address" />

        <PrimaryButton title="Get Verification Code" onPress={() => router.push('/auth/otp')} style={{ marginTop: 16 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, overflow: 'hidden' },
  texture: { ...StyleSheet.absoluteFillObject, opacity: 0.04 },
  stripe: { position: 'absolute', width: 800, height: 1, backgroundColor: '#FFF', left: -200 },
  content: { flexGrow: 1, paddingHorizontal: Spacing.screenPadding },
  logoContainer: { alignItems: 'center', marginBottom: 32 },
  logoImage: { width: 160, height: 50, marginBottom: 8 },
  heading: { color: Colors.primary, fontSize: 28, fontWeight: '700', marginBottom: 8 },
  subheading: { color: Colors.textMuted, fontSize: 14, lineHeight: 20, marginBottom: 24 },
});