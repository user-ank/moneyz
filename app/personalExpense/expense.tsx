import { StyleSheet, View, SafeAreaView, Text, Pressable } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { FlipInEasyX } from 'react-native-reanimated';

export default function Expense() {
  return (
    <SafeAreaView className='flex-1'>
      <View style={styles.container}>
        <View style={{width: '100%'}} className='w-full flex-row justify-center items-center'>
          <MaterialIcons name='chevron-left' size={25} color={'#004c3f'}/>
          <Text style={styles.subHeaderMonthTxt}>
            Oct 2024
          </Text>
          <MaterialIcons name='chevron-right' size={25} color={'#004c3f'}/>
          <MaterialIcons/>
        </View>
        <Text>
          Personal Expenses would be shown here
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffde8',
  },
  subHeaderMonthTxt: {
    textAlign: 'center',
    fontSize:22,
    color: '#004c3f',
    marginHorizontal: 15
  },
  subHeaderBalance:{

  }
});
