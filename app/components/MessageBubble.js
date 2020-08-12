
import React,{useState} from 'react';
import { Text, View , StyleSheet, Image, TouchableHighlight, ImageBackground} from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";



function MessageBubble({onLongPress, chat, ...others}){

    const isImage = () => chat.messageType == 'image'
    if(isImage()){
        
        const photo = chat.photoUrl != "";
        const gifImage = () => chat.imageType == 'gif';
        return(
            <TouchableHighlight underlayColor="transparent" onLongPress={onLongPress}  onPress={() => {global.showImage(chat.photoUrl)}}>
            <View style={[chat.isMine? styles.bubbleRight : styles.bubbleLeft, others, {padding: 2}]}>
            {photo &&
                <ImageBackground source ={{uri:chat.photoUrl}} style = {{ width: 200, height: 200 }}/>

            }
            {!photo && 
                <Icon name="image" size={100}/>
            }
            </View>
            </TouchableHighlight>
        );
        
        
    }else{
        return(
            <TouchableHighlight underlayColor="transparent" onLongPress={onLongPress}>
                <View style={[chat.isMine? styles.bubbleRight : styles.bubbleLeft, others]}>
                
                    <Text style={styles.text}>{chat.title}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    bubbleLeft:{
        backgroundColor:"skyblue",
        justifyContent: "center",
        padding: 10,
        maxWidth: "80%",
        alignSelf: "flex-start",
        borderRadius: 10,
        borderTopLeftRadius: 0,
        elevation : 10,
        marginBottom:4,
        overflow:"hidden"

    },
    bubbleRight:{
        backgroundColor:"skyblue",
        justifyContent: "center",
        padding: 10,
        maxWidth: "80%",
        alignSelf: "flex-end",
        borderRadius: 10,
        borderBottomRightRadius: 0,
        elevation : 10,
        marginBottom:4,
        overflow:"hidden"

    },
    text:{
        fontSize: 12
    },
    imageViewer:{
        position:"absolute",
        width:"100%",
        height:"100%",
        backgroundColor:"grey"
    }
      
})

export default MessageBubble;