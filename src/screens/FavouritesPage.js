// ProfilePage.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Alert,
  ActivityIndicator,
} from "react-native";

import { useUser } from "../utils/UserContext";
import { Plus } from "react-native-feather";


import GlobalStyleSheet from "../components/GlobalStyleSheet";
import NavBar from "../components/NavBar";
import NotLoggedIn from "../components/NotLoggedIn";
import { COLOURS } from "../components/colours";

const FavouritesPage = ({ navigation }) => {
  //const { user, setUser } = useUser("kpanik");
  const [ amenityData, setAmenityData ] = useState();
  const [isLoading, setIsLoading] = useState(true);
  
  // if (!user) {
  //   return (
  //     <SafeAreaView style={[GlobalStyleSheet.androidSafeAreaView]}>
  //       <NotLoggedIn navigation={navigation} />
  //       <NavBar navigation={navigation} />
  //     </SafeAreaView>
  //   );
  // }

  const RemoveAmenity = (name) => {
    fetch(`https://phloxapi.azurewebsites.net/api/Accounts/RemoveFavouriteAmenity?amenity=${name}&username=kpanik`,
      {
        method:"POST"
      }
    )
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.error(error);
    });
  }

  const RemoveAmenityAlert = (amenity) => Alert.alert('Delete Favourite Amenity?', `Are you sure you want to delete ${amenity.name} from your favourites?`, [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {text: 'Yes', onPress: () => RemoveAmenity(amenity.name)},
  ]);
  

  const ItemView = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={()=>{RemoveAmenityAlert(item)}}
      >
        <Text style={styles.itemStyle}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const ItemSeparatorView = () => {
    return (
      <View
        style={{
          height: 7,
          width: '100%',
          backgroundColor: COLOURS.light_grey,
        }}
      />
    );
  };

  useEffect(() => {
    fetch('https://phloxapi.azurewebsites.net/api/Accounts/GetFavouriteAmenities?username=kpanik')
      .then((response) => response.json())
      .then((responseJson) => {
        var data = []
        responseJson.forEach(element => {
          data.push(element)
        });
        setAmenityData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  const FavouritesList = () =>{
    return(
      <FlatList
        data={amenityData}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={ItemView}
        style={{padding:10}}
      />
    )
  }
  const LoadingScreen = () =>{
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading Nodes...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={[GlobalStyleSheet.androidSafeAreaView]}>
      <View>
        <View style={styles.favouritesHeader}>
          <Text style={styles.favouritesHeaderText}>These are your favourites, kpanik</Text>
          <TouchableOpacity
            style={styles.favouritesHeaderAddButton}
            onPress={()=>{navigation.navigate("AddFavouriteScreen")}}
          >
            <Plus width={25} height={25} color={"black"}/>
          </TouchableOpacity>
        </View>
        {!isLoading ? FavouritesList() : LoadingScreen()}
      </View>
      <NavBar navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  favouritesHeader:{
    display:"flex",
    justifyContent:"space-between",
    flexDirection:"row",

    paddingStart:5,
    paddingEnd:15,
    paddingBottom:10,
    marginBottom:5,
    borderBottomWidth:2
  },
  favouritesHeaderText:{
    fontSize:18,
  },
  favouritesHeaderAddButton:{
    paddingStart:7,
    paddingEnd:7,
    borderRadius:15,

    borderWidth:2.5,
    backgroundColor:COLOURS.light_grey
  },
  itemStyle:{
    paddingStart:10,
    paddingEnd:10,
    paddingTop:5,
    paddingBottom:5,

    borderRadius:5,
    borderWidth:2,
    borderColor:COLOURS.black,
    fontSize:20
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FavouritesPage;
