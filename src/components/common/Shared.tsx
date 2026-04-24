import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';

export const StatusBadge = ({
  label,
  type = 'scheduled',
}: {
  label: string;
  type?: 'scheduled' | 'completed' | 'ongoing';
}) => {
  const colorMap = {
    scheduled: Colors.primary,
    completed: Colors.textMuted,
    ongoing: Colors.warning,
  };
  const bgMap = {
    scheduled: 'rgba(65,154,28,0.15)',
    completed: 'rgba(204,204,204,0.15)',
    ongoing: 'rgba(245,166,35,0.15)',
  };

  return (
    <View style={[styles.badge, { backgroundColor: bgMap[type] }]}>
      <Text style={[styles.badgeText, { color: colorMap[type] }]}>{label}</Text>
    </View>
  );
};

export const RatingStars = ({
  rating = 0,
  size = 14,
  interactive = false,
  onRate,
}: {
  rating?: number;
  size?: number;
  interactive?: boolean;
  onRate?: (r: number) => void;
}) => (
  <View style={styles.starsRow}>
    {[1, 2, 3, 4, 5].map((i) => (
      <MaterialCommunityIcons
        key={i}
        name={i <= rating ? 'star' : 'star-outline'}
        size={size}
        color={i <= rating ? '#FFB800' : Colors.placeholder}
        onPress={interactive ? () => onRate?.(i) : undefined}
        style={{ marginRight: 2 }}
      />
    ))}
  </View>
);

export const Divider = ({ color = Colors.divider, style }: { color?: string; style?: any }) => (
  <View style={[styles.divider, { backgroundColor: color }, style]} />
);

export const Avatar = ({
  size = 50,
  showEdit = false,
  style,
}: {
  size?: number;
  showEdit?: boolean;
  style?: any;
}) => (
  <View style={[{ width: size, height: size, borderRadius: size / 2 }, style]}>
    <View
      style={[
        styles.avatar,
        { width: size, height: size, borderRadius: size / 2 },
      ]}
    >
      <MaterialCommunityIcons name="account" size={size * 0.5} color={Colors.placeholder} />
    </View>
    {showEdit && (
      <View style={[styles.editBadge, { right: 0, bottom: 0 }]}>
        <MaterialCommunityIcons name="pencil" size={12} color="#FFF" />
      </View>
    )}
  </View>
);

export const EmptyState = ({
  icon = 'package-variant',
  message = 'Nothing here yet',
}: {
  icon?: string;
  message?: string;
}) => (
  <View style={styles.emptyContainer}>
    <MaterialCommunityIcons name={icon as any} size={64} color={Colors.placeholder} />
    <Text style={styles.emptyText}>{message}</Text>
  </View>
);

export const CountdownTimer = () => {
  const boxes = [
    { label: 'Days', value: '02' },
    { label: 'Hours', value: '12' },
    { label: 'Mins', value: '45' },
    { label: 'Secs', value: '30' },
  ];
  return (
    <View style={styles.countdownRow}>
      {boxes.map((b, i) => (
        <View key={i} style={styles.countdownBox}>
          <Text style={styles.countdownValue}>{b.value}</Text>
          <Text style={styles.countdownLabel}>{b.label}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: { fontSize: 12, fontWeight: '600' },
  starsRow: { flexDirection: 'row', alignItems: 'center' },
  divider: { height: 1, width: '100%', marginVertical: 12 },
  avatar: {
    backgroundColor: Colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editBadge: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 48 },
  emptyText: { color: Colors.placeholder, fontSize: 16, marginTop: 12 },
  countdownRow: { flexDirection: 'row', gap: 8 },
  countdownBox: {
    backgroundColor: Colors.secondary,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignItems: 'center',
    minWidth: 52,
  },
  countdownValue: { color: '#FFF', fontSize: 18, fontWeight: '700' },
  countdownLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 10 },
});
