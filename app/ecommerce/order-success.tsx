import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PrimaryButton, OutlineButton } from '../../src/components/common/Button';
import { Colors } from '../../src/theme/colors';
import { Spacing } from '../../src/theme/spacing';

const { width } = Dimensions.get('window');

export default function OrderSuccessScreen() {
  const router = useRouter();
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.spring(scaleAnim, { toValue: 1, tension: 40, friction: 6, useNativeDriver: true }),
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.spring(bounceAnim, { toValue: 1, tension: 20, friction: 4, useNativeDriver: true }),
      ])
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* Texture Background */}
      <View style={styles.texture}>
        {Array.from({ length: 40 }).map((_, i) => (
          <View key={i} style={[styles.stripe, { top: i * 25 - 200, transform: [{ rotate: '-45deg' }] }]} />
        ))}
      </View>

      <View style={styles.content}>
        <Animated.View style={[styles.statusIconContainer, { transform: [{ scale: scaleAnim }] }]}>
          <View style={styles.glow} />
          <View style={styles.iconCircle}>
            <MaterialCommunityIcons name="check-bold" size={60} color="#FFF" />
          </View>
        </Animated.View>

        <Animated.View style={[styles.textGroup, { opacity: fadeAnim, transform: [{ translateY: bounceAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [50, 0]
        }) }] }]}>
          <Text style={styles.successLabel}>DISPATCH CONFIRMED</Text>
          <Text style={styles.title}>Your fleet is on the{'\n'}way to peak power</Text>
          <Text style={styles.subtitle}>Order #ORD-1000124 has been processed and is ready for dispatch.</Text>
        </Animated.View>

        {/* Dispatch Card */}
        <Animated.View style={[styles.ticketCard, { opacity: fadeAnim }]}>
          <View style={styles.ticketRow}>
            <View>
              <Text style={styles.ticketLabel}>Estimated Arrival</Text>
              <Text style={styles.ticketValue}>Oct 28, 2026</Text>
            </View>
            <View style={styles.ticketDivider} />
            <View>
              <Text style={styles.ticketLabel}>Status</Text>
              <Text style={[styles.ticketValue, { color: Colors.primary }]}>Processing</Text>
            </View>
          </View>
        </Animated.View>

        <Animated.View style={[styles.footer, { opacity: fadeAnim }]}>
          <PrimaryButton 
            title="TRACK DISPATCH" 
            onPress={() => router.push('/ecommerce/track-order')} 
            style={styles.mainBtn}
          />
          <OutlineButton 
            title="Return to Shop" 
            onPress={() => router.replace('/(tabs)/shop')} 
            style={styles.backBtn}
          />
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, justifyContent: 'center' },
  texture: { ...StyleSheet.absoluteFillObject, opacity: 0.05 },
  stripe: { position: 'absolute', width: 1000, height: 1, backgroundColor: '#FFF', left: -200 },
  content: { alignItems: 'center', paddingHorizontal: 32 },
  statusIconContainer: {
    width: 140,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  glow: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: Colors.primary,
    opacity: 0.15,
  },
  iconCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 15,
  },
  textGroup: { alignItems: 'center', marginBottom: 40 },
  successLabel: { color: Colors.primary, fontSize: 12, fontWeight: '800', letterSpacing: 3, marginBottom: 12 },
  title: { color: Colors.text, fontSize: 28, fontWeight: '900', textAlign: 'center', lineHeight: 36 },
  subtitle: { color: Colors.textMuted, fontSize: 14, textAlign: 'center', marginTop: 16, lineHeight: 22 },
  ticketCard: {
    width: '100%',
    backgroundColor: Colors.surface,
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 48,
  },
  ticketRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  ticketLabel: { color: Colors.textMuted, fontSize: 11, fontWeight: '600', textTransform: 'uppercase', marginBottom: 6 },
  ticketValue: { color: Colors.text, fontSize: 16, fontWeight: '800' },
  ticketDivider: { width: 1, height: 30, backgroundColor: Colors.border },
  footer: { width: '100%', gap: 12 },
  mainBtn: { height: 60, borderRadius: Spacing.radiusXl },
  backBtn: { height: 60, borderRadius: Spacing.radiusXl, borderColor: 'rgba(255,255,255,0.1)' },
});