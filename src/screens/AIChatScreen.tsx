import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, KeyboardAvoidingView, Platform } from 'react-native';

export default function AIChatScreen() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hey, how do I connect my cane with my account?', type: 'sent' },
    { id: '2', text: '1. Tap the menu and select "Connect Cane/Walker".\n2. Then scan the QR code on your cane.\n3. Enter the security code you received. That’s it!', type: 'received' },
    { id: '3', text: 'Thank you so much!!', type: 'sent' }
  ]);

  const sendMessage = () => {
    if (input.trim() !== '') {
      setMessages(prev => [...prev, { id: Date.now().toString(), text: input, type: 'sent' }]);
      setInput('');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <Text style={styles.header}>AI CHATBOX 24/7</Text>

      <FlatList
        style={styles.messages}
        data={messages}
        renderItem={({ item }) => (
          <View style={[styles.bubble, item.type === 'sent' ? styles.sent : styles.received]}>
            <Text>{item.text}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
      />

      <TextInput
        style={styles.input}
        placeholder="Message..."
        value={input}
        onChangeText={setInput}
        onSubmitEditing={sendMessage}
        returnKeyType="send"
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 10 },
  header: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginVertical: 10 },
  messages: { flex: 1 },
  bubble: {
    padding: 12,
    marginVertical: 6,
    marginHorizontal: 10,
    borderRadius: 12,
    maxWidth: '80%',
  },
  sent: {
    backgroundColor: '#dcf8c6',
    alignSelf: 'flex-end'
  },
  received: {
    backgroundColor: '#f1f0f0',
    alignSelf: 'flex-start'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 16,
    height: 44,
    margin: 10
  }
});
