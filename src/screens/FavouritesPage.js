// ProfilePage.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  FlatList
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
  
  // if (!user) {
  //   return (
  //     <SafeAreaView style={[GlobalStyleSheet.androidSafeAreaView]}>
  //       <NotLoggedIn navigation={navigation} />
  //       <NavBar navigation={navigation} />
  //     </SafeAreaView>
  //   );
  // }

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
          height: 7,
          width: '100%',
          backgroundColor: COLOURS.light_grey,
        }}
      />
    );
  };

  return (
    <SafeAreaView style={[GlobalStyleSheet.androidSafeAreaView]}>
      <View>
        <View style={styles.favouritesHeader}>
          <Text style={styles.favouritesHeaderText}>These are your favourites, kpanik</Text>
          <TouchableOpacity
            style={styles.favouritesHeaderAddButton}
          >
            <Plus width={25} height={25} color={"black"}/>
          </TouchableOpacity>
        </View>
        <FlatList
          data={amenityData}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
          style={{padding:10}}
        />
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
  }
});

export default FavouritesPage;
