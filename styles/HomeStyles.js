// HomeStyles.js
import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f9fc',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  welcomeText: {
    marginTop: 5,
    alignSelf: 'center',
    fontSize: 30,
    fontFamily: 'Avenir',
    fontWeight: '900',
    color: '#1A2FAE',
    fontStyle: 'italic',
  },
  banner: {
    backgroundColor: '#c0e6fc',
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
    fontFamily: 'avenir',
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
    elevation: 3,
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
    backgroundColor: '#1A2FAE',
    margin: 20,
    width: 200,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default globalStyles;