import { View, Text, Pressable, StyleSheet } from "react-native";
import Colors from "../../constants/Color";

const PrimaryButton = ({ children, onPress }) => {

  const pressHandler = () => {
    console.log('Pressed');
    onPress()
  }

  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable 
        onPress={onPress || pressHandler} 
        android_ripple={{ color: Colors.primary600 }} 
        style={({ pressed }) => pressed ? [styles.buttonInnerContainer, styles.pressed] : styles.buttonInnerContainer}
      >
          <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  )
};

const styles = StyleSheet.create({
  buttonOuterContainer:{
    borderRadius: 28,
    margin: 4,
    overflow: 'hidden',
  },
  buttonInnerContainer: {
    backgroundColor: Colors.primary500,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.75,
  }
});

export default PrimaryButton;