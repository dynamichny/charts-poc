import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Dimensions,
} from 'react-native';
//@ts-ignore
import data from './assets/data.json';
import Button from './components/Button';
import Charts from './components/Charts/Charts';
import { Candle } from './components/Charts/candle/Candle';

const { width } = Dimensions.get('window');
const PERIODS = ['1h', '1w', '1m', '3m', '1y', 'all'];

const App = () => {
  const [period, setPeriod] = useState('1m');
  const [isCandleActive, toggleCandleActive] = useState<boolean>(false);

  return (
    <SafeAreaView style={styles.screen}>
      <Charts
        data={data[period] as Candle[]}
        size={{ width, height: 300 }}
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
          isActive={false}
          label={isCandleActive ? 'line' : 'candle'}
        />
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
