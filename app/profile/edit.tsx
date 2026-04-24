import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { BackHeader } from '../../src/components/common/Header';
import { PrimaryButton } from '../../src/components/common/Button';
import { AppInput } from '../../src/components/common/Input';
import { Avatar } from '../../src/components/common/Shared';
import { Colors } from '../../src/theme/colors';
import { Spacing } from '../../src/theme/spacing';
import { USER } from '../../src/utils/mockData';

export default function EditProfileScreen() {
  const router = useRouter();
  const [name, setName] = useState(USER.name);
  const [email, setEmail] = useState(USER.email);
  const [phone, setPhone] = useState(USER.phone);
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.texture}>
        {Array.from({ length: 40 }).map((_, i) => (
          <View key={i} style={[styles.stripe, { top: i * 25 - 200, transform: [{ rotate: '-45deg' }] }]} />
        ))}
      </View>

      <BackHeader title="Edit Profile" />

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.avatarSection}>
          <Avatar size={90} showEdit />
        </View>

        <AppInput label="Full Name" placeholder="Full Name" icon="account-outline" value={name} onChangeText={setName} />
        <AppInput label="Email" placeholder="Email" icon="email-outline" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <AppInput label="Phone No." placeholder="Phone Number" icon="phone-outline" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
        <AppInput label="Password" placeholder="New Password" icon="lock-outline" value={password} onChangeText={setPassword} secureTextEntry />

        <PrimaryButton title="Save Changes" onPress={() => router.back()} style={{ marginTop: 24 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, overflow: 'hidden' },
  texture: { ...StyleSheet.absoluteFillObject, opacity: 0.04 },
  stripe: { position: 'absolute', width: 800, height: 1, backgroundColor: '#FFF', left: -200 },
  content: { paddingHorizontal: Spacing.screenPadding, paddingBottom: 32 },
  avatarSection: { alignItems: 'center', marginBottom: 24 },
});