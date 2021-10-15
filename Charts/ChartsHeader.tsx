import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useChartsDataContext} from './Charts';
import {ReText} from 'react-native-redash';
import {formatDatetime, formatCurrency} from './candle/ChartHelpers';
import {useAnimatedStyle, useDerivedValue} from 'react-native-reanimated';
import {green, red} from '../Constants';

const ChartsHeader = () => {
  const {value, date, data} = useChartsDataContext();
  const formattedValue = useDerivedValue(
    () => `${formatCurrency(value.value)}`,
  );
  const formattedDate = useDerivedValue(() => `${formatDatetime(date.value)}`);

  const diff = useDerivedValue(
    () => Number(Number(value.value - data[0].close).toFixed(2)),
    [value, data],
  );
  const diffSign = useDerivedValue(() => {
    return diff.value >= 0 ? '+' : '';
  });

  const diffDisplayed = useDerivedValue(
    () => `${diffSign.value}${formatCurrency(diff.value)}`,
    [value],
  );
  const change = useDerivedValue(
    () =>
      `${diffSign.value}${Number((diff.value / data[0].close) * 100).toFixed(
        2,
      )}%`,
    [value, data],
  );

  const valueStyle = useAnimatedStyle(() => ({
    color: value.value >= data[0].close ? green[50] : red[50],
  }));
  const diffStyle = useAnimatedStyle(() => ({
    color: value.value >= data[0].close ? green[50] : red[50],
  }));
  const changeStyle = useAnimatedStyle(() => ({
    color: value.value >= data[0].close ? green[50] : red[50],
  }));

  return (
    <View style={styles.row}>
      <View style={{flex: 1.5}}>
        <ReText text={formattedValue} style={[styles.value, valueStyle]} key={'value'} />
        <ReText text={formattedDate} style={[styles.date]} key={'date'} />
      </View>
      <View style={{flex: 1}}>
        <ReText text={change} style={[styles.diff, changeStyle]} key={'change'} />
        <ReText text={diffDisplayed} style={[styles.diff, diffStyle]} key={'diff'} />
      </View>
    </View>
  );
};

export default ChartsHeader;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    paddingRight: 16,
  },
  value: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
  },
  date: {
    fontSize: 12,
    fontWeight: '700',
    color: '#909090',
  },
  diff: {
    fontSize: 20,
    fontWeight: '500',
  },
});
