import React, { Fragment, useState, useEffect } from "react";
import { Alert, Text, View, SafeAreaView, StyleSheet } from "react-native";
import * as Font from "expo-font";

// Components
import DisplayScreen from "./components/DisplayScreen";
import GridKeys from "./components/GridKeys";
import ColKeys from "./components/ColKeys";
import HiddenGridButtons from "./components/HiddenGridButtons";
import Button from "./components/Button";

//button data {}
import data from "./constants/button.json";

const App = () => {
  const [state, setState] = useState({
    isFontLoaded: false,
    result: "",
    numberInput: "",
    operatorInput: "",
    showClear: false,
    clearScreen: false,
  });

  const [displayInput, setDisplayInput]: String = useState("");
  const [clearScreen, setClearScreen] = useState(false);
  const [operand, setOperand]: Number = useState(null);
  const [prevInput, setPrevInput]: Number = useState(null);
  const [prevOp, setPrevOp]: String = useState(null);

  useEffect(() => {
    (async () => {
      await Font.loadAsync({
        "OpenSans-Light": require("./assets/fonts/OpenSans-Light.ttf"),
        "OpenSans-Regular": require("./assets/fonts/OpenSans-Regular.ttf"),
      });
      setState({ ...state, isFontLoaded: true });
    })();
  }, []);

  const handleNumberPress = (value) => {
    let newNumberInput: Number = null;
    let newDisplayInput: Number = null;
    if (value == "." && state.numberInput.includes(".")) return;
    newDisplayInput =
      displayInput == "0" && value != "." ? value : displayInput + "" + value;
    newNumberInput =
      state.numberInput == "0" && value != "."
        ? value
        : state.numberInput + "" + value;

    if (state.result !== "" && state.operatorInput === "") {
      if (value == ".") {
        newDisplayInput = displayInput + ".";
        newNumberInput = state.numberInput + ".";
      }
      setDisplayInput(newDisplayInput);
      setState({
        ...state,
        numberInput: newNumberInput,
      });
      return performOperation(newNumberInput, prevOp);
    } else if (state.result !== "" && state.operatorInput !== "") {
      setPrevInput(state.result);
    }
    setDisplayInput(newDisplayInput);
    setState({
      ...state,
      numberInput: newNumberInput,
    });
    if (null != operand) {
      performOperation(value, state.operatorInput);
    }
  };

  const handleOperationPress = (operator) => {
    if (operator !== "=") {
      let newDisplayInput = "";
      if (displayInput != "" && state.operatorInput != "-") {
        newDisplayInput = displayInput + "" + operator;
      }
      let numberDataTypeValue: Number = null;
      if (state.result !== "") {
        numberDataTypeValue = state.result;
        setOperand(numberDataTypeValue);
      } else {
        numberDataTypeValue = state.numberInput;
        setOperand(numberDataTypeValue);
      }

      setDisplayInput(newDisplayInput);
      setState({
        ...state,
        operatorInput: operator,
        numberInput: "",
        showClear: false,
      });
    } else {
      if (state.result) {
        setPrevInput(state.result);
        setDisplayInput(state.result);
        setState({
          ...state,
          operatorInput: "",
          result: "",
          numberInput: "",
          showClear: true,
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
    setPrevInput(newOperand);
    setPrevOp(operator);
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
    if (displayInput || state.result) setClearScreen(true);
    setOperand(null);
    setPrevInput(null);
    setPrevOp(null);
    setDisplayInput("");
    setState({
      ...state,
      result: "",
      numberInput: "",
      operatorInput: "",
      showClear: false,
    });
  };

  const handleDeletePress = () => {
    let newDisplayInput = "";
    if (null !== prevInput) {
      var isnum = /^\d+$/.test(displayInput);
      newDisplayInput = displayInput.slice(0, isnum ? -2 : -1);
    } else {
      newDisplayInput = displayInput.slice(0, -1);
    }
    // return performOperation(newNumberInput, prevOp);
    setDisplayInput(newDisplayInput);
  };

  return (
    <SafeAreaView style={styles.container}>
      {state.isFontLoaded ? (
        <Fragment>
          <DisplayScreen
            result={state.result}
            displayInput={displayInput}
            clearScreen={clearScreen}
            setClearScreen={setClearScreen}
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
