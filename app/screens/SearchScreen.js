import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableHighlight, TextInput, ScrollView, Image, Modal, SafeAreaView } from 'react-native';
import axios from 'axios';
import AppButton from '../components/AppButton';

function SearchScreen(props) {

    const apiurl = "http://www.omdbapi.com/?i=tt3896198&apikey=99fcef07"

    const [state, setState] = useState({

        s: "Enter a movie ...",
        results: [],
        selected: {},
        userMovies: [],

    });

    const search = () => {

        axios(apiurl + "&s=" + state.s).then(({ data }) => {

            let results = data.Search
            setState(prevState => {
                return {...prevState, results: results}
            })

        } )

    }

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
    
    const handleAddMovie = () => {

        const { imdb_votes, ...data } = result;

      fetch('http://192.168.0.22:5000/save-movie-data', {
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
                <AppButton title="Add to my movies"   onPress={() => {handleAddMovie()}}/>
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