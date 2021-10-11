import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {violet, grey} from './Constants';

export default function Button({label, onPress, isActive}) {
  return (
    <View style={[styles.button, isActive ? styles.buttonActive : {}]}>
      <TouchableOpacity
        onPress={onPress}
        style={styles.touchable}
        activeOpacity={0.8}>
        <Text style={[styles.text, isActive ? styles.textActive : {}]}>
          {label.toUpperCase()}
        </Text>
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
  touchable: {paddingHorizontal: 12, paddingVertical: 8},
  text: {color: '#000', fontSize: 16, fontWeight: '700'},
  textActive: {color: '#fff'},
});
