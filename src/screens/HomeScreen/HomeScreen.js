import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import GlobalStyleSheet from '../../components/GlobalStyleSheet';

export default function HomeScreen() {
  return (
    <SafeAreaView style={GlobalStyleSheet.androidSafeAreaView}>
        <Text>Hello World!</Text>
    </SafeAreaView>
  );
}
