import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  ScrollView,
  Modal,
  TouchableHighlight,
  RefreshControl,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-web";
import AppButton from "../components/AppButton";
import { TouchableOpacity } from "react-native";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import HomeScreenTile from "../components/HomeScreenTile";
import ListItem from "../components/ListItem";
import axios from "axios";

function TrendingMovies(props) {
  const TMDB_API_KEY = "9d238a902ba51bf41bc13aded64d7960";
  const TRENDING_MOVIES_URL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${TMDB_API_KEY}`;

  const [isMovieModalVisible, setIsMovieModalVisible] = useState(false);

  const renderMovie = ({ item }) => (
    <TouchableOpacity onPress={() => toggleMovieModal(item)}>
      <View style={styles.movieContainer}>
        <Image
          style={styles.moviePoster}
          source={{
            uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
          }}
        />
        <Text style={styles.movieTitle}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  const toggleMovieModal = (movie) => {
    // log the selected movie to the console
    setSelectedMovie(movie);
    setMovieModalVisible(!isMovieModalVisible);
  };

  const MovieModal = ({ movie, visible, onClose }) => {
    console.log("MovieModal props:", movie, visible, onClose);
    return (
      <Modal visible={visible} animationType="slide">
        <View style={styles.modalBackground}>
          <ImageBackground
            style={styles.modalImage}
            source={{
              uri: `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`,
            }}
          >
            <Text style={styles.modalTitle}>{movie.title}</Text>
            <Text style={styles.modalOverview}>{movie.overview}</Text>
          </ImageBackground>
          <View style={styles.buttonContainer}>
            <AppButton title="Close" onPress={onClose} color="#E6AF2E" />
          </View>
        </View>
      </Modal>
    );
  };

  const TrendingMovies = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
      fetch(TRENDING_MOVIES_URL)
        .then((response) => response.json())
        .then((data) => {
          setMovies(data.results);
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);
  };

  return (
    <View>
      <View style={styles.modalBackground}>
        <View style={styles.modalBackground}>
          <View style={styles.modalImage}>
            <Text style={styles.modalTitle}>This Week's Trending Movies</Text>
            <TrendingMovies style={styles.trending} />
          </View>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <AppButton title="Close" onPress={toggleMovieModal} color="#E6AF2E" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3F0D12",
  },
  buttonContainer: {
    backgroundColor: "#3F0D12",
    padding: 20,
    width: "100%",
    justifyContent: "flex-end",
  },
  topContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  bottomContainer: {
    flex: 1.5,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    padding: 5,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 70,
    alignSelf: "center",
  },
  smalltext: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginHorizontal: 20,
    marginTop: 20,
  },

  buttontext: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },

  smallcontainer: {
    backgroundColor: "#A71D31",
    alignItems: "center",
    justifyContent: "center",
    height: 70,
    width: 170,
    borderRadius: 20,
    marginVertical: 10,
    marginHorizontal: 10,
  },

  bigcontainer: {
    backgroundColor: "#A71D31",
    alignItems: "center",
    justifyContent: "center",
    height: 220,
    width: 350,
    borderRadius: 20,
    marginTop: 40,
    marginHorizontal: 10,
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  modalTitle: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 60,
    color: "#FFF",
  },
  modalText: {
    fontSize: 24,
    marginBottom: 30,
    color: "#FFF",
    padding: 10,
  },

  tileTitle: {
    fontSize: 30,
    fontWeight: "500",
    marginBottom: 10,
    color: "#FFF",
  },

  tileText: {
    fontSize: 18,
    marginBottom: 10,
    color: "#FFF",
    padding: 15,
  },

  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3F0D12",
  },
  modalImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    alignItems: "center",
    justifyContent: "center",
  },

  icons: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  searchbox: {
    fontSize: 15,
    fontWeight: "20",
    padding: 10,
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 36,
    marginBottom: 1,
  },

  movieContainer: {
    margin: 10,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#ffffff",
    elevation: 5,
  },
  moviePoster: {
    height: 200,
    resizeMode: "stretch",
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 10,
    textAlign: "center",
  },
  trending: {
    flex: 1,
    backgroundColor: "#3F0D12",
  },

  backdropImage: {
    width: "100%",
    height: 200,
  },
  movieDetailsContainer: {
    padding: 20,
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#FFFFFF",
  },
  movieOverview: {
    fontSize: 16,
    color: "#FFFFFF",
  },
});

export default TrendingMovies;
