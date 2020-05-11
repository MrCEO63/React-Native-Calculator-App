import React, { useState, useRef } from "react";
import PropType from "prop-types";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  PanResponder,
  Easing,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";

// Components
import Button from "./Button";

const SCREEN_WIDTH = Dimensions.get("window").width;
const HIDDEN_WIDTH = SCREEN_WIDTH - 100;

const HiddenGrid = ({ data }) => {
  const [close, setClose] = useState(true);
  const _animatedHidden = useRef(
    new Animated.ValueXY({ x: HIDDEN_WIDTH - 20, y: 0 })
  ).current;
  const _animatedOverlay = useRef(
    new Animated.ValueXY({ x: SCREEN_WIDTH, y: 0 })
  ).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
        return gestureState.dx != 0;
      },
      onPanResponderGrant: () => {
        _animatedHidden.setOffset({ x: _animatedHidden.x._value, y: 0 });
        _animatedOverlay.setOffset({ x: _animatedOverlay.x._value, y: 0 });
      },
      onPanResponderMove: (event, gestureState) => {
        if (gestureState.dx < 0) {
          if (gestureState.dx > -300) {
            _animatedHidden.setValue({ x: gestureState.dx, y: 0 });
          }
        } else if (gestureState.dx > 0) {
          _animatedHidden.setValue({ x: gestureState.dx, y: 0 });
        }
      },
      onPanResponderRelease: (event, gestureState) => {
        _animatedHidden.flattenOffset();
        _animatedOverlay.flattenOffset();
        if (gestureState.dx < 0) {
          if (-gestureState.dx < 100) {
            Animated.timing(_animatedHidden.x, {
              toValue: HIDDEN_WIDTH - 20,
              duration: 200,
              easing: Easing.linear,
            }).start();
            Animated.timing(_animatedOverlay.x, {
              toValue: SCREEN_WIDTH,
              duration: 0,
            }).start();
          } else {
            Animated.timing(_animatedHidden.x, {
              toValue: 0,
              duration: 200,
              easing: Easing.linear,
            }).start(() => {
              setClose(false);
            });
            Animated.timing(_animatedOverlay.x, {
              toValue: -SCREEN_WIDTH,
              duration: 0,
            }).start();
          }
        } else if (gestureState.dx > 0) {
          Animated.timing(_animatedHidden.x, {
            toValue: HIDDEN_WIDTH - 20,
            duration: 200,
            easing: Easing.linear,
          }).start(() => {
            setClose(true);
          });
          Animated.timing(_animatedOverlay.x, {
            toValue: SCREEN_WIDTH,
            duration: 0,
          }).start();
        }
      },
    })
  ).current;

  const toggleHidden = () => {
    if (close) {
      Animated.timing(_animatedHidden.x, {
        toValue: 0,
        easing: Easing.linear,
        duration: 200,
      }).start(() => {
        setClose(false);
      });
      Animated.timing(_animatedOverlay.x, {
        toValue: -SCREEN_WIDTH,
        duration: 0,
      }).start();
    } else {
      Animated.timing(_animatedHidden.x, {
        toValue: HIDDEN_WIDTH - 20,
        easing: Easing.linear,
        duration: 200,
      }).start(() => {
        setClose(true);
      });
      Animated.timing(_animatedOverlay.x, {
        toValue: SCREEN_WIDTH,
        duration: 0,
      }).start();
    }
  };

  const animatedHidden = {
    transform: [
      {
        translateX: _animatedHidden.x.interpolate({
          inputRange: [0, HIDDEN_WIDTH - 20],
          outputRange: [0, HIDDEN_WIDTH - 20],
          extrapolate: "clamp",
        }),
      },
      { translateY: 0 },
    ],
  };

  const animatedOverlay = {
    transform: [
      {
        translateX: _animatedOverlay.x.interpolate({
          inputRange: [0, SCREEN_WIDTH],
          outputRange: [0, SCREEN_WIDTH],
          extrapolate: "clamp",
        }),
      },
      { translateY: 0 },
    ],
    opacity: _animatedOverlay.x.interpolate({
      inputRange: [0, SCREEN_WIDTH],
      outputRange: [0.6, 0],
      extrapolate: "clamp",
    }),
    backgroundColor: _animatedOverlay.x.interpolate({
      inputRange: [0, SCREEN_WIDTH],
      outputRange: ["rgb(0, 0, 0.5)", "rgb(0, 0, 0.1)"],
    }),
  };

  return (
    <View {...panResponder.panHandlers} style={styles.container}>
      <TouchableWithoutFeedback onPress={toggleHidden}>
        <View style={{ flex: 1 }}>
          <Animated.View style={[animatedOverlay, styles.opacityContainer]} />
          <Animated.View style={[animatedHidden, styles.gridContainer]}>
            {data.map((btns, i) => (
              <View style={styles.gridRow} key={i}>
                {btns.map((btn, ii) => (
                  <Button
                    key={ii}
                    text={`${btn}`}
                    textStyle={{ color: "rgba(0, 0, 0, 0.5)" }}
                    viewStyle={{ borderRadius: 5 }}
                    onPress={() => handleOperationPress(btn)}
                  />
                ))}
              </View>
            ))}
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

HiddenGrid.prototype = {
  data: PropType.object.isRequired,
};

export default HiddenGrid;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    position: "absolute",
    height: "100%",
    right: 0,
  },
  opacityContainer: {
    flex: 1,
    position: "absolute",
    height: "100%",
    width: SCREEN_WIDTH,
    right: 0,
  },
  gridContainer: {
    flex: 1,
    backgroundColor: "#f3af27",
    position: "absolute",
    height: "100%",
    right: 0,
    width: HIDDEN_WIDTH,
  },
  gridRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
