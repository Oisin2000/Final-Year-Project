import React from "react";
import { Image, SafeAreaView, StyleSheet, Text } from "react-native";
import AppText from "./AppText";
import { Constants } from "expo-constants";
import { StatusBar } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";

function OfflineNotice(props) {
  const netInfo = useNetInfo();

  if (netInfo.type !== "unknown" && netInfo.isInternetReachable === false)
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>No Internet Connection</Text>
      </SafeAreaView>
    );

  return null;
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    marginTop: 55,
    position: "absolute",
    height: 50,
    backgroundColor: "red",
    width: "100%",
  },

  text: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default OfflineNotice;
