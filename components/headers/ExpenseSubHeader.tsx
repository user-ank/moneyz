import { StyleSheet, Text, View } from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { getAmount, getFullMonthName } from '@/utils';

const ExpenseSubHeader = ({ expense, income, month, year, changeMonth}:
  { expense: number, income: number, month: number, year: number, changeMonth: (change: number)=>void}) => {
  
  const expenseBarTextStyle = 'text-[#004c3f] tracking-wide font-medium text-[13px] mb-0.5';
  const expenseBarTextContainertype = 'flex items-center w-1/3';
  const textStyleRed = 'text-red-600 font-medium text-[13px] tracking-wide';
  const textStyleGreen = textStyleRed + ' text-green-700';

  let monthName = getFullMonthName(month - 1)
  let balance = income - expense;
  return (
    <View id='expenseSubHeader' className='bg-[#fffde8]'>
      <View id='subHeaderMonthContainer' className='w-full flex-row justify-center items-center mt-1.5 mb-3'>
        <MaterialIcons name='chevron-left' size={30} color={'#004c3f'} onPress={()=>changeMonth(-1)}/>
        <Text style={styles.subHeaderMonthTxt}>
          {`${monthName} ${year}`}
        </Text>
        <MaterialIcons name='chevron-right' size={30} color={'#004c3f'} onPress={()=>changeMonth(1)}/>
      </View>
      <View id='subHeaderBalance' className='flex-row items-center justify-around'>
        <View className={expenseBarTextContainertype}>
          <Text className={expenseBarTextStyle}>EXPENSE</Text>
          <Text className={textStyleRed} >{getAmount(expense)}</Text>
        </View>
        <View className={expenseBarTextContainertype}>
          <Text className={expenseBarTextStyle}>INCOME</Text>
          <Text className={textStyleGreen} >{getAmount(income)}</Text>
        </View>
        <View className={expenseBarTextContainertype}>
          <Text className={expenseBarTextStyle}>BALANCE</Text>
          <Text className={balance >= 0 ? textStyleGreen : textStyleRed} >{getAmount(balance)}</Text>
        </View>
      </View>
      <View style={{ width: '100%', height: 1, opacity: 0.5, backgroundColor: '#004c3f', marginTop: 12 }} />
    </View>

  )
}

export default ExpenseSubHeader

const styles = StyleSheet.create({
  subHeaderMonthTxt: {
    textAlign: 'center',
    fontSize: 18,
    color: '#004c3f',
    marginHorizontal: 22,
  },
  subHeaderExpenseText: {
    color: 'rgb(220 38 38)',
    fontSize: 16
  }
})