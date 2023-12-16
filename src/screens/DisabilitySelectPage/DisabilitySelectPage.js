import React, {useState, useEffect} from 'react';
import { StyleSheet, Platform, Text, View, SafeAreaView, TextInput, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements'

import GlobalStyleSheet from '../../components/GlobalStyleSheet';
import NavBar from "../../components/NavBar";


export default function DisabilitySelectScreen({navigation,route}){

  const [disabilities, setDisabilities] = useState(["Physical", "Auditory", "Visual", "Cognitive"])

  const ItemView = ({ item }) => {
    return (
      // Flat List Item
      <Text style={styles.itemStyle} onPress={() => {
        navigation.navigate('CurrentLocation',{
          disability: item
        })
      }}>
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
    <SafeAreaView style={[GlobalStyleSheet.androidSafeAreaView, styles.viewpadding]}>
      <Text style={styles.title}>Please choose a disability</Text>
      <FlatList
        data={disabilities}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={ItemView}
      />
      <NavBar navigation={navigation} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  itemStyle: {
    padding: 10,
    fontSize: 20,
    backgroundColor:"#e6e6e6",
    borderRadius:15,
    borderWidth:2,
    marginBottom:5
  },
  title:{
    fontSize:30,
    marginBottom: 20
  },
  viewpadding:{
    paddingLeft:5,
    paddingRight:5
  }
})