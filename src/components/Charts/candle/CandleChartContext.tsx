import { createContext, useContext } from 'react';
import { Dimensions } from 'react-native';
import Animated, { useSharedValue } from 'react-native-reanimated';
import { Candle } from './Candle';

const { width } = Dimensions.get('screen');

type CandleChartContextType = {
  translateX: Animated.SharedValue<number>;
  translateY: Animated.SharedValue<number>;
  opacity: Animated.SharedValue<number>;
  candles: Candle[];
  size: { width: number; height: number };
  step: number;
  scaleY: (value: number) => number;
  scaleYInvert: (value: number) => number;
  scaleBody: (value: number) => number;
  getDomain: (rows: Candle[]) => [number, number];
  domainReversed: number[];
};

const candleChartContext = createContext<CandleChartContextType>(null);
export default candleChartContext;

export const useCandleChartContext = () => useContext(candleChartContext);

export function useGenerateValues() {
  const translateX = useSharedValue(width);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0);

  return {
    translateX,
    translateY,
    opacity,
  };
}
