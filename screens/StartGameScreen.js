
import { TextInput, View, StyleSheet, Alert } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import { useState } from "react";

const StartGameScreen = () => {

  const [ enteredNumber, setEnteredNumber ] = useState('');

  const numberInputHandler = (enteredNumber) => {
    setEnteredNumber(enteredNumber);
  };

  const resetInputHandler = () => {
    setEnteredNumber('')
  }

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredNumber);

    if(isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert('Invalid Number!', 'Number has to be a number between 1 and 99.',
        [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }]
      )
      return;
    }

    console.log('Valid number')
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput 
        style={styles.numberInput} 
        maxLength={2} 
        keyboardType="number-pad" 
        autoCapitalized="none" 
        autoCorrect={false}
        value={enteredNumber}
        onChangeText={numberInputHandler}
      />
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>
          <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
        </View>
        <View style={styles.buttonContainer}>
          <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
        </View>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({

  inputContainer: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    marginTop: 100,
    marginHorizontal: 24,
    backgroundColor: '#3b021f',
    borderRadius: 8,
    elevation: 4,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    shadowOpacity: 0.4
  },
  numberInput: {
    height: 57,
    width: 50,
    fontSize: 32,
    borderBottomColor: '#ddb52f',
    borderBottomWidth: 2,
    color: '#ddb52f',
    marginVertical: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row'
  },
  buttonContainer: {
    flex: 1,
  }
})

export default StartGameScreen;