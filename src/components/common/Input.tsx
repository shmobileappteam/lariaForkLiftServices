import React, { useState } from 'react';
import { TextInput as RNTextInput, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';
import { Spacing } from '../../theme/spacing';

interface InputProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  icon?: string;
  editable?: boolean;
  error?: string;
  label?: string;
  style?: any;
  multiline?: boolean;
  keyboardType?: any;
  theme?: 'dark'; // Kept for prop compatibility but ignored
}

export const AppInput = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  icon,
  editable = true,
  error,
  label,
  style,
  multiline = false,
  keyboardType,
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);

  return (
    <View style={[styles.wrapper, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.container,
          {
            borderColor: focused ? Colors.primary : Colors.border,
          },
          focused && styles.focused,
          multiline && { height: 120, alignItems: 'flex-start', paddingTop: 14 },
          error && { borderColor: Colors.error },
        ]}
      >
        {icon && (
          <MaterialCommunityIcons
            name={icon as any}
            size={20}
            color={focused ? Colors.primary : Colors.textMuted}
            style={styles.icon}
          />
        )}
        <RNTextInput
          placeholder={placeholder}
          placeholderTextColor={Colors.textPlaceholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !showPassword}
          editable={editable}
          multiline={multiline}
          keyboardType={keyboardType}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={[
            styles.input,
            multiline && { textAlignVertical: 'top' },
          ]}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <MaterialCommunityIcons
              name={showPassword ? 'eye-off' : 'eye'}
              size={20}
              color={Colors.textMuted}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export const SearchBar = ({
  value,
  onChangeText,
  placeholder = 'Search...',
}: {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  theme?: 'dark';
}) => {
  return (
    <View style={styles.searchContainer}>
      <MaterialCommunityIcons name="magnify" size={22} color={Colors.textMuted} />
      <RNTextInput
        placeholder={placeholder}
        placeholderTextColor={Colors.textPlaceholder}
        value={value}
        onChangeText={onChangeText}
        style={styles.searchInput}
      />
      {value ? (
        <TouchableOpacity onPress={() => onChangeText?.('')} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <MaterialCommunityIcons name="close-circle" size={18} color={Colors.textMuted} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export const OTPInput = ({ length = 4 }: { length?: number }) => {
  const [values, setValues] = useState(Array(length).fill(''));
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  return (
    <View style={styles.otpRow}>
      {values.map((val, i) => (
        <View 
          key={i} 
          style={[
            styles.otpBox,
            focusedIndex === i && { borderColor: Colors.primary, borderWidth: 2 }
          ]}
        >
          <RNTextInput
            style={styles.otpInput}
            maxLength={1}
            keyboardType="number-pad"
            value={val}
            onFocus={() => setFocusedIndex(i)}
            onBlur={() => setFocusedIndex(null)}
            onChangeText={(t) => {
              const newVals = [...values];
              newVals[i] = t;
              setValues(newVals);
            }}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { marginVertical: Spacing.sm },
  label: { fontSize: 14, fontWeight: '700', marginBottom: 8, letterSpacing: 0.3, color: Colors.textSecondary },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: Spacing.inputHeight,
    borderRadius: Spacing.radiusLg,
    paddingHorizontal: Spacing.base,
    borderWidth: 1.5,
    backgroundColor: Colors.surface,
  },
  focused: {
    borderColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  icon: { marginRight: Spacing.sm },
  input: { flex: 1, fontSize: 15, height: '100%', fontWeight: '500', color: Colors.text },
  error: { color: Colors.error, fontSize: 12, marginTop: 6, fontWeight: '600' },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderRadius: Spacing.radiusLg,
    paddingHorizontal: 16,
    backgroundColor: Colors.surfaceElevated,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 15, fontWeight: '500', color: Colors.text },
  otpRow: { flexDirection: 'row', justifyContent: 'center', gap: 16 },
  otpBox: {
    width: 60,
    height: 60,
    borderRadius: Spacing.radiusLg,
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpInput: { fontSize: 24, fontWeight: '700', color: Colors.text, textAlign: 'center', width: '100%', height: '100%' },
});