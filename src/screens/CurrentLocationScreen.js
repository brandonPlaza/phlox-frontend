import React, {useState, useEffect} from 'react';
import { StyleSheet, Platform, Text, View, SafeAreaView, TextInput, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements'

// Imports the stylesheet that applies global styles for things that should remain consistent like the SafeAreaView fix
import GlobalStyleSheet from '../components/GlobalStyleSheet';
import NavBar from "../components/NavBar";
import { COLOURS } from '../components/colours';
import { color } from 'react-native-elements/dist/helpers';

export default function CurrentLocationScreen({navigation, route}){
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  const { disability } = route.params;

  useEffect(() => {
    fetch('https://phloxapi.azurewebsites.net/api/Routing/GetNodes')
      .then((response) => response.json())
      .then((responseJson) => {
        var data = []
        responseJson.forEach(element => {
          data.push(element)
        });
        setFilteredDataSource(data);
        setMasterDataSource(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  
  const searchFilterFunction = (text) => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item
          ? item.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({ item }) => {
    return (
      // Flat List Item
      <Text style={styles.itemStyle} onPress={() => chooseLocation(item)}>
        {item}
      </Text>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const chooseLocation = (item) => {
    // Function for click on an item
    //alert('Id : ' + item.id + ' Title : ' + item.title);
    navigation.navigate('DestinationLocation',{
      disability: disability,
      source: item
    })
  };

  return(
    <SafeAreaView style={[GlobalStyleSheet.androidSafeAreaView]}>
      <SearchBar
        round
        searchIcon={{ size: 24 }}
        
        onChangeText={(text) => searchFilterFunction(text)}
        onClear={(text) => searchFilterFunction('')}

        placeholder="Where are you?..."
        value={search}

        containerStyle={styles.searchBoxContainer}
        inputContainerStyle={styles.searchBoxInputContainer}
        inputStyle={styles.searchBoxInput}
      />
      <FlatList
        data={filteredDataSource}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={ItemView}
      />
      <NavBar navigation={navigation} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  searchBoxContainer:{
    backgroundColor: COLOURS.light_grey,
    borderColor:COLOURS.light_grey
  },
  searchBoxInputContainer:{
    backgroundColor: COLOURS.grey,
  },
  searchBoxInput:{
    color:COLOURS.black,
  },
  itemStyle: {
    padding: 10,
    fontSize: 20
  },
})