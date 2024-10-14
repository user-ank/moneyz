import { Button, Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { getAmount } from '@/utils';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Fontisto from '@expo/vector-icons/Fontisto';
import TransactionModal from './TransactionModal';

const Transaction = ({ transaction, index, size}: { transaction: Transaction, index:number, size:number }) => {
    const [isTransactionModalVisible, setIsTransactionModalVisible] = useState(false);
    
    return (
        <>
            <TouchableOpacity className='flex-row items-center py-1 my-1' onPress={()=>setIsTransactionModalVisible(true)}>
                {
                    transaction.type != "Transfer" ? 
                    <View className='border rounded-full mr-1.5 p-px'>
                        <Feather name='user' size={30} />
                    </View>
                    :
                    <View className='border rounded-full mr-1.5 p-1.5'>
                        <Fontisto name="arrow-swap" size={22} color="black" />
                    </View>
                }
                <View className='flex-1 flex-row justify-between items-center'>
                    <View className='flex justify-between'>
                        <Text className='font-medium color-[#004c3f] text-[15px] tracking-wide mb-px'>{transaction.title}</Text>
                        <Text className='color-[#6e917c] tracking-wide'>{transaction.category}</Text>
                    </View>
                    <TypeSpecificAmmount type={transaction.type} transaction={transaction}/>
                </View>
            </TouchableOpacity>
            <View className={'h-px bg-slate-600/40 self-end ' + (index+1 != size ? 'w-[300px]' : '')} />
            <TransactionModal transaction={transaction} isModalOpen={isTransactionModalVisible} setIsModalOpen={setIsTransactionModalVisible}/>
        </>
    )
}

const TypeSpecificAmmount = ({type, transaction} : {type:"Expense" | "Income" | "Transfer", transaction: Transaction}) => {
    const textStyleRed = 'text-red-600 font-medium tracking-wide mb-px';
    const textStyleGreen = textStyleRed + ' text-green-700';
    const textStyleBlue = textStyleRed + ' text-blue-800'
    const textContainerStyle = 'flex items-end';
    // console.log(Dimensions.get('window').width - 20);
    if (type == 'Expense') {
        return (
            <View className={textContainerStyle}>
                <Text className={textStyleRed}>{getAmount(transaction.amount* -1)}</Text>
                <Text><Text className='text-xs'>From</Text> {transaction.fromAccount}</Text>
            </View>
        )
    }
    else if(type == 'Income') {
        return (
            <View className={textContainerStyle}>
                <Text className={textStyleGreen}>{getAmount(transaction.amount)}</Text>
                <Text><Text className='text-xs'>In</Text> {transaction.toAccount}</Text>
            </View>
        )
    }
    else{
        return(
            <View className={textContainerStyle}>
                <Text className={textStyleBlue}>{getAmount(transaction.amount)}</Text>
                <View className='flex-row justify-evenly items-center'>
                    <Text><Text className='text-xs'>From</Text> {transaction.fromAccount}</Text>
                    <FontAwesome style={{marginHorizontal: 4}} name="long-arrow-right" size={15} color="black" />
                    <Text><Text className='text-xs'>To</Text> {transaction.toAccount}</Text>
                </View>
            </View>
        )
    }
}

export default Transaction

const styles = StyleSheet.create({})