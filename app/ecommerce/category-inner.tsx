import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BackHeader } from '../../src/components/common/Header';
import { ProductCard } from '../../src/components/ecommerce/ProductCard';
import { Colors } from '../../src/theme/colors';
import { Spacing } from '../../src/theme/spacing';
import { PRODUCTS } from '../../src/utils/mockData';

export default function CategoryInnerScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <BackHeader title="Automation" theme="light" rightIcon="bell-outline" />

      {/* Hero banner */}
      <View style={styles.heroBanner}>
        <MaterialCommunityIcons name="robot" size={48} color={Colors.secondary} />
        <Text style={styles.heroText}>Automation Equipment</Text>
      </View>

      <FlatList
        data={PRODUCTS}
        numColumns={2}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => (
          <ProductCard
            name={item.name}
            price={item.price}
            originalPrice={item.originalPrice}
            discount={item.discount}
            rating={item.rating}
            onPress={() => router.push('/ecommerce/product-detail')}
            onAddToCart={() => {}}
            onFavorite={() => {}}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  heroBanner: {
    height: 120, backgroundColor: '#F8F0F0', marginHorizontal: 16,
    borderRadius: 12, justifyContent: 'center', alignItems: 'center',
    marginBottom: 16, gap: 8,
  },
  heroText: { fontSize: 18, fontWeight: '700', color: '#111' },
  grid: { paddingHorizontal: 12, paddingBottom: 24 },
});