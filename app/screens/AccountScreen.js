import React, { useState } from "react";
import ListItem from "../components/ListItem";
import { View, Text, StyleSheet, Button } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import colours from "../config/colours";
import { Modal } from "react-native";

import AppButton from "../components/AppButton";

function AccountScreen({ refresh }) {
  const { logout } = useContext(AuthContext);
  const [isThemeModalVisible, setIsThemeModalVisible] = useState(false);

  const handleSelection = (themeName) => {
    setTheme(themeName);
    setIsThemeModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Account </Text>

      <Text style={styles.subtitle}>Oisin O Donnell</Text>
      <ListItem
        title={"About me"}
        subtitle={
          "My name is Oisin, and Im the creator of this project. Im a movie lover and a final year computer science student. I love the way films can transport us to different worlds, tell stories that touch our hearts, and make us laugh, cry, or think. Thats why I decided to combine my two passions, movies and programming, and create this app to help people discover and enjoy great films. My goal was to design a user-friendly platform that provides a wide range of movie options, from popular hits to hidden gems, and allows users to find, save, and share their favorites with ease. I hope you enjoy using this app as much as I enjoyed creating it."
        }
      />

      <View style={styles.buttoncontainer}>
        <AppButton
          title={"Change theme"}
          onPress={() => setIsThemeModalVisible(true)}
        />
        <AppButton
          color={colours.third}
          title="Sign Out"
          onPress={() => {
            logout();
          }}
        />
      </View>
      <Modal
        visible={isThemeModalVisible}
        animationType={"slide"}
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modaltitle}>Select Theme</Text>
            <AppButton
              onPress={() => handleSelection("Original")}
              title="Original"
              color="#00FFFF"
            />
            <AppButton
              onPress={() => handleSelection("FierySunset")}
              title="Fiery Sunset"
              color="#8B0000"
            />
            <AppButton
              onPress={() => handleSelection("MidnightNoir")}
              title="Midnight Noir"
              color="#E2D6DB"
            />
            <AppButton
              onPress={() => handleSelection("EnchantedForest")}
              title="Enchanted Forest"
              color="#D62AD0"
            />
            <AppButton
              onPress={() => handleSelection("VibrantSunrise")}
              title="Vibrant Sunrise"
              color="#F44336"
            />
            <AppButton
              onPress={() => handleSelection("GrassyGrove")}
              title="Grassy Grove"
              color="#4CAF50"
            />
            <Button
              onPress={() => setIsThemeModalVisible(false)}
              title="Close"
            ></Button>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 0,

    backgroundColor: colours.primary,
  },
  buttonStyle: {
    width: 200, // Replace 200 with your desired width
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 15,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 999, // add zIndex to make the modal displayed in front of everything else
  },
  modalView: {
    backgroundColor: colours.white,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    fontSize: 25,
    shadowColor: "#000",
  },

  modaltitle: {
    fontSize: 35,
    fontWeight: "600",
  },
  title: {
    fontSize: 35,
    fontWeight: "600",
    color: colours.white,
    paddingBottom: 70,
  },

  subtitle: {
    fontSize: 25,
    fontWeight: "400",
    fontStyle: "italic",
    color: colours.white,
  },

  buttoncontainer: {
    marginTop: 80,
    justifyContent: "flex-end",
    alignItems: "center",
    width: "90%",
  },
});

export default AccountScreen;
