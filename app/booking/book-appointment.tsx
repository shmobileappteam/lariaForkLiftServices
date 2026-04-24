import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BackHeader } from '../../src/components/common/Header';
import { PrimaryButton } from '../../src/components/common/Button';
import { Colors } from '../../src/theme/colors';
import { Spacing } from '../../src/theme/spacing';
import { TIME_SLOTS } from '../../src/utils/mockData';

const DAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const MONTH_DAYS = Array.from({ length: 31 }, (_, i) => i + 1);

export default function BookAppointmentScreen() {
  const router = useRouter();
  const [selectedDay, setSelectedDay] = useState(15);
  const [selectedTime, setSelectedTime] = useState('10:00 AM');

  return (
    <View style={styles.container}>
      <View style={styles.texture}>
        {Array.from({ length: 40 }).map((_, i) => (
          <View key={i} style={[styles.stripe, { top: i * 25 - 200, transform: [{ rotate: '-45deg' }] }]} />
        ))}
      </View>

      <BackHeader title="Book Appointment" />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Selected Service */}
        <View style={styles.serviceChips}>
          <View style={styles.chip}>
            <Text style={styles.chipText}>Light Repairs</Text>
            <MaterialCommunityIcons name="close" size={16} color={Colors.text} />
          </View>
          <TouchableOpacity style={styles.addMore}>
            <Text style={styles.addMoreText}>+ Add more</Text>
          </TouchableOpacity>
        </View>

        {/* Calendar */}
        <Text style={styles.sectionLabel}>Select Date</Text>
        <View style={styles.calendar}>
          <View style={styles.calendarHeader}>
            <TouchableOpacity><MaterialCommunityIcons name="chevron-left" size={24} color={Colors.text} /></TouchableOpacity>
            <Text style={styles.monthText}>October 2026</Text>
            <TouchableOpacity><MaterialCommunityIcons name="chevron-right" size={24} color={Colors.text} /></TouchableOpacity>
          </View>
          <View style={styles.daysHeader}>
            {DAYS.map((d) => (
              <Text key={d} style={styles.dayLabel}>{d}</Text>
            ))}
          </View>
          <View style={styles.daysGrid}>
            {/* Empty cells for offset (Oct 2026 starts on Th) */}
            {[null, null, null].map((_, i) => <View key={`e${i}`} style={styles.dayCell} />)}
            {MONTH_DAYS.map((day) => (
              <TouchableOpacity
                key={day}
                style={[styles.dayCell, selectedDay === day && styles.dayCellActive]}
                onPress={() => setSelectedDay(day)}
              >
                <Text style={[styles.dayText, selectedDay === day && styles.dayTextActive]}>{day}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Time Slots */}
        <Text style={styles.sectionLabel}>Choose Start Time</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.timeRow}>
          {TIME_SLOTS.map((slot) => (
            <TouchableOpacity
              key={slot}
              style={[styles.timeChip, selectedTime === slot && styles.timeChipActive]}
              onPress={() => setSelectedTime(slot)}
            >
              <Text style={[styles.timeText, selectedTime === slot && styles.timeTextActive]}>{slot}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScrollView>

      <View style={styles.bottomBar}>
        <PrimaryButton title="Proceed To Details" onPress={() => router.push('/booking/booking-details')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, overflow: 'hidden' },
  texture: { ...StyleSheet.absoluteFillObject, opacity: 0.04 },
  stripe: { position: 'absolute', width: 800, height: 1, backgroundColor: '#FFF', left: -200 },
  content: { paddingHorizontal: Spacing.screenPadding, paddingBottom: 100 },
  serviceChips: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 24 },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.surface,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  chipText: { color: Colors.text, fontSize: 13, fontWeight: '500' },
  addMore: {},
  addMoreText: { color: Colors.primary, fontSize: 13, fontWeight: '600' },
  sectionLabel: { color: Colors.primary, fontSize: 16, fontWeight: '600', marginBottom: 12 },
  calendar: { backgroundColor: Colors.surface, borderRadius: Spacing.radiusLg, padding: 16, marginBottom: 24, borderWidth: 1, borderColor: Colors.border },
  calendarHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  monthText: { color: Colors.text, fontSize: 16, fontWeight: '600' },
  daysHeader: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 8 },
  dayLabel: { color: Colors.textCaption, fontSize: 12, fontWeight: '600', width: 36, textAlign: 'center' },
  daysGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  dayCell: { width: '14.28%', aspectRatio: 1, justifyContent: 'center', alignItems: 'center' },
  dayCellActive: { backgroundColor: Colors.primary, borderRadius: 20 },
  dayText: { color: Colors.text, fontSize: 14 },
  dayTextActive: { color: '#FFF', fontWeight: '700' },
  timeRow: { gap: 10, marginBottom: 24, paddingBottom: 4 },
  timeChip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  timeChipActive: { borderColor: '#FFF', backgroundColor: Colors.primary },
  timeText: { color: Colors.textMuted, fontSize: 14 },
  timeTextActive: { color: '#FFF', fontWeight: '600' },
  bottomBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    padding: Spacing.screenPadding, paddingBottom: 32,
    backgroundColor: Colors.background, borderTopWidth: 1, borderTopColor: Colors.divider,
  },
});