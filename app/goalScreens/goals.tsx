import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Goals()  {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <Text>
          Your goals would be shown here
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  safeContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fffde8',
    // margin: 10
  }
});