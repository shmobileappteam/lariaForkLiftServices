import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BackHeader } from '../../src/components/common/Header';
import { PrimaryButton } from '../../src/components/common/Button';
import { Colors } from '../../src/theme/colors';
import { Spacing } from '../../src/theme/spacing';
import { ADDRESSES } from '../../src/utils/mockData';

export default function AddressesScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.texture}>
        {Array.from({ length: 40 }).map((_, i) => (
          <View key={i} style={[styles.stripe, { top: i * 25 - 200, transform: [{ rotate: '-45deg' }] }]} />
        ))}
      </View>

      <BackHeader title="My Address" />

      <FlatList
        data={ADDRESSES}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.addressCard}>
            <View style={styles.iconBox}>
              <MaterialCommunityIcons name={item.icon as any} size={24} color={Colors.primary} />
            </View>
            <View style={styles.addressInfo}>
              <Text style={styles.addressLabel}>{item.label}</Text>
              <Text style={styles.addressText}>{item.address}</Text>
            </View>
            <TouchableOpacity style={styles.editBtn}>
              <MaterialCommunityIcons name="pencil" size={20} color={Colors.textMuted} />
            </TouchableOpacity>
          </View>
        )}
      />

      <View style={styles.bottomBar}>
        <PrimaryButton title="Add New Address" onPress={() => router.push('/profile/add-address')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, overflow: 'hidden' },
  texture: { ...StyleSheet.absoluteFillObject, opacity: 0.04 },
  stripe: { position: 'absolute', width: 800, height: 1, backgroundColor: '#FFF', left: -200 },
  list: { paddingHorizontal: Spacing.screenPadding, paddingBottom: 100 },
  addressCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface,
    padding: 16, borderRadius: Spacing.radiusLg, marginBottom: 12,
  },
  iconBox: {
    width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(65,154,28,0.1)',
    justifyContent: 'center', alignItems: 'center', marginRight: 16,
  },
  addressInfo: { flex: 1 },
  addressLabel: { color: Colors.text, fontSize: 16, fontWeight: '600', marginBottom: 4 },
  addressText: { color: Colors.textMuted, fontSize: 13 },
  editBtn: { padding: 8 },
  bottomBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    padding: Spacing.screenPadding, paddingBottom: 32,
    backgroundColor: Colors.background, borderTopWidth: 1, borderTopColor: Colors.divider,
  },
});
