// ProfilePage.js
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";

import { useUser } from "../utils/UserContext";

import GlobalStyleSheet from "../components/GlobalStyleSheet";
import NavBar from "../components/NavBar";
import NotLoggedIn from "../components/NotLoggedIn";

const ProfilePage = ({ navigation }) => {
  const { user, setUser } = useUser();

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
      <Text>Welcome, {user.username}</Text>
      <TouchableOpacity onPress={() => setUser(null)}>
        <Text>Logout</Text>
      </TouchableOpacity>
      <NavBar navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default ProfilePage;
