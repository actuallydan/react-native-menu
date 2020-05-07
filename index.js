import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Platform,
  TouchableOpacity,
} from "react-native";
import PropTypes from "prop-types";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const isIOS = Platform.OS === "ios";
const VERSION = parseInt(Platform.Version, 10);

function MenuDrawer({
  open,
  drawerContent,
  drawerPercentage,
  animationTime,
  overlay,
  opacity,
  children,
  containerViewStyles = {},
}) {
  let leftOffset = useRef(new Animated.Value(0));
  const [expanded, setExpanded] = useState(false);
  const [fadeAnim, setFadeAnim] = useState(new Animated.Value(1));

  const openDrawer = useCallback(() => {
    const DRAWER_WIDTH = SCREEN_WIDTH * (drawerPercentage / 100);

    Animated.parallel([
      Animated.timing(leftOffset.current, {
        toValue: DRAWER_WIDTH,
        duration: animationTime,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: opacity,
        duration: animationTime,
        useNativeDriver: true,
      }),
    ]).start();
  }, [leftOffset, animationTime, fadeAnim, opacity, drawerPercentage]);

  const closeDrawer = useCallback(() => {
    Animated.parallel([
      Animated.timing(leftOffset.current, {
        toValue: 0,
        duration: animationTime,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: animationTime,
        useNativeDriver: true,
      }),
    ]).start();
  }, [leftOffset, animationTime, fadeAnim]);

  const drawerFallback = () => {
    return (
      <TouchableOpacity onPress={closeDrawer}>
        <Text>Close</Text>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    open ? openDrawer() : closeDrawer();
  }, [open, openDrawer, closeDrawer]);

  const renderPush = () => {
    const animated = { transform: [{ translateX: leftOffset.current }] };
    const DRAWER_WIDTH = SCREEN_WIDTH * (drawerPercentage / 100);

    const AnimatedTouchable = Animated.createAnimatedComponent(
      TouchableOpacity
    );

    if (isIOS && VERSION >= 11) {
      return (
        <Animated.View style={[animated, styles.main, containerViewStyles]}>
          <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <View
              style={[
                styles.drawer,
                {
                  width: DRAWER_WIDTH,
                  left: -DRAWER_WIDTH,
                },
              ]}
            >
              {drawerContent ? drawerContent : drawerFallback()}
            </View>
            <AnimatedTouchable
              onPress={closeDrawer}
              style={[
                styles.container,
                {
                  opacity: fadeAnim,
                },
              ]}
            >
              {children}
            </AnimatedTouchable>
          </SafeAreaView>
        </Animated.View>
      );
    }

    return (
      <Animated.View
        style={[
          animated,
          styles.main,
          containerViewStyles,
          { width: SCREEN_WIDTH + DRAWER_WIDTH },
        ]}
      >
        <View
          style={[
            styles.drawer,
            {
              width: DRAWER_WIDTH,
              left: -DRAWER_WIDTH,
            },
          ]}
        >
          {drawerContent ? drawerContent : drawerFallback()}
        </View>
        <AnimatedTouchable
          onPress={closeDrawer}
          style={[
            styles.container,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          {children}
        </AnimatedTouchable>
      </Animated.View>
    );
  };

  const renderOverlay = () => {
    const animated = { transform: [{ translateX: leftOffset.current }] };
    const DRAWER_WIDTH = SCREEN_WIDTH * (drawerPercentage / 100);
    const AnimatedTouchable = Animated.createAnimatedComponent(
      TouchableOpacity
    );

    if (isIOS && VERSION >= 11) {
      return (
        <SafeAreaView style={[styles.main, containerViewStyles]}>
          <Animated.View
            style={[
              animated,
              styles.drawer,
              { width: DRAWER_WIDTH, left: -DRAWER_WIDTH },
            ]}
          >
            {drawerContent ? drawerContent : drawerFallback()}
          </Animated.View>
          <AnimatedTouchable
            onPress={closeDrawer}
            style={[styles.container, { opacity: fadeAnim }]}
          >
            {children}
          </AnimatedTouchable>
        </SafeAreaView>
      );
    }

    return (
      <View style={[styles.main, containerViewStyles]}>
        <Animated.View
          style={[
            animated,
            styles.drawer,
            {
              width: DRAWER_WIDTH,
              left: -DRAWER_WIDTH,
            },
          ]}
        >
          {drawerContent ? drawerContent : drawerFallback()}
        </Animated.View>
        <AnimatedTouchable
          onPress={closeDrawer}
          style={[
            styles.container,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          {children}
        </AnimatedTouchable>
      </View>
    );
  };

  return overlay ? renderOverlay() : renderPush();
}

MenuDrawer.defaultProps = {
  open: false,
  drawerPercentage: 45,
  animationTime: 200,
  overlay: true,
  opacity: 0.4,
};

MenuDrawer.propTypes = {
  open: PropTypes.bool,
  drawerPercentage: PropTypes.number,
  animationTime: PropTypes.number,
  overlay: PropTypes.bool,
  opacity: PropTypes.number,
};

const styles = StyleSheet.create({
  main: {
    position: "absolute",
    left: 0,
    top: 0,
  },
  container: {
    position: "absolute",
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    zIndex: 0,
  },
  drawer: {
    position: "absolute",
    height: SCREEN_HEIGHT,
    zIndex: 1,
  },
});

export default MenuDrawer;
