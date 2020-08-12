
import React,{useState} from 'react';
import { Text, View , StyleSheet, Image, TouchableHighlight} from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import ImageViewerScreen from '../screens/ImageViewerScreen';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';


function MessageBubble({chat, ...others}){

    const [imageUri, setImageUri] = useState(true);
    const isImage = () => chat.messageType == 'image'
    
    
    if(isImage()){
        const photo = chat.photoUrl != "";
        return(
            <TouchableHighlight underlayColor="transparent" onPress={() => {global.showImage(chat.photoUrl)}}>
                <View style={[chat.isMine? styles.bubbleRight : styles.bubbleLeft, others, {padding: 2}]}>
                { photo && 
                    <Image source ={{uri:"data:image/jpeg;base64,"+chat.photoUrl}} style = {{ width: 200, height: 200 }}/>
                }
                {!photo && 
                    <Icon name="image" size={100}/>
                }
                </View>
            </TouchableHighlight>
        );

    }else{
        return(
            <View style={[chat.isMine? styles.bubbleRight : styles.bubbleLeft, others]}>
                
                <Text style={styles.text}>{chat.title}</Text>
            </View>
    
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