import React from 'react';
import { StyleSheet, Platform, Text, View, SafeAreaView, TextInput } from 'react-native';

// Imports the stylesheet that applies global styles for things that should remain consistent like the SafeAreaView fix
import GlobalStyleSheet from '../../components/GlobalStyleSheet';
import { COLOURS } from '../../components/colours';

export default function HomeScreen() {
    const [currLocationSearch, onChangeText] = React.useState('');

    return (
        <SafeAreaView style={GlobalStyleSheet.androidSafeAreaView}>
            <TextInput
                style={styles.textInput}
                cursorColor={COLOURS.redpink}
                onChangeText={onChangeText}
                value={currLocationSearch}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: "#E5E5E5",
        marginStart: 10,
        marginEnd: 10,

        padding: 5,

        borderRadius: 10
    }
});