import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BackHeader } from '../../src/components/common/Header';
import { PrimaryButton, OutlineButton } from '../../src/components/common/Button';
import { RatingStars } from '../../src/components/common/Shared';
import { ProductCard } from '../../src/components/ecommerce/ProductCard';
import { Colors } from '../../src/theme/colors';
import { Spacing } from '../../src/theme/spacing';
import { PRODUCTS } from '../../src/utils/mockData';

const { width } = Dimensions.get('window');

export default function ProductDetailScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<'Specs' | 'Delivery'>('Specs');

  const product = PRODUCTS[0];

  return (
    <View style={styles.container}>
      {/* Immersive Header Image */}
      <View style={styles.imageContainer}>
        <Image 
          source={typeof product.image === 'string' ? { uri: product.image } : product.image} 
          style={styles.heroImage} 
          resizeMode="cover" 
        />
        <View style={styles.imageOverlay} />
        <View style={[styles.headerOverlay, { paddingTop: insets.top + 20 }]}>
          <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
            <MaterialCommunityIcons name="chevron-left" size={30} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn} onPress={() => router.push('/ecommerce/cart')}>
            <MaterialCommunityIcons name="cart-outline" size={24} color="#FFF" />
            <View style={styles.badge}><Text style={styles.badgeText}>2</Text></View>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.mainInfo}>
          <View style={styles.titleRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.categoryLabel}>{product.discount ? 'SPECIAL OFFER' : 'PREMIUM PART'}</Text>
              <Text style={styles.productName}>{product.name}</Text>
            </View>
            <TouchableOpacity style={styles.favBtn}>
              <MaterialCommunityIcons name="heart-outline" size={24} color={Colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <View style={styles.priceRow}>
            <View>
              <Text style={styles.priceText}>{product.price}</Text>
              {product.originalPrice && <Text style={styles.oldPrice}>{product.originalPrice}</Text>}
            </View>
            <View style={styles.qtyPicker}>
              <TouchableOpacity style={styles.qtyBtn} onPress={() => setQty(Math.max(1, qty - 1))}>
                <MaterialCommunityIcons name="minus" size={20} color={Colors.text} />
              </TouchableOpacity>
              <Text style={styles.qtyValue}>{qty}</Text>
              <TouchableOpacity style={styles.qtyBtn} onPress={() => setQty(qty + 1)}>
                <MaterialCommunityIcons name="plus" size={20} color={Colors.text} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.ratingBox}>
            <RatingStars rating={product.rating} size={14} />
            <Text style={styles.ratingText}>4.8 (124 Reviews)</Text>
          </View>

          {/* Elite Tabs */}
          <View style={styles.tabContainer}>
            {(['Specs', 'Delivery'] as const).map((tab) => (
              <TouchableOpacity 
                key={tab} 
                style={[styles.tab, activeTab === tab && styles.activeTab]} 
                onPress={() => setActiveTab(tab)}
              >
                <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {activeTab === 'Specs' ? (
            <View style={styles.specsCard}>
              <View style={styles.specItem}>
                <Text style={styles.specLabel}>Compatibility</Text>
                <Text style={styles.specValue}>Universal Forklift Hub</Text>
              </View>
              <View style={styles.specDivider} />
              <View style={styles.specItem}>
                <Text style={styles.specLabel}>Material</Text>
                <Text style={styles.specValue}>Heavy Duty Polymer / Steel</Text>
              </View>
              <View style={styles.specDivider} />
              <View style={styles.specItem}>
                <Text style={styles.specLabel}>Weight</Text>
                <Text style={styles.specValue}>12.5 kg</Text>
              </View>
            </View>
          ) : (
            <View style={styles.deliveryInfo}>
              <View style={styles.deliveryRow}>
                <MaterialCommunityIcons name="truck-delivery-outline" size={22} color={Colors.primary} />
                <View>
                  <Text style={styles.deliveryTitle}>Standard Shipping</Text>
                  <Text style={styles.deliverySub}>Estimated delivery in 3-5 business days.</Text>
                </View>
              </View>
            </View>
          )}

          {/* Similar Items */}
          <Text style={styles.sectionTitle}>Similar Items</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.similarScroll}>
            {PRODUCTS.slice(1, 4).map((p) => (
              <View key={p.id} style={{ width: 180, marginRight: 12 }}>
                <ProductCard
                  name={p.name}
                  price={p.price}
                  image={p.image}
                  onPress={() => {}}
                />
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Dynamic Action Bar */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 16 }]}>
        <View style={styles.actionRow}>
          <OutlineButton 
            title="Add to Cart" 
            onPress={() => router.push('/ecommerce/cart')} 
            style={styles.cartBtn}
          />
          <PrimaryButton 
            title="Buy Now" 
            onPress={() => router.push('/ecommerce/checkout')} 
            style={styles.buyBtn}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  imageContainer: { width: width, height: 380, position: 'relative' },
  heroImage: { width: '100%', height: '100%' },
  imageOverlay: { 
    ...StyleSheet.absoluteFillObject, 
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: Colors.primary,
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#000',
  },
  badgeText: { color: '#FFF', fontSize: 10, fontWeight: '800' },
  scrollContent: { paddingBottom: 150 },
  mainInfo: {
    backgroundColor: Colors.background,
    marginTop: -30,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
  },
  categoryLabel: { color: Colors.primary, fontSize: 12, fontWeight: '800', letterSpacing: 1.5, marginBottom: 8, marginTop: 24 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  productName: { color: Colors.text, fontSize: 26, fontWeight: '900', lineHeight: 32 },
  favBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.surface, justifyContent: 'center', alignItems: 'center' },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 24 },
  priceText: { color: Colors.text, fontSize: 32, fontWeight: '800' },
  oldPrice: { color: Colors.textMuted, fontSize: 16, textDecorationLine: 'line-through', marginTop: 2 },
  qtyPicker: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface, borderRadius: 14, padding: 4 },
  qtyBtn: { width: 36, height: 36, justifyContent: 'center', alignItems: 'center' },
  qtyValue: { color: Colors.text, fontSize: 16, fontWeight: '700', marginHorizontal: 12 },
  ratingBox: { flexDirection: 'row', alignItems: 'center', marginTop: 12, gap: 8 },
  ratingText: { color: Colors.textMuted, fontSize: 13, fontWeight: '600' },
  tabContainer: { flexDirection: 'row', gap: 24, marginTop: 32, borderBottomWidth: 1, borderBottomColor: Colors.border },
  tab: { paddingBottom: 12 },
  activeTab: { borderBottomWidth: 2, borderBottomColor: Colors.primary },
  tabText: { color: Colors.textMuted, fontSize: 15, fontWeight: '600' },
  activeTabText: { color: Colors.text },
  specsCard: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  specItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12 },
  specLabel: { color: Colors.textMuted, fontSize: 14, fontWeight: '500' },
  specValue: { color: Colors.text, fontSize: 14, fontWeight: '700' },
  specDivider: { height: 1, backgroundColor: Colors.border },
  deliveryInfo: { marginTop: 20, backgroundColor: Colors.surface, padding: 20, borderRadius: 20 },
  deliveryRow: { flexDirection: 'row', gap: 16, alignItems: 'center' },
  deliveryTitle: { color: Colors.text, fontSize: 15, fontWeight: '700' },
  deliverySub: { color: Colors.textMuted, fontSize: 13, marginTop: 2 },
  sectionTitle: { color: Colors.text, fontSize: 18, fontWeight: '800', marginTop: 32, marginBottom: 16 },
  similarScroll: { paddingRight: 20 },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.background,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
  },
  actionRow: { flexDirection: 'row', gap: 12 },
  cartBtn: { flex: 1, marginVertical: 0, height: 58 },
  buyBtn: { flex: 1.5, marginVertical: 0, height: 58 },
});