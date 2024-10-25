import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { getDatabase, ref, onValue, remove } from 'firebase/database'; // Import 'remove' to delete chore
import Ionicons from 'react-native-vector-icons/Ionicons';

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
        const choresArray = Object.keys(data).map(key => ({
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
    const filtered = chores.filter(chore =>
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
        fetchChores(); // Refresh the list after deletion
      })
      .catch((error) => {
        console.error('Error deleting chore: ', error);
      });
  };

  useEffect(() => {
    fetchChores();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Make the entire screen scrollable */}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.welcomeText}>ChoreSum</Text>

        {/* Banner with household name */}
        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>Household</Text>
          <Text style={styles.bannerSubtitle}>Roomies 1</Text>
        </View>

        {/* Displaying all chores */}
        <View style={styles.choresSection}>
          <Text style={styles.choresTitle}>My chores</Text>

          <ScrollView style={styles.choresList}>
            {chores.length > 0 ? (
              chores.map((chore, index) => (
                <View key={chore.id} style={styles.choreItem}>
                  <View style={styles.choreInfo}>
                    <Ionicons name="clipboard-outline" size={24} color="black" style={styles.icon} />
                    <View>
                      <Text style={styles.choreName}>{chore.chore}</Text>
                      <View style={styles.choreDeadlineContainer}>
                        <Ionicons name="time-outline" size={20} color="gray" style={styles.icon} />
                        <Text style={styles.deadlineText}>{chore.deadline}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.choreActions}>
                    {/* Delete chore by clicking checkmark or trash icon */}
                    <TouchableOpacity onPress={() => handleDeleteChore(chore.id)}>
                      <Ionicons name="checkmark-circle" size={24} color="green" style={styles.actionIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDeleteChore(chore.id)}>
                      <Ionicons name="trash-outline" size={24} color="black" style={styles.actionIcon} />
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            ) : (
              <View style={styles.noChoresContainer}>
                <Text style={styles.noChoresText}>No chores assigned yet</Text>
              </View>
            )}
          </ScrollView>
        </View>

        {/* Search Input */}
        <TextInput
          style={styles.input}
          placeholder="Enter person's name"
          value={personName}
          onChangeText={setPersonName}
        />

        <TouchableOpacity style={styles.button} onPress={filterChoresByPerson}>
          <Text style={styles.text}>Find Chores</Text>
        </TouchableOpacity>

        <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center', // Ensure the content is centered if there's not enough to scroll
  },
  welcomeText: {
    marginTop: 10,
    alignSelf: 'center',
    fontSize: 30,
    fontFamily: 'Avenir',
    fontWeight: '900',
    color: 'royalblue',
    fontStyle: 'italic',
  },
  banner: {
    backgroundColor: '#c0e6fc', // Light blue background
    padding: 15,
    marginTop: 50,
    marginVertical: 20,
    width: '100%',
    alignItems: 'center',
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A2FAE',
  },
  bannerSubtitle: {
    fontSize: 16,
    marginTop: 10,
    color: '#000',
  },
  choresSection: {
    marginTop: 20,
    width: '100%',
  },
  choresTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#1A2FAE',
    marginBottom: 10,
    marginLeft: 15,
    fontFamily: 'avenir'
  },
  choresList: {
    marginTop: 10,
  },
  choreItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3, // Shadow for Android
  },
  choreInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  choreName: {
    fontSize: 18,
    fontFamily: 'avenir',
    fontWeight: 'bold',
  },
  choreDeadlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  deadlineText: {
    fontSize: 14,
    color: 'gray',
    marginLeft: 2,
  },
  choreActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    marginHorizontal: 10,
  },
  noChoresContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },
  noChoresText: {
    fontSize: 16,
    color: 'gray',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 50,
    marginVertical: 10,
    paddingHorizontal: 10,
    alignSelf: 'center',
    width: '90%',
  },
  button: {
    alignItems: 'center',
    alignSelf: 'center',
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
    fontWeight: 'bold',
    color: 'white',
  },
});
