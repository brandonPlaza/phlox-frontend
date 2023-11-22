import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  androidSafeAreaView: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 35 : 0,
  },
});
