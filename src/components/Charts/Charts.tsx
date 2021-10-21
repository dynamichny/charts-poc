import React, { createContext, useContext, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useDerivedValue,
  runOnJS,
} from 'react-native-reanimated';
import { Candle } from './candle/Candle';
import LineChart from './LineChart';
import ChartsHeader from './ChartsHeader';
import CandleChart from './candle';

import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

interface ChartsDataContextData {
  data: Candle[];
  value: Animated.SharedValue<number>;
  date: Animated.SharedValue<number>;
  selectedCandlestickData: Animated.SharedValue<Candle>;
}

const ChartsDataContext = createContext<ChartsDataContextData>(null);
export const useChartsDataContext = () => useContext(ChartsDataContext);

interface Props {
  data: Candle[];
  size: { width: number; height: number };
  isCandleActive: boolean;
}

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: true,
};

function impact() {
  'worklet';
  (runOnJS
    ? runOnJS(ReactNativeHapticFeedback.trigger)
    : ReactNativeHapticFeedback.trigger)('clockTick', options);
}

const Charts = ({ data, size, isCandleActive }: Props) => {
  const value = useSharedValue(data[data.length - 1].close);
  const date = useSharedValue(data[data.length - 1].time * 1000);
  const selectedCandlestickData = useSharedValue(data[data.length - 1]);

  useDerivedValue(() => {
    console.log(value.value);
    impact();
  }, [value.value]);

  const contextValue = useMemo(
    () => ({
      data,
      value,
      date,
      selectedCandlestickData,
    }),
    [data, selectedCandlestickData, value, date]
  );

  return (
    <ChartsDataContext.Provider value={contextValue}>
      <View style={styles.headerWrapper}>
        <ChartsHeader />
      </View>
      <CandleChart data={data} size={size} active={isCandleActive} />
      <LineChart data={data} size={size} active={!isCandleActive} />
    </ChartsDataContext.Provider>
  );
};

export default Charts;

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
});
