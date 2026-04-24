import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../src/theme/colors';
import { PrimaryButton } from '../../src/components/common/Button';
import { AppInput } from '../../src/components/common/Input';
import { Spacing } from '../../src/theme/spacing';

export default function LoginScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.texture}>
        {Array.from({ length: 20 }).map((_, i) => (
          <View key={i} style={[styles.stripe, { top: i * 60 - 200, transform: [{ rotate: '-45deg' }] }]} />
        ))}
      </View>

      <ScrollView 
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 40 }]} 
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/images/Logo.png')} style={styles.logoImage} resizeMode="contain" />
        </View>

        <View style={styles.headerTextContainer}>
          <Text style={styles.heading}>Welcome Back!</Text>
          <Text style={styles.subheading}>Login to your account to continue</Text>
        </View>

        <View style={styles.formContainer}>
          <AppInput
            label="Email"
            placeholder="Enter your email"
            icon="email-outline"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <AppInput
            label="Password"
            placeholder="Enter your password"
            icon="lock-outline"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <View style={styles.optionsRow}>
            <TouchableOpacity 
              style={styles.rememberRow} 
              onPress={() => setRemember(!remember)}
              activeOpacity={0.7}
            >
              <View style={[styles.checkbox, remember && styles.checked]}>
                {remember && <MaterialCommunityIcons name="check" size={12} color="#FFF" />}
              </View>
              <Text style={styles.rememberText}>Remember me</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/auth/forgot-password')} activeOpacity={0.7}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <PrimaryButton 
            title="Login" 
            onPress={() => router.replace('/(tabs)/home')} 
            style={styles.loginBtn} 
          />
        </View>

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
  texture: { ...StyleSheet.absoluteFillObject, opacity: 0.03 },
  stripe: { position: 'absolute', width: 1000, height: 2, backgroundColor: '#FFF', left: -200 },
  content: { flexGrow: 1, paddingHorizontal: 24 },
  logoContainer: { alignItems: 'center', marginBottom: 48 },
  logoImage: { width: 180, height: 60 },
  headerTextContainer: { marginBottom: 32 },
  heading: { color: Colors.text, fontSize: 32, fontWeight: '800', marginBottom: 8, letterSpacing: -1 },
  subheading: { color: Colors.textMuted, fontSize: 16, fontWeight: '400' },
  formContainer: { width: '100%' },
  optionsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8, marginBottom: 24 },
  rememberRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  checkbox: { 
    width: 20, 
    height: 20, 
    borderRadius: 6, 
    borderWidth: 2, 
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  rememberText: { color: Colors.textSecondary, fontSize: 14, fontWeight: '500' },
  forgotText: { color: Colors.primary, fontSize: 14, fontWeight: '600' },
  loginBtn: { marginTop: 8, height: 56 },
  footer: { marginTop: 'auto', alignItems: 'center', paddingVertical: 32 },
  footerText: { color: Colors.textMuted, fontSize: 15 },
  footerLink: { color: Colors.primary, fontWeight: '700' },
});
