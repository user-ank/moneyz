import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'

const CustomDrawerLayout = (props: any) => {
  return (
    <View style={{flex: 1}}>
        <DrawerContentScrollView {...props} contentContainerStyle= {{flex:1, backgroundColor : '#fffde8'}}>
            <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
                <Text>
                    MoneyMadness
                </Text>
                <Text>
                    v.1.0
                </Text>
            </View>
                <View style={{width:'100%', height:1, opacity: 0.5,backgroundColor: '#004c3f', marginBottom: 10}}/>
            <DrawerItemList {...props} />

        </DrawerContentScrollView>
    </View>
  )
}

export default CustomDrawerLayout

const styles = StyleSheet.create({})