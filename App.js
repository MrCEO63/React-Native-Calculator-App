import * as React from "react";
import { Alert, Text, View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import { Button } from "react-native-elements";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: "",
      numberInput: "",
      operationInput: "",
      displayInput: "",
      showClear: false
    };
  }

  operand: Number = null;
  prevInput: Number = null;
  prevOp: String = null;

  handleNumberPress = value => {
    let newNumberInput: Number = null;
    let newDisplayInput: Number = null;
    if (value == "." && this.state.numberInput.includes(".")) return;
    newDisplayInput =
      this.state.displayInput == "0" && value != "."
        ? value
        : this.state.displayInput + "" + value;
    newNumberInput =
      this.state.numberInput == "0" && value != "."
        ? value
        : this.state.numberInput + "" + value;

    if (this.state.result !== "" && this.state.operationInput === "") {
      if (value == ".") {
        newDisplayInput = this.state.displayInput + ".";
        newNumberInput = this.state.numberInput + ".";
      }
      this.setState({
        numberInput: newNumberInput,
        displayInput: newDisplayInput
      });
      return this.performOperation(newNumberInput, this.prevOp);
    } else if (this.state.result !== "" && this.state.operationInput !== "") {
      this.prevInput = this.state.result;
    }
    this.setState({
      numberInput: newNumberInput,
      displayInput: newDisplayInput
    });
    if (null != this.operand) {
      this.performOperation(value, this.state.operationInput);
    }
  };

  handleOperationPress = operation => {
    if (operation !== "=") {
      let newDisplayInput = "";
      if (this.state.displayInput != "" && this.state.operationInput != "-") {
        newDisplayInput = this.state.displayInput + "" + operation;
      }
      let numberDataTypeValue: Number = null;
      if (this.state.result !== "") {
        numberDataTypeValue = this.state.result;
        this.operand = numberDataTypeValue;
      } else {
        numberDataTypeValue = this.state.numberInput;
        this.operand = numberDataTypeValue;
      }
      this.setState({
        operationInput: operation,
        numberInput: "",
        showClear: false,
        displayInput: newDisplayInput
      });
    } else {
      if (this.state.result) {
        this.prevInput = this.state.result;
        this.setState({
          operationInput: "",
          result: "",
          numberInput: "",
          showClear: true,
          displayInput: this.state.result
        });
      }
    }
  };

  handleClearPress = () => {
    this.operand = null;
    this.prevInput = null;
    this.prevOp = null;
    this.setState({
      result: "",
      numberInput: "",
      operationInput: "",
      showClear: false,
      displayInput: ""
    });
  };

  handleDeletePress = () => {
    let newDisplayInput = "";
    if (null !== this.prevInput) {
      var isnum = /^\d+$/.test(this.state.displayInput);
      newDisplayInput = this.state.displayInput.slice(0, isnum ? -2 : -1);
    } else {
      newDisplayInput = this.state.displayInput.slice(0, -1);
    }
    // return this.performOperation(newNumberInput, this.prevOp);
    this.setState({
      displayInput: newDisplayInput
    });
  };

  performOperation = (value: Number, operation: String) => {
    let newOperand = parseFloat(this.operand);
    if (this.prevInput) {
      newOperand = parseFloat(this.prevInput);
    }
    let newValue = parseFloat(value);
    this.prevInput = newOperand;
    this.prevOp = operation;
    switch (operation) {
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
    this.setState({
      result,
      newNumber: "",
      showClear: false,
      operationInput: ""
    });
  };

  render() {
    const { result, displayInput } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.displayLayout}>
          <Text style={styles.displayInput}>{displayInput}</Text>
          <Text style={styles.displayResult}>{result}</Text>
        </View>
        <View style={styles.inputKeyButtonLayout}>
          <View style={styles.inputNumberLayout}>
            <View style={styles.inputNumberItem}>
              <Button
                title="1"
                titleStyle={styles.inputNumberItemTitleStyle}
                buttonStyle={styles.inputNumberItemButtonStyle}
                onPress={() => this.handleNumberPress(1)}
              />
              <Button
                title="2"
                titleStyle={styles.inputNumberItemTitleStyle}
                buttonStyle={styles.inputNumberItemButtonStyle}
                onPress={() => this.handleNumberPress(2)}
              />
              <Button
                title="3"
                titleStyle={styles.inputNumberItemTitleStyle}
                buttonStyle={styles.inputNumberItemButtonStyle}
                onPress={() => this.handleNumberPress(3)}
              />
            </View>
            <View style={styles.inputNumberItem}>
              <Button
                title="4"
                titleStyle={styles.inputNumberItemTitleStyle}
                buttonStyle={styles.inputNumberItemButtonStyle}
                onPress={() => this.handleNumberPress(4)}
              />
              <Button
                title="5"
                titleStyle={styles.inputNumberItemTitleStyle}
                buttonStyle={styles.inputNumberItemButtonStyle}
                onPress={() => this.handleNumberPress(5)}
              />
              <Button
                title="6"
                titleStyle={styles.inputNumberItemTitleStyle}
                buttonStyle={styles.inputNumberItemButtonStyle}
                onPress={() => this.handleNumberPress(6)}
              />
            </View>
            <View style={styles.inputNumberItem}>
              <Button
                title="7"
                titleStyle={styles.inputNumberItemTitleStyle}
                buttonStyle={styles.inputNumberItemButtonStyle}
                onPress={() => this.handleNumberPress(7)}
              />
              <Button
                title="8"
                titleStyle={styles.inputNumberItemTitleStyle}
                buttonStyle={styles.inputNumberItemButtonStyle}
                onPress={() => this.handleNumberPress(8)}
              />
              <Button
                title="9"
                titleStyle={styles.inputNumberItemTitleStyle}
                buttonStyle={styles.inputNumberItemButtonStyle}
                onPress={() => this.handleNumberPress(9)}
              />
            </View>
            <View style={styles.inputNumberItem}>
              <Button
                title="."
                titleStyle={styles.inputNumberItemTitleStyle}
                buttonStyle={styles.inputNumberItemButtonStyle}
                onPress={() => this.handleNumberPress(".")}
              />
              <Button
                title="0"
                titleStyle={styles.inputNumberItemTitleStyle}
                buttonStyle={styles.inputNumberItemButtonStyle}
                onPress={() => this.handleNumberPress(0)}
              />
              <Button
                title="="
                titleStyle={styles.inputNumberItemTitleStyle}
                buttonStyle={styles.inputNumberItemButtonStyle}
                onPress={() => this.handleOperationPress("=")}
              />
            </View>
          </View>
          <View style={styles.inputOperationLayout}>
            <Button
              title={this.state.showClear ? "CLR" : "DEL"}
              titleStyle={{ fontSize: 20 }}
              buttonStyle={styles.inputOperationButtonStyle}
              onPress={() => {
                this.state.showClear
                  ? this.handleClearPress()
                  : this.handleDeletePress();
              }}
            />
            <Button
              title="÷"
              titleStyle={{ fontSize: 30 }}
              buttonStyle={styles.inputOperationButtonStyle}
              onPress={() => this.handleOperationPress("÷")}
            />
            <Button
              title="x"
              titleStyle={{ fontSize: 20 }}
              buttonStyle={styles.inputOperationButtonStyle}
              onPress={() => this.handleOperationPress("x")}
            />
            <Button
              title="-"
              titleStyle={{ fontSize: 20 }}
              buttonStyle={styles.inputOperationButtonStyle}
              onPress={() => this.handleOperationPress("-")}
            />
            <Button
              title="+"
              titleStyle={{ fontSize: 20 }}
              buttonStyle={styles.inputOperationButtonStyle}
              onPress={() => this.handleOperationPress("+")}
            />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              flexBasis: "5%",
              backgroundColor: "red"
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1"
  },
  displayLayout: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "powderblue",
    paddingTop: 50,
    paddingLeft: 10,
    paddingRight: 10
  },
  displayInput: {
    alignSelf: "flex-end",
    fontSize: 70
  },
  displayResult: {
    alignSelf: "flex-end",
    fontSize: 40
  },
  inputKeyButtonLayout: {
    flex: 2,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  inputNumberLayout: {
    flex: 1,
    flexBasis: "67%",
    backgroundColor: "skyblue"
  },
  inputNumberItem: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap"
  },
  inputNumberItemTitleStyle: {
    fontSize: 50,
    textAlign: "center"
  },
  inputNumberItemButtonStyle: {
    borderRadius: 0,
    paddingRight: 20,
    paddingLeft: 20,
    backgroundColor: "transparent"
  },
  inputOperationLayout: {
    flex: 1,
    flexDirection: "column",
    flexBasis: "28%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "blue"
  },
  inputOperationButtonStyle: {
    borderRadius: 0,
    backgroundColor: "transparent",
    padding: 20
  }
});
