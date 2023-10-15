import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import axios from "axios";

const AnalyticsPage = () => {
  const [nodes, setNodes] = useState([]);
  const [reports, setReports] = useState([]);
  const [nodeTypes, setNodeTypes] = useState([]);

  useEffect(() => {
    axios
      .get("http://192.168.2.212:8081/api/report/getnodes")
      .then((response) => setNodes(response.data))
      .catch((error) => {
        console.error(error);
        console.log(JSON.stringify(error, null, 2));
      });

    axios
      .get("http://192.168.2.212:8081/api/report/getreports")
      .then((response) => setReports(response.data))
      .catch((error) => {
        console.error(error);
        console.log(JSON.stringify(error, null, 2));
      });

    axios
      .get("http://192.168.2.212:8081/api/report/getnodetypes")
      .then((response) => setNodeTypes(response.data))
      .catch((error) => {
        console.error(error);
        console.log(JSON.stringify(error, null, 2));
      });
  }, []);

  const getNodeTypeName = (nodeTypeIndex) => {
    return nodeTypes[nodeTypeIndex] || "Unknown";
  };

  const frequencyOfNodeOutOfService = () => {
    // Get the date for 7 days ago
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

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
      result.push(`${count} ${type} node(s) marked out of service`);
    }

    return result.join(", ");
  };

  const overallObstructionHistorySpread = () => {
    const totalOutOfServiceNodes = nodes.filter(
      (node) => node.isOutOfService
    ).length;

    if (totalOutOfServiceNodes === 0) {
      return "No Nodes are Out of Service!";
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

    let result = [];
    for (let type in outOfServiceCounts) {
      const count = outOfServiceCounts[type];
      const percentage = ((count / totalOutOfServiceNodes) * 100).toFixed(2);
      result.push(
        `${count}/${totalOutOfServiceNodes} (${percentage}%) are ${type}`
      );
    }

    return result.join(", ");
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

    return {
      totalAverageTime,
      individualAverageTimes,
    };
  };

  const frequentlyUsedNodes = () => {
    // ... calculate and return frequently used nodes
  };

  const resolutionTimes = averageResolutionTime();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.metricContainer}>
          <Text style={styles.metricTitle}>
            Frequency of Node Out of Service in the Past 7 Days
          </Text>
          <Text>{frequencyOfNodeOutOfService()}</Text>
        </View>
        <View style={styles.metricContainer}>
          <Text style={styles.metricTitle}>
            Overall Obstruction History Spread
          </Text>
          <Text>{overallObstructionHistorySpread()}</Text>
        </View>
        <View style={styles.metricContainer}>
          <Text style={styles.metricTitle}>Average Resolution Time</Text>
          <Text>Total: {resolutionTimes.totalAverageTime}</Text>
          {Object.entries(resolutionTimes.individualAverageTimes).map(
            ([nodeName, averageTime]) => (
              <Text key={nodeName}>
                {nodeName}: {averageTime}
              </Text>
            )
          )}
        </View>
        <View style={styles.metricContainer}>
          <Text style={styles.metricTitle}>Frequently Used Nodes</Text>
          <Text>{frequentlyUsedNodes()}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  metricContainer: {
    marginBottom: 20,
  },
  metricTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  nodeContainer: {
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
});

export default AnalyticsPage;
