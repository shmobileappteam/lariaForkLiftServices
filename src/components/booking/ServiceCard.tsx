import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Card } from '../common/Card';
import { PrimaryButton } from '../common/Button';
import { StatusBadge } from '../common/Shared';
import { Colors } from '../../theme/colors';
import { Spacing } from '../../theme/spacing';

// Service card for Booking Home
export const ServiceCard = ({
  number,
  title,
  description,
  onRequest,
}: {
  number: number;
  title: string;
  description: string;
  onRequest?: () => void;
}) => (
  <Card theme="dark" style={styles.serviceCard} elevated>
    <View style={styles.serviceRow}>
      <View style={styles.serviceInfo}>
        <View style={styles.serviceHeaderRow}>
          <View style={styles.numberBadge}>
            <Text style={styles.numberText}>{number}</Text>
          </View>
          <Text style={styles.serviceLabel}>Service</Text>
        </View>
        <Text style={styles.serviceTitle}>{title}</Text>
        <Text style={styles.serviceDesc} numberOfLines={2}>{description}</Text>
      </View>
      <View style={styles.serviceImage}>
        <MaterialCommunityIcons name="forklift" size={40} color={Colors.primary} />
      </View>
    </View>
    <TouchableOpacity style={styles.quoteButton} onPress={onRequest} activeOpacity={0.7}>
      <Text style={styles.quoteText}>Request A Quote</Text>
      <MaterialCommunityIcons name="arrow-right" size={18} color="#FFF" />
    </TouchableOpacity>
  </Card>
);

// Booking card for My Bookings
export const BookingCard = ({
  bookingId,
  date,
  time,
  service,
  status = 'Scheduled',
  onPress,
}: {
  bookingId: string;
  date: string;
  time: string;
  service: string;
  status?: string;
  onPress?: () => void;
}) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
    <Card theme="dark" elevated style={styles.bookingCard}>
      <View style={styles.bookingHeader}>
        <View>
          <Text style={styles.bookingIdLabel}>Booking ID</Text>
          <Text style={styles.bookingId}>{bookingId}</Text>
        </View>
        <StatusBadge
          label={status}
          type={status === 'Completed' ? 'completed' : 'scheduled'}
        />
      </View>
      
      <View style={styles.bookingDivider} />
      
      <View style={styles.bookingDetailsRow}>
        <View style={styles.bookingDetail}>
          <MaterialCommunityIcons name="calendar-month-outline" size={18} color={Colors.primary} />
          <Text style={styles.bookingDetailText}>{date}</Text>
        </View>
        <View style={styles.bookingDetail}>
          <MaterialCommunityIcons name="clock-outline" size={18} color={Colors.primary} />
          <Text style={styles.bookingDetailText}>{time}</Text>
        </View>
      </View>
      
      <View style={styles.bookingDetail}>
        <MaterialCommunityIcons name="wrench-outline" size={18} color={Colors.primary} />
        <Text style={styles.bookingDetailText}>{service}</Text>
      </View>
    </Card>
  </TouchableOpacity>
);

// Notification item
export const NotificationItem = ({
  title,
  timestamp,
  type = 'booking',
  isNew = false,
}: {
  title: string;
  timestamp: string;
  type?: 'booking' | 'shop';
  isNew?: boolean;
}) => (
  <TouchableOpacity activeOpacity={0.7} style={[styles.notifRow, isNew && styles.notifNew]}>
    <View style={[styles.notifIcon, { backgroundColor: type === 'booking' ? 'rgba(65,154,28,0.15)' : 'rgba(154,6,6,0.15)' }]}>
      <MaterialCommunityIcons 
        name={type === 'booking' ? 'calendar-check' : 'shopping'} 
        size={20} 
        color={type === 'booking' ? Colors.primary : Colors.secondary} 
      />
    </View>
    <View style={styles.notifContent}>
      <Text style={[styles.notifTitle, isNew && { fontWeight: '700' }]}>{title}</Text>
      <Text style={styles.notifTime}>{timestamp}</Text>
    </View>
    {isNew && <View style={styles.newIndicator} />}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  // ServiceCard
  serviceCard: { paddingBottom: 16, marginBottom: 16 },
  serviceRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  serviceInfo: { flex: 1, marginRight: 12 },
  serviceHeaderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  numberBadge: {
    width: 20,
    height: 20,
    borderRadius: 6,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  numberText: { color: '#FFF', fontSize: 12, fontWeight: '800' },
  serviceLabel: { color: Colors.textMuted, fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 },
  serviceTitle: { color: Colors.text, fontSize: 20, fontWeight: '800', marginBottom: 6 },
  serviceDesc: { color: Colors.textSecondary, fontSize: 14, lineHeight: 20 },
  serviceImage: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: 'rgba(65,154,28,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(65,154,28,0.2)',
  },
  quoteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    height: 48,
    borderRadius: 14,
    gap: 8,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  quoteText: { color: '#FFF', fontSize: 15, fontWeight: '700' },

  // BookingCard
  bookingCard: { marginBottom: 12 },
  bookingHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  bookingIdLabel: { color: Colors.textMuted, fontSize: 11, fontWeight: '600', textTransform: 'uppercase', marginBottom: 2 },
  bookingId: { color: Colors.text, fontSize: 16, fontWeight: '800' },
  bookingDivider: { height: 1, backgroundColor: Colors.border, marginVertical: 12 },
  bookingDetailsRow: { flexDirection: 'row', gap: 24, marginBottom: 10 },
  bookingDetail: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  bookingDetailText: { color: Colors.textSecondary, fontSize: 14, fontWeight: '500' },

  // Notification
  notifRow: { 
    flexDirection: 'row', 
    paddingVertical: 16, 
    paddingHorizontal: 20, 
    gap: 16, 
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  notifNew: { backgroundColor: 'rgba(65,154,28,0.03)' },
  notifIcon: { width: 48, height: 48, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  notifContent: { flex: 1 },
  notifTitle: { color: Colors.text, fontSize: 15, fontWeight: '500', marginBottom: 4, lineHeight: 20 },
  notifTime: { color: Colors.textCaption, fontSize: 12, fontWeight: '500' },
  newIndicator: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.primary },
});