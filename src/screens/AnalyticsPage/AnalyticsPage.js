import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import axios from "axios";
import { PieChart } from "react-native-chart-kit";

import data from "./data.json";

const AnalyticsPage = () => {
  const [nodes, setNodes] = useState([]);
  const [reports, setReports] = useState([]);
  const [nodeTypes, setNodeTypes] = useState([]);

  useEffect(() => {
    // axios
    //   .get("https://10.0.2.2/api/report/getnodes")
    //   .then((response) => setNodes(response.data))
    //   .catch((error) => {
    //     console.error(error);
    //   });

    // axios
    //   .get("https://10.0.2.2/api/report/getreports")
    //   .then((response) => setReports(response.data))
    //   .catch((error) => {
    //     console.error(error);
    //   });

    // axios
    //   .get("https://10.0.2.2/api/report/getnodetypes")
    //   .then((response) => setNodeTypes(response.data))
    //   .catch((error) => {
    //     console.error(error);
    //   });

    setNodes(data.nodes);
    setReports(data.reports);
    setNodeTypes(data.nodeTypes);
  }, []);

  const getNodeTypeName = (nodeTypeIndex) => {
    return nodeTypes[nodeTypeIndex] || "Unknown";
  };

  const frequencyOfNodeOutOfService = () => {
    // Get the date for 30 days ago
    const sevenDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    let outOfServiceCounts = {};
    nodeTypes.forEach((type) => {
      outOfServiceCounts[type] = 0;
    });

    nodes.forEach((node) => {
      node.outOfServiceHistory.forEach((history) => {
        const reportedAt = new Date(history.reportedAt);
        if (reportedAt >= sevenDaysAgo) {
          const nodeTypeName = getNodeTypeName(node.nodeType);
          outOfServiceCounts[nodeTypeName]++;
        }
      });
    });

    // Format the output
    let result = [];
    for (let type in outOfServiceCounts) {
      const count = outOfServiceCounts[type];
      result.push(`${count} ${type}'s`);
    }

    return result.join("\n");
  };

  // Without Pie Chart
  // const overallObstructionHistorySpread = () => {
  //   const totalOutOfServiceNodes = nodes.filter(
  //     (node) => node.isOutOfService
  //   ).length;

  //   if (totalOutOfServiceNodes === 0) {
  //     return "No Nodes are Out of Service!";
  //   }

  //   let outOfServiceCounts = {};
  //   nodeTypes.forEach((type) => {
  //     outOfServiceCounts[type] = 0;
  //   });

  //   nodes.forEach((node) => {
  //     if (node.isOutOfService) {
  //       const nodeTypeName = getNodeTypeName(node.nodeType);
  //       outOfServiceCounts[nodeTypeName]++;
  //     }
  //   });

  //   let result = [];
  //   for (let type in outOfServiceCounts) {
  //     const count = outOfServiceCounts[type];
  //     const percentage = ((count / totalOutOfServiceNodes) * 100).toFixed(2);
  //     result.push(
  //       `${count}/${totalOutOfServiceNodes} (${percentage}%) are ${type}`
  //     );
  //   }

  //   return result.join(", \n");
  // };

  // With Pie Chart
  const overallObstructionHistorySpread = () => {
    const totalOutOfServiceNodes = nodes.filter(
      (node) => node.isOutOfService
    ).length;

    if (totalOutOfServiceNodes === 0) {
      return (
        <View>
          <Text>No Nodes are Out of Service!</Text>
        </View>
      );
    }

    let outOfServiceCounts = {};
    nodeTypes.forEach((type) => {
      outOfServiceCounts[type] = 0;
    });

    nodes.forEach((node) => {
      if (node.isOutOfService) {
        const nodeTypeName = getNodeTypeName(node.nodeType);
        outOfServiceCounts[nodeTypeName]++;
      }
    });

    const colors = [
      "#E63946", // Crimson
      "#F4A261", // Sandy Brown
      "#2A9D8F", // Light Sea Green
      "#264653", // Charcoal
      "#8AC926", // Lime Green
      "#FF61A6", // Pink
      "#1B4332", // British Racing Green
      "#F72585", // Neon Fuchsia
    ];

    let chartData = [];
    let colorIndex = 0;
    for (let type in outOfServiceCounts) {
      const count = outOfServiceCounts[type];
      chartData.push({
        name: type,
        population: count,
        color: colors[colorIndex % colors.length],
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      });
      colorIndex++;
    }

    return (
      <View>
        <PieChart
          data={chartData}
          width={400} // Dimensions.get("window").width
          height={220}
          chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          accessor={"population"}
          backgroundColor={"transparent"}
          padding={"20"}
          center={[10, 10]}
          absolute
        />
      </View>
    );
  };

  const averageResolutionTime = () => {
    let totalResolutionTime = 0;
    let resolutionCount = 0;
    let individualAverageTimes = {};

    nodes.forEach((node) => {
      let nodeTotalResolutionTime = 0;
      let nodeResolutionCount = 0;

      node.outOfServiceHistory.forEach((history) => {
        if (history.resolvedAt) {
          const reportedAt = new Date(history.reportedAt);
          const resolvedAt = new Date(history.resolvedAt);
          const resolutionTime = (resolvedAt - reportedAt) / (1000 * 60 * 60); // Convert milliseconds to hours
          nodeTotalResolutionTime += resolutionTime;
          nodeResolutionCount++;
          totalResolutionTime += resolutionTime;
          resolutionCount++;
        }
      });

      if (nodeResolutionCount > 0) {
        const nodeAverageTime = (
          nodeTotalResolutionTime / nodeResolutionCount
        ).toFixed(2);
        individualAverageTimes[node.name] = `${nodeAverageTime} hours`;
      } else {
        individualAverageTimes[node.name] = "No resolved entries found";
      }
    });

    const totalAverageTime =
      resolutionCount > 0
        ? `${(totalResolutionTime / resolutionCount).toFixed(2)} hours`
        : "No resolved entries found";

    return (
      <View style={styles.tableContainer}>
        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>Node Name</Text>
          <Text style={styles.tableHeader}>Average Resolution Time</Text>
        </View>
        {Object.entries(individualAverageTimes).map(
          ([nodeName, averageTime]) => (
            <View key={nodeName} style={styles.tableRow}>
              <Text style={styles.tableCell}>{nodeName}</Text>
              <Text style={styles.tableCell}>{averageTime}</Text>
            </View>
          )
        )}
        <View style={styles.tableRow}>
          <Text style={styles.tableFooter}>Total Average Time</Text>
          <Text style={styles.tableFooter}>{totalAverageTime}</Text>
        </View>
      </View>
    );
  };

  const frequentlyUsedNodes = () => {
    // ... calculate and return frequently used nodes
  };

  const resolutionTimes = averageResolutionTime();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollview}>
        <View style={styles.metricContainer}>
          <Text style={styles.metricTitle}>
            Frequency of Node Out of Service in the Past 30 Days
          </Text>
          <Text style={styles.metricSubtitle}>
            How many of each time of obstruction has gone out of service is the
            last month.
          </Text>
          <Text style={styles.metricText}>{frequencyOfNodeOutOfService()}</Text>
        </View>
        <View style={styles.metricContainer}>
          <Text style={styles.metricTitle}>
            Overall Obstruction History Spread
          </Text>
          <Text style={styles.metricSubtitle}>
            All currently Out Of Service nodes currently on campus.
          </Text>
          {overallObstructionHistorySpread()}
        </View>
        <View style={styles.metricContainer}>
          <Text style={styles.metricTitle}>Average Resolution Time</Text>
          <Text style={styles.metricSubtitle}>
            Average time it takes on average for each node out of service to be
            resolved.
          </Text>
          {averageResolutionTime()}
        </View>
        {/* <View style={styles.metricContainer}>
          <Text style={styles.metricTitle}>Frequently Used Nodes</Text>
          <Text style={styles.metricText}>{frequentlyUsedNodes()}</Text>
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollview: {
    padding: 20,
  },
  metricContainer: {
    marginBottom: 20,
  },
  metricTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  metricSubtitle: {
    fontSize: 16,
    color: "#666",
    fontStyle: "italic",
    paddingBottom: 15,
  },
  metricText: {
    fontSize: 16,
  },
  nodeContainer: {
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },

  // table
  tableContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  tableHeader: {
    flex: 1,
    padding: 8,
    fontWeight: "bold",
    backgroundColor: "#f0f0f0",
    textAlign: "center",
  },
  tableCell: {
    flex: 1,
    padding: 8,
    textAlign: "center",
  },
  tableFooter: {
    flex: 1,
    padding: 8,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#e0e0e0",
  },
});

export default AnalyticsPage;
