import React from 'react';
import { Pressable, StyleSheet, TextStyle, View } from 'react-native';

import Animated, {
  withTiming,
  useAnimatedStyle,
  useDerivedValue,
  interpolateColor,
} from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Layout from '../constants/layout';

const { bottomTab: bottomLayout, animationConfig } = Layout;
const AnimatedIonicons = Animated.createAnimatedComponent(Ionicons);

interface BottomMenuItemProps {
  itemWidth: number;
  onPress: () => void;
  color: string;
  title: string;
  iconName: string;
  focused: boolean;
}

interface IUseStyles {
  focused: boolean;
  color: string;
}

function useStyles({ focused, color }: IUseStyles) {
  const progress = useDerivedValue(() =>
    focused ? withTiming(1, animationConfig) : withTiming(0, animationConfig)
  );

  const iconMoving = useDerivedValue(() =>
    focused
      ? withTiming(-bottomLayout.iconContainer * 0.5, animationConfig)
      : withTiming(0, animationConfig)
  );
  const iconContainerStyles = [
    useAnimatedStyle(() => ({
      transform: [
        {
          translateY: iconMoving.value,
        },
      ],
    })),
  ];
  const iconStyles = [
    useAnimatedStyle(() => ({
      color: interpolateColor(progress.value, [0, 1], ['black', 'white']),
    })),
  ];

  const textMoving = useDerivedValue(() =>
    focused
      ? withTiming(0, animationConfig)
      : withTiming(bottomLayout.textContainer * 0.2, animationConfig)
  );
  const textStyles: TextStyle[] = [
    styles.itemText,
    { color: color },
    useAnimatedStyle(() => ({
      transform: [
        {
          translateY: textMoving.value,
        },
      ],
      opacity: focused ? withTiming(1, animationConfig) : 0,
    })),
  ];

  return {
    textStyles,
    textMoving,
    iconContainerStyles,
    iconMoving,
    iconStyles,
  };
}

export function BottomMenuItem({
  itemWidth,
  onPress,
  color,
  title,
  focused,
  iconName,
}: BottomMenuItemProps) {
  const { textStyles, iconContainerStyles, iconStyles } = useStyles({
    focused,
    color,
  });

  return (
    <Pressable onPress={onPress}>
      <View style={[styles.item, { width: itemWidth }]}>
        <View style={styles.iconContainter}>
          <Animated.View style={iconContainerStyles}>
            <AnimatedIonicons
              name={iconName}
              size={bottomLayout.iconSize}
              style={iconStyles}
            />
          </Animated.View>
        </View>
        <View style={styles.textContainer}>
          <Animated.Text style={textStyles}>{title}</Animated.Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  itemText: {
    fontSize: 11,
    textAlign: 'center',
  },
  item: {
    alignItems: 'center',
  },
  iconContainter: {
    height: bottomLayout.iconContainer,
    width: bottomLayout.iconContainer,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    height: bottomLayout.textContainer,
    justifyContent: 'center',
  },
});
