import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Animated, {useDerivedValue} from 'react-native-reanimated';
import {ReText} from 'react-native-redash';

import Row from './Row';
import {formatDatetime, formatCurrency} from './ChartHelpers';
import {useCandleChartContext} from './CandleChartContext';
import {useChartsDataContext} from '../Charts';

const Values = () => {
  const {candles, step, translateX} = useCandleChartContext();
  const {selectedCandlestickData} = useChartsDataContext();
  const {value, date} = useChartsDataContext();
  const candle = useDerivedValue(() => {
    const c =
      candles[Math.floor(translateX.value / step)] ||
      candles[candles.length - 1];
    date.value = c.time * 1000;
    value.value = c.close;
    selectedCandlestickData.value = c;
    return c;
  });
  const open = useDerivedValue(() => {
    console.log(candle);
    return `${formatCurrency(selectedCandlestickData?.value?.open || 0)}`;
  });
  const close = useDerivedValue(
    () => `${formatCurrency(selectedCandlestickData?.value?.close || 0)}`,
  );
  const low = useDerivedValue(
    () => `${formatCurrency(selectedCandlestickData?.value?.low || 0)}`,
  );
  const high = useDerivedValue(
    () => `${formatCurrency(selectedCandlestickData?.value?.high || 0)}`,
  );
  // const diff = useDerivedValue(
  //   () =>
  //     `${
  //       ((selectedCandlestickData?.value?.close -
  //         selectedCandlestickData?.value?.open) *
  //         100) /
  //         candle?.value?.open || 0
  //     }`,
  // );
  // const change = useDerivedValue(
  //   () =>
  //     `${
  //       selectedCandlestickData?.value?.close -
  //         selectedCandlestickData?.value?.open <
  //       0
  //         ? diff.value.substring(0, 5)
  //         : diff.value.substring(0, 4) || 0
  //     }%`,
  // );

  return (
    <SafeAreaView>
      <View style={styles.table}>
        <View style={styles.column}>
          <Row label="Open" value={open} />
          <Row label="Close" value={close} />
        </View>
        <View style={styles.separator} />
        <View style={styles.column}>
          <Row label="High" value={high} />
          <Row label="Low" value={low} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Values;

const styles = StyleSheet.create({
  table: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  date: {
    color: 'gray',
    fontSize: 12,
    fontWeight: '700',
    paddingHorizontal: 16,
    margin: 0,
  },
  column: {
    flexDirection: 'row',
  },
  separator: {
    width: 16,
  },
});
