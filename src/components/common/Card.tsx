import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../../theme/colors';
import { Spacing } from '../../theme/spacing';

interface CardProps {
  children: React.ReactNode;
  theme?: 'dark' | 'light';
  style?: any;
  noPadding?: boolean;
}

export const Card = ({ children, theme = 'dark', style, noPadding = false, elevated = false }: CardProps & { elevated?: boolean }) => {
  const isDark = theme === 'dark';
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: isDark 
            ? (elevated ? Colors.cardElevated : Colors.card) 
            : Colors.lightCard,
          borderColor: isDark ? Colors.border : Colors.lightBorder,
          borderWidth: isDark ? 1 : 0,
        },
        !isDark && styles.lightShadow,
        isDark && elevated && styles.darkShadow,
        noPadding && { padding: 0 },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: Spacing.radiusXl,
    padding: Spacing.cardPadding,
    marginVertical: Spacing.sm,
  },
  lightShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  darkShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
  },
});