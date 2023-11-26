import React, { useState, useRef } from "react";
import {
  View,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  Text,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "../utils/UserContext";

import { Feather, User, Lock } from "react-native-feather";

import GlobalStyleSheet from "../components/GlobalStyleSheet";
import NavBar from "../components/NavBar";

const LoginUserScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUser();

  const usernameInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const handleLogin = async () => {
    // Implement Login
    Alert.alert("TODO", "Login not implemented yet");
  };

  return (
    <SafeAreaView style={[GlobalStyleSheet.androidSafeAreaView]}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Login.</Text>
          <Feather width={40} height={40} color={"black"} />
        </View>
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={() =>
            usernameInputRef.current && usernameInputRef.current.focus()
          }
        >
          <User width={20} height={20} color={"black"} />
          <TextInput
            ref={usernameInputRef}
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={() =>
            passwordInputRef.current && passwordInputRef.current.focus()
          }
        >
          <Lock width={20} height={20} color={"black"} />
          <TextInput
            ref={passwordInputRef}
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitBtn} onPress={handleLogin}>
          <Text style={styles.submitBtnText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.registerBtnContainer}>
          <Button
            title="Don't have an account? Register"
            onPress={() => navigation.navigate("RegisterUserScreen")}
          />
        </View>
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

  textContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    width: "100%",
  },

  title: {
    fontSize: 40,
    fontWeight: "bold",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#000",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },

  input: {
    flex: 1,
    paddingLeft: 15,
  },

  submitBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#000",
  },

  submitBtnText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },

  registerBtnContainer: {
    marginTop: 20,
  },
});

export default LoginUserScreen;
