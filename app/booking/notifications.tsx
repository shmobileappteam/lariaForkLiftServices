import React from 'react';
import { View, Text, StyleSheet, SectionList } from 'react-native';
import { BackHeader } from '../../src/components/common/Header';
import { NotificationItem } from '../../src/components/booking/ServiceCard';
import { Divider } from '../../src/components/common/Shared';
import { Colors } from '../../src/theme/colors';
import { Spacing } from '../../src/theme/spacing';
import { NOTIFICATIONS } from '../../src/utils/mockData';

export default function NotificationsScreen() {
  const sections = [
    { title: 'New', data: NOTIFICATIONS.new },
    { title: 'Earlier', data: NOTIFICATIONS.earlier },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.texture}>
        {Array.from({ length: 40 }).map((_, i) => (
          <View key={i} style={[styles.stripe, { top: i * 25 - 200, transform: [{ rotate: '-45deg' }] }]} />
        ))}
      </View>

      <BackHeader title="Notifications" />

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
        renderItem={({ item, section }) => (
          <NotificationItem
            title={item.title}
            timestamp={item.time}
            type={item.type}
            isNew={section.title === 'New'}
          />
        )}
        SectionSeparatorComponent={() => <Divider />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, overflow: 'hidden' },
  texture: { ...StyleSheet.absoluteFillObject, opacity: 0.04 },
  stripe: { position: 'absolute', width: 800, height: 1, backgroundColor: '#FFF', left: -200 },
  sectionHeader: {
    color: Colors.text, fontSize: 16, fontWeight: '700',
    paddingHorizontal: Spacing.screenPadding, paddingTop: 20, paddingBottom: 8,
  },
});