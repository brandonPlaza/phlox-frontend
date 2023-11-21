import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";

import { ArrowRight, Home, Star, User } from "react-native-feather";

// Imports the stylesheet that applies global styles for things that should remain consistent like the SafeAreaView fix
import { COLOURS } from "../components/colours";

export default function NavBar({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("FavouritesPage");
        }}
      >
        <Star stroke={COLOURS.black} width={32} height={32} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        <Home stroke={COLOURS.black} width={32} height={32} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("ProfilePage");
        }}
      >
        <User stroke={COLOURS.black} width={32} height={32} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 50,
    paddingBottom: 35,
    paddingTop: 10,
  },
});
