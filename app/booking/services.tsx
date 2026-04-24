import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, ImageBackground, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BackHeader } from '../../src/components/common/Header';
import { Colors } from '../../src/theme/colors';
import { Spacing } from '../../src/theme/spacing';
import { SERVICES } from '../../src/utils/mockData';

export default function AllServicesScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.texture}>
        {Array.from({ length: 40 }).map((_, i) => (
          <View key={i} style={[styles.stripe, { top: i * 25 - 200, transform: [{ rotate: '-45deg' }] }]} />
        ))}
      </View>

      <BackHeader title="All Services" />

      <FlatList
        data={SERVICES}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => router.push('/booking/service-detail')} activeOpacity={0.8}>
            <View style={styles.imageContainer}>
              <View style={styles.overlay} />
              <MaterialCommunityIcons name="cog" size={32} color={Colors.primary} style={styles.icon} />
              <Text style={styles.title}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, overflow: 'hidden' },
  texture: { ...StyleSheet.absoluteFillObject, opacity: 0.04 },
  stripe: { position: 'absolute', width: 800, height: 1, backgroundColor: '#FFF', left: -200 },
  list: { paddingHorizontal: 12, paddingBottom: 24 },
  card: { flex: 1, margin: 4, height: 140, borderRadius: Spacing.radiusLg, overflow: 'hidden' },
  imageContainer: { flex: 1, backgroundColor: Colors.surface, justifyContent: 'center', alignItems: 'center', padding: 12 },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.3)' },
  icon: { marginBottom: 8 },
  title: { color: Colors.text, fontSize: 15, fontWeight: '700', textAlign: 'center', zIndex: 1 },
});
