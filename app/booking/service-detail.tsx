import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BackHeader } from '../../src/components/common/Header';
import { PrimaryButton } from '../../src/components/common/Button';
import { Colors } from '../../src/theme/colors';
import { Spacing } from '../../src/theme/spacing';

export default function ServiceDetailScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.texture}>
        {Array.from({ length: 40 }).map((_, i) => (
          <View key={i} style={[styles.stripe, { top: i * 25 - 200, transform: [{ rotate: '-45deg' }] }]} />
        ))}
      </View>

      <BackHeader title="Service Details" />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Image carousel placeholder */}
        <View style={styles.imageCarousel}>
          <MaterialCommunityIcons name="forklift" size={80} color={Colors.primary} />
          <View style={styles.dots}>
            <View style={[styles.dot, styles.dotActive]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>

        <Text style={styles.serviceName}>Light & Heavy Repairs</Text>
        <Text style={styles.sectionLabel}>About Service</Text>
        <Text style={styles.description}>
          Our certified technicians provide comprehensive forklift repair services including engine rebuilds,
          hydraulic system overhauls, brake adjustments, electrical diagnostics, and structural repairs.
          We service all major brands including Toyota, Hyster, Yale, Crown, and Caterpillar.
          {'\n\n'}
          Our mobile service fleet can come to your location for on-site repairs,
          minimizing downtime and keeping your operations running smoothly.
        </Text>
      </ScrollView>

      <View style={styles.bottomBar}>
        <PrimaryButton title="Book Now" onPress={() => router.push('/booking/book-appointment')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, overflow: 'hidden' },
  texture: { ...StyleSheet.absoluteFillObject, opacity: 0.04 },
  stripe: { position: 'absolute', width: 800, height: 1, backgroundColor: '#FFF', left: -200 },
  content: { paddingHorizontal: Spacing.screenPadding, paddingBottom: 100 },
  imageCarousel: {
    height: 220,
    backgroundColor: Colors.surface,
    borderRadius: Spacing.radiusLg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  dots: { flexDirection: 'row', gap: 6, marginTop: 12 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.placeholder },
  dotActive: { backgroundColor: Colors.primary, width: 20 },
  serviceName: { color: Colors.primary, fontSize: 24, fontWeight: '700', marginBottom: 16 },
  sectionLabel: { color: Colors.text, fontSize: 16, fontWeight: '600', marginBottom: 8 },
  description: { color: Colors.textMuted, fontSize: 14, lineHeight: 22 },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Spacing.screenPadding,
    paddingBottom: 32,
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
  },
});