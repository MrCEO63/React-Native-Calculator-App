import React from "react";
import PropType from "prop-types";
import {
  Text,
  View,
  Platform,
  StyleSheet,
  TouchableNativeFeedback,
} from "react-native";

import TouchableIOSFeedback from "./TouchableIOSFeedback";

const Button = ({ text, textStyle, viewStyle, onPress, onLongPress }) => {
  const background = (A) => A.Ripple("floralwhite", true);

  let Touchable =
    Platform.OS === "ios" ? TouchableIOSFeedback : TouchableNativeFeedback;

  let ApplyBG = Platform.OS === "ios" ? false : background(Touchable);

  return (
    <Touchable
      background={ApplyBG}
      onPress={onPress}
      onLongPress={onLongPress}
      size={40}
      color="floralwhite"
      maxOpacity={0.25}
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
