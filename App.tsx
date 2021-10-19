import React, {useState} from 'react';
import {StyleSheet, View, SafeAreaView, Dimensions, Image} from 'react-native';
import Button from './Button';
//@ts-ignore
import data from './data.json';

import Charts from './Charts/Charts';
import {Candle} from './Charts/candle/Candle';

const {width: SIZE} = Dimensions.get('window');
const PERIODS = ['1h', '1w', '1m', '3m', '1y', 'all'];

const App = () => {
  const [period, setPeriod] = useState('1m');
  const [isCandleActive, toggleCandleActive] = useState(false);

  return (
    <SafeAreaView style={styles.screen}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          padding: 16,
          alignItems: 'center',
        }}></View>
      <Charts
        data={data[period] as Candle[]}
        size={{width: SIZE, height: SIZE / 2}}
        isCandleActive={isCandleActive}
      />
      <View style={styles.buttons}>
        {PERIODS.map(p => (
          <Button
            key={p}
            onPress={() => setPeriod(p)}
            isActive={period == p}
            label={p.toUpperCase()}
          />
        ))}
        <Button
          onPress={() => toggleCandleActive(!isCandleActive)}
          isActive={false}>
          <Image
            source={{
              uri: isCandleActive ? 'line-chart-icon' : 'candle-chart-icon',
            }}
            style={{height: 18, width: 18}}
          />
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    width: '100%',
  },
});

export default App;
