import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Avatar } from '../../src/components/common/Shared';
import { PrimaryButton } from '../../src/components/common/Button';
import { Colors } from '../../src/theme/colors';
import { Spacing } from '../../src/theme/spacing';
import { USER } from '../../src/utils/mockData';

export default function ProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const fields = [
    { label: 'Full Name', value: USER.name },
    { label: 'Email', value: USER.email },
    { label: 'Phone No.', value: USER.phone },
    { label: 'Password', value: '••••••••' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.texture}>
        {Array.from({ length: 40 }).map((_, i) => (
          <View key={i} style={[styles.stripe, { top: i * 25 - 200, transform: [{ rotate: '-45deg' }] }]} />
        ))}
      </View>

      <ScrollView contentContainerStyle={[styles.content, { paddingTop: insets.top + 16 }]}>
        <Text style={styles.title}>Profile</Text>

        <View style={styles.avatarSection}>
          <Avatar size={90} showEdit />
          <Text style={styles.name}>{USER.name}</Text>
          <Text style={styles.email}>{USER.email}</Text>
        </View>

        {fields.map((f, i) => (
          <View key={i} style={styles.field}>
            <Text style={styles.fieldLabel}>{f.label}</Text>
            <View style={styles.fieldValue}>
              <Text style={styles.fieldText}>{f.value}</Text>
            </View>
          </View>
        ))}

        <PrimaryButton title="Edit Profile" onPress={() => router.push('/profile/edit')} style={{ marginTop: 24 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, overflow: 'hidden' },
  texture: { ...StyleSheet.absoluteFillObject, opacity: 0.04 },
  stripe: { position: 'absolute', width: 800, height: 1, backgroundColor: '#FFF', left: -200 },
  content: { paddingHorizontal: Spacing.screenPadding, paddingBottom: 32 },
  title: { color: Colors.text, fontSize: 22, fontWeight: '700', marginBottom: 16 },
  avatarSection: { alignItems: 'center', marginBottom: 32 },
  name: { color: Colors.text, fontSize: 20, fontWeight: '700', marginTop: 12 },
  email: { color: Colors.textMuted, fontSize: 14, marginTop: 4 },
  field: { marginBottom: 16 },
  fieldLabel: { color: Colors.textCaption, fontSize: 12, fontWeight: '500', marginBottom: 6 },
  fieldValue: {
    backgroundColor: Colors.surface,
    height: Spacing.inputHeight,
    borderRadius: Spacing.radiusMd,
    justifyContent: 'center',
    paddingHorizontal: Spacing.base,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  fieldText: { color: Colors.text, fontSize: 14 },
});