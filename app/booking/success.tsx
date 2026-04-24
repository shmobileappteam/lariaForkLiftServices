import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../../src/theme/colors';

export default function BookingSuccessScreen() {
  const router = useRouter();
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.spring(scaleAnim, { toValue: 1, tension: 50, friction: 5, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.checkCircle, { transform: [{ scale: scaleAnim }] }]}>
        <MaterialCommunityIcons name="check" size={60} color="#FFF" />
      </Animated.View>

      <Animated.View style={{ opacity: fadeAnim, alignItems: 'center' }}>
        <Text style={styles.title}>Request Submitted</Text>
        <Text style={styles.subtitle}>
          We'll send you a reminder for your{'\n'}booking confirmation.
        </Text>

        <TouchableOpacity onPress={() => router.replace('/(tabs)/home')} style={styles.link}>
          <MaterialCommunityIcons name="arrow-left" size={18} color={Colors.primary} />
          <Text style={styles.linkText}>Back to Home</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, justifyContent: 'center', alignItems: 'center', padding: 32 },
  checkCircle: {
    width: 120, height: 120, borderRadius: 60,
    backgroundColor: Colors.primary,
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 32,
  },
  title: { color: Colors.text, fontSize: 26, fontWeight: '700', marginBottom: 12, textAlign: 'center' },
  subtitle: { color: Colors.textMuted, fontSize: 15, textAlign: 'center', lineHeight: 22, marginBottom: 32 },
  link: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  linkText: { color: Colors.primary, fontSize: 15, fontWeight: '600' },
});