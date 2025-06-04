import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import Colors from './constants/color';

export default function App() {

  const [ userNumber, setUserNumber ] = useState(null);

  const pickedNumberHandler = (pickedNumber) => {
    setUserNumber(pickedNumber)
  }

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;

  if(userNumber) {
    screen = <GameScreen />
  }

  return (
    <LinearGradient colors={[ '#4e0329', Colors.accent500 ]} style={styles.mainContainer}>
      <ImageBackground 
        source={require('./assets/images/background.png')} 
        resizeMode='cover' 
        style={styles.mainContainer}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.mainContainer}>
          {screen}
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    // backgroundColor: '#ddb52f',
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  }
});
