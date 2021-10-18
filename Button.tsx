import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {violet, grey} from './Constants';

interface Props {
  label?: string;
  onPress: any;
  isActive: boolean;
  children?: JSX.Element;
}

export default function Button({label, onPress, isActive, children}: Props) {
  return (
    <View style={[styles.button, isActive ? styles.buttonActive : {}]}>
      <TouchableOpacity
        onPress={onPress}
        style={styles.touchable}
        activeOpacity={0.8}>
        {children ? (
          <View style={{paddingVertical: 8}}>{children}</View>
        ) : (
          <Text style={[styles.text, isActive ? styles.textActive : {}]}>
            {label?.toUpperCase()}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    backgroundColor: grey[80],
  },
  buttonActive: {
    backgroundColor: violet[40],
  },
  touchable: {
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {color: '#000', fontSize: 14, fontWeight: '700', paddingVertical: 8},
  textActive: {color: '#fff'},
});
