import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BackHeader } from '../../src/components/common/Header';
import { Colors } from '../../src/theme/colors';
import { Spacing } from '../../src/theme/spacing';
import { CATEGORIES } from '../../src/utils/mockData';

export default function AllCategoriesScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.redHeader}>
        <BackHeader title="Categories" theme="dark" />
      </View>

      <View style={styles.splitLayout}>
        {/* Left Col - Icons */}
        <ScrollView style={styles.leftCol} showsVerticalScrollIndicator={false}>
          {CATEGORIES.map((cat, i) => (
            <TouchableOpacity key={cat.id} style={[styles.catCircleBtn, i === 0 && styles.catCircleActive]} onPress={() => router.push('/ecommerce/category-inner')}>
              <View style={[styles.catCircle, i === 0 && { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
                <MaterialCommunityIcons name={cat.icon as any} size={28} color={i === 0 ? '#FFF' : '#AAA'} />
              </View>
              <Text style={[styles.catName, i === 0 && { color: '#FFF', fontWeight: '700' }]}>{cat.name}</Text>
            </TouchableOpacity>
          ))}
          {/* Coming soon */}
          <View style={styles.catCircleBtn}>
            <View style={[styles.catCircle, { backgroundColor: '#333' }]}>
              <MaterialCommunityIcons name="timer-sand" size={24} color="#FFF" />
            </View>
            <Text style={styles.catName}>Coming Soon</Text>
          </View>
        </ScrollView>

        {/* Right Col - List */}
        <ScrollView style={styles.rightCol}>
          {['Engine Parts', 'Hydraulics', 'Tires & Wheels', 'Electrical', 'Safety Gear'].map((item, i) => (
            <TouchableOpacity key={i} style={styles.listItem} onPress={() => router.push('/ecommerce/category-inner')}>
              <Text style={styles.listText}>{item}</Text>
              <MaterialCommunityIcons name="chevron-right" size={20} color="#CCC" />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  redHeader: { backgroundColor: Colors.secondary },
  splitLayout: { flex: 1, flexDirection: 'row' },
  leftCol: { width: 100, backgroundColor: Colors.surfaceLight, borderRightWidth: 1, borderRightColor: '#E0E0E0' },
  rightCol: { flex: 1, paddingLeft: 16 },
  catCircleBtn: { alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#333' },
  catCircleActive: { backgroundColor: Colors.secondary },
  catCircle: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#333', justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  catName: { color: '#AAA', fontSize: 11, textAlign: 'center' },
  listItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: '#F0F0F0', paddingRight: 16 },
  listText: { color: '#111', fontSize: 15, fontWeight: '500' },
});
