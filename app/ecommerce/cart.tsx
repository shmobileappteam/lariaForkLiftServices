import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BackHeader } from '../../src/components/common/Header';
import { PrimaryButton } from '../../src/components/common/Button';
import { Colors } from '../../src/theme/colors';
import { Spacing } from '../../src/theme/spacing';
import { CART_ITEMS } from '../../src/utils/mockData';

export default function CartScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [items, setItems] = useState(CART_ITEMS);

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + parseFloat(item.price.replace('$', '')), 0);
  };

  return (
    <View style={styles.container}>
      <BackHeader title="Your Fleet Cart" />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerSection}>
          <Text style={styles.itemCount}>{items.length} ITEM(S) READY FOR DISPATCH</Text>
        </View>

        {/* Cart Items */}
        <View style={styles.itemsList}>
          {items.map((item) => (
            <View key={item.id} style={styles.cartItem}>
              <View style={styles.itemImage}>
                <MaterialCommunityIcons name="package-variant-closed" size={32} color={Colors.primary} />
              </View>
              <View style={styles.itemInfo}>
                <View style={styles.titleRow}>
                  <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                  <TouchableOpacity style={styles.deleteBtn}>
                    <MaterialCommunityIcons name="close" size={18} color={Colors.textMuted} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.itemDesc} numberOfLines={1}>{item.desc}</Text>
                
                <View style={styles.itemBottom}>
                  <Text style={styles.itemPrice}>{item.price}</Text>
                  <View style={styles.qtyControl}>
                    <TouchableOpacity style={styles.qtyBtn}><MaterialCommunityIcons name="minus" size={14} color={Colors.text} /></TouchableOpacity>
                    <Text style={styles.qtyVal}>{item.quantity}</Text>
                    <TouchableOpacity style={styles.qtyBtn}><MaterialCommunityIcons name="plus" size={14} color={Colors.text} /></TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Shipping Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Method</Text>
          <View style={styles.methodCard}>
            <TouchableOpacity style={[styles.methodRow, styles.methodActive]}>
              <MaterialCommunityIcons name="truck-fast-outline" size={24} color={Colors.primary} />
              <View style={styles.methodText}>
                <Text style={styles.methodTitle}>Standard Delivery</Text>
                <Text style={styles.methodSub}>3-5 Business Days</Text>
              </View>
              <MaterialCommunityIcons name="check-circle" size={20} color={Colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.methodRow}>
              <MaterialCommunityIcons name="store-outline" size={24} color={Colors.textMuted} />
              <View style={styles.methodText}>
                <Text style={styles.methodTitle}>Store Pickup</Text>
                <Text style={styles.methodSub}>Available in 24 hours</Text>
              </View>
              <View style={styles.radioCircle} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Promo Code */}
        <View style={styles.promoContainer}>
          <MaterialCommunityIcons name="tag-outline" size={20} color={Colors.primary} />
          <Text style={styles.promoPlaceholder}>Enter promo code...</Text>
          <TouchableOpacity style={styles.applyBtn}>
            <Text style={styles.applyText}>APPLY</Text>
          </TouchableOpacity>
        </View>

        {/* Price Summary */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>${calculateTotal().toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tax (GST 5%)</Text>
            <Text style={styles.summaryValue}>$8.25</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping Fee</Text>
            <Text style={styles.summaryValue}>FREE</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total Payment</Text>
            <Text style={styles.totalValue}>${(calculateTotal() + 8.25).toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 16 }]}>
        <PrimaryButton 
          title="PROCEED TO CHECKOUT" 
          onPress={() => router.push('/ecommerce/checkout')} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 20, paddingBottom: 150 },
  headerSection: { marginBottom: 20 },
  itemCount: { color: Colors.primary, fontSize: 11, fontWeight: '800', letterSpacing: 1 },
  itemsList: { gap: 16 },
  cartItem: { 
    flexDirection: 'row', 
    backgroundColor: Colors.surface, 
    borderRadius: 20, 
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  itemImage: { 
    width: 80, 
    height: 80, 
    borderRadius: 16, 
    backgroundColor: 'rgba(255,255,255,0.02)', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  itemInfo: { flex: 1, marginLeft: 16, justifyContent: 'space-between' },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  itemName: { color: Colors.text, fontSize: 16, fontWeight: '700', flex: 1 },
  deleteBtn: { padding: 4 },
  itemDesc: { color: Colors.textMuted, fontSize: 12, marginTop: 2 },
  itemBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 },
  itemPrice: { color: Colors.text, fontSize: 18, fontWeight: '800' },
  qtyControl: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: Colors.surfaceHigh, 
    borderRadius: 10, 
    padding: 4 
  },
  qtyBtn: { width: 28, height: 28, justifyContent: 'center', alignItems: 'center' },
  qtyVal: { color: Colors.text, fontSize: 14, fontWeight: '700', marginHorizontal: 10 },
  section: { marginTop: 32 },
  sectionTitle: { color: Colors.text, fontSize: 18, fontWeight: '800', marginBottom: 16 },
  methodCard: { 
    backgroundColor: Colors.surface, 
    borderRadius: 24, 
    padding: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  methodRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 16, 
    borderRadius: 18, 
    gap: 16 
  },
  methodActive: { backgroundColor: 'rgba(34,197,94,0.05)' },
  methodText: { flex: 1 },
  methodTitle: { color: Colors.text, fontSize: 15, fontWeight: '700' },
  methodSub: { color: Colors.textMuted, fontSize: 12, marginTop: 2 },
  radioCircle: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: Colors.border },
  promoContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 32, 
    backgroundColor: Colors.surface, 
    borderRadius: 18, 
    padding: 6, 
    paddingLeft: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  promoPlaceholder: { flex: 1, color: Colors.textMuted, fontSize: 14, marginLeft: 12 },
  applyBtn: { backgroundColor: Colors.primary, paddingHorizontal: 20, height: 44, borderRadius: 14, justifyContent: 'center' },
  applyText: { color: '#FFF', fontWeight: '800', fontSize: 12 },
  summaryCard: { 
    marginTop: 32, 
    backgroundColor: Colors.surface, 
    borderRadius: 24, 
    padding: 24,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  summaryLabel: { color: Colors.textMuted, fontSize: 14, fontWeight: '500' },
  summaryValue: { color: Colors.text, fontSize: 14, fontWeight: '700' },
  summaryDivider: { height: 1, backgroundColor: Colors.border, marginVertical: 8 },
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