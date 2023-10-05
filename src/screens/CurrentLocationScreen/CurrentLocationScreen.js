import React from 'react';
import { StyleSheet, Platform, Text, View, SafeAreaView, TextInput } from 'react-native';

// Imports the stylesheet that applies global styles for things that should remain consistent like the SafeAreaView fix
import GlobalStyleSheet from '../../components/GlobalStyleSheet';
import { COLOURS } from '../../components/colours';

export default function CurrentLocationScreen(){
  return(
    <SafeAreaView>
      <Text>Hello World!</Text>
    </SafeAreaView>
  )
}