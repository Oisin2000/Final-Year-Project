import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  FlatList
} from 'react-native';
import { SafeAreaView } from 'react-native-web';
import AppButton from '../components/AppButton';
import { TouchableOpacity } from 'react-native';
import {FontAwesome5, MaterialCommunityIcons} from '@expo/vector-icons';
import HomeScreenTile from '../components/HomeScreenTile';
import ListItem from '../components/ListItem';
import axios from 'axios';
import { Dropdown } from 'react-native-element-dropdown';
import ListItemFriends from '../components/ListItemFriends';
import AntDesign from '@expo/vector-icons/AntDesign';

function HomeScreen2(props) {

    const TMDB_API_KEY = '9d238a902ba51bf41bc13aded64d7960';
    const TRENDING_MOVIES_URL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${TMDB_API_KEY}`;
   

    const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);

  const toggleInfoModal = () => {
    setIsInfoModalVisible(!isInfoModalVisible);
  };

  const [isFriendModalVisible, setIsFriendModalVisible] = useState(false);

  const toggleFriendModal = () => {
    setIsFriendModalVisible(!isFriendModalVisible);
  };

  const [isTopModalVisible, setIsTopModalVisible] = useState(false);

  const toggleTopModal = () => {
    setIsTopModalVisible(!isTopModalVisible);
  };

  const [isRecommendedModalVisible, setIsRecommendedModalVisible] = useState(false);

  const toggleRecommendedModal = () => {
    setIsRecommendedModalVisible(!isRecommendedModalVisible);
  };

  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://172.20.10.2:5000/friends');
        if (response.ok) {
          const data = await response.json();
          setFriends(data);
        } else {
          throw new Error('Network response was not ok.');
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.row}>
        <Text style={styles.name}>{item.Name}</Text>
        <Text style={styles.genres}>{item.Genres}</Text>
        <Text style={styles.topFilm}>{item.TopFilm}</Text>
      </View>
    );
  };

  const renderMovie = ({ item }) => (
    
      <View style={styles.movieContainer}>
        <Image
          style={styles.moviePoster}
          source={{ uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}` }}
        />
        <Text style={styles.movieTitle}>{item.title}</Text>
      </View>
    
  );
  

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
  


    return (
        
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderMovie}
        />
        
    );
  };


  
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [genremovies, setGenreMovies] = useState([]);
  
    const fetchMoviesByGenre = (genreId) => {
      const MOVIES_BY_GENRE_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreId}&vote_count.gte=8&language=en-US`;
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
        <View style={styles.row}>
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
      

      
    
  return (
    
    <View style={styles.container}>
        <Text style={styles.title}>The Film Club</Text>
      <Text style={styles.smalltext}>Welcome to the Film Club, the go-to app for all movie lovers out there!</Text>
    <View style={styles.topContainer}>

        <ImageBackground source={require('../assets/rows-red-seats-theater.jpg')} style={styles.bigcontainer} imageStyle={{borderRadius:20}}>
            <Text style={styles.tileTitle}>Hello User!</Text>
            <Text style={styles.tileText}>Search below for the all the best Movies !</Text>

            <TextInput 

            placeholder='Enter a movie ...'
            style = {styles.searchbox}
           
            />
        </ImageBackground>
      
      <View style={styles.rowContainer}>
        <HomeScreenTile title={"About Us"} icon={'info'} color="#A71D31" onPress={toggleInfoModal}/>

        <HomeScreenTile title={"Friends"} icon={'user-friends'} color="#A71D31" onPress={toggleFriendModal}/>
      </View>
    </View>
    <View style={styles.bottomContainer}>
      <View style={styles.rowContainer}>
      <HomeScreenTile title={"Top 10 Movies"} icon={'trophy'} color="#A71D31" onPress={toggleTopModal}/>

      <HomeScreenTile title={"Recommended"} icon={'film'} color="#A71D31" onPress={toggleRecommendedModal}/>
      </View>
    </View>
    <Modal visible={isInfoModalVisible} animationType="slide">
        <View style={styles.modalBackground}>
        <ImageBackground blurRadius={10} source={require('../assets/rows-red-seats-theater.jpg')} style={styles.modalImage}>
          <Text style={styles.modalTitle}>
          About us</Text>
          <Text style={styles.modalText}>This app is all about movies!</Text>
          <AppButton
              title="Close"
              onPress={toggleInfoModal}
              color='#E6AF2E'
            />
        </ImageBackground>
        </View>
      </Modal>

      <Modal visible={isFriendModalVisible} animationType="slide">
        
  <View style={styles.modalBackground}>
    <View style={styles.modalImage}>
      <Text style={styles.modalTitle}>My Friends</Text>
      <Text style={styles.modalText}>See your friends favourite genres and top movie!</Text>
      <ScrollView style={{backgroundColor:'#3F0D12'}}>
      {friends.map((friend) => (
        <ListItemFriends
          key={friend.Name}
          title={friend.Name}
          subtitle={friend.Genres}
          image={{ uri: friend.TopFilm }}
        />
      ))}
      </ScrollView>
    </View>
  </View>
 

  
  <View style={styles.buttonContainer}>
      <AppButton
        title="Close"
        onPress={toggleFriendModal}
        color='#E6AF2E'
      />
      </View>
</Modal>

<Modal visible={isTopModalVisible} animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalBackground}>
            <View style={styles.modalImage}>
              <Text style={styles.modalText}>This Week's Trending Movies !</Text>
              <TrendingMovies style={styles.trending}/>
            </View>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <AppButton title="Close" onPress={toggleTopModal} color="#E6AF2E" />
        </View>
      </Modal>

      <Modal visible={isRecommendedModalVisible} animationType="slide">
        
      <View style={styles.modalBackground}>
      <Text style={styles.modalText}>Discover movies from your favourite Genres ! </Text>
      <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={genres}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={ 'Select Genre' }
          searchPlaceholder="Search..."
          value={genres}
          onChange={item => {
            setSelectedGenre(item.value);
          }}
          
        />
      <FlatList
        data={genremovies}
        renderItem={renderGenreMovie}
        keyExtractor={(item) => item.id.toString()}
      />
</View>
<View style={styles.buttonContainer}>
          <AppButton title="Close" onPress={toggleRecommendedModal} color="#E6AF2E" />
        </View>
    </Modal>
    

      
  </View>
);
}

  

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#3F0D12',
      },
      buttonContainer:{

        backgroundColor: '#3F0D12',
        padding:20,
        width:"100%",
        justifyContent:'flex-end',
        
        
    },
      topContainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
      },
      bottomContainer: {
        flex: 1.5,
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
      rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:30,
        padding:5
      },
      title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#fff',
        marginTop:75,
        alignSelf:'center'
      },
      smalltext: {
        fontSize: 20,
        color: '#fff',
        textAlign: 'center',
        marginHorizontal: 20,
        marginTop: 20,
      },

      buttontext: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
        
      },

      smallcontainer: {
        backgroundColor: '#A71D31',
        alignItems: 'center',
        justifyContent: 'center',
        height: 70,
        width: 170,
        borderRadius: 20,
        marginVertical: 10,
        marginHorizontal: 10,
      },

      bigcontainer: {
        backgroundColor: '#A71D31',
        alignItems: 'center',
        justifyContent: 'center',
        height: 220,
        width: 350,
        borderRadius: 20,
        marginTop: 40,
        marginHorizontal: 10,
        marginBottom: 20,
        borderWidth:2,
        borderColor:'#FFF'
      },
      modalContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      },
      modalTitle: {
        fontSize: 36,
        fontWeight: 'bold',
        marginTop: 70,
        color:"#FFF"
      },
      modalText: {
        fontSize: 22,
        marginBottom: 30,
        marginTop:80,
        color:"#FFF",
        padding:15,
        textAlign:'center'
      },

      tileTitle: {
        fontSize: 30,
        fontWeight: '500',
        marginBottom: 10,
        color:"#FFF"
      },

      tileText: {
        fontSize: 18,
        marginBottom: 10,
        color:"#FFF",
        padding:15
      },

      modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3F0D12',
        zIndex:1
       
        
      },
      modalImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        alignItems:'center',
        justifyContent:'center',
        
      },

      icons: {
        
        padding:20,
        alignItems:'center',
        justifyContent:'center',
        
      },

      searchbox: {

        fontSize:15,
        fontWeight:'20',
        padding:10,
        width:"80%",
        backgroundColor:"#fff",
        borderRadius:36,
        marginBottom:1,

    },

    dropdown: {

        fontSize:15,
        fontWeight:'20',
        padding:10,
        width:"80%",
        backgroundColor:"#fff",
        borderRadius:10,
        
        marginTop:10,
        marginBottom:20,
        alignSelf:'center',
        zIndex:9999

    },

    movieContainer: {
        margin: 10,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#ffffff',
        elevation: 5,
        width:250,
        
      },
      moviePoster: {
        height: 250,
        width:250,
        resizeMode:'stretch',
      },
      movieTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        padding: 10,
        textAlign: 'center',
      },
      trending: {
        flex: 1,
        backgroundColor: "#3F0D12"
      },

      backdropImage: {
        width: '50%',
        height: 20,
      },
      movieDetailsContainer: {
        padding: 20,
      },
      
      movieOverview: {
        fontSize: 16,
        color: '#FFFFFF',
      },

      
      icon: {
        marginRight: 5,
      },
      label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
      },
      placeholderStyle: {
        fontSize: 16,
      },
      selectedTextStyle: {
        fontSize: 16,
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
      },
    });

    
        
    
export default HomeScreen2;