
import { Text, View, StyleSheet, Alert, FlatList } from "react-native";
import Title from "../components/ui/Title";
import { useState } from "react";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import { useEffect } from "react";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import { Ionicons } from '@expo/vector-icons';
import GuessLogItem from "../components/game/GuessLogItem";

const generateRandomBetween = (min, max, exclude) => {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if(rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } 
  else {
    return rndNum;
  }
}

let minBoundary = 1;
let maxBoundary = 100;

const GameScreen = ({ userNumber, onGameOver }) => {

  const initialGuess = generateRandomBetween(1, 100, userNumber); 
  const [ currentGuess, setCurrentGuess ] = useState(initialGuess);
  const [ guessRounds, setGuessRounds ] = useState([initialGuess]);

  useEffect(() => {
    if(currentGuess === userNumber) {
      onGameOver(guessRounds.length);
    }
  }, [currentGuess, userNumber, onGameOver]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, [])

  const nextGuessHandler = (direction) => {
    // direction => 'lower', 'greater'
    if((direction === 'lower' && currentGuess < userNumber) || 
    (direction === 'greater' && currentGuess > userNumber))
    {
      Alert.alert("Don't lie!", 'You know that this is wrong...', [{ text: 'Sorry!', style: 'cancel' }]);
      return;
    }
    if(direction === 'lower') {
      maxBoundary = currentGuess - 1;
    }
    else {
      minBoundary = currentGuess + 1;
    }

    // console.log(`minBoundary: ${minBoundary}, maxBoundary: ${maxBoundary}`);
    const newRandomNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess);
    setCurrentGuess(newRandomNumber);
    setGuessRounds(prevGuessRounds => [ newRandomNumber, ...prevGuessRounds ])
  };

  let guessRoundsListLength = guessRounds.length;

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>Higher or lower?</InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
              <Ionicons name="remove" size={24} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
              <Ionicons name="add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
      <View style={styles.listContainer}>
        {/* {guessRounds.map((guessRound, index) => (<Text key={index}>{guessRound}</Text>))} */}
        <FlatList 
          data={guessRounds} 
          renderItem={(itemData) => <GuessLogItem guess={itemData.item} roundNumber={guessRoundsListLength - itemData.index} />}
          keyExtractor={(item) => item}
        />
      </View>
    </View>
  )
};
 
export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
  instructionText: {
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: 'row'
  },
  buttonContainer: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    padding: 16
  }
});