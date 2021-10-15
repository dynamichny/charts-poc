import React from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  useDerivedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {ReText} from 'react-native-redash';
import {violet} from '../../Constants';
import {useCandleChartContext} from './CandleChartContext';

import {formatCurrency} from './ChartHelpers';

const styles = StyleSheet.create({
  container: {
    width: 100,
    alignSelf: 'flex-end',
    backgroundColor: violet[50],
    borderRadius: 4,
    padding: 4,
    marginTop: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

interface LabelProps {
  translateY: Animated.SharedValue<number>;
  opacity: Animated.SharedValue<number>;
}

const Label = ({translateY, opacity}: LabelProps) => {
  const {scaleYInvert} = useCandleChartContext();
  const text = useDerivedValue(() => {
    const price = scaleYInvert(translateY.value);
    return formatCurrency(price);
  });

  const horizontal = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{translateY: translateY.value}],
  }));
  return (
    <Animated.View style={[styles.container, horizontal]}>
      <ReText {...{text}} style={{color: 'white'}} />
    </Animated.View>
  );
};

export default Label;
