import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BackHeader } from '../../src/components/common/Header';
import { PrimaryButton } from '../../src/components/common/Button';
import { AppInput } from '../../src/components/common/Input';
import { Colors } from '../../src/theme/colors';
import { Spacing } from '../../src/theme/spacing';

const PAYMENT_METHODS = [
  { id: '1', name: 'Credit Card', icon: 'credit-card-outline', last4: '**** 8821' },
  { id: '2', name: 'Apple Pay', icon: 'apple', last4: '' },
  { id: '3', name: 'Cash On Delivery', icon: 'cash', last4: '' },
];

export default function CheckoutScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedPayment, setSelectedPayment] = useState('1');

  return (
    <View style={styles.container}>
      <BackHeader title="Confirm Dispatch" />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Shipping Address Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Shipping Address</Text>
            <TouchableOpacity><Text style={styles.editLink}>Change</Text></TouchableOpacity>
          </View>
          <View style={styles.addressCard}>
            <View style={styles.addressIcon}>
              <MaterialCommunityIcons name="map-marker" size={24} color={Colors.primary} />
            </View>
            <View style={styles.addressInfo}>
              <Text style={styles.addressLabel}>Central Warehouse</Text>
              <Text style={styles.addressText}>123 Industrial Way, Sector 4{'\n'}Dallas, Texas 75201</Text>
            </View>
          </View>
        </View>

        {/* Payment Method Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <View style={styles.paymentList}>
            {PAYMENT_METHODS.map((method) => (
              <TouchableOpacity 
                key={method.id} 
                style={[styles.paymentRow, selectedPayment === method.id && styles.paymentActive]}
                onPress={() => setSelectedPayment(method.id)}
              >
                <MaterialCommunityIcons 
                  name={method.icon as any} 
                  size={24} 
                  color={selectedPayment === method.id ? Colors.primary : Colors.textMuted} 
                />
                <View style={styles.paymentText}>
                  <Text style={[styles.paymentName, selectedPayment === method.id && styles.activeText]}>{method.name}</Text>
                  {method.last4 && <Text style={styles.paymentSub}>{method.last4}</Text>}
                </View>
                {selectedPayment === method.id ? (
                  <MaterialCommunityIcons name="check-circle" size={20} color={Colors.primary} />
                ) : (
                  <View style={styles.radioCircle} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Order Summary Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>$158.25</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Shipping</Text>
              <Text style={styles.summaryValue}>FREE</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total Amount</Text>
              <Text style={styles.totalValue}>$158.25</Text>
            </View>
          </View>
        </View>

        {/* Dispatch Notes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dispatch Notes (Optional)</Text>
          <AppInput 
            placeholder="Special handling instructions..." 
            multiline 
            style={{ height: 100, textAlignVertical: 'top' }}
          />
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 16 }]}>
        <PrimaryButton 
          title="CONFIRM & PLACE ORDER" 
          onPress={() => router.push('/ecommerce/order-success')} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 20, paddingBottom: 150 },
  section: { marginBottom: 32 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { color: Colors.text, fontSize: 18, fontWeight: '800' },
  editLink: { color: Colors.primary, fontSize: 13, fontWeight: '700' },
  addressCard: { 
    flexDirection: 'row', 
    backgroundColor: Colors.surface, 
    borderRadius: 20, 
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  addressIcon: { 
    width: 48, 
    height: 48, 
    borderRadius: 14, 
    backgroundColor: 'rgba(34,197,94,0.1)', 
    justifyContent: 'center', 
    alignItems: 'center',
    marginRight: 16,
  },
  addressInfo: { flex: 1 },
  addressLabel: { color: Colors.text, fontSize: 15, fontWeight: '700', marginBottom: 4 },
  addressText: { color: Colors.textMuted, fontSize: 13, lineHeight: 20 },
  paymentList: { 
    backgroundColor: Colors.surface, 
    borderRadius: 24, 
    padding: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  paymentRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 16, 
    borderRadius: 18, 
    gap: 16 
  },
  paymentActive: { backgroundColor: 'rgba(34,197,94,0.05)' },
  paymentText: { flex: 1 },
  paymentName: { color: Colors.textMuted, fontSize: 15, fontWeight: '600' },
  activeText: { color: Colors.text },
  paymentSub: { color: Colors.textMuted, fontSize: 12, marginTop: 2 },
  radioCircle: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: Colors.border },
  summaryCard: { 
    backgroundColor: Colors.surface, 
    borderRadius: 24, 
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  summaryLabel: { color: Colors.textMuted, fontSize: 14, fontWeight: '500' },
  summaryValue: { color: Colors.text, fontSize: 14, fontWeight: '700' },
  summaryDivider: { height: 1, backgroundColor: Colors.border, marginVertical: 12 },
  totalLabel: { color: Colors.text, fontSize: 16, fontWeight: '800' },
  totalValue: { color: Colors.primary, fontSize: 22, fontWeight: '900' },
  bottomBar: { 
    position: 'absolute', 
    bottom: 0, 
    left: 0, 
    right: 0, 
    backgroundColor: Colors.background, 
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
  }
});