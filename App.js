import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Button from './Button';
import Chart from './Chart';
import data from './data.json';

const App = () => {
  const [period, setPeriod] = useState('1d');
  return (
    <View style={styles.screen}>
      <Chart data={data[period]} />
      <View style={styles.buttons}>
        <Button
          onPress={() => setPeriod('1d')}
          isActive={period == '1d'}
          label={'24H'}
        />
        <Button
          onPress={() => setPeriod('1h')}
          isActive={period == '1h'}
          label={'1W'}
        />
        <Button
          onPress={() => setPeriod('1m')}
          isActive={period == '1m'}
          label={'1M'}
        />
        <Button onPress={() => {}} isActive={false} label={'3M'} />
        <Button onPress={() => {}} isActive={false} label={'1Y'} />
        <Button onPress={() => {}} isActive={false} label={'ALL'} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 16,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default App;
