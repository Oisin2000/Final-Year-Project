import React, { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet, View, Image, Text, ScrollView, Modal, TouchableHighlight, RefreshControl, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-web';
import AppButton from '../components/AppButton';
import { useNavigation } from '@react-navigation/native';

function WatchListScreen(props) {
  const [state, setState] = React.useState({
    results: [],
    selected: { index: -1 },
  });

  const [movies, setMovies] = useState([]);
  const [modalVisible, setModalVisible] = useState(false); // initialize modal state

  const navigation = useNavigation();

  const handleClosePress = () => {
    setModalVisible(false);
    navigation.navigate('My WatchList');
  };

  


  const fetchMovies = () => {
    fetch('http://172.20.10.2:5000/watchlist')
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
  const selectedMovie = state.selected; // selected movie object
  const selectedMovieIndex = selectedMovie.index; // selected movie index

  const selectedMovieData = {
    actors: selectedMovie.actors,
    awards: selectedMovie.awards,
    box_office: selectedMovie.box_office,
    country: selectedMovie.country,
    director: selectedMovie.director,
    dvd: selectedMovie.dvd,
    genre: selectedMovie.genre,
    imdb_id: selectedMovie.imdb_id,
    imdb_rating: selectedMovie.imdb_rating,
    imdb_votes: selectedMovie.imdb_votes,
    language: selectedMovie.language,
    metascore: selectedMovie.metascore,
    plot: selectedMovie.plot,
    poster: selectedMovie.poster,
    production: selectedMovie.production,
    rated: selectedMovie.rated,
    released: selectedMovie.released,
    runtime: selectedMovie.runtime,
    title: selectedMovie.title,
    type: selectedMovie.type,
    website: selectedMovie.website,
    writer: selectedMovie.writer,
    year: selectedMovie.year,
  };

  const handleAddMovie = () => {
    // Prompt the user to enter a review
    Alert.prompt(
      selectedMovie.title,
      'Leave a review',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Ok',
          onPress: review => {
            const data = { ...selectedMovieData, review: review || 'No Review' };
            
            // Make a request to remove the selected movie from the watchlist
            fetch('http://172.20.10.2:5000/remove-watchlist', {
              method: 'POST',
              body: JSON.stringify(selectedMovieData),
              headers: {
                'Content-Type': 'application/json'
              }
            })
            .then(response => {
              console.log(response.status); // log the response status code
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
    
              // Make a request to add the movie to mymovies
              fetch('http://172.20.10.2:5000/add-mymovies-from-watchlist', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                  'Content-Type': 'application/json',
                },
              })
              .then(response => {
                console.log(response.status); // log the response status code
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
                return response.json();
              })
              .then(data => {
                console.log('Data received:', data.message);
              })
              .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
              });
            });
          },
        },
      ],
    );
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
    <View style={styles.container}>
      <Text style={styles.title}>My WatchList</Text>
      <Text style={styles.text}>Never forget a movie again</Text>
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
              setModalVisible(true); // set modal state to true when a movie is selected
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
            style={{
              width: '100%',
              height: 600,
            }}
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
          </View>
          <View style={styles.buttonContainer}>
            <AppButton
              title="Add to my Movies"
              onPress={handleAddMovie}
              color='#FFF'
            />
            <AppButton
              title="Close"
              onPress={handleClosePress}
              color='#E6AF2E'
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
        backgroundColor: '#3F0D12',
        alignItems:'stretch',
        justifyContent: 'flex-end',
        paddingTop: 70,
        paddingHorizontal: 20,
    },

    buttonContainer:{

        backgroundColor: '#3F0D12',
        padding:20,
       
        width:"100%",
        justifyContent:'flex-end'
    },

    closeButton: {
      backgroundColor: '#E6AF2E',
      padding: 10,
      borderRadius: 5,
      marginTop: 20,
    },

    modalContent: {
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'center',
      backgroundColor: '#3F0D12',
      
    },

    modalTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      marginTop: 20,
      color: '#FFF',
      fontSize: 30,
      alignSelf:'center',
      fontFamily:'Avenir',
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
      fontSize: 30,
      fontWeight: '500',
      textAlign: 'center',
      alignSelf:'center',
      marginBottom: 20

  },

  modaltext: {
    color: '#FFF',
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
        backgroundColor:"#fff",
        borderRadius:8,
        marginBottom:40,

    },

    results: {

        color: '#FFF',
        fontSize: 22,
        fontWeight: '500',
        textAlign: 'left',
        
        

    },

    result: {

        flex:1,
        width:"100%",
        
        padding:20
        

    },

    heading: {

        color:"#FFF",
        fontSize:22,
        fontWeight: "400",
        padding:15,
        textAlign:'center',
        backgroundColor:"#A71D31",
        

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

export default WatchListScreen;