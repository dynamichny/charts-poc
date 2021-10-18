import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {ReText} from 'react-native-redash';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column-reverse',
    justifyContent: 'space-between',
    marginVertical: 3,
    flex: 1,
  },
  label: {
    fontSize: 13,
    color: 'gray',
    fontWeight: '600',
    margin: 0,
    padding: 0,
  },
  value: {
    fontSize: 16,
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
    margin: 0,
    padding: 0,
  },
});

interface RowProps {
  label: string;
  value: Animated.SharedValue<string>;
}

const Row = ({label, value}: RowProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <ReText text={value} style={[styles.value]} />
    </View>
  );
};

export default Row;
