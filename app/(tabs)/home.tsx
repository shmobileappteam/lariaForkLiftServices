import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Modal, Pressable, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../src/theme/colors';
import { Spacing } from '../../src/theme/spacing';
import { ServiceCard } from '../../src/components/booking/ServiceCard';
import { AppHeader } from '../../src/components/common/Header';
import { Avatar } from '../../src/components/common/Shared';
import { SERVICES, USER, DRAWER_ITEMS } from '../../src/utils/mockData';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.texture}>
        {Array.from({ length: 50 }).map((_, i) => (
          <View key={i} style={[styles.stripe, { top: i * 20 - 200, transform: [{ rotate: '-45deg' }] }]} />
        ))}
      </View>

      <AppHeader 
        showLogo 
        leftIcon="menu" 
        onLeftPress={() => setDrawerOpen(true)}
        rightIcons={[{ icon: 'bell-outline', onPress: () => router.push('/booking/notifications'), badge: 3 }]}
      />

      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        <View style={styles.listHeader}>
          <Text style={styles.welcomeText}>Hello, {USER.name.split(' ')[0]}</Text>
          <Text style={styles.sectionTitle}>Fleet Management</Text>
        </View>

        <TouchableOpacity 
          style={styles.heroBanner} 
          activeOpacity={0.9}
          onPress={() => router.push('/booking/services')}
        >
          <View style={styles.heroGlow} />
          <View style={styles.heroContent}>
            <View style={styles.liveBadge}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>OPERATIONAL</Text>
            </View>
            <Text style={styles.heroTitle}>24/7 Service Support</Text>
            <Text style={styles.heroSubtitle}>Emergency dispatch is active.</Text>
          </View>
          <MaterialCommunityIcons name="shield-check" size={40} color="rgba(255,255,255,0.05)" style={styles.heroIcon} />
        </TouchableOpacity>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionLabel}>Available Services</Text>
          <TouchableOpacity onPress={() => router.push('/booking/services')}>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>

        {SERVICES.map((service, index) => (
          <ServiceCard
            key={service.id}
            number={index + 1}
            title={service.title}
            description={service.desc}
            onRequest={() => router.push('/booking/booking-details')}
          />
        ))}
      </ScrollView>

      <Modal visible={drawerOpen} animationType="fade" transparent onRequestClose={() => setDrawerOpen(false)}>
        <View style={styles.drawerOverlay}>
          <Pressable style={styles.drawerBackdrop} onPress={() => setDrawerOpen(false)} />
          <View style={[styles.drawer, { paddingTop: insets.top + 20 }]}>
            <View style={styles.drawerHeader}>
              <Image source={require('../../assets/images/Logo.png')} style={styles.drawerLogo} resizeMode="contain" />
              <TouchableOpacity onPress={() => setDrawerOpen(false)} style={styles.closeBtn}>
                <MaterialCommunityIcons name="close" size={20} color={Colors.textMuted} />
              </TouchableOpacity>
            </View>

            <View style={styles.drawerUser}>
              <Avatar size={44} />
              <View style={{ marginLeft: 12 }}>
                <Text style={styles.drawerName}>{USER.name}</Text>
                <Text style={styles.drawerEmail}>{USER.email}</Text>
              </View>
            </View>
            
            <View style={styles.drawerDivider} />

            <View style={styles.menuContainer}>
              {DRAWER_ITEMS.map((item, i) => (
                <TouchableOpacity
                  key={i}
                  style={styles.drawerItem}
                  onPress={() => { setDrawerOpen(false); if (item.route) router.push(item.route as any); }}
                >
                  <MaterialCommunityIcons name={item.icon as any} size={18} color={Colors.primary} />
                  <Text style={styles.drawerItemText}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.drawerBottom}>
              <TouchableOpacity style={styles.drawerItem} onPress={() => { setDrawerOpen(false); router.replace('/auth/get-started'); }}>
                <MaterialCommunityIcons name="logout" size={18} color={Colors.textMuted} />
                <Text style={[styles.drawerItemText, { color: Colors.textSecondary }]}>Log Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  texture: { ...StyleSheet.absoluteFillObject, opacity: 0.05 },
  stripe: { position: 'absolute', width: 1000, height: 1, backgroundColor: '#FFF', left: -200 },
  list: { paddingHorizontal: 16, paddingBottom: 60 },
  listHeader: { marginTop: 16, marginBottom: 16 },
  welcomeText: { fontFamily: 'Outfit', color: Colors.textSecondary, fontSize: 12, fontWeight: '500', marginBottom: 4 },
  sectionTitle: { fontFamily: 'Outfit', color: Colors.text, fontSize: 18, fontWeight: '800' },
  heroBanner: {
    backgroundColor: Colors.surfaceElevated,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
    position: 'relative',
  },
  heroGlow: { position: 'absolute', top: -30, right: -30, width: 100, height: 100, backgroundColor: Colors.primary, opacity: 0.05, borderRadius: 50 },
  heroContent: { zIndex: 1 },
  liveBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(34,197,94,0.1)', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, alignSelf: 'flex-start', marginBottom: 8, gap: 4 },
  liveDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: Colors.primary },
  liveText: { color: Colors.primary, fontSize: 8, fontWeight: '800', letterSpacing: 0.5 },
  heroTitle: { fontFamily: 'Outfit', color: Colors.text, fontSize: 16, fontWeight: '800' },
  heroSubtitle: { fontFamily: 'Outfit', color: Colors.textMuted, fontSize: 11, marginTop: 4 },
  heroIcon: { position: 'absolute', right: -5, bottom: -5 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionLabel: { color: Colors.textSecondary, fontSize: 14, fontWeight: '700' },
  viewAll: { color: Colors.primary, fontSize: 12, fontWeight: '700' },
  drawerOverlay: { flex: 1, flexDirection: 'row' },
  drawerBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)' },
  drawer: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 260, backgroundColor: Colors.surface, paddingHorizontal: 20, borderRightWidth: 1, borderColor: Colors.border },
  drawerHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  drawerLogo: { width: 90, height: 26 },
  closeBtn: { padding: 4 },
  drawerUser: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  drawerName: { fontFamily: 'Outfit', color: Colors.text, fontSize: 15, fontWeight: '700' },
  drawerEmail: { fontFamily: 'Outfit', color: Colors.textMuted, fontSize: 11 },
  drawerDivider: { height: 1, backgroundColor: Colors.border, marginVertical: 8 },
  menuContainer: { flex: 1 },
  drawerItem: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10 },
  drawerItemText: { fontFamily: 'Outfit', color: Colors.textSecondary, fontSize: 14, fontWeight: '600' },
  drawerBottom: { marginTop: 'auto', paddingBottom: 30 },
});