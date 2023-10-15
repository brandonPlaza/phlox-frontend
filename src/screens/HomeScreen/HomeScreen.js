import React from "react";
import {
  StyleSheet,
  Platform,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";

import { ArrowRight } from "react-native-feather";

// Imports the stylesheet that applies global styles for things that should remain consistent like the SafeAreaView fix
import GlobalStyleSheet from "../../components/GlobalStyleSheet";
import { COLOURS } from "../../components/colours";


export default function HomeScreen({navigation}) {
    return (
      <SafeAreaView style={[GlobalStyleSheet.androidSafeAreaView]}>
      <View style={styles.getRouteButtonHeader}>
        <TouchableOpacity
          style={styles.getRouteButton}
          onPress={() => navigation.navigate('CurrentLocation')}
        >
          <Text style={styles.getRouteButtonText}>Find your destination</Text>
          <ArrowRight stroke={COLOURS.black} width={38} height={38} />
        </TouchableOpacity>
      </View>
      <View style={styles.getRouteButtonHeader}>
        <TouchableOpacity style={styles.getRouteButton}>
          <Text style={styles.getRouteButtonText}>Find your destination</Text>
          <ArrowRight stroke={COLOURS.black} width={38} height={38} />
        </TouchableOpacity>
        <Button
          title="Go to Analytics Page"
          onPress={() => navigation.navigate("AnalyticsPage")}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  getRouteButtonHeader: {
    height: "auto",
    overflow: "hidden",
    padding: 5,
  },
  getRouteButton: {
    display: "flex",
    flexDirection: "row",

    justifyContent: "space-between",

    backgroundColor: "#E5E5E5",
    marginStart: 10,
    marginEnd: 10,

    paddingStart: 10,
    paddingTop: 7,
    paddingEnd: 10,
    paddingBottom: 7,

    borderRadius: 8,
  },
  getRouteButtonText: {
    fontSize: 30,
  },
});
