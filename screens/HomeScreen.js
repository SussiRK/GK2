import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, SafeAreaView, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import Ionicons from 'react-native-vector-icons/Ionicons';
import globalStyles from '../styles/HomeStyles'; 

export default function HomeScreen() {
  const [personName, setPersonName] = useState('');
  const [chores, setChores] = useState([]);
  const [filteredChores, setFilteredChores] = useState([]);

  const fetchChores = () => {
    const db = getDatabase();
    const choresRef = ref(db, 'chores');

    onValue(choresRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const choresArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setChores(choresArray);
      } else {
        setChores([]);
      }
    });
  };

  const filterChoresByPerson = () => {
    const filtered = chores.filter((chore) =>
      chore.person.toLowerCase() === personName.toLowerCase()
    );
    setFilteredChores(filtered);
  };

  const handleDeleteChore = (choreId) => {
    const db = getDatabase();
    const choreRef = ref(db, `chores/${choreId}`);
    remove(choreRef)
      .then(() => {
        console.log('Chore deleted successfully');
        fetchChores();
      })
      .catch((error) => {
        console.error('Error deleting chore: ', error);
      });
  };

  useEffect(() => {
    fetchChores();
  }, []);

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView contentContainerStyle={globalStyles.scrollViewContent}>
        <Text style={globalStyles.welcomeText}>ChoreSum</Text>

        <View style={globalStyles.banner}>
          <Text style={globalStyles.bannerTitle}>Household</Text>
          <Text style={globalStyles.bannerSubtitle}>Roomies 1</Text>
        </View>

        <View style={globalStyles.choresSection}>
          <Text style={globalStyles.choresTitle}>My chores</Text>

          <ScrollView style={globalStyles.choresList}>
            {chores.length > 0 ? (
              chores.map((chore) => (
                <View key={chore.id} style={globalStyles.choreItem}>
                  <View style={globalStyles.choreInfo}>
                    <Ionicons name="clipboard-outline" size={24} color="black" style={globalStyles.icon} />
                    <View>
                      <Text style={globalStyles.choreName}>{chore.chore}</Text>
                      <View style={globalStyles.choreDeadlineContainer}>
                        <Ionicons name="time-outline" size={20} color="gray" style={globalStyles.icon} />
                        <Text style={globalStyles.deadlineText}>{chore.deadline}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={globalStyles.choreActions}>
                    <TouchableOpacity onPress={() => handleDeleteChore(chore.id)}>
                      <Ionicons name="checkmark-circle" size={24} color="green" style={globalStyles.actionIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDeleteChore(chore.id)}>
                      <Ionicons name="trash-outline" size={24} color="black" style={globalStyles.actionIcon} />
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            ) : (
              <View style={globalStyles.noChoresContainer}>
                <Text style={globalStyles.noChoresText}>No chores assigned yet</Text>
              </View>
            )}
          </ScrollView>
        </View>

        {/* Add "Find chores" text above the input field */}
        <Text style={globalStyles.choresTitle}>Find chores</Text>

        <TextInput
          style={globalStyles.input}
          placeholder="Enter person's name"
          value={personName}
          onChangeText={setPersonName}
        />

        <TouchableOpacity style={globalStyles.button} onPress={filterChoresByPerson}>
          <Text style={globalStyles.text}>Find Chores</Text>
        </TouchableOpacity>

        {/* Display Filtered Chores */}
        {filteredChores.length > 0 && (
          <View style={globalStyles.choresSection}>
            <Text style={globalStyles.choresTitle}>Filtered chores</Text>
            <ScrollView style={globalStyles.choresList}>
              {filteredChores.map((chore) => (
                <View key={chore.id} style={globalStyles.choreItem}>
                  <View style={globalStyles.choreInfo}>
                    <Ionicons name="clipboard-outline" size={24} color="black" style={globalStyles.icon} />
                    <View>
                      <Text style={globalStyles.choreName}>{chore.chore}</Text>
                      <View style={globalStyles.choreDeadlineContainer}>
                        <Ionicons name="time-outline" size={20} color="gray" style={globalStyles.icon} />
                        <Text style={globalStyles.deadlineText}>{chore.deadline}</Text>
                      </View>
                    </View>
                  </View>
                  {/* Remove delete and checkmark buttons here */}
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
  );
}
