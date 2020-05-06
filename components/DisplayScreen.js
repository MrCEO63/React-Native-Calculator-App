import React from "react";
import PropType from "prop-types";
import { StyleSheet, Text, View } from "react-native";

import ClearScreenAnimation from "./ClearScreenAnimation";

const DisplayScreen = ({
  result,
  displayInput,
  clearScreen,
  setClearScreen,
}) => {
  let displayInputFontSize = {};
  if (displayInput.length > 9 && displayInput.length < 12) {
    displayInputFontSize = { fontSize: 55 };
  } else if (displayInput.length >= 12) {
    displayInputFontSize = { fontSize: 40 };
  } else {
    displayInputFontSize = { fontSize: 70 };
  }

  const formatDisplayInput = (number, condition) => {
    let num = number.toString();
    if (num.length >= 17 && !condition) {
      num = num.slice(-16);
    }
    let parts = num.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  return (
    <View style={styles.displayLayout}>
      {clearScreen ? (
        <ClearScreenAnimation
          color="#f3af27"
          maxOpacity={1}
          setClearScreen={setClearScreen}
        />
      ) : (
        <>
          <Text
            style={Object.assign({}, displayInputFontSize, styles.displayInput)}
          >
            {formatDisplayInput(displayInput)}
          </Text>
          <Text style={styles.displayResult}>
            {formatDisplayInput(result, true)}
          </Text>
        </>
      )}
    </View>
  );
};

DisplayScreen.prototype = {
  result: PropType.string.isRequired,
  displayInput: PropType.string.isRequired,
};

export default DisplayScreen;

const styles = StyleSheet.create({
  displayLayout: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#ffffff",
    paddingTop: 20,
    paddingRight: 5,
  },
  displayInput: {
    paddingTop: 50,
    alignSelf: "flex-end",
    fontFamily: "OpenSans-Light",
  },
  displayResult: {
    alignSelf: "flex-end",
    fontFamily: "OpenSans-Light",
    fontSize: 40,
    paddingTop: 20,
    color: "rgb(188, 188, 188)",
  },
});
