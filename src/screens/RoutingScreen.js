// React & Pkg Component imports
import React, {useState, useEffect} from 'react';
import { StyleSheet, Platform, Text, View, SafeAreaView, TextInput, TouchableOpacity, FlatList} from 'react-native';

// Global Component & Style imports
import GlobalStyleSheet from '../components/GlobalStyleSheet';
import { COLOURS } from '../components/colours';
import NavBar from "../components/NavBar";


export default function RoutingScreen({navigation, route}) {
  const { disability, source, dest } = route.params;
  
  // Placeholder to test checking steps of the route
  const [routeData, setRouteData] = useState([]);
  const [counter, setCounter] = useState(1);

  
  useEffect(() => {
    fetch(`https://phloxapi.azurewebsites.net/api/Routing/GetRoute?source=${source}&dest=${dest}&disability=${disability}`, Headers={
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key":"f6c04a777c594f13ae4eac6bb3ec31c5"
    })
      .then((response) => response.json())
      .then((responseJson) => {
        var data = []
        responseJson.forEach(element => {
          data.push(`${element}`)
        });
        setRouteData(data)
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const checkRouteStep = (item) => {
    // var firstItem = data.find(x => x != undefined)
    // if(item.tite != routeData.first){
    //   return
    // }
    setRouteData(routeData.slice(1))
  }
  
  const routeListStep = ({item}) =>{
    return(
      <Text 
        style={styles.itemStyle}
        onPress={() => checkRouteStep(item)}
      >
        {item}
      </Text>
    )
  }
  
  const itemSeparatorView = () => {
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

  return (
    <SafeAreaView style={[GlobalStyleSheet.androidSafeAreaView, styles.viewpadding]}>
      <Text style={styles.title}>Heres your route!</Text>
      <FlatList
        data={routeData}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={itemSeparatorView}
        renderItem={routeListStep}
      />
      <NavBar navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  itemStyle: {
    padding: 10,
    fontSize: 20
  },
  title:{
    fontSize:30
  },
  viewpadding:{
    paddingLeft:5,
    paddingRight:5
  }
});
