import React from "react";
import PropType from "prop-types";
import { View, Text, StyleSheet } from "react-native";

import Button from "./Button";

const GridKeys = ({ data, handleNumberPress, handleOperationPress }) => {
  return (
    <View style={styles.gridContainer}>
      {data.map((btns, i) => (
        <View style={styles.gridRow} key={i}>
          {btns.map((btn, ii) => (
            <Button
              key={ii}
              text={`${btn}`}
              textStyle={Object.assign(
                { fontSize: 40 },
                btn === "." ? { top: -5, right: -2 } : {}
              )}
              onPress={() =>
                btn === "=" ? handleOperationPress(btn) : handleNumberPress(btn)
              }
            />
          ))}
        </View>
      ))}
    </View>
  );
};

GridKeys.prototype = {
  data: PropType.object.isRequired,
  handleNumberPress: PropType.func.isRequired,
  handleOperationPress: PropType.func.isRequired,
};

export default GridKeys;

const styles = StyleSheet.create({
  gridContainer: {
    flex: 1,
    height: "100%",
    flexBasis: "70%",
    backgroundColor: "rgb(108, 108, 108)",
  },
  gridRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
