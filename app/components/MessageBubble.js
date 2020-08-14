
import React,{useState, useRef} from 'react';
import { Text, View , StyleSheet, Image, TouchableHighlight, ImageBackground} from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";



function MessageBubble({onLongPress, chat, ...others}){

    let textBox = useRef(null);
    let [point, setPoint] = useState([0,0]);

    const isImage = () => chat.messageType == 'image'

    function handleLongPress(){
        console.log(textBox);
        textBox.measure( (fx, fy, width, height, px, py) => {
            console.log('Component width is: ' + width)
            console.log('Component height is: ' + height)
            console.log('X offset to page: ' + px)
            console.log('Y offset to page: ' + py)
            setPoint(px, py);
        })
    }

    if(isImage()){
        
        const photo = chat.photoUrl != "";
        const gifImage = () => chat.imageType == 'gif';

        return(
            
            <View style={[chat.isMine? styles.bubbleRight : styles.bubbleLeft, others, {padding: 1}]}>
                <TouchableHighlight underlayColor="transparent" onLongPress={onLongPress}  onPress={() => {global.showImage(chat.photoUrl)}}>
                    <>
                    {photo &&
                        <ImageBackground source ={{uri:chat.photoUrl}} style = {{ width: 200, height: 200 }}/>
                    }
                    {!photo && 
                        <Icon name="image" size={100}/>
                    }
                    </>
                </TouchableHighlight>
            </View>
            
        );
        
        
    }else{
        return(
           
                <View 
                onLayout={(event) => {}}
                ref={view => {textBox = view}}
                 style={[chat.isMine? styles.bubbleRight : styles.bubbleLeft, others]}>
                     <TouchableHighlight  underlayColor="transparent" onLongPress={() => handleLongPress()}>
                        <Text style={styles.text}>{chat.title}</Text>
                    </TouchableHighlight>
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
    },
    ball:{
        backgroundColor:"red",
        height: 20,
        width:20,
    }
      
})

export default MessageBubble;