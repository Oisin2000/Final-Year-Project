import React, { useState, useEffect } from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  Modal,
  TouchableHighlight,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-web';
import AppButton from '../components/AppButton';

function HomeScreen(props) {
  const [state, setState] = React.useState({
    results: [],
    selected: { index: -1 },
    refreshing: false, // added refreshing state
  });

  const [movies, setMovies] = useState([]);

  const fetchMovies = () => {
    fetch('http://172.20.10.2:5000/recommendedmovies')
      .then((response) => response.json())
      .then((data) => {
        console.log('All movies:', data);
        const movieObjects = data.map((movie) => {
          return {
            actors: movie.actors,
            awards: movie.awards,
            box_office: movie.box_office,
            country: movie.country,
            director: movie.director,
            dvd: movie.dvd,
            genre: movie.genre,
            imdb_id: movie.imdb_id,
            imdb_rating: movie.imdb_rating,
            imdb_votes: movie.imdb_votes,
            language: movie.language,
            metascore: movie.metascore,
            plot: movie.plot,
            poster: movie.poster,
            production: movie.production,
            rated: movie.rated,
            released: movie.released,
            runtime: movie.runtime,
            title: movie.title,
            type: movie.type,
            website: movie.website,
            writer: movie.writer,
            year: movie.year,
          };
        });
        setMovies(movieObjects);
        setState((prevState) => {
          return { ...prevState, results: movieObjects, refreshing: false }; // set refreshing to false
        });
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
        setState((prevState) => {
          return { ...prevState, refreshing: false }; // set refreshing to false
        });
      });
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const onRefresh = () => {
    setState((prevState) => {
      return { ...prevState, refreshing: true }; // set refreshing to true
    });
    fetchMovies();
  };

  return (
    <ScrollView
        style={styles.results}
        refreshControl={
          <RefreshControl refreshing={state.refreshing} onRefresh={onRefresh} />
        }
      >
    <View style={styles.container}>
        <Text style={styles.title}>The Film Club</Text>
        <Text style={styles.smalltext}>Welcome to the Film Club, the go-to app for all movie lovers out there. Get ready to embark on a cinematic journey with a vibrant community of like-minded individuals who share your passion for films. </Text>
        <Text style={styles.smalltext}>Below are some of our favourite movies, use the search screen to discover new movies and add them to your watch list so hours of searching for a good movie to watch is a thing of the past. Keep track of all the movies you've watched and loved with our easy-to-use My Movies feature. Rate and review your favorites, and never forget a great film again </Text>
      <Text style={styles.text}>Recommended Movies: </Text>
      
        {movies.map((movie, index) => (
          <TouchableHighlight
            onPress={() => {
              setState({ selected: { ...movie, index } });
              console.log('Selected movie:', movie);
            }}
            key={movie.id}
          >
            <View style={styles.result}>
              <Image
                source={{ uri: movie.poster }}
                style={{
                  width: '100%',
                  height: 300,
                }}
                resizeMode="contain"
              />
              
            </View>
          </TouchableHighlight>
        ))}
      
    </View>
    </ScrollView>
  );
}

  

const styles = StyleSheet.create({

    container: {

        flex:10,
        backgroundColor: '#3F0D12',
        alignItems:'stretch',
        justifyContent: 'flex-end',
        paddingTop: 100,
        paddingHorizontal: 20,
    },

    buttonContainer:{

        backgroundColor: '#750a18',
        padding:20,
       
        width:"100%",
        justifyContent:'flex-end'
    },

    closeButton: {
      backgroundColor: '#cc0000',
      padding: 10,
      borderRadius: 5,
      marginTop: 20,
    },

    modalContent: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#750a18',
      padding:20
    },

    modalTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },


    title: {
        color: '#FFF',
        fontSize: 40,
        fontFamily:'Avenir',
        fontWeight: '700',
        textAlign: 'center',
        alignSelf:'center',
        marginBottom: 10,
    },

    text: {
        color: '#FFF',
        fontSize: 25,
        fontWeight: '500',
        textAlign: 'left',
        alignSelf:'center',
        marginBottom: 20

    },

    smalltext: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: '300',
        textAlign: 'left',
        alignSelf:'center',
        marginBottom: 20

    },

    searchbox: {

        fontSize:20,
        fontWeight:'20',
        padding:20,
        width:"100%",
        backgroundColor:"#fff",
        borderRadius:8,
        marginBottom:40,

    },

    results: {

        color: '#bc1111',
        fontSize: 22,
        fontWeight: '500',
        textAlign: 'left',
        
        

    },

    result: {

        flex:1,
        width:"100%",
        marginBottom: 20
        

    },

    heading: {

        color:"#FFF",
        fontSize:18,
        fontWeight: "700",
        padding:20,
        textAlign:'center',
        backgroundColor:"#000000"

    },

    AddtoMyList: {

        color:"#000000",
        fontSize:18,
        fontWeight: "700",
        padding:20,
        textAlign:'center',
        backgroundColor:"#FFF"

    },

    popup: {

        flex:1,
        padding:20,
        justifyContent: "flex-start",
        backgroundColor: '#750a18',
        

    },

    poptitle: {

        fontSize:25,
        fontWeight:"700",
        marginTop:10,
        marginBottom: 10,
        alignSelf: 'center',

    },


    
})

export default HomeScreen;