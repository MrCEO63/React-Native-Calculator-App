import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PropType from "prop-types";
import merge from "lodash/merge";

const DisplayScreen = ({ result, displayInput }) => {
  let displayInputFontSize = {};
  if (displayInput.length > 9 && displayInput.length < 12) {
    displayInputFontSize = { fontSize: 55 };
  } else if (displayInput.length >= 12) {
    displayInputFontSize = { fontSize: 40 };
  } else {
    displayInputFontSize = { fontSize: 70 };
  }

  const numberWithCommas = (number) => {
    let parts = number.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  return (
    <View style={styles.displayLayout}>
      <Text style={merge(displayInputFontSize, styles.displayInput)}>
        {numberWithCommas(displayInput)}
      </Text>
      <Text style={styles.displayResult}>{result}</Text>
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
    paddingRight: 10,
  },
  displayInput: {
    paddingTop: 60,
    alignSelf: "flex-end",
    fontFamily: "OpenSans-Light",
  },
  displayResult: {
    alignSelf: "flex-end",
    fontFamily: "OpenSans-Light",
    fontSize: 40,
    paddingTop: 10,
  },
});
