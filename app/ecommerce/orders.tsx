import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { BackHeader } from '../../src/components/common/Header';
import { OrderCard } from '../../src/components/ecommerce/ProductCard';
import { Colors } from '../../src/theme/colors';
import { Spacing } from '../../src/theme/spacing';
import { ORDERS } from '../../src/utils/mockData';

export default function MyOrdersScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'ongoing' | 'history'>('ongoing');

  const filteredOrders = ORDERS.filter(o => o.status === activeTab);

  return (
    <View style={styles.container}>
      <BackHeader title="My Orders" theme="light" />

      {/* Tab switcher */}
      <View style={styles.tabRow}>
        <TouchableOpacity style={[styles.tab, activeTab === 'ongoing' && styles.tabActive]} onPress={() => setActiveTab('ongoing')}>
          <Text style={[styles.tabText, activeTab === 'ongoing' && styles.tabTextActive]}>Ongoing</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, activeTab === 'history' && styles.tabActive]} onPress={() => setActiveTab('history')}>
          <Text style={[styles.tabText, activeTab === 'history' && styles.tabTextActive]}>History</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredOrders}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <OrderCard
            name={item.name}
            description={item.desc}
            price={item.price}
            rating={item.rating}
            onPress={() => router.push('/ecommerce/track-order')}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  tabRow: { flexDirection: 'row', paddingHorizontal: Spacing.screenPadding, gap: 16, marginBottom: 16, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  tab: { paddingBottom: 12, borderBottomWidth: 2, borderBottomColor: 'transparent' },
  tabActive: { borderBottomColor: '#111' },
  tabText: { color: '#888', fontSize: 15, fontWeight: '500' },
  tabTextActive: { color: '#111', fontWeight: '600' },
  list: { paddingHorizontal: Spacing.screenPadding, paddingBottom: 24 },
});
