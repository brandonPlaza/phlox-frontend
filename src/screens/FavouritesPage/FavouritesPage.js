import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Button,
} from "react-native";
import NavBar from "../../components/NavBar";

import { ArrowRight } from "react-native-feather";

// Imports the stylesheet that applies global styles for things that should remain consistent like the SafeAreaView fix
import GlobalStyleSheet from "../../components/GlobalStyleSheet";
import { COLOURS } from "../../components/colours";

export default function FavouritesPage({ navigation }) {
  return (
    <SafeAreaView style={[GlobalStyleSheet.androidSafeAreaView]}>
      <Text>Favourites Page</Text>
      <NavBar navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
