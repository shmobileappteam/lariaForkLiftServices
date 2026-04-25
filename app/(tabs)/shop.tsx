import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ProductCard } from '../../src/components/ecommerce/ProductCard';
import { SearchBar } from '../../src/components/common/Input';
import { CountdownTimer } from '../../src/components/common/Shared';
import { Colors } from '../../src/theme/colors';
import { Spacing } from '../../src/theme/spacing';
import { PRODUCTS, CATEGORIES } from '../../src/utils/mockData';

const { width } = Dimensions.get('window');

export default function ShopScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState('');

  return (
    <View style={styles.container}>
      {/* Texture Background */}
      <View style={styles.texture}>
        {Array.from({ length: 40 }).map((_, i) => (
          <View key={i} style={[styles.stripe, { top: i * 25 - 200, transform: [{ rotate: '-45deg' }] }]} />
        ))}
      </View>

      {/* Dynamic Header */}
      <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
        <View style={styles.headerTop}>
          <Image 
            source={require('../../assets/images/Logo.png')} 
            style={styles.logo} 
            resizeMode="contain" 
          />
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.actionBtn} onPress={() => router.push('/ecommerce/favorites')}>
              <MaterialCommunityIcons name="heart-outline" size={24} color={Colors.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn} onPress={() => router.push('/ecommerce/cart')}>
              <MaterialCommunityIcons name="cart-outline" size={24} color={Colors.text} />
              <View style={styles.badge}><Text style={styles.badgeText}>2</Text></View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Floating Search Bar */}
        <View style={styles.searchContainer}>
          <SearchBar 
            value={search} 
            onChangeText={setSearch} 
            placeholder="Search parts, machinery..." 
          />
        </View>
      </View>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Hero Promotion Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroCard}>
            <View style={styles.heroContent}>
              <View style={styles.offerBadge}>
                <Text style={styles.offerBadgeText}>EXCLUSIVE ACCESS</Text>
              </View>
              <Text style={styles.heroTitle}>Heavy Duty{'\n'}Components</Text>
              <Text style={styles.heroSubtitle}>Get up to 40% discount on all hydraulic and engine parts.</Text>
              <TouchableOpacity style={styles.heroBtn}>
                <Text style={styles.heroBtnText}>View Catalog</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.heroImageContainer}>
              <MaterialCommunityIcons name="engine-outline" size={120} color="rgba(255,255,255,0.05)" style={styles.heroBgIcon} />
              <MaterialCommunityIcons name="cog" size={90} color={Colors.primary} />
            </View>
          </View>
        </View>

        {/* Categories Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <TouchableOpacity onPress={() => router.push('/ecommerce/categories')}>
              <Text style={styles.viewAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.catScroll}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity key={cat.id} style={styles.catItem} onPress={() => router.push('/ecommerce/category-inner')}>
                <View style={styles.catIconContainer}>
                  <MaterialCommunityIcons name={cat.icon as any} size={26} color={Colors.primary} />
                </View>
                <Text style={styles.catLabel} numberOfLines={1}>{cat.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Flash Sale Banner */}
        <View style={styles.flashSection}>
          <View style={styles.flashHeader}>
            <View style={styles.flashTitleRow}>
              <MaterialCommunityIcons name="flash" size={24} color={Colors.secondary} />
              <Text style={styles.flashTitle}>Flash Sale</Text>
            </View>
            <CountdownTimer />
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.productScroll}>
            {PRODUCTS.filter(p => p.discount).map((p) => (
              <View key={p.id} style={styles.productWrapper}>
                <ProductCard
                  name={p.name}
                  price={p.price}
                  originalPrice={p.originalPrice}
                  discount={p.discount}
                  image={p.image}
                  rating={p.rating}
                  onPress={() => router.push('/ecommerce/product-detail')}
                  onAddToCart={() => {}}
                  onFavorite={() => {}}
                />
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Popular Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Products</Text>
            <TouchableOpacity>
              <Text style={styles.viewAll}>Explore</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.grid}>
            {PRODUCTS.slice(0, 4).map((p) => (
              <View key={p.id} style={styles.gridItem}>
                <ProductCard
                  name={p.name}
                  price={p.price}
                  originalPrice={p.originalPrice}
                  discount={p.discount}
                  image={p.image}
                  rating={p.rating}
                  onPress={() => router.push('/ecommerce/product-detail')}
                  onAddToCart={() => {}}
                  onFavorite={() => {}}
                />
              </View>
            ))}
          </View>
        </View>

        {/* Bulk Sales Banner */}
        <TouchableOpacity style={styles.bottomBanner}>
          <View style={styles.bottomBannerContent}>
            <Text style={styles.bottomBannerTitle}>Wholesale Orders</Text>
            <Text style={styles.bottomBannerSub}>Manage fleet-wide maintenance with bulk discounts.</Text>
          </View>
          <View style={styles.bannerAction}>
            <MaterialCommunityIcons name="chevron-right" size={24} color={Colors.primary} />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  texture: { ...StyleSheet.absoluteFillObject, opacity: 0.05 },
  stripe: { position: 'absolute', width: 1000, height: 1, backgroundColor: '#FFF', left: -200 },
  header: {
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.screenPadding,
    paddingBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: { width: 120, height: 40 },
  headerActions: { flexDirection: 'row', gap: 12 },
  actionBtn: { 
    width: 44, 
    height: 44, 
    borderRadius: 12, 
    backgroundColor: Colors.surface, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  badge: { 
    position: 'absolute', 
    top: -5, 
    right: -5, 
    backgroundColor: Colors.primary, 
    width: 20, 
    height: 20, 
    borderRadius: 10, 
    justifyContent: 'center', 
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.background
  },
  badgeText: { color: '#FFF', fontSize: 10, fontWeight: '700' },
  searchContainer: {
    marginTop: 5,
  },
  content: { flex: 1 },
  heroSection: {
    marginTop: 24,
    paddingHorizontal: Spacing.screenPadding,
    marginBottom: 32,
  },
  heroCard: {
    backgroundColor: Colors.surface,
    borderRadius: 24,
    flexDirection: 'row',
    padding: 24,
    height: 190,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  heroContent: { flex: 1.5, justifyContent: 'center' },
  offerBadge: {
    backgroundColor: 'rgba(34,197,94,0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  offerBadgeText: { color: Colors.primary, fontSize: 10, fontWeight: '800' },
  heroTitle: { color: Colors.text, fontSize: 24, fontWeight: '800', lineHeight: 32 },
  heroSubtitle: { color: Colors.textMuted, fontSize: 12, marginTop: 8, lineHeight: 18 },
  heroBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: 18,
  },
  heroBtnText: { color: '#FFF', fontSize: 12, fontWeight: '700' },
  heroImageContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  heroBgIcon: { position: 'absolute', right: -30, top: -20 },
  section: { marginBottom: 32 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.screenPadding,
    marginBottom: 20,
  },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: Colors.text, letterSpacing: -0.5 },
  viewAll: { fontSize: 14, fontWeight: '600', color: Colors.primary },
  catScroll: { paddingHorizontal: Spacing.screenPadding - 8 },
  catItem: { 
    alignItems: 'center', 
    marginHorizontal: 10,
    width: 84,
  },
  catIconContainer: {
    width: 68,
    height: 68,
    borderRadius: 22,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  catLabel: { fontSize: 12, fontWeight: '600', color: Colors.textSecondary },
  flashSection: { marginBottom: 32 },
  flashHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.screenPadding,
    marginBottom: 20,
  },
  flashTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  flashTitle: { fontSize: 20, fontWeight: '800', color: Colors.secondary },
  productScroll: { paddingHorizontal: Spacing.screenPadding - 4 },
  productWrapper: { width: 190, marginRight: 12 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Spacing.screenPadding - 4,
  },
  gridItem: {
    width: '50%',
    padding: 4,
  },
  bottomBanner: {
    marginHorizontal: Spacing.screenPadding,
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 40,
  },
  bottomBannerContent: { flex: 1 },
  bottomBannerTitle: { color: Colors.text, fontSize: 18, fontWeight: '700' },
  bottomBannerSub: { color: Colors.textMuted, fontSize: 12, marginTop: 4, lineHeight: 18 },
  bannerAction: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(34,197,94,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
