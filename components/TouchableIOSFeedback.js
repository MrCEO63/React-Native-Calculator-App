import React, { useState } from "react";
import PropType from "prop-types";
import {
  View,
  Animated,
  Easing,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";

const TouchableIOSFeedback = ({
  size,
  color,
  maxOpacity,
  children,
  ...props
}) => {
  const [state, setState] = useState({
    maxOpacity,
    scaleValue: new Animated.Value(0.01),
    opacityValue: new Animated.Value(maxOpacity),
  });

  const rippleSize = size * 10;

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
    });
  };

  const renderRippleView = () => {
    const { scaleValue, opacityValue } = state;

    const rippleSize = size * 2 + 20;

    return (
      <Animated.View
        style={{
          position: "absolute",
          top: -5,
          left: -10,
          width: rippleSize,
          height: rippleSize,
          borderRadius: rippleSize / 2,
          transform: [{ scale: scaleValue }],
          opacity: opacityValue,
          backgroundColor: color || "black",
        }}
      />
    );
  };

  const containerSize = size * 2;

  return (
    <TouchableWithoutFeedback
      onPressIn={onPressedIn}
      onPressOut={onPressedOut}
      {...props}
    >
      <View style={{ width: containerSize, height: containerSize }}>
        {renderRippleView()}
        {children}
      </View>
    </TouchableWithoutFeedback>
  );
};

TouchableIOSFeedback.prototype = {
  size: PropType.string.isRequired,
  color: PropType.string,
  maxOpacity: PropType.number.isRequired,
  children: PropType.object.isRequired,
};

export default TouchableIOSFeedback;
