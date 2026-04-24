import React, { useRef, useState, useEffect } from 'react';
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
        contentContainerStyle={{ flexGrow: 1 }}
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
          const iconScale = scrollX.interpolate({ inputRange, outputRange: [0.7, 1, 0.7], extrapolate: 'clamp' });
          const textOpacity = scrollX.interpolate({ inputRange, outputRange: [0, 1, 0], extrapolate: 'clamp' });
          const translateY = scrollX.interpolate({ inputRange, outputRange: [20, 0, 20], extrapolate: 'clamp' });

          return (
            <View style={[styles.slide, { width, height }]}>
              <View style={styles.contentWrapper}>
                <View style={styles.visualArea}>
                  <Animated.View style={[styles.iconContainer, { transform: [{ scale: iconScale }] }]}>
                    <View style={[styles.glow, { backgroundColor: item.accent, opacity: 0.1 }]} />
                    <MaterialCommunityIcons name={item.icon as any} size={80} color={item.accent} />
                  </Animated.View>
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

      <View style={styles.footer}>
        <View style={styles.pagination}>
          {SLIDES.map((_, i) => {
            const dotWidth = scrollX.interpolate({
              inputRange: [(i - 1) * width, i * width, (i + 1) * width],
              outputRange: [6, 24, 6],
              extrapolate: 'clamp',
            });
            return (
              <Animated.View key={i} style={[styles.dot, { width: dotWidth, backgroundColor: currentIndex === i ? SLIDES[i].accent : Colors.textMuted }]} />
            );
          })}
        </View>

        <TouchableOpacity style={[styles.nextBtn, { backgroundColor: SLIDES[currentIndex].accent }]} onPress={handleNext}>
          <Text style={styles.nextBtnText}>{currentIndex === SLIDES.length - 1 ? 'GET STARTED' : 'CONTINUE'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.replace('/auth/get-started')} style={styles.skipBtn}>
          <Text style={styles.skipText}>Skip intro</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  texture: { ...StyleSheet.absoluteFillObject, opacity: 0.05 },
  stripe: { position: 'absolute', width: 1000, height: 1, backgroundColor: '#FFF', left: -200 },
  slide: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  contentWrapper: { width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: -60 },
  visualArea: { justifyContent: 'center', alignItems: 'center', marginBottom: 32 },
  iconContainer: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(255,255,255,0.02)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  glow: { ...StyleSheet.absoluteFillObject, borderRadius: 90, transform: [{ scale: 1.2 }] },
  contentArea: { paddingHorizontal: 40, alignItems: 'center' },
  subtitle: { fontFamily: 'Outfit', fontSize: 11, fontWeight: '800', letterSpacing: 4, marginBottom: 8, textTransform: 'uppercase', textAlign: 'center' },
  title: { fontFamily: 'Outfit', color: '#FFF', fontSize: 24, fontWeight: '900', lineHeight: 30, marginBottom: 12, textAlign: 'center' },
  desc: { fontFamily: 'Outfit', color: Colors.textSecondary, fontSize: 14, lineHeight: 20, textAlign: 'center', opacity: 0.8 },
  footer: { position: 'absolute', bottom: 40, left: 0, right: 0, paddingHorizontal: 40, alignItems: 'center' },
  pagination: { flexDirection: 'row', marginBottom: 24, gap: 8 },
  dot: { height: 6, borderRadius: 3 },
  nextBtn: { height: 52, width: '100%', borderRadius: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  nextBtnText: { color: '#FFF', fontSize: 14, fontWeight: '800', letterSpacing: 1 },
  skipBtn: { marginTop: 16 },
  skipText: { color: Colors.textMuted, fontSize: 12, fontWeight: '700' },
});
