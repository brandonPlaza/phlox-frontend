import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const NodeAnalytics = ({ item }) => {
    
  const frequencyOfNodeOutOfService = () => {
    // Get the date for 30 days ago
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    let outOfServiceCounts = {};

    nodes.forEach((node) => {
      outOfServiceCounts[node.name] = 0; // Initialize count for each node
      node.outOfServiceHistory.forEach((history) => {
        const reportedAt = new Date(history.reportedAt);
        if (reportedAt >= thirtyDaysAgo) {
          outOfServiceCounts[node.name]++; // Increment count for the specific node
        }
      });
    });
  };

  return (
    <View style={styles.container}>
      <Text>Hello</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",

    paddingVertical: 20,
    paddingHorizontal: 15,
  },
});

export default NodeAnalytics;
