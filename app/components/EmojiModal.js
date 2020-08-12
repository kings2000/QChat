import React,{useState} from 'react'
import { Modal, Text,Image, View, StyleSheet, FlatList, TouchableWithoutFeedback } from 'react-native';
import * as RNFS from 'react-native-fs';
import * as data from '../assets/emojis/config.json';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const EmojiModal = ({visible, onEmojiPressed, closePanel}) => {
    
    //const [mage, setManeg] = useState("");
    
    
    //  RNFS.readFileAssets('emojis/smile.png', "base64").then((res) => {
    //      //console.log('read file res: ', res);
    //      setManeg(res);
    //  })

    // RNFS.readFileAssets('text.txt').then((res) => {
    //     console.log('read file res: ', res);
    // })
    // .catch(err => {
        
    //     console.log(err.message, err.code);
        
    // });

    const smiles = [];
    // const x =  data.data;
    // const result = Object.keys(x).map(key => ({[key]: x[key]}));

    data.data.map((postData) => {
        var count = smiles.length;
        //var path = `../assets/emojis/${postData.name}`;
        smiles.push({key:count, title:postData.name});
    });

    const addEmojiPressed = (item) =>{
        onEmojiPressed(item);
    }

    const renderItem = ({ item }) => (
        <TouchableWithoutFeedback onPress={() => {addEmojiPressed(item.title)}}>
            <Text style={styles.textEmoji}>{String.fromCodePoint(item.title)}</Text>
        </TouchableWithoutFeedback>
        
    )
    return (
        <>
        <View style={visible? styles.container : styles.containerHide}>
            <View style={styles.emojiContainer} >
                <FlatList 
                    data={smiles}
                    keyExtractor={item => item.key}
                    renderItem={renderItem}
                    numColumns={8}
                    backgroundColor={"white"}
                    width={"100%"}
                    alignItems={"center"}
                    
                />
            </View>
            
            {visible && <View style={styles.category}>
                <TouchableWithoutFeedback>
                    <Icon
                        onPress={() => {}}
                        name="face"
                        color="black"
                        size={25}
                        style={styles.sendButton}
                        backgroundColor="transparent"
                    />
                    
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback>
                    <Icon
                        onPress={() => {}}
                        name="face"
                        color="black"
                        size={25}
                        style={styles.sendButton}
                        backgroundColor="transparent"
                    />
                    
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback>
                    <Icon
                        onPress={() => {closePanel()}}
                        name="close"
                        color="red"
                        size={25}
                        style={styles.sendButton}
                        backgroundColor="transparent"
                    />
                    
                </TouchableWithoutFeedback>
            </View>}
        </View>
        </>
    );
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',   
        backgroundColor : "grey",   
        height: 180 ,
        padding: 5
    },
    containerHide:{
        height: "0%" ,
        padding: 0,
        
    },
    emojiContainer:{
        backgroundColor: "white",
        flex: 1,
        width:"100%",
        height: "100%",
        alignItems:"center",
        justifyContent:"center"
    },
    body:{
        width:"100%",
        backgroundColor:"white",
        
    },
    category:{
        width: "100%",
        height: 30,
        backgroundColor: "gray",
        flexDirection: "row",
        justifyContent:"space-evenly",
        alignItems:"center"
    },
    textEmoji:{
        fontSize:30,
        padding:7,
       
    }
})

export default EmojiModal;