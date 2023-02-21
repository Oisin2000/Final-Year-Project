import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableHighlight, TextInput, ScrollView, Image, Modal, SafeAreaView } from 'react-native';
import axios from 'axios';
import AppButton from '../components/AppButton';

function SearchScreen(props) {

    const apiurl = "http://www.omdbapi.com/?i=tt3896198&apikey=99fcef07"

    const [state, setState] = useState({

        s: "Enter a movie ...",
        results: [],
        selected: {}

    });

    const search = () => {

        axios(apiurl + "&s=" + state.s).then(({ data }) => {

            let results = data.Search
            setState(prevState => {
                return {...prevState, results: results}
            })

        } )

    }

    const openPopup = id => {

        axios(apiurl + "&t=" + id).then(({ data }) => {

            let result = data;

            console.log(result);

            setState(prevState => {
                return {...prevState, selected: result}
            

            })
        })
    }
    const addToUserMovies = (movie) => {
        // Make an API request to add the movie to the user's list
        console.log(movie);
        axios.post('/api/addMovie', {
          title: movie.Title,
          poster: movie.Poster,
          
           // Replace with the current user's ID
        }).then((response) => {
          // If the API call was successful, update the userMovies state variable
          setUserMovies([...userMovies, response.data]);
        }).catch((error) => {
          // If the API call failed, log the error
          console.error(error);
        });
      };


    return (
        
        <View style = {styles.container}>

            <TextInput 
            
            style = {styles.searchbox}
            onChangeText={text => setState(prevState => {
                return {...prevState, s: text}
            })}
            onSubmitEditing={search}
            value = {state.s}

            />

            <ScrollView style={styles.results}>

                {state.results.map(result => (

                    <TouchableHighlight 
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
                        resizeMode="cover"
                        />
                        <Text style={styles.heading}>{result.Title}</Text>
                        <Text style={styles.AddtoMyList} onPress={() => addToUserMovies(state.selected)}>Add to My Movies</Text>
                        
                        
                    </View>
                    
                    </TouchableHighlight>
                    
                ))}

            </ScrollView>

            <Modal 
            animationType='fade'
            transparent={false}
            visible={(typeof state.selected.Title != "undefined")}
            
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
                <AppButton title="Close"   onPress={() => setState(prevState => {

                return {...prevState, selected: {} }

                })}/>
                    
                    </View>


                
            </Modal>

        </View>

    );
    
}
const styles = StyleSheet.create({

    container: {

        flex:10,
        backgroundColor: '#750a18',
        alignItems: 'center',
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
        padding: 20,

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

export default SearchScreen;