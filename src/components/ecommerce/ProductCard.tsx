import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';
import { Spacing } from '../../theme/spacing';
import { RatingStars } from '../common/Shared';

// Product card for shop grids
export const ProductCard = ({
  name,
  price,
  originalPrice,
  discount,
  image,
  rating = 4,
  onPress,
  onAddToCart,
  onFavorite,
  isFavorite = false,
}: {
  name: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  image?: string;
  rating?: number;
  onPress?: () => void;
  onAddToCart?: () => void;
  onFavorite?: () => void;
  isFavorite?: boolean;
}) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.9} style={styles.cardWrapper}>
    <View style={styles.productCard}>
      {/* Image Section */}
      <View style={styles.imageContainer}>
        {image ? (
          <Image 
            source={typeof image === 'string' ? { uri: image } : image} 
            style={styles.productImage} 
            resizeMode="cover" 
          />
        ) : (
          <View style={styles.imagePlaceholder}>
            <MaterialCommunityIcons name="cog-outline" size={54} color="rgba(255,255,255,0.03)" />
            <View style={[styles.glow, { backgroundColor: discount ? Colors.secondary : Colors.primary }]} />
          </View>
        )}
        
        {discount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{discount}</Text>
          </View>
        )}
        
        <TouchableOpacity 
          onPress={onFavorite} 
          style={styles.favIconBtn}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={18}
            color={isFavorite ? Colors.secondary : Colors.textMuted}
          />
        </TouchableOpacity>
      </View>

      {/* Content Section */}
      <View style={styles.content}>
        <Text style={styles.productName} numberOfLines={1}>{name}</Text>
        
        <View style={styles.metaRow}>
          <RatingStars rating={rating} size={10} />
          <Text style={styles.reviewCount}> (12)</Text>
        </View>

        <View style={styles.priceContainer}>
          <View style={styles.priceInfo}>
            <Text style={styles.currentPrice}>{price}</Text>
            {originalPrice && (
              <Text style={styles.oldPrice}>{originalPrice}</Text>
            )}
          </View>
          
          <TouchableOpacity 
            onPress={onAddToCart} 
            style={styles.addCartBtn}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons name="plus" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

// Order card for My Orders
export const OrderCard = ({
  name,
  description,
  price,
  rating = 4,
  onPress,
  status = 'Delivered',
}: {
  name: string;
  description: string;
  price: string;
  rating?: number;
  onPress?: () => void;
  status?: string;
}) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.orderCardWrapper}>
    <View style={styles.orderCard}>
      <View style={styles.orderLeft}>
        <View style={styles.orderIconBox}>
          <MaterialCommunityIcons 
            name="package-variant-closed" 
            size={28} 
            color={status === 'Delivered' ? Colors.primary : Colors.secondary} 
          />
        </View>
      </View>
      
      <View style={styles.orderRight}>
        <View style={styles.orderTopRow}>
          <Text style={styles.orderTitle} numberOfLines={1}>{name}</Text>
          <View style={[styles.statusBadge, { backgroundColor: status === 'Delivered' ? 'rgba(65,154,28,0.1)' : 'rgba(154,6,6,0.1)' }]}>
            <Text style={[styles.statusLabel, { color: status === 'Delivered' ? Colors.primary : Colors.secondary }]}>{status}</Text>
          </View>
        </View>
        
        <Text style={styles.orderSubtitle} numberOfLines={1}>{description}</Text>
        
        <View style={styles.orderBottomRow}>
          <Text style={styles.orderPriceTag}>{price}</Text>
          <RatingStars rating={rating} size={12} />
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  cardWrapper: { flex: 1, padding: 6 },
  productCard: { 
    backgroundColor: Colors.surface,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  imageContainer: {
    width: '100%',
    height: 140,
    position: 'relative',
    backgroundColor: '#000',
  },
  productImage: {
    width: '100%',
    height: '100%',
    opacity: 0.9,
  },
  imagePlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#050505',
  },
  glow: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    opacity: 0.05,
    transform: [{ scale: 2 }],
  },
  discountBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: Colors.secondary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    zIndex: 2,
  },
  discountText: {
    color: '#FFF',
    fontSize: 9,
    fontWeight: '900',
  },
  favIconBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    zIndex: 2,
  },
  content: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  reviewCount: {
    fontSize: 10,
    color: Colors.textMuted,
    fontWeight: '600',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceInfo: {
    flex: 1,
  },
  currentPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.text,
  },
  oldPrice: {
    fontSize: 10,
    color: Colors.textMuted,
    textDecorationLine: 'line-through',
    marginTop: -2,
  },
  addCartBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // OrderCard Styles
  orderCardWrapper: { marginBottom: 12 },
  orderCard: {
    backgroundColor: Colors.surface,
    borderRadius: 18,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  orderLeft: {
    marginRight: 16,
  },
  orderIconBox: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.03)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderRight: {
    flex: 1,
  },
  orderTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  orderTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
    flex: 1,
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusLabel: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  orderSubtitle: {
    fontSize: 12,
    color: Colors.textMuted,
    marginBottom: 8,
  },
  orderBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderPriceTag: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.text,
  },
});
