import React from 'react';
import { StyleSheet, Platform, Text, View, SafeAreaView, TextInput } from 'react-native';

// Imports the stylesheet that applies global styles for things that should remain consistent like the SafeAreaView fix
import GlobalStyleSheet from '../../components/GlobalStyleSheet';
import { COLOURS } from '../../components/colours';

export default function CurrentLocationScreen({navigation}){
  const [currLocationSearch, onChangeText] = React.useState('');
  return(
    <SafeAreaView style={[GlobalStyleSheet.androidSafeAreaView]}>
      <TextInput
        style={styles.textInput}
        cursorColor={COLOURS.redpink}
        onChangeText={onChangeText}
        value={currLocationSearch}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  textInput:{
    backgroundColor: COLOURS.grey,

    paddingStart: 5,
    paddingTop: 5,
    paddingEnd: 5,
    paddingBottom:5,
    
    marginStart:10,
    marginEnd:10,

    fontSize:25
  },
})