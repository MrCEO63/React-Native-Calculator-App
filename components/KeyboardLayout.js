import React, { useRef } from "react";
import { StyleSheet, Text, View } from "react-native";

// Components
import GridKeys from "./GridKeys";
import ColKeys from "./ColKeys";
import HiddenGrid from "./HiddenGridButtons";

// Button data {}
import data from "../constants/button.json";

const KeyboardLayout = ({
  state,
  handleNumberPress,
  handleOperationPress,
  handleClearPress,
  handleDeletePress,
}) => {
  return (
    <View style={styles.keyPadLayout}>
      <GridKeys
        data={data.grid}
        handleNumberPress={handleNumberPress}
        handleOperationPress={handleOperationPress}
      />
      <ColKeys
        data={data.col}
        showClear={state.showClear}
        handleOperationPress={handleOperationPress}
        handleClearPress={handleClearPress}
        handleDeletePress={handleDeletePress}
      />
      <HiddenGrid data={data.hidden} />
    </View>
  );
};

export default KeyboardLayout;

const styles = StyleSheet.create({
  keyPadLayout: {
    flex: 2,
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
