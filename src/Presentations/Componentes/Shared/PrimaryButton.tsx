import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'

interface Props{
    label:string;
    onPress:()=>void;
    onLongPress?:()=>void;
}
export const PrimaryButton = ({label,onPress,onLongPress}) => {
  return (
    <Pressable
    style={({pressed})=>[style.button, pressed && style.buttonPressed]}
     onPress={() => onPress && onPress()}
    onLongPress={() => onLongPress && onLongPress()}>

        <Text style={{color:'white'}} selectable={false}> {label} </Text>

    </Pressable>
  )
}

const style = StyleSheet.create({
  button: {
      backgroundColor: '#1a1a1a',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 20,
      minWidth: 60,
      minHeight: 60,
      justifyContent: 'center',  
      alignItems: 'center',     
      fontWeight: 'bold', 
      marginBottom: 5,
      
  },
    

buttonPressed:{
backgroundColor:'#D29BFD'

}
})