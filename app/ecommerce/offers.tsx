import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BackHeader } from '../../src/components/common/Header';
import { SearchBar } from '../../src/components/common/Input';
import { ProductCard } from '../../src/components/ecommerce/ProductCard';
import { Colors } from '../../src/theme/colors';
import { PRODUCTS } from '../../src/utils/mockData';

export default function OfferProductsScreen() {
  const router = useRouter();
  const [isGrid, setIsGrid] = useState(true);

  // Filter only products with a discount
  const offers = PRODUCTS.filter((p) => p.discount);

  return (
    <View style={styles.container}>
      <BackHeader title="Offer Products" theme="light" />
      
      <View style={styles.topBar}>
        <View style={{ flex: 1 }}>
          <SearchBar placeholder="Search offers..." theme="light" />
        </View>
        <TouchableOpacity style={styles.toggleBtn} onPress={() => setIsGrid(!isGrid)}>
          <MaterialCommunityIcons name={isGrid ? 'view-list' : 'view-grid'} size={24} color="#111" />
        </TouchableOpacity>
      </View>

      <Text style={styles.resultCount}>{offers.length} Products Found</Text>

      {/* Grid or List View based on state */}
      {isGrid ? (
        <FlatList
          key="grid"
          data={offers}
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
      ) : (
        <FlatList
          key="list"
          data={offers}
          numColumns={1}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={{ width: '100%', marginBottom: 12 }}>
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
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  topBar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, marginBottom: 12, gap: 12 },
  toggleBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#F0F0F0', justifyContent: 'center', alignItems: 'center' },
  resultCount: { paddingHorizontal: 16, color: '#888', fontSize: 14, marginBottom: 16 },
  grid: { paddingHorizontal: 12, paddingBottom: 24 },
  list: { paddingHorizontal: 16, paddingBottom: 24 },
});
