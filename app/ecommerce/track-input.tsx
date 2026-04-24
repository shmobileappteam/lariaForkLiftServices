import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { BackHeader } from '../../src/components/common/Header';
import { AppInput } from '../../src/components/common/Input';
import { SecondaryButton } from '../../src/components/common/Button';
import { Spacing } from '../../src/theme/spacing';

export default function TrackInputScreen() {
  const router = useRouter();
  const [orderId, setOrderId] = useState('');
  const [mobile, setMobile] = useState('');

  return (
    <View style={styles.container}>
      <BackHeader title="Order Details" theme="light" />

      <View style={styles.content}>
        <AppInput
          placeholder="Order ID"
          icon="pound"
          theme="light"
          value={orderId}
          onChangeText={setOrderId}
        />
        <AppInput
          placeholder="Mobile Number"
          icon="phone-outline"
          theme="light"
          keyboardType="phone-pad"
          value={mobile}
          onChangeText={setMobile}
        />

        <SecondaryButton 
          title="Track Order" 
          onPress={() => router.push('/ecommerce/track-order')} 
          style={{ marginTop: 16 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { padding: Spacing.screenPadding },
});
