// ChoreStyles.js
import { StyleSheet } from 'react-native';

const choreStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f9fc',
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
    backgroundColor: '#1A2FAE',
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
    popupContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    popup: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    popupText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'green',
      marginLeft: 10,
    },
  });

export default choreStyles;
