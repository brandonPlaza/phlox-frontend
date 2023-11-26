import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const NotLoggedIn = ({ navigation, message }) => {
  return (
    <View style={styles.notLoggedInContainer}>
      <Text style={styles.notLoggedInText}>
        {message ? message : "You are not logged in."}
      </Text>
      <TouchableOpacity
        style={styles.notLoggedInLoginBtn}
        onPress={() => navigation.navigate("LoginUserScreen")}
      >
        <Text style={styles.notLoggedInLoginBtnText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.notLoggedInRegisterBtn}
        onPress={() => navigation.navigate("RegisterUserScreen")}
      >
        <Text style={styles.notLoggedInRegisterBtnText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  notLoggedInContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 50,
  },

  notLoggedInText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  notLoggedInLoginBtn: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",

    paddingVertical: 15,
    paddingHorizontal: 20,

    marginBottom: 20,

    borderRadius: 5,
    borderStyle: "solid",
    borderWidth: 1.5,
    borderColor: "#000",
  },

  notLoggedInLoginBtnText: {
    color: "#000",
    fontSize: 18,
  },

  notLoggedInRegisterBtn: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",

    paddingVertical: 15,
    paddingHorizontal: 20,

    marginBottom: 20,

    backgroundColor: "#000",

    borderRadius: 5,
    borderStyle: "solid",
    borderWidth: 1.5,
    borderColor: "#000",
  },

  notLoggedInRegisterBtnText: {
    color: "#FFF",
    fontSize: 18,
  },
});

export default NotLoggedIn;
