import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
  Text,
  SafeAreaView,
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import colours from "../config/colours";

function ListItemFriends({
  title,
  subtitle,
  image,
  onPress,
  renderRightActions,
}) {
  return (
    <View style={styles.container}>
      <TouchableHighlight underlayColor={colours.primary} onPress={onPress}>
        <View style={styles.row}>
          <View style={styles.imageContainer}>
            {image && <Image style={styles.image} source={image} />}
          </View>
          <View style={styles.details}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>
        </View>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colours.primary,
    padding: 10,
    width: "100%",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: colours.third,
  },
  imageContainer: {
    width: 150,
    height: 170,

    overflow: "hidden",
    marginRight: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "conatin",
  },
  details: {
    justifyContent: "center",
    flex: 1,
  },
  title: {
    fontWeight: "500",
    fontSize: 40,
    color: "#FFF",
    padding: 10,
  },

  subtitle: {
    fontWeight: "400",
    fontSize: 20,
    color: "#FFF",
    padding: 10,
  },
});

export default ListItemFriends;
