import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableHighlight, TextInput, ScrollView, Image, Modal, SafeAreaView , Alert} from 'react-native';
import { TouchableOpacity } from "react-native";
import axios from 'axios';
import AppButton from '../components/AppButton';
import * as Progress from 'react-native-progress';
import AddingScreen from '../screens/AddingScreen';
import LottieView from 'lottie-react-native';
import AppModal from '../components/AppModal';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import colours from '../config/colours';

function SearchScreen(props) {

  
  const [state, setState] = React.useState({
    results: [],
    selected: { index: -1 },
  });
 

    const [showAddingScreen, setShowAddingScreen] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [detailsModalVisible, setDetailsModalVisible] = useState(false);
    

    const navigation = useNavigation();


    const apiurl = "http://www.omdbapi.com/?i=tt3896198&apikey=99fcef07"

    const [showModal, setShowModal] = useState(false);
    const [favouriteModal, setFavouritesModal] = useState(false);
    const [movies, setMovies] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    const [isAddingDetails, setIsAddingDetails] = useState(false);

    const [searchstate, setSearchState] = useState({

        s: "",
        searchresults: [],
        selectedfromSearch: {},
        userMovies: [],

    });

    const search = () => {
      if (!searchstate.s.trim()) {
        return;
      }
    
      axios(apiurl + "&s=" + searchstate.s).then(({ data }) => {
        let searchresults = data.Search
        if (!searchresults) {
          setShowModal(true);
          setSearchState(prevState => ({...prevState, searchresults: []}));
        } else {
          setSearchState(prevState => ({...prevState, searchresults}));
        }
      });
    };
  

    const [searchResult, setSearchResult] = useState(null);
    const [result, setResult] = useState(null);

    const openPopup = (id) => {
      axios(apiurl + "&t=" + id)
        .then(({ data }) => {
          setSearchResult(data);
          setSearchState((prevState) => {
            return { ...prevState, selectedfromSearch: data };
          });
        })
        .catch((error) => {
          console.error(error);
        });
    };

    const handAddRecommended = () => {


      const { imdb_votes, ...data } = searchResult;

    fetch('https://thawing-shore-72198.herokuapp.com/recommendedmovies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(searchResult),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Movie data saved:', data);
        
      })
      .catch(error => {
        console.error('Error saving movie data:', error);
      });

  
     
  };

  const handleOkPress = () => {
    let reviewText = '';
    let myratingText = '';
    Alert.prompt(
      searchResult.Title,
      "Please leave a review",
      review => {
        if (review !== null) {
          reviewText = review;
          Alert.prompt(
            searchResult.Title,
            "Please enter a rating out of 10",
            myrating => {
              if (myrating !== null) {
                myratingText = myrating;
                setIsAdding(true);
                const { imdb_votes, ...data } = searchResult;
                data.review = reviewText;
                data.myrating = myratingText;
                fetch('https://thawing-shore-72198.herokuapp.com/save-movie-data', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(data),
                })
                  .then(response => response.json())
                  .then(data => {
                    console.log('Movie data saved:', data);
                  })
                  .catch(error => {
                    console.error('Error saving movie data:', error);
                  }).finally(() => {
                    setTimeout(() => {
                      setIsAdding(false);
                    }, 2000);  // set a 2 second delay before setting setIsAdding to false
                  });
              }
            },
            'plain-text',
            null,
            'numeric',
          );
        }
      },
      'plain-text',
      null,
      'default',
    );
  };

  const handleModalOk = () => {
    setShowModal(false);
    
  };
    
    


    const handleAddWatchList = () => {

       
      setIsAdding(true);
        const { imdb_votes, ...data } = searchResult;

      fetch('https://thawing-shore-72198.herokuapp.com/watchlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchResult),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Movie data saved:', data);
          
        })
        .catch(error => {
          console.error('Error saving movie data:', error);
        }).finally(() => {
          setTimeout(() => {
            setIsAdding(false);
          }, 2000);  // set a 2 second delay before setting setIsAdding to false
        });



       
    };

    const fetchMovies = () => {
      fetch('https://thawing-shore-72198.herokuapp.com/recommendedmovies')
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

   

  const handleClosePress = () => {
    setDetailsModalVisible(false);
    
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
      let reviewText = '';
      let myratingText = '';
      Alert.prompt(
        selectedMovie.title,
        "Please leave a review",
        review => {
          if (review !== null) {
            reviewText = review;
            Alert.prompt(
              selectedMovie.title,
              "Please enter a rating out of 10",
              myrating => {
                if (myrating !== null) {
                  myratingText = myrating;
              setIsAddingDetails(true);
              const data = { ...selectedMovieData, review: review || 'No Review', myrating: myrating || 'No Rating'};
    
              // Make a request to add the movie to mymovies
              fetch('https://thawing-shore-72198.herokuapp.com/add-mymovies-from-recommended', {
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
              }).finally(() => {
                setTimeout(() => {
                  setIsAddingDetails(false);
                }, 2000);  // set a 2 second delay before setting setIsAdding to false
              });
          }
        },
        'plain-text',
        null,
        'numeric',
      );
    }
  },
  'plain-text',
  null,
  'default',
);
    };

    const handleAddWatch = () => {
      setIsAddingDetails(true);
      const data = { ...selectedMovieData};

      // Make a request to add the movie to mymovies
      fetch('https://thawing-shore-72198.herokuapp.com/add-watchlist-from-recommended', {
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
      }).finally(() => {
        setTimeout(() => {
          setIsAddingDetails(false);
        }, 2000);  // set a 2 second delay before setting setIsAdding to false
      });
    };

    
  
  
    useEffect(() => {
      fetchMovies();
    }, []);


    return (

      
        
        <View style = {styles.container}>

          
          
          

          <Text style = {styles.text}>Find your next favorite movie with our search feature!</Text>

            <TextInput 

            placeholder='Enter a movie ...'
            
            style = {styles.searchbox}
            onChangeText={text => setSearchState(prevState => {
                return {...prevState, s: text}
            })}
            onSubmitEditing={search}
            value = {searchstate.s}

            />

          
            
            {showModal && <AppModal visible={showModal} animationType="slide" transparent={true} onPress={handleModalOk} title='No Results Found' />}

            <ScrollView style={styles.results}>


                {searchstate.searchresults.map(searchResult => (

                    <TouchableOpacity 
                    key={searchResult.imdbID} 
                    onPress={() => openPopup(searchResult.Title)}
                    >

                    <View  style={styles.result}>
                        <Image
                        source={{uri: searchResult.Poster}}
                        style={styles.searchRecposter}
                        resizeMode="stretch"
                        />
                        <Text style={styles.heading}>{searchResult.Title}</Text>
                        
                        
                        
                    </View>
                    
                    </TouchableOpacity>
                    
                ))}

            </ScrollView>

        

            <Modal 
            animationType='slide'
            transparent={false}
            visible={(typeof searchstate.selectedfromSearch.Title != "undefined")}
            
            >
              {isAdding && (
                    <View style={styles.addingContainer}>
              <AddingScreen setIsAdding={setIsAdding} />
                    </View>
                  )}
               <ScrollView
                style={styles.results}
                >
                
              
                  <Image
                    source={{ uri: searchstate.selectedfromSearch.Poster }}
                    style={styles.poster}
                    resizeMode="stretch"
                  />

                <Text style={styles.modalTitle}>{searchstate.selectedfromSearch.Title}</Text>
                <Text style={styles.modaltext}>Rating: {searchstate.selectedfromSearch.imdbRating}</Text>
                <Text style={styles.modaltext} >Cast: {searchstate.selectedfromSearch.Actors}</Text>
                <Text style={styles.modaltext} >Director: {searchstate.selectedfromSearch.Director}</Text>
                <Text style={styles.modaltext} >Genre: {searchstate.selectedfromSearch.Genre}</Text>
                <Text style={styles.modaltext} >Plot: {searchstate.selectedfromSearch.Plot}</Text>
                <Text style={styles.modaltext} >Awards: {searchstate.selectedfromSearch.Awards}</Text>
                <View style={styles.buttonContainer}>
                
                <AppButton title="Add to my movies" color= {colours.white}  onPress={() => {handleOkPress()} }/>
                <AppButton title="Add to my watchlist" color= {colours.secondary}  onPress={() => {handleAddWatchList()} }/>
                <Modal visible={isAdding} animationType={'fade'}>
                <AddingScreen setIsAdding={setIsAdding} />
                </Modal>
                      
                <AppButton title="Close"   color= {colours.third} onPress={() => setSearchState(prevState => {

                return {...prevState, selectedfromSearch: {} }

                })}/>
                </View>
                </ScrollView>
                


                
            </Modal>
            
            <View style={styles.buttonContainer}>
                <AppButton title={'See some of our favourites !'} color={colours.third} onPress={() => setFavouritesModal(true)}/>
                </View>
                <Modal visible={favouriteModal} animationType='slide'>
                  <View style={styles.favouritecontainer}>
                    <Text style={styles.modalsubTitle}>Some of our favourites from all genres !</Text>
                  <ScrollView
        style={styles.modalResults}
       
      >
        {movies.map((movie, index) => (
          <TouchableHighlight
            onPress={() => {
              setState({ selected: { ...movie, index } });
              console.log('Selected movie:', movie);
              setDetailsModalVisible(true); // set modal state to true when a movie is selected
            }}
            key={movie.title}
          >
            <View style={styles.results}>
              <Image
                source={{ uri: movie.poster }}
                style={styles.searchRecposter}
                resizeMode='stretch'
              />
              <Text style={styles.heading}>{movie.title}</Text>
            </View>
          </TouchableHighlight>
        ))}
        
        </ScrollView>
        <View style={styles.buttonContainer}>
        <AppButton color={colours.third} title='Close' onPress={() => setFavouritesModal(false)}/>
        </View>
        </View>
        <Modal visible={detailsModalVisible} animationType="slide">
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
          </View>
          <View style={styles.buttonContainer}>
            <AppButton
              title="Add to my Movies"
              onPress={handleAddMovie}
              color={colours.secondary}
            />
            <AppButton title="Add to my watchlist" color={colours.white}  onPress={() => {handleAddWatch()} }/>
            <AppButton
              title="Close"
              onPress={handleClosePress}
              color={colours.third}
            />
            <Modal visible={isAddingDetails} animationType={'fade'}>
                <AddingScreen setIsAdding={setIsAddingDetails} />
                </Modal>
          </View>
          </ScrollView>
        </Modal>
      </Modal>
      
        </View>

    );
    
}


                
const styles = StyleSheet.create({

    container: {

        flex:20,
        backgroundColor: colours.primary,
        borderWidth:2,
        borderColor:colours.secondary,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingTop: 70,
        paddingHorizontal: 20,
        zIndex:9999,
        
    },

    favouritecontainer: {

      flex:1,
      backgroundColor: colours.primary,
        borderWidth:2,
        borderColor:colours.third,
      alignItems:'stretch',
      justifyContent: 'flex-end',
      paddingTop: 60,
      paddingHorizontal: 20,
  },

  addingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    zIndex: 9999,
  },

    poster: {

      width:'100%',
      height:600,
      borderWidth:10,
      borderRadius:20,
      borderColor:colours.third
  },

  searchposter: {

    width:'100%',
    height:600,
    borderWidth:10,
    
    borderColor:colours.secondary
},

searchRecposter: {

  width:'100%',
  height:300,
  borderWidth:10,
  
  borderColor:colours.secondary
},

buttonContainer:{

  backgroundColor: colours.primary,
  padding:5,
  marginBottom:0,
  width:"100%",
  justifyContent:'flex-end'
},


title: {
  color: colours.white,
  fontSize: 40,
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

    searchbox: {

        fontSize:18,
        fontWeight:'20',
        padding:15,
        width:"100%",
        backgroundColor:colours.white,
        borderRadius:30,
        marginBottom:10,

    },

    

    results: {

      color: colours.white,
      fontSize: 22,
      fontWeight: '500',
      textAlign: 'left',
      backgroundColor:colours.primary,
    
      paddingBottom:30,
      
      
      
      

  },

  result: {

    
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

    modaltext: {
      color: colours.white,
      fontSize: 20,
      fontWeight: '300',
      textAlign: 'center',
      alignSelf:'center',
      marginBottom: 10,
      padding:15
  
  },

  modalTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    marginTop: 20,
    padding:10,
    color: colours.white,
    fontSize: 30,
    alignSelf:'center',
    textAlign:'center',
  },

  modalsubTitle: {
    fontSize: 28,
    fontWeight: '400',
    
    padding:10,
    color: colours.white,
    fontSize: 30,
    alignSelf:'center',
    textAlign:'center',
    
  },

  modalResults:{
    color: colours.white,
        fontSize: 22,
        fontWeight: '500',
        textAlign: 'left',
        backgroundColor:colours.primary,
        width:'100%',
        padding:45
      
    
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

export default SearchScreen;