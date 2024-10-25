import { View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { Bubble, GiftedChat, InputToolbar, Send } from 'react-native-gifted-chat';
import { useState, useEffect, useCallback } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChatFaceData from '../services/ChatDataFace';
import SendMessage from '../services/Request';

CHAT_BOT_FACE = 'https://res.cloudinary.com/dknvsbuyy/image/upload/v1685678135/chat_1_c7eda483e3.png';

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chatFaceColor, setChatFaceColor] = useState('#671ddf'); // Default color

  // Define conversation history
  const conversationHistory = [
    {
      role: 'system',
      content:
        'You are a helpful, friendly, and organized assistant focused on helping users with household chores and tasks...',
    },
    { role: 'assistant', content: 'Hello, I am your assistant. How can I help you?' },
  ];

  // Handle selected chatbot and set initial message
  useEffect(() => {
    checkFaceId();
  }, []);

  const checkFaceId = async () => {
    const id = await AsyncStorage.getItem('chatFaceId');
    const selectedChatBot = id ? ChatFaceData[id] : ChatFaceData[0]; // Default chatbot if not found

    CHAT_BOT_FACE = selectedChatBot.image;
    setChatFaceColor(selectedChatBot.primary); // Set color from ChatFaceData

    setMessages([
      {
        _id: 1,
        text: `Hello, I am ${selectedChatBot.name}, How Can I help you?`,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: CHAT_BOT_FACE,
        },
      },
    ]);
  };

  // Handle chat messages
  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
    if (messages[0].text) {
      getBardResp(messages[0].text);
    }
  }, []);

  // Handle API call and BOT response
  const getBardResp = (msg) => {
    setLoading(true);

    const userMessage = { role: 'user', content: msg };
    conversationHistory.push(userMessage);

    SendMessage(conversationHistory)
      .then((response) => {
        if (response.content) {
          setLoading(false);
          const chatAIResp = {
            _id: Math.random() * (9999999 - 1),
            text: response.content,
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: CHAT_BOT_FACE,
            },
          };
          conversationHistory.push({ role: 'assistant', content: response.content });
          setMessages((previousMessages) => GiftedChat.append(previousMessages, chatAIResp));
        } else {
          setLoading(false);
          const chatAIResp = {
            _id: Math.random() * (9999999 - 1),
            text: 'Sorry, I cannot help with it',
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: CHAT_BOT_FACE,
            },
          };
          setMessages((previousMessages) => GiftedChat.append(previousMessages, chatAIResp));
        }
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  // Custom Bubble
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: chatFaceColor,
          },
        }}
        textStyle={{
          right: {
            padding: 2,
          },
        }}
      />
    );
  };

  // Custom Input Toolbar
  const renderInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          padding: 3,
          backgroundColor: chatFaceColor, 
        }}
        textInputStyle={{ color: '#fff' }}
      />
    );
  };

  // Custom Send Button
  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View style={{ marginRight: 10, marginBottom: 5 }}>
          <FontAwesome name="send" size={24} color="white" />
        </View>
      </Send>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: chatFaceColor }}> 
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <GiftedChat
          messages={messages}
          isTyping={loading}
          multiline={true}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: 1,
          }}
          renderBubble={renderBubble}
          renderInputToolbar={renderInputToolbar}
          renderSend={renderSend}
        />
      </View>
    </SafeAreaView>
  );
}
