import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableHighlight, TextInput, ScrollView, Image, Modal, SafeAreaView , Alert} from 'react-native';
import { TouchableOpacity } from "react-native";
import axios from 'axios';
import AppButton from '../components/AppButton';
import * as Progress from 'react-native-progress';
import AddingScreen from '../screens/AddingScreen';
import AppModal from '../components/AppModal';
import AppNavigator from '../navigation/AppNavigator';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';

function SearchScreen(props) {

  const TMDB_API_KEY = '9d238a902ba51bf41bc13aded64d7960';
    const TRENDING_MOVIES_URL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${TMDB_API_KEY}`;

  const [isRecommendedModalVisible, setIsRecommendedModalVisible] = useState(false);

  const toggleRecommendedModal = () => {
    setIsRecommendedModalVisible(!isRecommendedModalVisible);
  };

  const [selectedGenre, setSelectedGenre] = useState(null);
    const [genremovies, setGenreMovies] = useState([]);
  
    const fetchMoviesByGenre = (genreId) => {
      const MOVIES_BY_GENRE_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreId}&vote_count.lte=7&language=en-US`;
      fetch(MOVIES_BY_GENRE_URL)
        .then((response) => response.json())
        .then((data) => {
          setGenreMovies(data.results);
        })
        .catch((error) => {
          console.error(error);
        });
    };
  
    useEffect(() => {
      if (selectedGenre) {
        fetchMoviesByGenre(selectedGenre);
      }
    }, [selectedGenre]);
  
    const renderGenreMovie = ({ item }) => (
      <View style={styles.movieContainer}>
        <Image
          style={styles.moviePoster}
          source={{ uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}` }}
        />
        <View style={styles.movieDetails}>
          <Text style={styles.movieTitle}>{item.title}</Text>
          <Text style={styles.movieGenre}>{item.genre}</Text>
        </View>
      </View>
    );
  
    const handleGenreSelect = (genreId) => {
      setSelectedGenre(genreId);
    };

  

    const genres = [
        { label: 'Select a genre', value: null },
        { label: 'Action', value: '28' },
        { label: 'Comedy', value: '35' },
        { label: 'Drama', value: '18' },
        { label: 'Science Fiction', value: '878' },
        { label: 'Thriller', value: '53' },
      ];

    const [showAddingScreen, setShowAddingScreen] = useState(false);


    const apiurl = "http://www.omdbapi.com/?i=tt3896198&apikey=99fcef07"

    const [showModal, setShowModal] = useState(false);

    const [state, setState] = useState({

        s: "",
        results: [],
        selected: {},
        userMovies: [],

    });

    const search = () => {
      if (!state.s.trim()) {
        return;
      }
    
      axios(apiurl + "&s=" + state.s).then(({ data }) => {
        let results = data.Search
        if (!results) {
          setShowModal(true);
          setState(prevState => ({...prevState, results: []}));
        } else {
          setState(prevState => ({...prevState, results}));
        }
      });
    };
  

    const [result, setResult] = useState(null);

    const openPopup = (id) => {
      axios(apiurl + "&t=" + id)
        .then(({ data }) => {
          setResult(data);
          setState((prevState) => {
            return { ...prevState, selected: data };
          });
        })
        .catch((error) => {
          console.error(error);
        });
    };

    const handAddRecommended = () => {


      const { imdb_votes, ...data } = result;

    fetch('http://172.20.10.2:5000/recommendedmovies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(result),
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
    Alert.prompt(result.Title, "Please leave a review", review => {
      if (review !== null) {
        const { imdb_votes, ...data } = result;
        data.review = review;
        fetch('http://172.20.10.2:5000/save-movie-data', {
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
          });
      }
    });
  };

  const handleModalOk = () => {
    setShowModal(false);
    navigation.navigate('Login');
  };
    
    const handleAddMovie = () => {


        const { imdb_votes, ...data } = result;

      fetch('http://172.20.10.2:5000/save-movie-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(result),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Movie data saved:', data);
          
        })
        .catch(error => {
          console.error('Error saving movie data:', error);
        });

    
       
    };


    const handleAddWatchList = () => {

       

        const { imdb_votes, ...data } = result;

      fetch('http://172.20.10.2:5000/watchlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(result),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Movie data saved:', data);
          
        })
        .catch(error => {
          console.error('Error saving movie data:', error);
        });



       
    };



    return (
        
        <View style = {styles.container}>

            <TextInput 

            placeholder='Enter a movie ...'
            
            style = {styles.searchbox}
            onChangeText={text => setState(prevState => {
                return {...prevState, s: text}
            })}
            onSubmitEditing={search}
            value = {state.s}

            />

          <DropDownPicker
                visible={isRecommendedModalVisible}
                items={genres}
                defaultValue={selectedGenre}
                placeholder="Select a genre"
                containerStyle={{ height: 40 }}
                style={styles.dropdown}
                itemStyle={{ justifyContent: 'flex-start' }}
                dropDownStyle={{ backgroundColor: '#fafafa', marginTop: 10 , zIndex:9999}}
                onChangeItem={(item) => handleGenreSelect(item.value)}
              />
            
            {showModal && <AppModal visible={showModal} animationType="slide" transparent={true} onPress={handleModalOk} title='No Results Found' />}

            <ScrollView style={styles.results}>


                {state.results.map(result => (

                    <TouchableOpacity 
                    key={result.imdbID} 
                    onPress={() => openPopup(result.Title)}
                    >

                    <View  style={styles.result}>
                        <Image
                        source={{uri: result.Poster}}
                        style={{
                            width:"100%",
                            height:300,
                        }}
                        resizeMode="stretch"
                        />
                        <Text style={styles.heading}>{result.Title}</Text>
                        
                        
                        
                    </View>
                    
                    </TouchableOpacity>
                    
                ))}

            </ScrollView>

        

            <Modal 
            animationType='slide'
            transparent={false}
            visible={(typeof state.selected.Title != "undefined")}
            
            >
               <ScrollView
                style={styles.results}
                >
                
              
                  <Image
                    source={{ uri: state.selected.Poster }}
                    style={{
                      width: '100%',
                      height: 600,
                    }}
                    resizeMode="stretch"
                  />

                <Text style={styles.modalTitle}>{state.selected.Title}</Text>
                <Text style={styles.modaltext}>Rating: {state.selected.imdbRating}</Text>
                <Text style={styles.modaltext} >Cast: {state.selected.Actors}</Text>
                <Text style={styles.modaltext} >Director: {state.selected.Director}</Text>
                <Text style={styles.modaltext} >Genre: {state.selected.Genre}</Text>
                <Text style={styles.modaltext} >Plot: {state.selected.Plot}</Text>
                <Text style={styles.modaltext} >Awards: {state.selected.Awards}</Text>
                <View style={styles.buttonContainer}>
                <AppButton title="Add to my movies"   onPress={() => {handleOkPress()} }/>
                <AppButton title="Add to my watchlist"   onPress={() => {handleAddWatchList()} }/>
                
                <AppButton title="Close"   color= "#E6AF2E" onPress={() => setState(prevState => {

                return {...prevState, selected: {} }

                })}/>
                </View>
                </ScrollView>
                


                
            </Modal>

        </View>

    );
    
}


                
const styles = StyleSheet.create({

    container: {

        flex:10,
        backgroundColor: '#3F0D12',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingTop: 100,
        paddingHorizontal: 20,
        
    },

    buttonContainer:{

        backgroundColor: '#3F0D12',
        padding:20,
        width:"100%",
        justifyContent:'flex-end',
        marginBottom:20
    },


    title: {
        color: '#FFF',
        fontSize: 50,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 20

    },

    searchbox: {

        fontSize:20,
        fontWeight:'20',
        padding:20,
        width:"100%",
        backgroundColor:"#FFF",
        borderRadius:8,
        marginBottom:40,

    },

    results: {

        backgroundColor: '#3F0D12',
        fontSize: 22,
        fontWeight: '600',
        textAlign: 'left',
        
        padding: 20,

    },

    result: {

        flex:1,
        width:"100%",
        marginBottom: 20
        

    },

    heading: {

      color:"#FFF",
      fontSize:22,
      fontWeight: "400",
      padding:15,
      textAlign:'center',
      backgroundColor:"#A71D31",

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

export default SearchScreen;