import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BackHeader } from '../../src/components/common/Header';
import { SearchBar } from '../../src/components/common/Input';
import { ProductCard } from '../../src/components/ecommerce/ProductCard';
import { Colors } from '../../src/theme/colors';
import { PRODUCTS } from '../../src/utils/mockData';

export default function SearchResultsScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('Forklift');

  return (
    <View style={styles.container}>
      <BackHeader title="Search" theme="light" />
      
      <View style={styles.searchWrap}>
        <SearchBar value={search} onChangeText={setSearch} placeholder="Search..." theme="light" />
        <TouchableOpacity style={styles.filterBtn}>
          <MaterialCommunityIcons name="filter-variant" size={24} color="#111" />
        </TouchableOpacity>
      </View>

      <Text style={styles.resultCount}>{PRODUCTS.length} Products Found</Text>

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
  searchWrap: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, marginBottom: 12, gap: 12 },
  filterBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#F0F0F0', justifyContent: 'center', alignItems: 'center' },
  resultCount: { paddingHorizontal: 16, color: '#888', fontSize: 14, marginBottom: 16 },
  grid: { paddingHorizontal: 12, paddingBottom: 24 },
});
