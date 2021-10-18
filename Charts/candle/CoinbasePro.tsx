import React from 'react';
import {StyleSheet, View} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {clamp} from 'react-native-redash';

import Chart from './Chart';
import Values from './Values';
import Line from './Line';
import Label from './Label';
import {Candle} from './Candle';
import CandleChartProvider from './CandleChartProvider';
import {useCandleChartContext} from './CandleChartContext';

const Coinbase = () => {
  const {translateX, translateY, opacity, size, step} = useCandleChartContext();

  const onGestureEvent = useAnimatedGestureHandler({
    onActive: ({x, y}) => {
      opacity.value = 1;
      translateY.value = clamp(y, 0, size.height);
      translateX.value = x - (x % step) + step / 2;
    },
    onEnd: () => {
      opacity.value = 0;
    },
  });
  const horizontal = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{translateY: translateY.value}],
  }));
  const vertical = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{translateX: translateX.value}],
  }));
  return (
    <View>
      <View>
        <Chart />
        <PanGestureHandler minDist={0} {...{onGestureEvent}}>
          <Animated.View style={StyleSheet.absoluteFill}>
            <Animated.View style={[StyleSheet.absoluteFill, horizontal]}>
              <Line x={size.width} y={0} />
            </Animated.View>
            <Animated.View style={[StyleSheet.absoluteFill, vertical]}>
              <Line x={0} y={size.width} />
            </Animated.View>
            <Label {...{translateY, opacity}} />
          </Animated.View>
        </PanGestureHandler>
      </View>
      <View>
        <View pointerEvents="none">
          <Values />
        </View>
      </View>
    </View>
  );
};

const CoinbaseWithProvider = ({
  data,
  size,
  active,
}: {
  data: Candle[];
  size: {height: number; width: number};
  active: boolean;
}) => {
  return (
    <CandleChartProvider data={data} size={size}>
      {active && <Coinbase />}
    </CandleChartProvider>
  );
};

export default CoinbaseWithProvider;
