import React, { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet, View, Image, Text, ScrollView, Modal, TouchableHighlight, RefreshControl, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-web';
import AppButton from '../components/AppButton';
import { useNavigation } from '@react-navigation/native';
import colours from '../config/colours';

function MyMoviesScreen(props) {
  const [state, setState] = React.useState({
    results: [],
    selected: { index: -1 },
  });

  const [movies, setMovies] = useState([]);
  const [modalVisible, setModalVisible] = useState(false); // initialize modal state

  const navigation = useNavigation();

  const handleClosePress = () => {
    setModalVisible(false);
    navigation.navigate('My Movies');
  };

  const fetchMovies = () => {
    fetch('http://172.20.10.2:5000/mymovies')
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
            review: movie.review,
            myrating: movie.myrating
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

  const selectedMovie = state.selected; // selected movie object
  const selectedMovieIndex = selectedMovie.index; // selected movie index

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Movies</Text>
      <Text style={styles.text}>Your Personal Film Library</Text>
      <ScrollView
        style={styles.results}
        refreshControl={
          <RefreshControl refreshing={state.refreshing} onRefresh={onRefresh} />
        }
      >
        {movies.map((movie, index) => (
          <TouchableHighlight
          onPress={() => {
            setState({ selected: { ...movie, index } });
            console.log('Selected movie:', movie);
            setModalVisible(true);
          }}
          onLongPress={() => {
            setState({ selected: { ...movie, index } });
            console.log('Long pressed movie:', movie);
            Alert.alert(
              `My ${movie.title} Review`,
    `${movie.review || 'No Review'}\n\nRating: ${movie.myrating || 'No Rating'}`,
    [
                {
                  text: 'OK',
                  onPress: () => console.log('OK Pressed')
                }
              ],
              { cancelable: true}
              
            );
          }}
          key={movie.title}
        >
          <View style={styles.result}>
            <Image
              source={{ uri: movie.poster }}
              style={styles.listposter}
              resizeMode='stretch'
            />
            <Text style={styles.heading}>{movie.title}</Text>
          </View>
        </TouchableHighlight>
        ))}
      </ScrollView>

      {/* Modal component */}
      <Modal visible={modalVisible} animationType="slide">
      <ScrollView
        style={styles.results}
        >
        
      
          <Image
            source={{ uri: selectedMovie.poster }}
            style={styles.poster}
            resizeMode="stretch"
          />
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedMovie.title}</Text>
            <Text style={styles.modaltext}>Plot: {selectedMovie.plot}</Text>
            <Text style={styles.modaltext}>Director: {selectedMovie.director}</Text>
            <Text style={styles.modaltext}>Genre: {selectedMovie.genre}</Text>
            <Text style={styles.modaltext}>Plot: {selectedMovie.plot}</Text>
            <Text style={styles.modaltext}>Awards: {selectedMovie.awards}</Text>
            <Text style={styles.modaltext}>Box Office: {selectedMovie.box_office}</Text>
            <Text style={styles.modaltext}>Run Time: {selectedMovie.runtime}</Text>
            <Text style={styles.modaltext}>Released: {selectedMovie.released}</Text>
            <Text style={styles.modaltext}>Rated: {selectedMovie.rated}</Text>
            <Text style={styles.modaltext}>Plot: {selectedMovie.plot}</Text>
            <Text style={styles.modaltext}>Awards: {selectedMovie.awards}</Text>
            <Text style={styles.modaltext} >My Review: {state.selected.review}</Text>
            <Text style={styles.modaltext} >My Rating:  {state.selected.myrating}/10</Text>
          </View>
          <View style={styles.buttonContainer}>
            <AppButton
              title="Close"
              onPress={handleClosePress}
              color={colours.third}
            />
          </View>
          </ScrollView>
        </Modal>
    </View>
  );
}
  

const styles = StyleSheet.create({

    container: {

        flex:1,
        backgroundColor: colours.primary,
        borderWidth:2,
        borderColor:colours.third,
        alignItems:'stretch',
        justifyContent: 'flex-end',
        paddingTop: 70,
        paddingHorizontal: 20,
    },

    poster: {

      width:'100%',
      height:600,
      borderWidth:10,
      borderRadius:20,
      borderColor:colours.third
  },

  listposter: {

    width:'100%',
    height:400,
    borderWidth:10,
    
    borderColor:colours.secondary
},

    buttonContainer:{

        backgroundColor: colours.primary,
        padding:20,
       
        width:"100%",
        justifyContent:'flex-end'
    },

    closeButton: {
      backgroundColor: colours.third,
      padding: 10,
      borderRadius: 5,
      marginTop: 20,
    },

    modalContent: {
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'center',
      backgroundColor: colours.primary,
      
    },

    modalTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      marginTop: 20,
      padding:10,
      color: colours.white,
      fontSize: 30,
      alignSelf:'center',
      fontFamily:'Avenir',
    },


    title: {
      color: colours.white,
      fontSize: 40,
      fontFamily:'Avenir',
      fontWeight: '600',
      textAlign: 'center',
      alignSelf:'center',
      marginBottom: 10,
      

  },

  text: {
    color: colours.white,
    fontSize: 24,
    fontWeight: '400',
    textAlign: 'center',
    alignSelf:'center',
    marginBottom: 20

},

  modaltext: {
    color: colours.white,
    fontSize: 20,
    fontWeight: '300',
    textAlign: 'left',
    alignSelf:'center',
    marginBottom: 20,
    padding:15

},

    searchbox: {

        fontSize:20,
        fontWeight:'20',
        padding:20,
        width:"100%",
        backgroundColor:colours.white,
        borderRadius:8,
        marginBottom:40,

    },

    results: {

        color: colours.white,
        fontSize: 22,
        fontWeight: '500',
        textAlign: 'left',
        backgroundColor:colours.primary
        
        

    },

    result: {

        flex:1,
        width:"100%",
        
        padding:20
        

    },

    heading: {

      color:colours.white,
      fontSize:22,
      fontWeight: "400",
      padding:15,
      textAlign:'center',
      backgroundColor:colours.third,

    },

    AddtoMyList: {

        color:"#000000",
        fontSize:18,
        fontWeight: "700",
        padding:20,
        textAlign:'center',
        backgroundColor:"#FFF"

    },


    
})

export default MyMoviesScreen;