import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity, Animated, useWindowDimensions, ViewToken } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../../src/theme/colors';
import { Spacing } from '../../src/theme/spacing';

const SLIDES = [
  { 
    id: '1', 
    icon: 'forklift', 
    title: 'Precision Repairs', 
    subtitle: 'FORKLIFT SERVICES',
    desc: 'Expert technicians for all your material handling equipment. From hydraulics to engine rebuilds.',
    accent: Colors.primary 
  },
  { 
    id: '2', 
    icon: 'tire', 
    title: 'Fleet Tires', 
    subtitle: 'MOBILE SERVICE',
    desc: 'On-site tire replacement and fleet management. Minimize downtime with our rapid response team.',
    accent: Colors.primary 
  },
  { 
    id: '3', 
    icon: 'storefront', 
    title: 'Shop Spare Parts', 
    subtitle: 'E-COMMERCE STORE',
    desc: 'Browse thousands of high-quality parts and tools. Fast delivery to keep your operations moving.',
    accent: Colors.secondary 
  },
];

export default function OnboardingSlides() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index || 0);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50
  }).current;

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ 
        index: currentIndex + 1,
        animated: true 
      });
    } else {
      router.replace('/auth/get-started');
    }
  };

  return (
    <View style={styles.container}>
      {/* Texture Background */}
      <View style={styles.texture}>
        {Array.from({ length: 40 }).map((_, i) => (
          <View key={i} style={[styles.stripe, { top: i * 25 - 200, transform: [{ rotate: '-45deg' }] }]} />
        ))}
      </View>

      <Animated.FlatList
        ref={flatListRef}
        data={SLIDES}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        scrollEventThrottle={16}
        contentContainerStyle={{ flexGrow: 1 }} // Ensure list takes full height
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        renderItem={({ item, index }) => {
          const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
          
          const iconScale = scrollX.interpolate({
            inputRange,
            outputRange: [0.7, 1, 0.7],
            extrapolate: 'clamp',
          });

          const textOpacity = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0],
            extrapolate: 'clamp',
          });

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [30, 0, 30],
            extrapolate: 'clamp',
          });

          return (
            <View style={[styles.slide, { width, height }]}>
              <View style={styles.contentWrapper}>
                <View style={styles.visualArea}>
                  <Animated.View style={[styles.iconContainer, { transform: [{ scale: iconScale }] }]}>
                    <View style={[styles.glow, { backgroundColor: item.accent, opacity: 0.12 }]} />
                    <MaterialCommunityIcons name={item.icon as any} size={110} color={item.accent} />
                  </Animated.View>
                  <View style={[styles.accentBar, { backgroundColor: item.accent }]} />
                </View>

                <Animated.View style={[styles.contentArea, { opacity: textOpacity, transform: [{ translateY }] }]}>
                  <Text style={[styles.subtitle, { color: item.accent }]}>{item.subtitle}</Text>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.desc}>{item.desc}</Text>
                </Animated.View>
              </View>
            </View>
          );
        }}
      />

      {/* Footer controls */}
      <View style={styles.footer}>
        <View style={styles.pagination}>
          {SLIDES.map((_, i) => {
            const dotWidth = scrollX.interpolate({
              inputRange: [(i - 1) * width, i * width, (i + 1) * width],
              outputRange: [8, 32, 8],
              extrapolate: 'clamp',
            });
            const dotOpacity = scrollX.interpolate({
              inputRange: [(i - 1) * width, i * width, (i + 1) * width],
              outputRange: [0.2, 1, 0.2],
              extrapolate: 'clamp',
            });
            const dotColor = scrollX.interpolate({
              inputRange: [(i - 1) * width, i * width, (i + 1) * width],
              outputRange: [Colors.textMuted, SLIDES[i].accent, Colors.textMuted],
              extrapolate: 'clamp',
            });
            return (
              <Animated.View 
                key={i} 
                style={[
                  styles.dot, 
                  { width: dotWidth, opacity: dotOpacity, backgroundColor: dotColor }
                ]} 
              />
            );
          })}
        </View>

        <TouchableOpacity 
          style={[styles.nextBtn, { backgroundColor: SLIDES[currentIndex].accent }]} 
          onPress={handleNext}
          activeOpacity={0.9}
        >
          <Text style={styles.nextBtnText}>
            {currentIndex === SLIDES.length - 1 ? 'GET STARTED' : 'CONTINUE'}
          </Text>
          <MaterialCommunityIcons name="arrow-right" size={20} color="#FFF" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.replace('/auth/get-started')} style={styles.skipBtn}>
          <Text style={styles.skipText}>Skip introduction</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  texture: { ...StyleSheet.absoluteFillObject, opacity: 0.08 },
  stripe: { position: 'absolute', width: 1000, height: 1, backgroundColor: '#FFF', left: -200 },
  slide: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  contentWrapper: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -80, // Counter-balance the footer to make it feel centered in the available space
  },
  visualArea: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 48,
  },
  iconContainer: {
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: 'rgba(255,255,255,0.02)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  glow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 120,
    transform: [{ scale: 1.25 }],
  },
  accentBar: {
    position: 'absolute',
    bottom: -10,
    left: '15%',
    width: '70%',
    height: 4,
    borderRadius: 2,
    opacity: 0.15,
  },
  contentArea: {
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  subtitle: {
    fontFamily: 'Outfit',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 6,
    marginBottom: 14,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  title: {
    fontFamily: 'Outfit',
    color: '#FFF',
    fontSize: 32,
    fontWeight: '900',
    lineHeight: 40,
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  desc: {
    fontFamily: 'Outfit',
    color: Colors.textSecondary,
    fontSize: 17,
    lineHeight: 26,
    textAlign: 'center',
    opacity: 0.85,
    paddingHorizontal: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  pagination: {
    flexDirection: 'row',
    marginBottom: 40,
    gap: 10,
    justifyContent: 'center',
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  nextBtn: {
    height: 64,
    width: '100%',
    borderRadius: Spacing.radiusXl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
  nextBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  skipBtn: {
    alignItems: 'center',
    marginTop: 24,
    padding: 10,
  },
  skipText: {
    color: Colors.textMuted,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
