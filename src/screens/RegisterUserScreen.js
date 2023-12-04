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
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "../utils/UserContext";

import { Feather, User, Lock, Mail } from "react-native-feather";

import GlobalStyleSheet from "../components/GlobalStyleSheet";
import NavBar from "../components/NavBar";

const RegisterUserScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useUser();

  const emailInputRef = useRef(null);
  const firstNameInputRef = useRef(null);
  const lastNameInputRef = useRef(null);
  const usernameInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const handleRegister = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://phloxapi.azurewebsites.net/api/Accounts/Register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            firstName,
            lastName,
            username,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setUser(data);
        await AsyncStorage.setItem("@user", JSON.stringify(data));

        Alert.alert(
          "Registration Successful",
          "Your account has been created."
        );
        navigation.navigate("Home");
      } else {
        Alert.alert(
          "Registration Failed",
          data.message ||
            "An error occurred during registration. Please try again."
        );
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred. Please try again later.");
    }
    setIsLoading(false);
  };

  return (
    <SafeAreaView style={[GlobalStyleSheet.androidSafeAreaView]}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Register.</Text>
          <Feather width={40} height={40} color={"black"} />
        </View>
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={() => emailInputRef.current && emailInputRef.current.focus()}
        >
          <Mail width={20} height={20} color={"black"} />
          <TextInput
            ref={emailInputRef}
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={() =>
            firstNameInputRef.current && firstNameInputRef.current.focus()
          }
        >
          <User width={20} height={20} color={"black"} />
          <TextInput
            ref={firstNameInputRef}
            style={styles.input}
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={() =>
            lastNameInputRef.current && lastNameInputRef.current.focus()
          }
        >
          <User width={20} height={20} color={"black"} />
          <TextInput
            ref={lastNameInputRef}
            style={styles.input}
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
          />
        </TouchableOpacity>
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
        <TouchableOpacity
          style={isLoading ? styles.submitBtnDisabled : styles.submitBtn}
          onPress={handleRegister}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator
              style={styles.submitBtnText}
              size={24}
              color="#AAA"
            />
          ) : (
            <Text style={styles.submitBtnText}>Register</Text>
          )}
        </TouchableOpacity>
        <View style={styles.registerBtnContainer}>
          <Button
            title="Already have an account? Login"
            onPress={() => navigation.navigate("LoginUserScreen")}
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
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginTop: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#000",
  },

  submitBtnDisabled: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginTop: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#AAA",
  },

  submitBtnText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },

  registerBtnContainer: {
    marginTop: 20,
  },
});

export default RegisterUserScreen;
