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
      {/* Elite Texture Background */}
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
          <Text style={styles.welcomeText}>Welcome back, {USER.name.split(' ')[0]}</Text>
          <Text style={styles.sectionTitle}>Manage Your Fleet</Text>
        </View>

        {/* Hero Service Banner */}
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
            <Text style={styles.heroTitle}>24/7 Support Available</Text>
            <Text style={styles.heroSubtitle}>Emergency repair dispatch is active in your area.</Text>
          </View>
          <MaterialCommunityIcons name="shield-check" size={60} color="rgba(255,255,255,0.05)" style={styles.heroIcon} />
        </TouchableOpacity>

        {/* Services List */}
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

      {/* Elite Side Drawer */}
      <Modal visible={drawerOpen} animationType="fade" transparent onRequestClose={() => setDrawerOpen(false)}>
        <View style={styles.drawerOverlay}>
          <Pressable style={styles.drawerBackdrop} onPress={() => setDrawerOpen(false)} />
          <View style={[styles.drawer, { paddingTop: insets.top + 20 }]}>
            <View style={styles.drawerHeader}>
              <Image source={require('../../assets/images/Logo.png')} style={styles.drawerLogo} resizeMode="contain" />
              <TouchableOpacity onPress={() => setDrawerOpen(false)} style={styles.closeBtn}>
                <MaterialCommunityIcons name="close" size={24} color={Colors.textMuted} />
              </TouchableOpacity>
            </View>

            <View style={styles.drawerUser}>
              <View style={styles.avatarContainer}>
                <Avatar size={60} />
                <View style={styles.onlineBadge} />
              </View>
              <View style={{ marginLeft: 16 }}>
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
                  <View style={styles.drawerIconContainer}>
                    <MaterialCommunityIcons name={item.icon as any} size={22} color={Colors.primary} />
                  </View>
                  <Text style={styles.drawerItemText}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.drawerBottom}>
              <View style={styles.drawerDivider} />
              <TouchableOpacity style={styles.drawerItem} onPress={() => { setDrawerOpen(false); router.replace('/auth/get-started'); }}>
                <View style={[styles.drawerIconContainer, { backgroundColor: 'rgba(255,255,255,0.03)' }]}>
                  <MaterialCommunityIcons name="logout" size={20} color={Colors.textMuted} />
                </View>
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
  list: { paddingHorizontal: Spacing.screenPadding, paddingBottom: 100 },
  listHeader: { marginTop: 24, marginBottom: 24 },
  welcomeText: { color: Colors.textSecondary, fontSize: 15, fontWeight: '500', marginBottom: 6 },
  sectionTitle: { color: Colors.text, fontSize: 28, fontWeight: '800', letterSpacing: -0.8 },
  heroBanner: {
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Spacing.radiusXl,
    padding: 24,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
    position: 'relative',
  },
  heroGlow: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 150,
    height: 150,
    backgroundColor: Colors.primary,
    opacity: 0.05,
    borderRadius: 75,
  },
  heroContent: { zIndex: 1 },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(34,197,94,0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 12,
    gap: 6,
  },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.primary },
  liveText: { color: Colors.primary, fontSize: 10, fontWeight: '800', letterSpacing: 0.5 },
  heroTitle: { color: Colors.text, fontSize: 20, fontWeight: '800' },
  heroSubtitle: { color: Colors.textMuted, fontSize: 13, marginTop: 6, lineHeight: 18 },
  heroIcon: { position: 'absolute', right: -10, bottom: -10 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionLabel: { color: Colors.textSecondary, fontSize: 16, fontWeight: '700' },
  viewAll: { color: Colors.primary, fontSize: 13, fontWeight: '700' },
  
  // Drawer
  drawerOverlay: { flex: 1, flexDirection: 'row' },
  drawerBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)' },
  drawer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 300,
    backgroundColor: Colors.surface,
    paddingHorizontal: 24,
    borderRightWidth: 1,
    borderColor: Colors.border,
  },
  drawerHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 },
  drawerLogo: { width: 110, height: 32 },
  closeBtn: { padding: 8 },
  drawerUser: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  avatarContainer: { position: 'relative' },
  onlineBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Colors.primary,
    borderWidth: 2,
    borderColor: Colors.surface,
  },
  drawerName: { color: Colors.text, fontSize: 18, fontWeight: '700' },
  drawerEmail: { color: Colors.textMuted, fontSize: 12, marginTop: 2 },
  drawerDivider: { height: 1, backgroundColor: Colors.border, marginVertical: 12 },
  menuContainer: { flex: 1 },
  drawerItem: { flexDirection: 'row', alignItems: 'center', gap: 16, paddingVertical: 14 },
  drawerIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.02)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  drawerItemText: { color: Colors.textSecondary, fontSize: 15, fontWeight: '600' },
  drawerBottom: { marginTop: 'auto', paddingBottom: 40 },
});