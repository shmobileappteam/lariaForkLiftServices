import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { BackHeader } from '../../src/components/common/Header';
import { ProductCard } from '../../src/components/ecommerce/ProductCard';
import { Colors } from '../../src/theme/colors';
import { Spacing } from '../../src/theme/spacing';
import { PRODUCTS } from '../../src/utils/mockData';

export default function FavoritesScreen() {
  const router = useRouter();

  // Mock favorites using top products
  const favorites = PRODUCTS.slice(0, 4);

  return (
    <View style={styles.container}>
      {/* Texture Background */}
      <View style={styles.texture}>
        {Array.from({ length: 30 }).map((_, i) => (
          <View key={i} style={[styles.stripe, { top: i * 30 - 200, transform: [{ rotate: '-45deg' }] }]} />
        ))}
      </View>

      <BackHeader title="Your Watchlist" />

      <FlatList
        data={favorites}
        numColumns={2}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <ProductCard
              name={item.name}
              price={item.price}
              originalPrice={item.originalPrice}
              discount={item.discount}
              rating={item.rating}
              image={item.image}
              isFavorite={true}
              onPress={() => router.push('/ecommerce/product-detail')}
              onAddToCart={() => {}}
              onFavorite={() => {}}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  texture: { ...StyleSheet.absoluteFillObject, opacity: 0.03 },
  stripe: { position: 'absolute', width: 800, height: 1, backgroundColor: '#FFF', left: -200 },
  grid: { 
    paddingHorizontal: Spacing.screenPadding - 4, 
    paddingBottom: 40, 
    paddingTop: 16 
  },
  cardContainer: {
    flex: 1,
    padding: 4,
  }
});
