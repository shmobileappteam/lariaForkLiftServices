import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BackHeader } from '../../src/components/common/Header';
import { AppInput } from '../../src/components/common/Input';
import { PrimaryButton } from '../../src/components/common/Button';
import { Colors } from '../../src/theme/colors';
import { Spacing } from '../../src/theme/spacing';

export default function AddAddressScreen() {
  const router = useRouter();
  const [label, setLabel] = useState('Workplace');
  const [address, setAddress] = useState('');
  const [street, setStreet] = useState('');
  const [house, setHouse] = useState('');
  const [floor, setFloor] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.texture}>
        {Array.from({ length: 40 }).map((_, i) => (
          <View key={i} style={[styles.stripe, { top: i * 25 - 200, transform: [{ rotate: '-45deg' }] }]} />
        ))}
      </View>

      <BackHeader title="Add New Address" />

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        {/* Map placeholder */}
        <View style={styles.mapBox}>
          <MaterialCommunityIcons name="map-marker-outline" size={40} color={Colors.primary} />
          <Text style={styles.mapText}>Select Location on Map</Text>
        </View>

        <Text style={styles.sectionTitle}>Label As</Text>
        <View style={styles.labelRow}>
          {['Home', 'Workplace', 'Others'].map((l) => (
            <TouchableOpacity
              key={l}
              style={[styles.labelChip, label === l && styles.labelChipActive]}
              onPress={() => setLabel(l)}
            >
              <Text style={[styles.labelChipText, label === l && styles.labelChipTextActive]}>{l}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <AppInput placeholder="Delivery Address" value={address} onChangeText={setAddress} />
        <AppInput placeholder="Street Number" value={street} onChangeText={setStreet} />
        
        <View style={styles.row}>
          <View style={styles.halfInput}><AppInput placeholder="House No." value={house} onChangeText={setHouse} /></View>
          <View style={styles.halfInput}><AppInput placeholder="Floor No." value={floor} onChangeText={setFloor} /></View>
        </View>

        <Text style={[styles.sectionTitle, { marginTop: 16 }]}>Contact Person Info</Text>
        <AppInput placeholder="Name" value={name} onChangeText={setName} />
        <AppInput placeholder="Mobile Number" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />

        <PrimaryButton title="Save Location" onPress={() => router.back()} style={{ marginTop: 24 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, overflow: 'hidden' },
  texture: { ...StyleSheet.absoluteFillObject, opacity: 0.04 },
  stripe: { position: 'absolute', width: 800, height: 1, backgroundColor: '#FFF', left: -200 },
  content: { paddingHorizontal: Spacing.screenPadding, paddingBottom: 32 },
  mapBox: {
    height: 160, backgroundColor: Colors.surface, borderRadius: Spacing.radiusLg,
    justifyContent: 'center', alignItems: 'center', marginBottom: 24,
    borderWidth: 1, borderColor: Colors.border,
  },
  mapText: { color: Colors.textMuted, fontSize: 14, marginTop: 8 },
  sectionTitle: { color: Colors.text, fontSize: 16, fontWeight: '600', marginBottom: 12 },
  labelRow: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  labelChip: {
    paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20,
    backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border,
  },
  labelChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  labelChipText: { color: Colors.textMuted, fontSize: 14 },
  labelChipTextActive: { color: '#FFF', fontWeight: '600' },
  row: { flexDirection: 'row', gap: 12 },
  halfInput: { flex: 1 },
});
