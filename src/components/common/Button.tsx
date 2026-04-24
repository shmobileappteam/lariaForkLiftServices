import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';
import { Spacing } from '../../theme/spacing';

interface ButtonProps {
  title: string;
  onPress?: () => void;
  type?: 'primary' | 'secondary' | 'outline' | 'social';
  icon?: string;
  loading?: boolean;
  disabled?: boolean;
  style?: any;
  fullWidth?: boolean;
}

export const PrimaryButton = (props: ButtonProps) => <AppButton {...props} type="primary" />;
export const SecondaryButton = (props: ButtonProps) => <AppButton {...props} type="secondary" />;
export const OutlineButton = (props: ButtonProps) => <AppButton {...props} type="outline" />;
export const SocialButton = (props: ButtonProps) => <AppButton {...props} type="social" />;

export const AppButton = ({
  title,
  onPress,
  type = 'primary',
  icon,
  loading = false,
  disabled = false,
  style,
  fullWidth = true,
}: ButtonProps) => {
  const bgMap: Record<string, string> = {
    primary: Colors.primary,
    secondary: Colors.secondary,
    outline: 'transparent',
    social: Colors.surfaceLight,
  };

  const textColorMap: Record<string, string> = {
    primary: '#FFFFFF',
    secondary: '#FFFFFF',
    outline: Colors.text,
    social: Colors.text,
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: bgMap[type] },
        type === 'outline' && styles.outline,
        type === 'primary' && styles.shadow,
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={textColorMap[type]} size="small" />
      ) : (
        <View style={styles.content}>
          {icon && (
            <MaterialCommunityIcons
              name={icon as any}
              size={20}
              color={textColorMap[type]}
              style={styles.icon}
            />
          )}
          <Text style={[styles.text, { color: textColorMap[type] }]}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export const IconButton = ({
  icon,
  onPress,
  color = Colors.text,
  size = 24,
  style,
  backgroundColor = 'transparent',
}: {
  icon: string;
  onPress?: () => void;
  color?: string;
  size?: number;
  style?: any;
  backgroundColor?: string;
}) => (
  <TouchableOpacity 
    style={[
      styles.iconButton, 
      { backgroundColor },
      backgroundColor !== 'transparent' && styles.shadow,
      style
    ]} 
    onPress={onPress} 
    activeOpacity={0.6}
  >
    <MaterialCommunityIcons name={icon as any} size={size} color={color} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    height: Spacing.buttonHeight,
    borderRadius: Spacing.radiusLg,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.base,
    marginVertical: Spacing.sm,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  fullWidth: {
    width: '100%',
  },
  outline: {
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  disabled: {
    opacity: 0.5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: Spacing.sm,
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
});