import React, { useState, useEffect } from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  Modal,
  Image,
  TouchableOpacity,
  FlatList,
  Alert
} from 'react-native';
import AppButton from '../components/AppButton';
import HomeScreenTile from '../components/HomeScreenTile';
import { Dropdown } from 'react-native-element-dropdown';
import ListItemFriends from '../components/ListItemFriends';
import HomeScreenTile2 from '../components/HomeScreenTile2';
import colours from '../config/colours';

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
        const response = await fetch('https://thawing-shore-72198.herokuapp.com/friends');
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
    
    <TouchableOpacity onPress={() => {
      Alert.alert(
        `Please use our search feature to find more information on this weeks trending movies !`,
        'Please use our search feature to find more information on this weeks trending movies !'
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed')
          }
        ],
        { cancelable: true }
      );
    }}>
      <View style={styles.movieContainer}>
        <Image
          style={styles.listposter}
          source={{ uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}` }}
        />
        <Text style={styles.movieTitle}>{item.title}</Text>
      </View>
    </TouchableOpacity>
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
          <TouchableOpacity onPress={() => {
      Alert.alert(
        `Please use our search feature to find more information on this weeks trending movies !`,
        'Please use our search feature to find more information on this weeks trending movies !'
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed')
          }
        ],
        { cancelable: true }
      );
    }}>
      <View style={styles.movieContainer}>
        <Image
          style={styles.listposter}
          source={{ uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}` }}
        />
        <View style={styles.movieDetails}>
          <Text style={styles.movieTitle}>{item.title}</Text>
          <Text style={styles.movieGenre}>{item.genre}</Text>
        </View>
      </View>
      </TouchableOpacity>
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
    <ScrollView style={styles.container}>
    
        <Text style={styles.title}>The Film Club</Text>
      
    <View style={styles.topContainer}>

        <View  style={styles.bigcontainer} >
            <Text style={styles.tileTitle}>Hello Oisin!</Text>
            <Text style={styles.tileText}>Welcome to the Film Club, the go-to app for all movie lovers out there!</Text>

            
        </View>
      
      <View style={styles.rowContainer}>
        <HomeScreenTile2 title={"About Us"} icon={'info'} color={colours.third} onPress={toggleInfoModal}/>

        <HomeScreenTile title={"Friends"} icon={'user-friends'} color={colours.third} onPress={toggleFriendModal}/>
      </View>
    </View>
    <View style={styles.bottomContainer}>
      <View style={styles.rowContainer}>
      <HomeScreenTile2 title={"Trending"} icon={'trending-up'} color={colours.third} onPress={toggleTopModal}/>

      <HomeScreenTile title={"By Genre"} icon={'film'} color={colours.third} onPress={toggleRecommendedModal}/>
      </View>
    </View>
    <Modal visible={isInfoModalVisible} animationType="slide">
        <View style={styles.modalBackground}>
        <Text style={styles.modalTitle}>
          About us</Text>
        <ScrollView>
          
          <Text style={styles.aboutText}>Welcome to the Film Club, the ultimate destination for movie lovers! Our app is designed to provide you with the latest information about the trending movies of the week, and to help you discover new movies based on your favorite genres.  Whether you're a die-hard fan of action movies or you prefer to be transported to a different world with fantasy movies, our app has something for everyone.</Text>

          <Text style={styles.aboutText}>At the Film Club, we understand that watching movies is not just a form of entertainment, it's an experience. That's why we've created a platform that allows you to curate your own movie collection, and share your thoughts and opinions with others. With our search feature, you can easily find any movie you want and add it to your watchlist or your own personal list of favorite movies.</Text>

          <Text style={styles.aboutText}>We believe that the best part of watching a movie is being able to discuss it with others. That's why we've included a review feature, so you can share your thoughts on a movie with the rest of the Film Club community. Whether you loved a movie or you didn't enjoy it as much, we want to hear from you.</Text>

          <Text style={styles.aboutText}>The Film Club is more than just an app - it's a community of movie lovers who are passionate about the art of cinema. So join us today, and let's explore the world of movies together!</Text>
          <AppButton
              title="Close"
              onPress={toggleInfoModal}
              color={colours.secondary}
            />
        </ScrollView>
        </View>
      </Modal>

      <Modal visible={isFriendModalVisible} animationType="slide">
        
  <View style={styles.modalBackground}>
    <View style={styles.modalImage}>
      <Text style={styles.modalTitle}>My Friends</Text>
      <ScrollView style={{backgroundColor:colours.primary}}>
      <Text style={styles.modalText}>See your friends favourite genres and top movie!</Text>
      
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
        color={colours.secondary}
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
          <AppButton title="Close" onPress={toggleTopModal} color={colours.secondary} />
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
          <AppButton title="Close" onPress={toggleRecommendedModal} color={colours.secondary} />
        </View>
    </Modal>
    

      
  
  </ScrollView>
);
}

  

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: colours.primary,
        borderWidth:2,
        borderColor:colours.third
      },
      listposter: {

        width:'100%',
        height:350,
        borderWidth:10,
        
        borderColor:colours.third
    },
      buttonContainer:{

        backgroundColor: colours.primary,
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
        marginTop:10,
        padding:5
      },
      title: {
        fontSize: 40,
      
        fontWeight: '600',
        color: colours.white,
        marginTop:75,
        alignSelf:'center'
      },
      smalltext: {
        fontSize: 20,
        color: colours.white,
        textAlign: 'center',
        marginHorizontal: 20,
        marginTop: 20,
      },

      buttontext: {
        fontSize: 16,
        color: colours.white,
        textAlign: 'center',
        
      },

      smallcontainer: {
        backgroundColor: colours.third,
        alignItems: 'center',
        justifyContent: 'center',
        height: 70,
        width: 170,
        borderRadius: 20,
        marginVertical: 10,
        marginHorizontal: 10,
      },

      bigcontainer: {
        backgroundColor: colours.third,
        alignItems: 'center',
        justifyContent: 'center',
        height: 220,
        width: 350,
        borderRadius: 20,
        marginTop: 40,
        marginHorizontal: 10,
        marginBottom: 20,
        borderWidth:2,
        borderColor:colours.secondary
      },
      modalContainer: {
        flex: 1,
        backgroundColor: colours.white,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      },
      modalTitle: {
        fontSize: 36,
        fontWeight: 'bold',
        marginTop: 70,
        padding:15,
        textAlign:'center',
        color:colours.white
      },
      modalText: {
        fontSize: 22,
        marginBottom: 10,
        marginTop:60,
        color:colours.white,
        padding:15,
        textAlign:'center'
      },

      aboutText: {
        fontSize: 18,
        marginBottom: 10,
        marginTop:20,
        color:colours.white,
        padding:15,
        textAlign:'center'
      },

      tileTitle: {
        fontSize: 35,
        fontWeight: '500',
        marginBottom: 10,
        color:colours.white
      },

      tileText: {
        fontSize: 20,
        marginBottom: 10,
        color:colours.white,
        padding:15
      },

      modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colours.primary,
        
       
        
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
        backgroundColor:colours.white,
        borderRadius:36,
        marginBottom:1,

    },

    dropdown: {

        fontSize:15,
        fontWeight:'20',
        padding:10,
        width:"80%",
        backgroundColor:colours.white,
        borderRadius:10,
        
       
        marginBottom:10,
        alignSelf:'center',
        zIndex:9999

    },

    movieContainer: {
        margin: 10,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: colours.white,
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
        backgroundColor: colours.primary
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
        color: colours.white,
      },

      
      icon: {
        marginRight: 5,
      },
      label: {
        position: 'absolute',
        backgroundColor: colours.white,
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