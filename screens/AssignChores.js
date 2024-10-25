import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Modal, Platform, ActivityIndicator } from 'react-native';
import { getDatabase, ref, push, set } from 'firebase/database';
import DateTimePicker from '@react-native-community/datetimepicker'; // Importing DateTimePicker
import moment from 'moment'; // Import moment for date formatting (optional, but recommended)

export default function AssignChores({ navigation }) { 
  const [chore, setChore] = useState(''); 
  const [person, setPerson] = useState(''); 
  const [deadline, setDeadline] = useState(new Date()); // Store the deadline as a Date object
  const [assignedChores, setAssignedChores] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false); // Show/hide the date picker
  const [uploading, setUploading] = useState(false); // For handling the uploading state

  // Firebase reference
  const database = getDatabase(); 

  // Function to handle adding the chore
  const handleAddAssignment = () => {
    if (chore.trim() && person.trim() && !uploading) {
      const choreRef = ref(database, 'chores');
      const newChoreRef = push(choreRef);
      
      // Only add the image URL if it's available
      const choreData = {
        chore: chore,
        person: person,
        deadline: moment(deadline).format('DD-MM-YYYY')
      };
  
      set(newChoreRef, choreData)
        .then(() => {
          console.log("Chore successfully saved to the database");
        })
        .catch((error) => {
          console.error("Error saving chore to the database:", error);
        });
  
      setAssignedChores([...assignedChores, { chore, person, deadline: moment(deadline).format('DD-MM-YYYY') }]);
      setChore(''); 
      setPerson(''); 
      setDeadline(new Date());
    } else {
      console.log("Chore, person, or deadline is missing, or still uploading.");
    }
  };  

  // Handle date change
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || deadline;
    setShowDatePicker(Platform.OS === 'ios'); // On iOS, the picker stays visible until dismissed
    setDeadline(currentDate);
  };

  return (
    <View style={styles.container}>
      <Text>Assign a chore</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter chore"
        value={chore}
        onChangeText={setChore}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter person assigned"
        value={person}
        onChangeText={setPerson}
      />

      {/* Date picker for deadline */}
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
        <Text style={styles.dateText}>{moment(deadline).format('DD-MM-YYYY')}</Text>
      </TouchableOpacity>

      {/* Show DatePicker */}
      {showDatePicker && (
        <DateTimePicker
          value={deadline}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={handleAddAssignment}>
        <Text style={styles.text}>Assign Chore</Text>
      </TouchableOpacity>

      {/* Display the list of assigned chores */}
      <ScrollView style={styles.assignmentList}>
        {assignedChores.map((assignment, index) => (
          <View key={index} style={styles.assignmentContainer}>
            <Text style={styles.assignmentLabel}>Chore:</Text>
            <Text style={styles.assignmentText}>{assignment.chore}</Text>
            <Text style={styles.assignmentLabel}>Assigned to:</Text>
            <Text style={styles.assignmentText}>{assignment.person}</Text>
            <Text style={styles.assignmentLabel}>Deadline:</Text>
            <Text style={styles.assignmentText}>{assignment.deadline}</Text>
          </View>
        ))}
      </ScrollView>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
    width: '100%',
    justifyContent: 'center',
  },
  dateText: {
    fontSize: 16,
    color: 'gray',
  },
  assignmentList: {
    marginTop: 20,
    width: '100%',
    maxHeight: 200,
  },
  assignmentContainer: {
    marginBottom: 20,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    paddingHorizontal: 10,
    width: '100%',
  },
  assignmentLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  assignmentText: {
    fontSize: 18,
    color: 'blue',
    marginBottom: 5,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: 'royalblue',
    margin: 20,
    width: 200,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.30,
    color: 'white',
    fontFamily: 'Avenir',
  },
});
