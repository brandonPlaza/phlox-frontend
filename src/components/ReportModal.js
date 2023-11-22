import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";

import { X } from "react-native-feather";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function ReportModal({ isVisible, onClose, onReportSubmitted }) {
  const [nodes, setNodes] = useState([]);
  const [selectedNode, setSelectedNode] = useState("");
  const [userMessage, setUserMessage] = useState("");

  useEffect(() => {
    fetch(`https://phloxapi.azurewebsites.net/api/Report/GetNodes`)
      .then((response) => response.json())
      .then((data) => {
        setNodes(data.map((node) => ({ label: node.name, value: node.name })));
      })
      .catch((error) => console.error("Fetch error:", error));
  }, []);

  const isSubmitDisabled = !selectedNode;

  const handleSubmit = () => {
    if (isSubmitDisabled) {
      Alert.alert("Error", "Please select a valid node.");
      return;
    }

    // Encode the parameters to be included in the query string
    const queryParams = new URLSearchParams({
      nodeAffected: selectedNode,
      userMessage: userMessage,
    }).toString();

    const url = `https://phloxapi.azurewebsites.net/api/Report/AddReport?${queryParams}`;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain; charset=utf-8", // As per API setting
        accept: "*/*", // This could be adjusted as per API requirements
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // Handle successful response
        onReportSubmitted(); // Trigger refresh of out of service nodes
        onClose(); // Close the modal after successful submission
      })
      .catch((error) => {
        console.error("Submit error:", error);
        Alert.alert("Error", "An error occurred while submitting the report.");
      });
  };

  return (
    <Modal
      visible={isVisible}
      onRequestClose={onClose}
      animationType="fade"
      transparent={true}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.headerContainer}>
            <Text>Make a Report</Text>
            <TouchableOpacity onPress={onClose}>
              <X stroke={"#000"} width={20} height={20} />
            </TouchableOpacity>
          </View>

          <RNPickerSelect
            onValueChange={(value) => setSelectedNode(value)}
            items={nodes}
            placeholder={{ label: "Select Node", value: null }}
            style={{
              inputIOS: {
                ...styles.input,
                color: "black",
                // Add any other styling that is necessary for iOS
              },
              inputAndroid: {
                ...styles.input,
                color: "black",
                // Add any other styling that is necessary for Android
              },
              placeholder: {
                color: "gray",
              },
            }}
            useNativeAndroidPickerStyle={false}
          />
          <TextInput
            style={[styles.input, styles.multilineInput]}
            value={userMessage}
            onChangeText={setUserMessage}
            placeholder="Message (Optional)"
            multiline
            numberOfLines={4}
            placeholderTextColor="#888"
          />
          <TouchableOpacity
            disabled={isSubmitDisabled}
            style={
              isSubmitDisabled
                ? styles.submitButtonDisabled
                : styles.submitButton
            }
            onPress={handleSubmit}
          >
            <Text
              style={
                isSubmitDisabled
                  ? styles.submitButtonTextDisabled
                  : styles.submitButtonText
              }
            >
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: screenWidth * 0.8,
    maxHeight: screenHeight * 0.8,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    fontSize: 16,
    width: "100%",
  },
  multilineInput: {
    minHeight: 75,
    textAlignVertical: "top",
    paddingTop: 10,
    paddingBottom: 10,
  },
  submitButton: {
    borderWidth: 1.5,
    borderColor: "#000",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: "100%",
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  submitButtonDisabled: {
    borderWidth: 1,
    borderColor: "#AAA",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: "100%",
  },
  submitButtonTextDisabled: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#AAA",
  },
});
