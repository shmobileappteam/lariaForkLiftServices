import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';
import { Spacing } from '../../theme/spacing';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface AppHeaderProps {
  title?: string;
  showLogo?: boolean;
  leftIcon?: string;
  onLeftPress?: () => void;
  rightIcons?: Array<{ icon: string; onPress?: () => void; badge?: number }>;
  theme?: 'dark' | 'light';
}

export const AppHeader = ({
  title,
  showLogo = false,
  leftIcon,
  onLeftPress,
  rightIcons = [],
  theme = 'dark',
}: AppHeaderProps) => {
  const insets = useSafeAreaInsets();
  const isDark = theme === 'dark';
  const textColor = isDark ? Colors.text : Colors.textDark;

  return (
    <View style={[
      styles.header, 
      { 
        paddingTop: insets.top + 8, 
        backgroundColor: isDark ? Colors.background : Colors.lightBg,
        borderBottomWidth: 1,
        borderBottomColor: isDark ? Colors.border : Colors.lightBorder,
      }
    ]}>
      <View style={styles.left}>
        {leftIcon && (
          <TouchableOpacity onPress={onLeftPress} style={styles.iconBtn} activeOpacity={0.6}>
            <MaterialCommunityIcons name={leftIcon as any} size={26} color={textColor} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.center}>
        {showLogo ? (
          <Image source={require('../../../assets/images/Logo.png')} style={styles.logoImage} resizeMode="contain" />
        ) : (
          <Text style={[styles.title, { color: textColor }]} numberOfLines={1}>{title}</Text>
        )}
      </View>
      <View style={styles.right}>
        {rightIcons.map((item, i) => (
          <TouchableOpacity key={i} onPress={item.onPress} style={styles.iconBtn} activeOpacity={0.6}>
            <MaterialCommunityIcons name={item.icon as any} size={24} color={textColor} />
            {item.badge !== undefined && item.badge > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.badge}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export const BackHeader = ({
  title,
  theme = 'dark',
  rightIcon,
  onRightPress,
}: {
  title: string;
  theme?: 'dark' | 'light';
  rightIcon?: string;
  onRightPress?: () => void;
}) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const isDark = theme === 'dark';
  const textColor = isDark ? Colors.text : Colors.textDark;

  return (
    <View style={[
      styles.header, 
      { 
        paddingTop: insets.top + 8, 
        backgroundColor: isDark ? Colors.background : Colors.lightBg,
        borderBottomWidth: 1,
        borderBottomColor: isDark ? Colors.border : Colors.lightBorder,
      }
    ]}>
      <View style={styles.left}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn} activeOpacity={0.6}>
          <MaterialCommunityIcons name="chevron-left" size={32} color={textColor} />
        </TouchableOpacity>
      </View>
      <View style={styles.center}>
        <Text style={[styles.title, { color: textColor }]} numberOfLines={1}>{title}</Text>
      </View>
      <View style={styles.right}>
        {rightIcon && (
          <TouchableOpacity onPress={onRightPress} style={styles.iconBtn} activeOpacity={0.6}>
            <MaterialCommunityIcons name={rightIcon as any} size={24} color={textColor} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.screenPadding,
    paddingBottom: 12,
    minHeight: Spacing.headerHeight + 10,
  },
  left: { width: 44 },
  center: { flex: 1, alignItems: 'center' },
  right: { width: 88, flexDirection: 'row', justifyContent: 'flex-end', gap: 8 },
  title: { fontSize: 20, fontWeight: '700', letterSpacing: -0.5 },
  logoImage: { width: 120, height: 40 },
  iconBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: Colors.secondary,
    borderRadius: 9,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: Colors.background,
  },
  badgeText: { color: '#FFF', fontSize: 10, fontWeight: '800' },
});