import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BackHeader } from '../../src/components/common/Header';
import { PrimaryButton } from '../../src/components/common/Button';
import { AppInput } from '../../src/components/common/Input';
import { Colors } from '../../src/theme/colors';
import { Spacing } from '../../src/theme/spacing';

export default function BookingDetailsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Dynamic Texture */}
      <View style={styles.texture}>
        {Array.from({ length: 40 }).map((_, i) => (
          <View key={i} style={[styles.stripe, { top: i * 25 - 200, transform: [{ rotate: '-45deg' }] }]} />
        ))}
      </View>

      <BackHeader title="Finalize Booking" />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Advanced Dark Ticket */}
        <View style={styles.ticketContainer}>
          <View style={styles.ticketHeader}>
            <View style={styles.ticketIconBox}>
              <MaterialCommunityIcons name="shield-check" size={28} color={Colors.primary} />
            </View>
            <View style={styles.ticketHeaderContent}>
              <Text style={styles.ticketId}>SESSION ID: AR-2024-BK</Text>
              <Text style={styles.ticketStatus}>ONE ADVANCED THEME ACTIVE</Text>
            </View>
          </View>

          <View style={styles.ticketBody}>
            {/* Notch Separator */}
            <View style={styles.notchContainer}>
              <View style={styles.notchLeft} />
              <View style={styles.dashedLine} />
              <View style={styles.notchRight} />
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <MaterialCommunityIcons name="account-edit-outline" size={20} color={Colors.primary} />
                <Text style={styles.sectionTitle}>Client Verification</Text>
              </View>
              
              <View style={styles.inputGroup}>
                <AppInput placeholder="Full Legal Name" icon="account" />
                <View style={styles.row}>
                  <View style={{ flex: 1, marginRight: 8 }}>
                    <AppInput placeholder="Mobile" icon="phone" keyboardType="phone-pad" />
                  </View>
                  <View style={{ flex: 1.5 }}>
                    <AppInput placeholder="Email Address" icon="email" keyboardType="email-address" />
                  </View>
                </View>
                <AppInput placeholder="Site Location / Company Address" icon="office-building" />
              </View>
            </View>

            <View style={[styles.section, { marginTop: 32 }]}>
              <View style={styles.sectionHeader}>
                <MaterialCommunityIcons name="clock-check-outline" size={20} color={Colors.primary} />
                <Text style={styles.sectionTitle}>Schedule Review</Text>
              </View>
              
              <View style={styles.summaryCard}>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>Primary Service</Text>
                  <Text style={styles.summaryValue}>Forklift Diagnostics</Text>
                </View>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>Priority Level</Text>
                  <View style={styles.priorityBadge}>
                    <Text style={styles.priorityText}>HIGH</Text>
                  </View>
                </View>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>Assigned Slot</Text>
                  <Text style={styles.summaryValue}>Oct 15 • 10:00 AM</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.ticketFooter}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total Fee</Text>
              <Text style={styles.totalValue}>$180.00</Text>
            </View>
            <Text style={styles.taxNote}>Aria Forklift Services Inc. — Guaranteed Quality</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <PrimaryButton 
          title="COMPLETE BOOKING" 
          onPress={() => router.push('/booking/success')} 
          style={styles.bookBtn}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, overflow: 'hidden' },
  texture: { ...StyleSheet.absoluteFillObject, opacity: 0.05 },
  stripe: { position: 'absolute', width: 1000, height: 1, backgroundColor: '#FFF', left: -200 },
  content: { paddingHorizontal: 20, paddingBottom: 120, paddingTop: 10 },
  ticketContainer: {
    backgroundColor: Colors.surface,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  ticketHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  ticketIconBox: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: 'rgba(65,154,28,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ticketHeaderContent: { marginLeft: 16 },
  ticketId: { color: Colors.text, fontSize: 13, fontWeight: '800', letterSpacing: 1 },
  ticketStatus: { color: Colors.primary, fontSize: 9, fontWeight: '700', marginTop: 3, letterSpacing: 0.5 },
  ticketBody: { padding: 20, paddingBottom: 10 },
  notchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: -20,
    marginBottom: 24,
  },
  notchLeft: {
    width: 16,
    height: 32,
    backgroundColor: Colors.background,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    borderRightWidth: 1,
    borderRightColor: Colors.border,
  },
  dashedLine: {
    flex: 1,
    height: 1,
    borderWidth: 1,
    borderColor: Colors.border,
    borderStyle: 'dashed',
    marginHorizontal: 8,
  },
  notchRight: {
    width: 16,
    height: 32,
    backgroundColor: Colors.background,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    borderLeftWidth: 1,
    borderLeftColor: Colors.border,
  },
  section: {},
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 20 },
  sectionTitle: { color: Colors.textSecondary, fontSize: 16, fontWeight: '700' },
  inputGroup: { gap: 6 },
  row: { flexDirection: 'row' },
  summaryCard: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 18,
    padding: 20,
    gap: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: { color: Colors.textMuted, fontSize: 13, fontWeight: '500' },
  summaryValue: { color: Colors.text, fontSize: 13, fontWeight: '600' },
  priorityBadge: {
    backgroundColor: 'rgba(65,154,28,0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  priorityText: { color: Colors.primary, fontSize: 10, fontWeight: '800' },
  ticketFooter: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: 'rgba(255,255,255,0.01)',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  totalLabel: { color: Colors.text, fontSize: 16, fontWeight: '700' },
  totalValue: { color: Colors.primary, fontSize: 24, fontWeight: '800' },
  taxNote: { color: Colors.textMuted, fontSize: 10, fontWeight: '500' },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: 40,
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
  },
  bookBtn: { height: 58, borderRadius: 18 },
});