// React & Pkg Component imports
import React, {useState, useEffect} from 'react';
import { StyleSheet, Platform, Text, View, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';

// Global Component & Style imports
import GlobalStyleSheet from '../../components/GlobalStyleSheet';
import { COLOURS } from '../../components/colours';

export default function RoutingScreen() {
  return (
    <SafeAreaView style={GlobalStyleSheet.androidSafeAreaView}>
      <Text>Hello World!</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

});
