import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MyButton from '@/components/MyButton'
import { router } from 'expo-router'

const Home = () => {
  return (
    <View className='h-full' style={styles.card}>
      <View className='p-5'>
        <MyButton title="Personal Expense" onPress={() => router.push("/personalExpense/expense")} styles={styles}/>
        <MyButton title="Ledger" onPress={() => router.push("/lendingScreens/ledger")} styles={styles}/>
        <MyButton title="Goals"onPress={() => router.push("/goalScreens/goals")} styles={styles}/>
      </View>
    </View>
  )
  
}
export default Home

const styles = StyleSheet.create({
    button: {
      margin: 10,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: '#004c3f',
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'normal',
      letterSpacing: 0.25,
      color: 'white',
    }, 
    card : {
      display:'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center', 
      backgroundColor: '#fffde8'
    }
})