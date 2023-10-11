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
  const servicesOutOfService = data.filter(
    (serv) => serv.isOutOfService
  ).length;
  const obstructionFrequency = (servicesOutOfService / totalDevices) * 100;

  // 2. Overall Obstruction History Spread
  var elevatorsOutOfService = 0;
  data.forEach((service) => {
    if (service.type == "elevator") {
      if (service.isOutOfService) {
        elevatorsOutOfService++;
      }
    }
  });

  // 3. How fast obstructions are resolved
  data.forEach((service) => {
    service.outOfServiceHistory.forEach((history) => {
      if (history.isResolved) {
        const diffTime = Math.abs(history.resolvedTime - service.createdAt);
        history.resolutionTime = diffHours;
      }
    });
  });

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
