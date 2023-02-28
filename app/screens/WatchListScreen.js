
import React, { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet, View, Image, Text, ScrollView, Modal, TouchableHighlight } from 'react-native';
import { SafeAreaView } from 'react-native-web';
import AppButton from '../components/AppButton';
import axios from 'axios';

function WatchListScreen(props) {

    const apiurl = "http://www.omdbapi.com/?i=tt3896198&apikey=99fcef07"
  
    const [result, setResult] = useState({});
  
    const [state, setState] = React.useState({
      results: [],
      selected: {},
    });
  
    const openPopup = (id) => {
      console.log('Fetching movie details for ID:', id);
      axios(apiurl + "&t=" + id)
        .then(({ data }) => {
          console.log('Received movie details:', data);
          setResult(data);
          setState((prevState) => {
            return { ...prevState, selected: data };
          });
        })
        .catch((error) => {
          console.error(error);
        });
    };
  
    const [movies, setMovies] = useState([]);
  
    useEffect(() => {
      fetch('http://172.20.10.2:5000/watchlist')
        .then(response => response.json())
        .then(data => {
          console.log('All WatchList movies:', data);
          setMovies(data);
          setState((prevState) => {
            return { ...prevState, results: data };
          });
        })
        .catch(error => {
          console.error('Error fetching movies:', error);
        });
    }, []);
  
    return (
      <View style={styles.container}>
  
        <Text style={styles.title}>My WatchList</Text>
  
        <ScrollView style={styles.results}>
          {state.results.map(result => (
            <TouchableHighlight
              key={result.imdbID}
              onPress={() => openPopup(result.title)}
            >
              <View style={styles.result}>
                <Image
                  source={{ uri: result.poster }}
                  style={{
                    width: "100%",
                    height: 300,
                  }}
                  resizeMode="cover"
                />
                <Text style={styles.heading}>{result.title}</Text>
              </View>
            </TouchableHighlight>
          ))}
        </ScrollView>
  
        <Modal
          animationType='fade'
          transparent={false}
          visible={(typeof state.selected.title != "undefined")}
        >
          <SafeAreaView style={styles.popup}>
            <Text style={styles.poptitle}>{state.selected.Title}</Text>
            <Text style={styles.results}>Rating: {state.selected.imdbRating}</Text>
            <Text style={styles.results} >Cast: {state.selected.Actors}</Text>
            <Text style={styles.results} >Director: {state.selected.Director}</Text>
            <Text style={styles.results} >Genre: {state.selected.Genre}</Text>
            <Text style={styles.results} >Plot: {state.selected.Plot}</Text>
            <Text style={styles.results} >Awards: {state.selected.Awards}</Text>
          </SafeAreaView>
          <View style={styles.buttonContainer}>
            <AppButton
              title="Close"
              onPress={() => setState(prevState => {
                return { ...prevState, selected: {} }
              })}
            />
          </View>
        </Modal>
      </View>
    );
  }
  
  

const styles = StyleSheet.create({

    container: {

        flex:10,
        backgroundColor: '#750a18',
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


    title: {
        color: '#FFF',
        fontSize: 50,
        fontWeight: '700',
        textAlign: 'center',
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

        color: '#000000',
        fontSize: 22,
        fontWeight: '600',
        textAlign: 'left',
        marginBottom: 20,
        padding: 40,

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

export default WatchListScreen;