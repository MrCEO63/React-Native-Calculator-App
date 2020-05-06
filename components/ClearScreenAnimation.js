import React, { useEffect, useState } from "react";
import PropType from "prop-types";
import { View, Animated, Easing, Platform } from "react-native";

const ClearScreenAnimation = ({ color, maxOpacity, setClearScreen }) => {
  const [state, setState] = useState({
    maxOpacity,
    scaleValue: new Animated.Value(0.01),
    opacityValue: new Animated.Value(maxOpacity),
  });

  const rippleSize = 80 * 10;

  useEffect(() => {
    onPressedIn();
    onPressedOut();
  }, []);

  const onPressedIn = () => {
    Animated.timing(state.scaleValue, {
      toValue: 1,
      duration: 225,
      easing: Easing.bezier(0.0, 0.0, 0.2, 1),
      useNativeDriver: Platform.OS === "android",
    }).start();
  };

  const onPressedOut = () => {
    Animated.timing(state.opacityValue, {
      toValue: 0,
      useNativeDriver: Platform.OS === "android",
    }).start(() => {
      state.scaleValue.setValue(0.01);
      state.opacityValue.setValue(state.maxOpacity);
      setClearScreen(false);
    });
  };

  return (
    <Animated.View
      style={{
        position: "absolute",
        top: -200,
        left: -70,
        width: rippleSize,
        height: rippleSize,
        borderRadius: rippleSize / 2,
        transform: [{ scale: state.scaleValue }],
        opacity: state.opacityValue,
        backgroundColor: color || "white",
      }}
    />
  );
};

ClearScreenAnimation.prototype = {
  color: PropType.string,
  maxOpacity: PropType.number.isRequired,
  setClearScreen: PropType.func.isRequired,
};

export default ClearScreenAnimation;
