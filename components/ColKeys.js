import React from "react";
import PropType from "prop-types";
import { StyleSheet, Text, View } from "react-native";
import Button from "./Button";

const ColKeys = ({
  data,
  showClear,
  handleClearPress,
  handleDeletePress,
  handleOperationPress,
}) => {
  return (
    <View style={styles.columnContainer}>
      <Button
        text={showClear ? "CLR" : "DEL"}
        buttonStyle={{}}
        textStyle={{ fontSize: 20, fontFamily: "OpenSans-Regular" }}
        onPress={() => {
          showClear ? handleClearPress() : handleDeletePress();
        }}
        onLongPress={() => handleClearPress()}
      />
      {data.map((btn, index) => (
        <Button
          key={index}
          text={btn}
          buttonStyle={{}}
          viewStyle={styles.columnButtonView}
          textStyle={{ fontFamily: "OpenSans-Regular" }}
          onPress={() =>
            btn === "=" ? handleOperationPress(btn) : handleNumberPress(btn)
          }
        />
      ))}
    </View>
  );
};

ColKeys.prototype = {
  data: PropType.object.isRequired,
  showClear: PropType.bool.isRequired,
  handleOperationPress: PropType.func.isRequired,
  handleClearPress: PropType.func.isRequired,
  handleDeletePress: PropType.func.isRequired,
};

export default ColKeys;

const styles = StyleSheet.create({
  columnContainer: {
    flex: 1,
    flexDirection: "column",
    flexBasis: "24%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "rgba(188, 188, 188, 0.8)",
  },
});
