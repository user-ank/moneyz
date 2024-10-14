import { Button, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { getAmount, getDateTime } from '@/utils';

const TransactionModal = ({transaction, isModalOpen, setIsModalOpen} : {transaction: Transaction, isModalOpen: boolean, setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>}) => {
    const modalColor = transaction.type == 'Expense' ? 'bg-red-700 ' : transaction.type == 'Income' ? 'bg-green-700' : 'bg-blue-700'
    
    return (
        <Modal visible={isModalOpen} animationType='fade' className='z-10' transparent>
            <Pressable className='flex-1 justify-center items-center bg-gray-950/50' onPress={()=>setIsModalOpen(false)}>
                <Pressable onPress={()=>{}} className='rounded-lg h-2/4 w-11/12 bg-[#fffde8] overflow-hidden'>
                    <View className={`h-3/6 ${modalColor}`} id='amount'>
                        <View id='topPanel' className='px-3 pt-4  flex-row items-center justify-between'>
                            <Feather name='x' color={'white'} size={28} onPress={() => setIsModalOpen(false)}/>
                            <View className='flex-row w-20 pl-1 pr-1.5 justify-between'>
                                <MaterialIcons name='delete' size={23} color={'white'}/>
                                <Feather name='edit' size={23} color={'white'}/>
                            </View>
                        </View>
                        <View className='flex-1 justify-center items-center'>
                            <Text className='color-white tracking-widest text-base'>{transaction.type.toUpperCase()}</Text>
                            <Text className='color-slate-50 text-3xl p-2'>{getAmount(transaction.amount)}</Text>
                        </View>
                        <View id='dateTime' className='self-end p-2 pr-5'><Text className='color-white'>{getDateTime(transaction.dateTime)}</Text></View>
                    </View>
                    <View className='flex-1 justify-start items-center'>
                        <Text className='color-[#004c3f] font-medium text-lg p-4'>{transaction.title}</Text>
                        <TypeSpecific transaction={transaction}/>
                    </View>
                </Pressable>
            </Pressable>
        </Modal>
    );
}

const TypeSpecific = ({transaction} : {transaction:Transaction}) => {
    const containerStyle = 'p-2';
    const textStyle = 'text-base color-[#004c3f]';
    return(
        transaction.type == 'Expense' ? 
        <View className={containerStyle}>
            <Text className={textStyle}>From Account : {transaction.fromAccount}</Text>
            <Text className={textStyle}>Category : {transaction.category}</Text>
        </View>
        :
        transaction.type == 'Income' ? 
        <View className={containerStyle}>
            <Text className={textStyle}>To Account : {transaction.toAccount}</Text>
            <Text className={textStyle}>Category : {transaction.category}</Text>
        </View>
        :
        <View className={containerStyle}>
            <Text className={textStyle}>From Account : {transaction.fromAccount}</Text>
            <Text className={textStyle}>To Account : {transaction.toAccount}</Text>
        </View>
    );
}

export default TransactionModal

const styles = StyleSheet.create({})