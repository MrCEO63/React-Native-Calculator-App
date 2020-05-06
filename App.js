import React, { Fragment, useState, useEffect } from "react";
import { Alert, Text, View, SafeAreaView, StyleSheet } from "react-native";
import * as Font from "expo-font";
import { Button } from "react-native-elements";

// Components
import DisplayScreen from "./components/DisplayScreen";
import GridKeys from "./components/GridKeys";
import ColKeys from "./components/ColKeys";
import HiddenGridButtons from "./components/HiddenGridButtons";

//button data {}
import data from "./constants/button.json";

const App = () => {
  const [state, setState] = useState({
    isFontLoaded: false,
    displayInput: "6x3",
    result: "18",
    numberInput: "",
    operatorInput: "",
    showClear: false,
  });

  useEffect(() => {
    (async () => {
      await Font.loadAsync({
        "OpenSans-Light": require("./assets/fonts/OpenSans-Light.ttf"),
        "OpenSans-Regular": require("./assets/fonts/OpenSans-Regular.ttf"),
      });
      setState({ ...state, isFontLoaded: true });
    })();
  }, []);

  let operand: Number = null;
  let prevInput: Number = null;
  let prevOp: String = null;

  const handleNumberPress = (value) => {
    let newNumberInput: Number = null;
    let newDisplayInput: Number = null;
    if (value == "." && state.numberInput.includes(".")) return;
    newDisplayInput =
      state.displayInput == "0" && value != "."
        ? value
        : state.displayInput + "" + value;
    newNumberInput =
      state.numberInput == "0" && value != "."
        ? value
        : state.numberInput + "" + value;

    if (state.result !== "" && state.operatorInput === "") {
      if (value == ".") {
        newDisplayInput = state.displayInput + ".";
        newNumberInput = state.numberInput + ".";
      }
      setState({
        ...state,
        numberInput: newNumberInput,
        displayInput: newDisplayInput,
      });
      return performOperation(newNumberInput, prevOp);
    } else if (state.result !== "" && state.operatorInput !== "") {
      prevInput = state.result;
    }
    setState({
      ...state,
      numberInput: newNumberInput,
      displayInput: newDisplayInput,
    });
    if (null != operand) {
      performOperation(value, state.operatorInput);
    }
  };

  const handleOperationPress = (operator) => {
    if (operator !== "=") {
      let newDisplayInput = "";
      if (state.displayInput != "" && state.operatorInput != "-") {
        newDisplayInput = state.displayInput + "" + operator;
      }
      let numberDataTypeValue: Number = null;
      if (state.result !== "") {
        numberDataTypeValue = state.result;
        operand = numberDataTypeValue;
      } else {
        numberDataTypeValue = state.numberInput;
        operand = numberDataTypeValue;
      }
      setState({
        ...state,
        operatorInput: operator,
        numberInput: "",
        showClear: false,
        displayInput: newDisplayInput,
      });
    } else {
      if (state.result) {
        prevInput = state.result;
        setState({
          displayInput: state.result,
          operatorInput: "",
          result: "",
          numberInput: "",
          showClear: true,
          ...state,
        });
      }
    }
  };

  const performOperation = (value: Number, operator: String) => {
    let newOperand = parseFloat(operand);
    if (prevInput) {
      newOperand = parseFloat(prevInput);
    }
    let newValue = parseFloat(value);
    prevInput = newOperand;
    prevOp = operator;
    switch (operator) {
      case "=":
        newOperand = newValue;
        break;
      case "÷":
        if (newValue == 0) {
          newOperand = 0.0;
        } else {
          newOperand /= newValue;
        }
        break;
      case "x":
        newOperand *= newValue;
        break;
      case "-":
        newOperand -= newValue;
        break;
      case "+":
        newOperand += newValue;
        break;
      default:
        newOperand = newValue;
    }
    let result: String = newOperand;
    setState({
      ...state,
      result,
      newNumber: "",
      showClear: false,
      operatorInput: "",
    });
  };

  const handleClearPress = () => {
    operand = null;
    prevInput = null;
    prevOp = null;
    setState({
      ...state,
      result: "",
      numberInput: "",
      operatorInput: "",
      showClear: false,
      displayInput: "",
    });
  };

  const handleDeletePress = () => {
    let newDisplayInput = "";
    if (null !== prevInput) {
      var isnum = /^\d+$/.test(state.displayInput);
      newDisplayInput = state.displayInput.slice(0, isnum ? -2 : -1);
    } else {
      newDisplayInput = state.displayInput.slice(0, -1);
    }
    // return performOperation(newNumberInput, prevOp);
    setState({
      ...state,
      displayInput: newDisplayInput,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {state.isFontLoaded ? (
        <Fragment>
          <DisplayScreen
            result={state.result}
            displayInput={state.displayInput}
          />
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
            <HiddenGridButtons />
          </View>
        </Fragment>
      ) : (
        <Text>{""}</Text>
      )}
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  keyPadLayout: {
    flex: 2,
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
