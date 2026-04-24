import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BackHeader } from '../../src/components/common/Header';
import { Avatar } from '../../src/components/common/Shared';
import { Colors } from '../../src/theme/colors';
import { Spacing } from '../../src/theme/spacing';

const MESSAGES = [
  { id: '1', text: 'Hello! I need help with my forklift.', sent: true, time: '2:28 PM' },
  { id: '2', text: 'Hi there! I\'d be happy to help. What seems to be the issue?', sent: false, time: '2:29 PM' },
  { id: '3', text: 'The hydraulic system is leaking. Can you send a technician?', sent: true, time: '2:30 PM' },
  { id: '4', text: 'Absolutely. I\'ll schedule a visit for tomorrow morning. Does 9 AM work?', sent: false, time: '2:31 PM' },
  { id: '5', text: 'Perfect, 9 AM works great. Thank you!', sent: true, time: '2:32 PM' },
];

export default function ConversationScreen() {
  const [message, setMessage] = useState('');

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.texture}>
        {Array.from({ length: 40 }).map((_, i) => (
          <View key={i} style={[styles.stripe, { top: i * 25 - 200, transform: [{ rotate: '-45deg' }] }]} />
        ))}
      </View>

      <BackHeader title="Aria Support" />

      <FlatList
        data={MESSAGES}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messageList}
        renderItem={({ item }) => (
          <View style={[styles.bubble, item.sent ? styles.bubbleSent : styles.bubbleReceived]}>
            <Text style={[styles.bubbleText, item.sent ? styles.sentText : styles.receivedText]}>{item.text}</Text>
            <Text style={styles.bubbleTime}>{item.time}</Text>
          </View>
        )}
      />

      {/* Input bar */}
      <View style={styles.inputBar}>
        <Avatar size={36} />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            placeholderTextColor={Colors.placeholder}
            value={message}
            onChangeText={setMessage}
          />
        </View>
        <TouchableOpacity style={styles.sendBtn}>
          <MaterialCommunityIcons name="send" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, overflow: 'hidden' },
  texture: { ...StyleSheet.absoluteFillObject, opacity: 0.04 },
  stripe: { position: 'absolute', width: 800, height: 1, backgroundColor: '#FFF', left: -200 },
  messageList: { paddingHorizontal: Spacing.screenPadding, paddingBottom: 16, flexGrow: 1, justifyContent: 'flex-end' },
  bubble: { maxWidth: '78%', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 16, marginBottom: 8 },
  bubbleSent: { alignSelf: 'flex-end', backgroundColor: Colors.surfaceLight, borderBottomRightRadius: 4 },
  bubbleReceived: { alignSelf: 'flex-start', backgroundColor: Colors.surface, borderBottomLeftRadius: 4 },
  bubbleText: { fontSize: 14, lineHeight: 20 },
  sentText: { color: Colors.text },
  receivedText: { color: Colors.textMuted },
  bubbleTime: { color: Colors.textCaption, fontSize: 10, marginTop: 4, alignSelf: 'flex-end' },
  inputBar: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingHorizontal: Spacing.screenPadding, paddingVertical: 12,
    borderTopWidth: 1, borderTopColor: Colors.divider, backgroundColor: Colors.background,
    paddingBottom: 28,
  },
  inputContainer: { flex: 1, height: 42, backgroundColor: Colors.surface, borderRadius: 21, paddingHorizontal: 14, justifyContent: 'center' },
  input: { color: Colors.text, fontSize: 14 },
  sendBtn: { width: 42, height: 42, borderRadius: 21, backgroundColor: Colors.surface, justifyContent: 'center', alignItems: 'center' },
});