import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, TouchableOpacity, Modal, Platform, ActivityIndicator } from 'react-native';
import { getDatabase, ref, push, set } from 'firebase/database';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons'; // For the checkmark icon
import choreStyles from '../styles/ChoreStyles'; 

export default function AssignChores({ navigation }) {
  const [chore, setChore] = useState('');
  const [person, setPerson] = useState('');
  const [deadline, setDeadline] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // Modal state
  const [uploading, setUploading] = useState(false); // Uploading state

  const database = getDatabase();

  const handleAddAssignment = () => {
    if (chore.trim() && person.trim() && !uploading) {
      setUploading(true);
      const choreRef = ref(database, 'chores');
      const newChoreRef = push(choreRef);

      const choreData = {
        chore: chore,
        person: person,
        deadline: moment(deadline).format('DD-MM-YYYY'),
      };

      set(newChoreRef, choreData)
        .then(() => {
          setUploading(false);
          setShowPopup(true); // Show the popup
          setTimeout(() => {
            setShowPopup(false); // Hide the popup after 2 seconds
          }, 2000);
        })
        .catch((error) => {
          setUploading(false);
          console.error('Error saving chore to the database:', error);
        });

      setChore('');
      setPerson('');
      setDeadline(new Date());
    } else {
      console.log('Chore, person, or deadline is missing, or still uploading.');
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || deadline;
    setShowDatePicker(Platform.OS === 'ios');
    setDeadline(currentDate);
  };

  return (
    <View style={choreStyles.container}>
      <Text>Assign a chore</Text>

      <TextInput
        style={choreStyles.input}
        placeholder="Enter chore"
        value={chore}
        onChangeText={setChore}
      />

      <TextInput
        style={choreStyles.input}
        placeholder="Enter person assigned"
        value={person}
        onChangeText={setPerson}
      />

      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={choreStyles.input}>
        <Text style={choreStyles.dateText}>{moment(deadline).format('DD-MM-YYYY')}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={deadline}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}

      <TouchableOpacity style={choreStyles.button} onPress={handleAddAssignment}>
        {uploading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={choreStyles.text}>Assign Chore</Text>
        )}
      </TouchableOpacity>

      {/* Modal Popup for "Chore assigned" */}
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
