import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const AnalyticsPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the API
    fetch("https://api.example.com/obstructions")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!data) {
    return <Text>Error loading data</Text>;
  }

  // 1. Frequency of an accessibility device having an obstruction
  const totalDevices = data.length;
  const obstructedDevices = data.filter((device) => device.obstructed).length;
  const obstructionFrequency = (obstructedDevices / totalDevices) * 100;

  // 2. Overall Obstruction History Spread
  const totalObstructions = data.reduce(
    (acc, device) => acc + device.obstructionHistory.length,
    0
  );
  const obstructionSpread = {};
  data.forEach((device) => {
    device.obstructionHistory.forEach((obstruction) => {
      if (!obstructionSpread[obstruction.type]) {
        obstructionSpread[obstruction.type] = 0;
      }
      obstructionSpread[obstruction.type]++;
    });
  });
  for (let type in obstructionSpread) {
    obstructionSpread[type] =
      (obstructionSpread[type] / totalObstructions) * 100;
  }

  // 3. How fast obstructions are resolved
  const totalResolutionTimes = data.reduce((acc, device) => {
    return (
      acc +
      device.obstructionHistory.reduce((innerAcc, obstruction) => {
        return innerAcc + (obstruction.resolvedAt - obstruction.reportedAt);
      }, 0)
    );
  }, 0);
  const averageResolutionTime = totalResolutionTimes / totalObstructions;

  // 4. Amenities that are used a lot
  const amenitiesUsage = {};
  data.forEach((device) => {
    device.amenities.forEach((amenity) => {
      if (!amenitiesUsage[amenity.type]) {
        amenitiesUsage[amenity.type] = 0;
      }
      amenitiesUsage[amenity.type]++;
    });
  });
  const sortedAmenities = Object.entries(amenitiesUsage).sort(
    (a, b) => b[1] - a[1]
  );
  const mostUsedAmenity = sortedAmenities[0];

  return (
    <View style={styles.container}>
      <Text>
        Frequency of an accessibility device having an obstruction:{" "}
        {obstructionFrequency.toFixed(2)}%
      </Text>
      <Text>
        Overall Obstruction History Spread: {JSON.stringify(obstructionSpread)}
      </Text>
      <Text>
        Average time to resolve obstructions: {averageResolutionTime.toFixed(2)}{" "}
        hours
      </Text>
      <Text>
        Most used amenity: {mostUsedAmenity[0]} used {mostUsedAmenity[1]} times
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
});

export default AnalyticsPage;
