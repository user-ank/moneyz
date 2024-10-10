import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

export default function MyButton(props : any) {
  const { onPress, title, styles} = props;
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}
