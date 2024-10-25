import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function CalendarScreen() {
  return (
    <View style={styles.container}>
      <Text>Denne skærm har til formål at fremvise en delt kalender, som tillader husholdsmedlemmerne at få et bedre overblik over de tildelte opgaver og deres udførelsesdatoer</Text>
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
  },
});