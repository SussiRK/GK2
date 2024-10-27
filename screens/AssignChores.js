import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, TouchableOpacity, Modal, Platform, ActivityIndicator } from 'react-native';
import { getDatabase, ref, push, set } from 'firebase/database';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import choreStyles from '../styles/ChoreStyles'; // Stylehseet for komponenten

// Hovedkomponenten for opgavestyring
export default function AssignChores({ navigation }) {
  // State til opgave, person, deadline, dato-picker, popup og upload-status
  const [chore, setChore] = useState('');
  const [person, setPerson] = useState('');
  const [deadline, setDeadline] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showPopup, setShowPopup] = useState(false); 
  const [uploading, setUploading] = useState(false);

  // Initialiser Firebase database
  const database = getDatabase();

  // Funktion til at tilføje opgaven i databasen
  const handleAddAssignment = () => {
    // Tjekker om opgave og person er udfyldt, og om der ikke uploades i øjeblikket
    if (chore.trim() && person.trim() && !uploading) {
      setUploading(true); 
      const choreRef = ref(database, 'chores'); // Henter reference til "chores" i databasen
      const newChoreRef = push(choreRef); // Opretter en ny unik reference til opgaven

      const choreData = {
        chore: chore,
        person: person,
        deadline: moment(deadline).format('DD-MM-YYYY'), // Formaterer deadline
      };
       // Gemmer opgaven i databasen
      set(newChoreRef, choreData)
        .then(() => {
          setUploading(false); // Stopper uploading-state, når opgaven er gemt
          setShowPopup(true); // Viser popup-besked
          setTimeout(() => { 
            setShowPopup(false); // Skjuler popup efter 2 sekunder
          }, 2000);
        })
        .catch((error) => {
          setUploading(false);
          console.error('Error saving chore to the database:', error);
        });
      // Nulstiller inputfelter og deadline
      setChore('');
      setPerson('');
      setDeadline(new Date());
    } else {
      console.log('Chore, person, or deadline is missing, or still uploading.');
    }
  };
  // Funktion til ændring af deadline via DateTimePicker
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || deadline;
    setShowDatePicker(Platform.OS === 'ios'); //Lukker dato-picker på ikke-iOS enheder
    setDeadline(currentDate); // Sætter ny deadline
  };

  // Returnerer komponentens UI
  return (
    <View style={choreStyles.container}>
      <Text style={choreStyles.title}>Assign a chore</Text> 

      {/* Inputfelt til opgavens navn */}
      <TextInput
        style={choreStyles.input}
        placeholder="Enter chore"
        value={chore}
        onChangeText={setChore}
      />

      {/* Inputfelt til personens navn */}
      <TextInput
        style={choreStyles.input}
        placeholder="Enter person assigned"
        value={person}
        onChangeText={setPerson}
      />

      {/* Dato-vælger felt */}
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={choreStyles.input}>
        <Text style={choreStyles.dateText}>{moment(deadline).format('DD-MM-YYYY')}</Text>
      </TouchableOpacity>

      {/* Vis DateTimePicker hvis showDatePicker er true */}
      {showDatePicker && (
        <DateTimePicker
          value={deadline}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}

      {/* Knap til at tildele opgaven */}
      <TouchableOpacity style={choreStyles.button} onPress={handleAddAssignment}>
        {uploading ? (
          <ActivityIndicator size="small" color="#fff" /> // Loader-animation ved uploading
        ) : (
          <Text style={choreStyles.text}>Assign Chore</Text>
        )}
      </TouchableOpacity>

      {/* Modal-popup, der viser "Chore assigned" */}
      <Modal
        transparent={true}
        visible={showPopup}
        animationType="fade"
        onRequestClose={() => setShowPopup(false)}
      >
        <View style={choreStyles.popupContainer}>
          <View style={choreStyles.popup}>
            <Ionicons name="checkmark-circle" size={40} color="green" />
            <Text style={choreStyles.popupText}>Chore assigned</Text>
          </View>
        </View>
      </Modal>

      <StatusBar style="auto" />
    </View>
  );
}
