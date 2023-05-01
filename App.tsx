import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';
import SendSMS from 'react-native-sms';

const App = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [bodySMS, setBodySMS] = useState('');

  const initiateSMS = () => {
    if (mobileNumber.length !== 9) {
      Alert.alert('Erreur', 'Veuillez saisir un numéro de téléphone valide.');
      return;
    }

    SendSMS.send(
      {
        body: bodySMS,
        recipients: [mobileNumber],
        successTypes: ['sent', 'queued']
      },
      (completed, cancelled, error) => {
        if (completed) {
          Alert.alert('SMS envoyé', 'Votre message a été envoyé avec succès !');
        } else if (cancelled) {
          Alert.alert('SMS annulé', 'L\'envoi de votre message a été annulé.');
        } else if (error) {
          Alert.alert('Erreur', `Une erreur est survenue : ${error}`);
        }
      }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.titleText}>
          react-native-sms
        </Text>
        <Text style={styles.inputLabel}>
          Saisir le numéro de téléphone
        </Text>
        <TextInput
          value={mobileNumber}
          onChangeText={setMobileNumber}
          placeholder={'Numéro de téléphone'}
          keyboardType="numeric"
          style={styles.textInput}
        />
        <Text style={styles.inputLabel}>
          Saisir le contenu du SMS
        </Text>
        <TextInput
          value={bodySMS}
          onChangeText={setBodySMS}
          placeholder={'Contenu du SMS'}
          style={styles.textInput}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.button}
          onPress={initiateSMS}
        >
          <Text style={styles.buttonText}>
            Envoyer le message
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: 50,
    paddingHorizontal: 20
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center'
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    width: '100%'
  },
  textInput: {
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 5,
    marginBottom: 20
  },
  button: {
    backgroundColor: '#2ecc71',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 24
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

export default App;
