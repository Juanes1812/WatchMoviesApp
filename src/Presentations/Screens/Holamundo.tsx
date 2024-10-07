import React from 'react'
import {View,Text, StyleSheet} from 'react-native'
interface props{
    name?:string;
}

export const Holamundo = ({name= 'mundo'}:props) =>{
    return(
    <View style={style.container}>
    <Text numberOfLines={1} style={style.title}>Hola {name}...</Text>
        </View>
    )
}

const style = StyleSheet.create({
    container:{
        backgroundColor: 'red',
    },
    title:{
        fontSize: 45,
        textAlign: 'center',
        color: 'black',
        padding: 20
    }
})