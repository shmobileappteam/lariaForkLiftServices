import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BackHeader } from '../../src/components/common/Header';
import { SecondaryButton } from '../../src/components/common/Button';
import { Colors } from '../../src/theme/colors';
import { Spacing } from '../../src/theme/spacing';

export default function PaymentMethodScreen() {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState('cod');

  return (
    <View style={styles.container}>
      <BackHeader title="Payment Method" theme="light" />

      <View style={styles.content}>
        <Text style={styles.title}>Choose Payment Method</Text>
        <Text style={styles.subtitle}>Select how you want to pay for this order</Text>

        {/* Cash On Delivery */}
        <TouchableOpacity
          style={[styles.methodCard, selectedMethod === 'cod' && styles.methodActive]}
          onPress={() => setSelectedMethod('cod')}
        >
          <MaterialCommunityIcons name="cash" size={32} color={selectedMethod === 'cod' ? '#FFF' : '#111'} />
          <Text style={[styles.methodText, selectedMethod === 'cod' && { color: '#FFF' }]}>Cash On Delivery</Text>
          <View style={[styles.radio, selectedMethod === 'cod' && styles.radioActive]}>
            {selectedMethod === 'cod' && <View style={styles.radioInner} />}
          </View>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Pay Online — Faster & Secure</Text>

        {/* Online Methods */}
        <View style={styles.onlineContainer}>
          {[
            { id: 'stripe', name: 'Stripe', icon: 'credit-card-outline' },
            { id: 'paypal', name: 'PayPal', icon: 'currency-usd' },
            { id: 'gpay', name: 'G Pay', icon: 'google' },
            { id: 'bank', name: 'Via Bank', icon: 'bank-outline' },
          ].map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[styles.onlineMethod, selectedMethod === method.id && styles.onlineMethodActive]}
              onPress={() => setSelectedMethod(method.id)}
            >
              <MaterialCommunityIcons name={method.icon as any} size={28} color={selectedMethod === method.id ? Colors.secondary : '#555'} />
              <Text style={[styles.onlineMethodText, selectedMethod === method.id && { color: Colors.secondary }]}>{method.name}</Text>
              <View style={[styles.radio, selectedMethod === method.id && styles.radioActiveOnline]}>
                {selectedMethod === method.id && <View style={styles.radioInnerOnline} />}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.bottomBar}>
        <SecondaryButton title="Select" onPress={() => router.back()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { padding: Spacing.screenPadding },
  title: { fontSize: 22, fontWeight: '700', color: '#111', marginBottom: 6 },
  subtitle: { fontSize: 14, color: '#888', marginBottom: 24 },
  methodCard: {
    flexDirection: 'row', alignItems: 'center', padding: 20,
    backgroundColor: '#F5F5F5', borderRadius: 12, marginBottom: 24,
  },
  methodActive: { backgroundColor: '#111' },
  methodText: { flex: 1, fontSize: 16, fontWeight: '600', color: '#111', marginLeft: 16 },
  radio: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#CCC', justifyContent: 'center', alignItems: 'center' },
  radioActive: { borderColor: '#FFF' },
  radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#FFF' },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#111', marginBottom: 16 },
  onlineContainer: { gap: 12 },
  onlineMethod: {
    flexDirection: 'row', alignItems: 'center', padding: 16,
    borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 12,
  },
  onlineMethodActive: { borderColor: Colors.secondary, backgroundColor: 'rgba(154,6,6,0.05)' },
  onlineMethodText: { flex: 1, fontSize: 15, fontWeight: '500', color: '#333', marginLeft: 16 },
  radioActiveOnline: { borderColor: Colors.secondary },
  radioInnerOnline: { width: 10, height: 10, borderRadius: 5, backgroundColor: Colors.secondary },
  bottomBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    padding: 16, paddingBottom: 32, backgroundColor: '#FFF',
    borderTopWidth: 1, borderTopColor: '#E0E0E0',
  },
});
