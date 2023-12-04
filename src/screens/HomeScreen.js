import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Button,
} from "react-native";
import NavBar from "../components/NavBar";

import { Search, Flag } from "react-native-feather";

// Imports the stylesheet that applies global styles for things that should remain consistent like the SafeAreaView fix
import GlobalStyleSheet from "../components/GlobalStyleSheet";
import { COLOURS } from "../components/colours";
import OutOfServiceNodes from "../components/OutOfServiceNodes/OutOfServiceNodes";
import ReportModal from "../components/ReportModal";

export default function HomeScreen({ navigation }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [refreshNodes, setRefreshNodes] = useState(false);

  const handleReportPress = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleReportSubmitted = () => {
    setIsModalVisible(false);
    setRefreshNodes((prevState) => !prevState); // Toggle state to trigger refresh
  };

  return (
    <SafeAreaView style={[GlobalStyleSheet.androidSafeAreaView]}>
      <View style={styles.homeContainer}>
        <View style={styles.searchContainer}>
          <TouchableOpacity
            style={styles.getRouteButton}
            onPress={() => navigation.navigate("DisabilitySelect")}
          >
            <Search stroke={"#000"} width={18} height={18} />
            <View>
              <Text style={styles.getRouteButtonText}>
                Find your destination
              </Text>
            </View>
          </TouchableOpacity>
          <View style={styles.outOfServiceContainer}>
            <View style={styles.outOfServiceHeader}>
              <Text style={styles.outOfServiceTitle}>Amenities</Text>
              <View>
                <View style={styles.statusCircleContainer}>
                  <View style={styles.statusCircleOut}></View>
                  <Text style={styles.statusCircleOutText}>Out of service</Text>
                </View>
                <View style={styles.statusCircleContainer}>
                  <View style={styles.statusCircleIn}></View>
                  <Text style={styles.statusCircleInText}>In service</Text>
                </View>
              </View>
            </View>
            <OutOfServiceNodes navigation={navigation} refresh={refreshNodes} />
          </View>
        </View>
        <TouchableOpacity
          style={styles.makeReportButton}
          onPress={handleReportPress}
        >
          <Text style={styles.makeReportButtonText}>Make Report</Text>
          <Flag stroke={"#000"} width={18} height={18} />
        </TouchableOpacity>
        <ReportModal
          isVisible={isModalVisible}
          onClose={handleCloseModal}
          onReportSubmitted={handleReportSubmitted}
        />
      </View>
      <NavBar navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingBottom: 80,
    paddingTop: 20,
  },

  searchContainer: {
    flex: 1,
    width: "100%",
  },

  outOfServiceContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 30,
  },

  outOfServiceHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },

  outOfServiceTitle: {
    fontWeight: "bold",
    fontSize: 25,
  },

  getRouteButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "center",
    width: "100%",

    paddingVertical: 15,
    paddingHorizontal: 20,

    borderRadius: 5,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
  },

  getRouteButtonText: {
    fontSize: 18,
    fontWeight: "400",
    fontStyle: "normal",
    color: "#000",
    alignItems: "center",
    paddingLeft: 10,
  },

  makeReportButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",

    paddingVertical: 15,
    paddingHorizontal: 20,

    marginTop: 40,

    borderRadius: 5,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
  },
  makeReportButtonText: {
    fontSize: 18,
    fontWeight: "400",
    fontStyle: "normal",
    color: "#000",
    alignItems: "center",
  },

  statusCircleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  statusCircleOut: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 10,
    width: 10,
    borderRadius: 5,
    marginRight: 5,
    backgroundColor: "red",
  },

  statusCircleOutText: {
    fontSize: 12,
    fontWeight: "400",
    fontStyle: "normal",
    color: "red",
    alignItems: "center",
  },

  statusCircleIn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 10,
    width: 10,
    borderRadius: 5,
    marginRight: 5,
    backgroundColor: "green",
  },

  statusCircleInText: {
    fontSize: 12,
    fontWeight: "400",
    fontStyle: "normal",
    color: "green",
    alignItems: "center",
  },
});
