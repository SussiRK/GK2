import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Importerer Home-, seetings- og assignChores-komponenterne fra 'screens'-mappen
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import AssignChores from './screens/AssignChores';
import ChatScreen from './screens/ChatScreen';
import CalendarScreen from './screens/CalendarScreen';
import { getApps, initializeApp } from "firebase/app"; 

import Ionicons from 'react-native-vector-icons/Ionicons'

//Firebase-konfiguration med projektets specifikke nøgler og oplysninger
const firebaseConfig = {
  apiKey: "AIzaSyAjR0nzhgJSQCdOYj6vaBajeU8QpNeO4u0",
  authDomain: "gkfirebase-ff330.firebaseapp.com",
  databaseURL: "https://gkfirebase-ff330-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "gkfirebase-ff330",
  storageBucket: "gkfirebase-ff330.appspot.com",
  messagingSenderId: "474456007156",
  appId: "1:474456007156:web:1a39c70c4eab235f1519a1"
};



export default function App() {
  //Initialiser Firebase, hvis det ikke allerede er initialiseret
  if (getApps().length < 1) {
    initializeApp(firebaseConfig); //Initialiser Firebase med konfigurationen
    console.log("Firebase On!"); //Log til konsollen, når Firebase er initialiseret
  }

  const Tab = createBottomTabNavigator(); //Opret en fanebladnavigator til bundnavigationen

  return (
    <NavigationContainer> 
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: "royalblue", //Aktiv fane får pink farve
          tabBarInactiveTintColor: "black", //Inaktive faner får sort farve
          tabBarIcon: ({ color, size }) => {
            let iconName;

            //Tildel et ikon afhængigt af fanens navn
            if (route.name === 'Home') {
              iconName = 'home'
            } else if (route.name === 'Chores') {
              iconName = 'list'
            } else if (route.name === 'Calendar') {
              iconName = 'calendar'
            } else if (route.name === 'Chat') {
               iconName = 'chatbubble-ellipses'
            } else if (route.name === 'Settings') {
              iconName = 'cog'
            }

            //Returner det relevante Ionicons-ikon med valgt farve og størrelse
            return <Ionicons name={iconName} size={size} color={color} />
          }
        })}
      >
        {/* Definerer fanerne i navigatoren */}
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Calendar" component={CalendarScreen} />
        <Tab.Screen name="Chores" component={AssignChores} />
        <Tab.Screen name="Chat" component={ChatScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
