import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PropType from "prop-types";

const HiddenGridButtons = () => {
  return <View style={styles.hiddenGridButtons} />;
};

export default HiddenGridButtons;

const styles = StyleSheet.create({
  hiddenGridButtons: {
    flex: 1,
    flexDirection: "column",
    flexBasis: "5.5%",
    backgroundColor: "#f3af27",
  },
});
