// ProfilePage.js
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Alert,
} from "react-native";

import { useUser } from "../utils/UserContext";

import { User, LogOut } from "react-native-feather";

import GlobalStyleSheet from "../components/GlobalStyleSheet";
import NavBar from "../components/NavBar";
import NotLoggedIn from "../components/NotLoggedIn";

const ProfilePage = ({ navigation }) => {
  const { user, setUser } = useUser();

  const handleLogout = async () => {
    try {
      setUser(null);
      Alert.alert("Logout Successful", "You are now logged out!");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  if (!user) {
    return (
      <SafeAreaView style={[GlobalStyleSheet.androidSafeAreaView]}>
        <NotLoggedIn navigation={navigation} />
        <NavBar navigation={navigation} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[GlobalStyleSheet.androidSafeAreaView]}>
      <View style={styles.container}>
        <User width={50} height={50} color={"black"} />
        <Text style={styles.welcomeMessage}>Welcome, {user.username}</Text>
        <View style={styles.infoList}>
          <Text style={styles.email}>{user.email}</Text>
          <View style={styles.name}>
            <Text style={styles.firstname}>{user.firstname}</Text>
            <Text style={styles.lastname}>{user.lastname}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutBtnText}>Logout</Text>
          <LogOut width={15} height={15} color={"black"} />
        </TouchableOpacity>
      </View>
      <NavBar navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },

  welcomeMessage: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 20,
  },

  infoList: {},

  email: {
    fontSize: 20,
  },

  name: {
    flexDirection: "row",
    marginTop: 20,
  },

  firstname: {
    fontSize: 20,
    marginRight: 5,
  },

  lastname: {
    fontSize: 20,
  },

  logoutBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#000",
  },

  logoutBtnText: {
    fontSize: 15,
    marginRight: 10,
  },
});

export default ProfilePage;
