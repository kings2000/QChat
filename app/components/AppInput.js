import React, {useState, useRef} from 'react'
import { TextInput, Keyboard,StyleSheet, View, Text,TouchableHighlight, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import MatIcons from "react-native-vector-icons/MaterialCommunityIcons"
import EmojiModal from './EmojiModal';
import MediaCategory from './MediaCategory';

function AppInput({ onSend ,keyboardActiveState ,...others}) {

    const textInput = useRef();
    const [chatValue, setValue] = useState("");
    const [emojiActive, setEmojiPanelState] = useState("close");
    const [mediaCatState, setMediaCatState] = useState('close');

    const sendMessage = (value) => {
        if(value != "" && value != " "){
            onSend(chatValue);
            setValue("");
        }
    }
    const addEmoji = (emoji) => {
        
        var final = chatValue + String.fromCodePoint(emoji);
        setValue(final);
        
    }

    const onFaceClicked=() =>{
        setMediaCatState('close');
        setEmojiPanelState("open");
        Keyboard.dismiss();
        
    }
    const onMediaCatClicked =()=>{
        setEmojiPanelState("close")
        setMediaCatState('open');
        Keyboard.dismiss();
    }

    const emojiPanelActive = emojiActive == "open";
    const mediaCategoryPanelActive = mediaCatState == 'open';

    return (
        <>
        <View style={[styles.field, others]}>

            <TouchableHighlight onPress={onFaceClicked}>
                <MatIcons
                    name="face"
                    color="white"
                    size={25}
                    style={styles.emoji}
                    backgroundColor="transparent"
                />
            </TouchableHighlight>

            <TextInput
                ref={textInput}
                underlineColorAndroid="white"
                InputProps={{ disableUnderline: true }}
                inputContainerStyle={{borderBottomWidth:0}}
                onFocus={() => {[setEmojiPanelState("close"),setMediaCatState('close') ]}}
                value={chatValue}
                onChangeText={text => setValue(text)}
                placeholder="Enter Message "
                placeholderTextColor={"black"}
                textAlignVertical={"bottom"}
                
                
                style={styles.text}>
                
            </TextInput>
            
            <TouchableHighlight >
                <Icon.Button
                    onPress={onMediaCatClicked}
                    name="paperclip"
                    color="skyblue"
                    size={25}
                    style={styles.sendButton}
                    backgroundColor="transparent"
                    
                />
            </TouchableHighlight>
            <Icon.Button
                onPress={() => {sendMessage(chatValue)}}
                name="send"
                color="skyblue"
                size={25}
                style={styles.sendButton}
                backgroundColor="transparent"
                
            />
            
        </View>
        <EmojiModal closePanel={()=>setEmojiPanelState("close")} onEmojiPressed={addEmoji} visible={!keyboardActiveState && emojiPanelActive && !mediaCategoryPanelActive}></EmojiModal>
        <MediaCategory onClose={()=>setMediaCatState('close')} visisble={!keyboardActiveState && !emojiPanelActive && mediaCategoryPanelActive} />
        </>
    );
}

const styles = StyleSheet.create({
    field:{
        backgroundColor: "grey",
        width: '100%',
        flexDirection:"row",
        alignSelf: "center",
        justifyContent:"center",
        alignItems:"center",
        paddingHorizontal: 10,
        paddingVertical:5,
        height:50,
    },
    text:{
        color: "black",
        flex: 1,
        marginEnd:10,
        fontSize:17,
        alignSelf:"center",
        
        backgroundColor:"white",
        borderRadius:10,

    },
    sendButton:{
        paddingHorizontal:1,
        marginLeft:10,
        
    },
    emoji:{
        paddingEnd:10
    }
})

export default AppInput;