import React from "react";
import PropType from "prop-types";
import {
  Text,
  View,
  Platform,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native";

const Button = ({
  text,
  textStyle,
  viewStyle,
  buttonStyle,
  onPress,
  onLongPress,
}) => {
  const background = (A) => A.Ripple("floralwhite", true);

  let Touchable =
    Platform.OS === "ios" ? TouchableOpacity : TouchableNativeFeedback;

  let ApplyBG = Platform.OS === "ios" ? false : background(Touchable);

  return (
    <Touchable
      style={buttonStyle}
      background={ApplyBG}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <View style={Object.assign({}, styles.view, viewStyle)}>
        <Text style={Object.assign({}, styles.text, textStyle)}>{text}</Text>
      </View>
    </Touchable>
  );
};

Button.prototype = {
  text: PropType.string.isRequired,
  textStyle: PropType.object,
  viewStyle: PropType.object,
  onPress: PropType.func,
  onLongPress: PropType.func,
};

export default Button;

const styles = StyleSheet.create({
  view: {
    justifyContent: "center",
    borderRadius: 100 / 2,
    width: 80,
    height: 80,
  },
  text: {
    fontSize: 25,
    textAlign: "center",
    color: "#fff",
    fontFamily: "OpenSans-Light",
  },
});
