import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BookingCard } from '../../src/components/booking/ServiceCard';
import { Colors } from '../../src/theme/colors';
import { Spacing } from '../../src/theme/spacing';
import { BOOKINGS } from '../../src/utils/mockData';

export default function BookingsScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<'Scheduled' | 'Completed'>('Scheduled');
  const filtered = BOOKINGS.filter((b) => b.status === activeTab);

  return (
    <View style={styles.container}>
      <View style={styles.texture}>
        {Array.from({ length: 40 }).map((_, i) => (
          <View key={i} style={[styles.stripe, { top: i * 25 - 200, transform: [{ rotate: '-45deg' }] }]} />
        ))}
      </View>

      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <Text style={styles.title}>My Bookings</Text>
      </View>

      {/* Tab switcher */}
      <View style={styles.tabRow}>
        {(['Scheduled', 'Completed'] as const).map((tab) => (
          <TouchableOpacity key={tab} style={[styles.tab, activeTab === tab && styles.tabActive]} onPress={() => setActiveTab(tab)}>
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <BookingCard
            bookingId={item.id}
            date={item.date}
            time={item.time}
            service={item.service}
            status={item.status}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No {activeTab.toLowerCase()} bookings</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, overflow: 'hidden' },
  texture: { ...StyleSheet.absoluteFillObject, opacity: 0.04 },
  stripe: { position: 'absolute', width: 800, height: 1, backgroundColor: '#FFF', left: -200 },
  header: { paddingHorizontal: Spacing.screenPadding, paddingBottom: 8 },
  title: { color: Colors.text, fontSize: 22, fontWeight: '700' },
  tabRow: { flexDirection: 'row', paddingHorizontal: Spacing.screenPadding, gap: 16, marginBottom: 16 },
  tab: { paddingBottom: 8, borderBottomWidth: 2, borderBottomColor: 'transparent' },
  tabActive: { borderBottomColor: Colors.primary },
  tabText: { color: Colors.placeholder, fontSize: 15, fontWeight: '500' },
  tabTextActive: { color: Colors.primary, fontWeight: '600' },
  list: { paddingHorizontal: Spacing.screenPadding, paddingBottom: 24 },
  empty: { alignItems: 'center', paddingTop: 48 },
  emptyText: { color: Colors.placeholder, fontSize: 16 },
});