import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";

export default function OutOfServiceNodes({ navigation }) {
  const [nodes, setNodes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://phloxapi.azurewebsites.net/api/Report/GetNodes`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const sortedData = data.sort((a, b) => {
          if (a.isOutOfService && !b.isOutOfService) {
            return -1;
          } else if (!a.isOutOfService && b.isOutOfService) {
            return 1;
          } else {
            return b.reports.length - a.reports.length; // Sort by number of reports
          }
        });
        setNodes(sortedData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setError(error);
        setIsLoading(false);
      });
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View>
        <Text style={styles.itemText}>{item.name}</Text>
        <Text style={styles.itemReportText}>
          Reports: {item.reports.length}
        </Text>
      </View>
      <View>
        <View
          style={[
            styles.statusCircle,
            item.isOutOfService ? styles.red : styles.green,
          ]}
        />
      </View>
    </View>
  );

  const ItemSeparator = () => <View style={styles.separator} />;

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading Nodes...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loaderContainer}>
        <Text>Error fetching data: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={nodes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={ItemSeparator}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  separator: {
    height: 20, // Adjust the height for the gap size
  },
  item: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingVertical: 20,
    paddingHorizontal: 15,

    borderRadius: 5,
    borderStyle: "solid",
    borderWidth: 0.5,
    borderColor: "#000",
  },
  itemText: {
    fontSize: 18,
    fontWeight: "400",
    fontStyle: "normal",
    color: "#000",
    alignItems: "center",
  },
  itemReportText: {
    fontSize: 14,
    fontWeight: "400",
    fontStyle: "normal",
    color: "#444",
    alignItems: "center",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  statusCircle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 10,
    width: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  red: {
    backgroundColor: "red",
  },
  green: {
    backgroundColor: "green",
  },
});
