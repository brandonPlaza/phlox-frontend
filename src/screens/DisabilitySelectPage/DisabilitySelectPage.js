import React, {useState, useEffect} from 'react';
import { StyleSheet, Platform, Text, View, SafeAreaView, TextInput, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements'

import GlobalStyleSheet from '../../components/GlobalStyleSheet';


export default function DisabilitySelectScreen({navigation}){

  const [disabilities, setDisabilities] = useState(["Physical", "Auditory", "Visual", "Cognitive"])

  const ItemView = ({ item }) => {
    return (
      // Flat List Item
      <Text style={styles.itemStyle} onPress={() => {}}>
        {item}
      </Text>
    );
  };

  const ItemSeparatorView = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  return(
    <SafeAreaView style={GlobalStyleSheet.androidSafeAreaView}>
      <Text>Hello World!</Text>
      <FlatList
        data={disabilities}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={ItemView}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  itemStyle: {
    padding: 10,
  },
})