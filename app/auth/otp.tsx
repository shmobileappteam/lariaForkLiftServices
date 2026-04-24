import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../src/theme/colors';
import { PrimaryButton } from '../../src/components/common/Button';
import { OTPInput } from '../../src/components/common/Input';
import { Spacing } from '../../src/theme/spacing';

export default function OTPScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View style={styles.texture}>
        {Array.from({ length: 40 }).map((_, i) => (
          <View key={i} style={[styles.stripe, { top: i * 25 - 200, transform: [{ rotate: '-45deg' }] }]} />
        ))}
      </View>

      <ScrollView contentContainerStyle={[styles.content, { paddingTop: insets.top + 20 }]}>
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/images/Logo.png')} style={styles.logoImage} resizeMode="contain" />
        </View>

        <Text style={styles.heading}>Enter Verification Code</Text>
        <Text style={styles.subheading}>We've sent a 4-digit code to your email address.</Text>

        <View style={styles.otpContainer}>
          <OTPInput length={4} />
        </View>

        <TouchableOpacity>
          <Text style={styles.resend}>Didn't receive code? <Text style={styles.resendLink}>Resend</Text></Text>
        </TouchableOpacity>

        <PrimaryButton title="Verify" onPress={() => router.replace('/(tabs)/home')} style={{ marginTop: 24 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, overflow: 'hidden' },
  texture: { ...StyleSheet.absoluteFillObject, opacity: 0.04 },
  stripe: { position: 'absolute', width: 800, height: 1, backgroundColor: '#FFF', left: -200 },
  content: { flexGrow: 1, paddingHorizontal: Spacing.screenPadding, alignItems: 'center' },
  logoContainer: { alignItems: 'center', marginBottom: 32 },
  logoImage: { width: 160, height: 50, marginBottom: 8 },
  heading: { color: Colors.text, fontSize: 24, fontWeight: '700', marginBottom: 8 },
  subheading: { color: Colors.textMuted, fontSize: 14, marginBottom: 32, textAlign: 'center' },
  otpContainer: { marginBottom: 24 },
  resend: { color: Colors.textMuted, fontSize: 14, textAlign: 'center' },
  resendLink: { color: Colors.primary, fontWeight: '600' },
});