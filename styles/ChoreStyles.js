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
    fontSize: 16,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    height: 50,
    marginVertical: 10,
    paddingHorizontal: 10,
    width: '100%',
    justifyContent: 'center',
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  dateText: {
    fontSize: 16,
    color: 'gray',
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
  title: { 
    fontSize: 24,        
    fontWeight: 'bold', 
    color: '#1A2FAE',   
    marginBottom: 20,    
  },
  popupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
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
