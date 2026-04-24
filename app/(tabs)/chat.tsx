import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Avatar } from '../../src/components/common/Shared';
import { Colors } from '../../src/theme/colors';
import { Spacing } from '../../src/theme/spacing';
import { CHATS } from '../../src/utils/mockData';

export default function ChatScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View style={styles.texture}>
        {Array.from({ length: 40 }).map((_, i) => (
          <View key={i} style={[styles.stripe, { top: i * 25 - 200, transform: [{ rotate: '-45deg' }] }]} />
        ))}
      </View>

      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <Text style={styles.title}>Messages</Text>
      </View>

      {/* Search */}
      <View style={styles.searchWrap}>
        <View style={styles.searchBar}>
          <MaterialCommunityIcons name="magnify" size={20} color={Colors.placeholder} />
          <Text style={styles.searchPlaceholder}>Search conversations...</Text>
        </View>
      </View>

      <FlatList
        data={CHATS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.chatRow} onPress={() => router.push('/chat/conversation')} activeOpacity={0.7}>
            <Avatar size={48} />
            <View style={styles.chatInfo}>
              <Text style={styles.chatName}>{item.name}</Text>
              <Text style={styles.chatMessage} numberOfLines={1}>{item.message}</Text>
            </View>
            <View style={styles.chatMeta}>
              <Text style={styles.chatTime}>{item.time}</Text>
              {item.unread > 0 && (
                <View style={styles.unreadBadge}>
                  <Text style={styles.unreadText}>{item.unread}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, overflow: 'hidden' },
  texture: { ...StyleSheet.absoluteFillObject, opacity: 0.04 },
  stripe: { position: 'absolute', width: 800, height: 1, backgroundColor: '#FFF', left: -200 },
  header: { paddingHorizontal: Spacing.screenPadding, paddingBottom: 8 },
  title: { color: Colors.text, fontSize: 22, fontWeight: '700' },
  searchWrap: { paddingHorizontal: Spacing.screenPadding, marginBottom: 12 },
  searchBar: { flexDirection: 'row', alignItems: 'center', height: 40, backgroundColor: Colors.surface, borderRadius: Spacing.radiusMd, paddingHorizontal: 12, gap: 8 },
  searchPlaceholder: { color: Colors.placeholder, fontSize: 14 },
  chatRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: Spacing.screenPadding, paddingVertical: 14, gap: 12 },
  chatInfo: { flex: 1 },
  chatName: { color: Colors.text, fontSize: 15, fontWeight: '600', marginBottom: 3 },
  chatMessage: { color: Colors.textMuted, fontSize: 13 },
  chatMeta: { alignItems: 'flex-end', gap: 6 },
  chatTime: { color: Colors.textCaption, fontSize: 12 },
  unreadBadge: { backgroundColor: Colors.primary, width: 22, height: 22, borderRadius: 11, justifyContent: 'center', alignItems: 'center' },
  unreadText: { color: '#FFF', fontSize: 11, fontWeight: '700' },
  separator: { height: 1, backgroundColor: Colors.divider, marginLeft: 76 },
});