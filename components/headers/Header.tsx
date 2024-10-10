import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'

const Header = ({title} : {title : string}) => {
  return (
    <View style={styles.header}>
            <Text style={styles.headerText}>{title}</Text>
    </View>
  )
}


export default Header

const styles = StyleSheet.create({
    header:{
        // width: Dimensions.get('window').width,
        // height: Dimensions.get('window').height,
        // height: '20%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#fffde8',
        color: '#004c3f'
    },
    headerText: {
        fontWeight: '500',
        margin: 0,
        fontSize: 20,
        color: '#004c3f'
    }
})