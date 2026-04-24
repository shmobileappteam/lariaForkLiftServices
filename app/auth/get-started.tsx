import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../src/theme/colors';
import { SocialButton, PrimaryButton } from '../../src/components/common/Button';
import { Spacing } from '../../src/theme/spacing';

export default function GetStartedScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      {/* Diagonal texture */}
      <View style={styles.texture}>
        {Array.from({ length: 40 }).map((_, i) => (
          <View key={i} style={[styles.stripe, { top: i * 25 - 200, transform: [{ rotate: '-45deg' }] }]} />
        ))}
      </View>

      <ScrollView contentContainerStyle={[styles.content, { paddingTop: insets.top + 40 }]}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/images/Logo.png')} style={styles.logoImage} resizeMode="contain" />
        </View>

        <Text style={styles.heading}>Let's Get Started</Text>
        <Text style={styles.subheading}>Choose how you'd like to continue</Text>

        {/* Social Buttons */}
        <View style={styles.socialButtons}>
          <SocialButton title="Continue With Google" icon="google" onPress={() => router.push('/(tabs)/home')} />
          <SocialButton title="Continue With Facebook" icon="facebook" onPress={() => router.push('/(tabs)/home')} />
          <SocialButton title="Continue With Apple ID" icon="apple" onPress={() => router.push('/(tabs)/home')} />
          <PrimaryButton title="Login With Email" icon="email-outline" onPress={() => router.push('/auth/login')} />
        </View>

        {/* Continue as Guest */}
        <View style={styles.guestContainer}>
          <Text style={styles.guestText} onPress={() => router.replace('/(tabs)/home')}>
            Continue as Guest
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Don't have an account?{' '}
            <Text style={styles.footerLink} onPress={() => router.push('/auth/register')}>
              Register Now
            </Text>
          </Text>
        </View>
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
  heading: { color: Colors.text, fontSize: 28, fontWeight: '700', marginBottom: 8 },
  subheading: { color: Colors.textMuted, fontSize: 14, marginBottom: 32 },
  socialButtons: { width: '100%', gap: 4 },
  guestContainer: { marginTop: 16, marginBottom: 24 },
  guestText: { color: Colors.placeholder, fontSize: 14, textDecorationLine: 'underline' },
  footer: { marginTop: 'auto', paddingBottom: 32 },
  footerText: { color: Colors.textMuted, fontSize: 14 },
  footerLink: { color: Colors.primary, fontWeight: '600' },
});
