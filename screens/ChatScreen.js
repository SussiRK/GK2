import {View} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native';

import { Bubble, GiftedChat, InputToolbar, Send } from 'react-native-gifted-chat';

import{useState,useEffect, useCallback} from 'react';
import { FontAwesome } from '@expo/vector-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';

import ChatFaceData from '../services/ChatDataFace';
import SendMessage from '../services/Request';

CHAT_BOT_FACE='https://res.cloudinary.com/dknvsbuyy/image/upload/v1685678135/chat_1_c7eda483e3.png'

export default function ChatScreen() {

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [chatFaceColor,setChatFaceColor]=useState();

    //Definere vores chat "hukkomelse"
    const conversationHistory = [ {role: 'system', content: 'You are a helpful, friendly, and organized assistant focused on helping users with household chores and tasks. You provide guidance, advice, and tips for a range of household chores, including cleaning, organizing, laundry, cooking, gardening, and basic home maintenance. You offer clear step-by-step instructions, suggest efficient methods, share time-saving hacks, and can create schedules or reminders upon request. Maintain a positive and supportive tone, recognizing that chores can sometimes feel overwhelming. Keep responses concise and practical, with the goal of making tasks easier, faster, and more enjoyable. Do not respond in markdown'},
        { role: 'assistant', content: 'Hello, I am your assistant. How can I help you?' }
    ];

    //Håndtere valgt af ChatBot
    useEffect(() => {
        checkFaceId();
    }, [])

    //Sætter den valgte chatbot til og sender den første besked
    const checkFaceId=async()=>{
        const id= await AsyncStorage.getItem('chatFaceId');
       CHAT_BOT_FACE= id?ChatFaceData[id].image: ChatFaceData[0].image;
       setChatFaceColor(ChatFaceData[id].primary);
       setMessages([
        {
          _id: 1,
          text: 'Hello, I am '+ChatFaceData[id].name+', How Can I help you?',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: CHAT_BOT_FACE,
        
        },
         
        },
      ])
    }

    //Håndtere Chatten
    const onSend = useCallback((messages = []) => {
       
      setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
      if(messages[0].text)
      {
        getBardResp(messages[0].text);
      }
    }, [])
    //Håndtere API Kald og BOT Svar
    const getBardResp = (msg) => {
        setLoading(true)

        //Sætter brugerens besked i vores chat "hukkomelse"
        const userMessage = { role: 'user', content: msg };
        conversationHistory.push(userMessage);
        
        //SendMessage er vores funktion fra RequestPage.js
        SendMessage(conversationHistory)
        .then(response => {
            if (response.content) {
                setLoading(false)

                //Sætter chat AI's svar i den format gifted chat forventer.
                const chatAIResp = {
                    _id: Math.random() * (9999999 - 1),
                    text: response.content,
                    createdAt: new Date(),
                    user: {
                      _id: 2,
                      name: 'React Native',
                      avatar: CHAT_BOT_FACE,
                    }
                }
                //Sætter chat AI's svar i vores chat "hukkomelse"
                const botMessage = { role: 'assistant', content: response.content };
                conversationHistory.push(botMessage);
                
                //Sætter chat AI's svar i vores chat
                setMessages(previousMessages => GiftedChat.append(previousMessages, chatAIResp))  
            } else {
                //Hvis der ikke er et svar fra AI
                setLoading(false)
                
                const chatAIResp = {
                    _id: Math.random() * (9999999 - 1),
                    text: "Sorry, I cannot help with it",
                    createdAt: new Date(),
                    user: {
                      _id: 2,
                      name: 'React Native',
                      avatar: CHAT_BOT_FACE,
                    }
                }
    
                setMessages(previousMessages => GiftedChat.append(previousMessages, chatAIResp))  
            }
        })
        .catch(error => {
            console.error(error);
            // Handle error further if needed
        });
    }

    //Custom Bubble
   const renderBubble =(props)=> {
        return (
          <Bubble
            {...props}
            wrapperStyle={{
              right: {
                backgroundColor: '#671ddf',
               
              },left:{
               
              }
             
            }}
            textStyle={{
                right:{
                    // fontSize:20,
                    padding:2
                },
                left: {
                  color: '#671ddf',
                  // fontSize:20,
                  padding:2
                }
              }}
          />
        )
      }

    const  renderInputToolbar =(props)=> {
        //Add the extra styles via containerStyle
       return <InputToolbar {...props} 
       containerStyle={{
       padding:3,
      
        backgroundColor:'#671ddf',
        color:'#fff',
        }} 
        
        textInputStyle={{ color: "#fff" }}
         />
     }

 
   const  renderSend=(props)=> {
        return (
            <Send
                {...props}
            >
                <View style={{marginRight: 10, marginBottom: 5}}>
                <FontAwesome name="send" size={24} color="white" resizeMode={'center'} />
                   
                </View>
            </Send>
        );
    }

    //SafeAreaView er en container, der beskytter mod systembarer, keyboard og andre elementer, der kan dække ind - Specielt vigtig i de nye IOS versioner
  return (
    <SafeAreaView style={{flex: 1,backgroundColor:'#671ddf'}}>
        <View style={{ flex: 1,backgroundColor:'#fff' }}>

        <GiftedChat
        messages={messages}
        isTyping={loading}
        multiline ={true}
        onSend={messages => onSend(messages)}
        user={{
            _id: 1,
        
        }}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar} 
        renderSend={renderSend}
        />
        
        
        </View>
    </SafeAreaView>

  )
}
