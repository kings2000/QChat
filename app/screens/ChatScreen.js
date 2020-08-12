import React,{Component, useRef} from 'react';
import { SafeAreaView,View, Dimensions, Text,KeyboardAvoidingView, Keyboard ,StyleSheet, TouchableWithoutFeedback, FlatList, Animated, Alert } from 'react-native';

import * as RNFS from 'react-native-fs';
import AppHeader from '../components/AppHeader'
import AppInput from '../components/AppInput'
import ChatTile from '../components/ChatTile'
import ChatChannels from './ChatChannels';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios' 

const isPotriat = () => {
    const dim = Dimensions.get('window');
    return dim.height >= dim.width;
}

const options = {
  title: 'Media',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
    
  },
  
};



export class ChatScreen extends Component {

    constructor(){
        super();
        global.chatScreenRef = this;
        this.state = { 
            orientation: isPotriat()? "potrait" : "landscape",
            keyboardState: "close",
            chatViewOffsetX: new Animated.Value(0),
            channelViewOffsetX: new Animated.Value(-250),
            chatChannelState:'close',

            chats : [
                {
                  id: "1",
                  title: ["First Item",],
                  isMine: false,
                  messageType:'text',
                  senderid: "",
                  receiverId:"",
                  timestamp:"",
                  photoUrl:""

                },
                {
                  id: "2",
                  title: ["Second Item",],
                  isMine: false,
                  messageType:'text',
                  senderid: "",
                  receiverId:"",
                  timestamp:"",
                  photoUrl:""
                },
                {
                  id: "3",
                  title: ["Third Item",],
                  isMine: true,
                  messageType:'text',
                  senderid: "",
                  receiverId:"",
                  timestamp:"",
                  photoUrl:""
                },
                {
                    id: "4",
                    title: ["Third Item",],
                    isMine: true,
                    messageType:'text',
                    senderid: "",
                    receiverId:"",
                    timestamp:"",
                    photoUrl:""
                  },
                  {
                    id: "5",
                    title: ["Third Item",],
                    isMine: true,
                    messageType:'text',
                    senderid: "",
                    receiverId:"",
                    timestamp:"",
                    photoUrl:""
                  },
                  {
                    id: "6",
                    title: ["Third Item",],
                    isMine: false,
                    messageType:'text',
                    senderid: "",
                    receiverId:"",
                    timestamp:"",
                    photoUrl:""
                  },
                  {
                    id: "7",
                    title: ["Third Item",],
                    isMine: true,
                    messageType:'text',
                    senderid: "",
                    receiverId:"",
                    timestamp:"",
                    photoUrl:""
                  },
                  {
                    id: "8",
                    title: ["Third Item",],
                    isMine: true,
                    messageType:'text',
                    senderid: "",
                    receiverId:"",
                    timestamp:"",
                    photoUrl:""
                  },
                  {
                    id: "9",
                    title: ["Third Item",],
                    isMine: true,
                    messageType:'text',
                    senderid: "",
                    receiverId:"",
                    timestamp:"",
                    photoUrl:""
                  },
                  {
                    id: "10",
                    title: ["Third Item",],
                    isMine: true,
                    messageType:'text',
                    senderid: "",
                    receiverId:"",
                    timestamp:"",
                    photoUrl:""
                  },
                  {
                    id: "11",
                    title: ["Third Item",],
                    isMine: false,
                    messageType:'image',
                    senderid: "",
                    receiverId:"",
                    timestamp:"",
                    photoUrl:"",
                    imageType:"image"
                  }
              ]
         }
        Dimensions.addEventListener('change', () =>{
            this.setState({
                orientation: isPotriat()? "potrait" : "landscape",
            });
            
        });
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
          this.setState({
            keyboardState: "open"
          });
        });
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidHide', () => {
          this.setState({
            keyboardState: "close"
          });

        });
        this.state.channelViewOffsetX.addListener(({barValue}) => this._value = barValue);
        
        //activates the image picker action triggerd from MediaCategory
        global.ActivateImagePicker = this.ActivateImagePicker;
    }
    

    componentWillUnmount(){
      Dimensions.removeEventListener('change');
      Keyboard.removeListener('keyboardDidShow');
      Keyboard.removeListener('keyboardDidHide');
      this.state.channelViewOffsetX.removeAllListeners();
    }
    openChatChannel() {
        var currentState = this.state.chatChannelState == 'open' ? 'close' : 'open';
        var toValue = currentState == 'open'? 250 : 0;
        var sideBarOffset = currentState == 'open'? 0 : -250;
        Animated.timing(this.state.chatViewOffsetX,{duration:250, toValue: toValue, useNativeDriver:true}).start();
        Animated.timing(this.state.channelViewOffsetX,{duration:250, toValue: sideBarOffset, useNativeDriver:true}).start();
        this.setState({
            chatChannelState: currentState,
            
        });
        console.log(this.state.channelViewOffsetX._value);
    }
    
    

    ActivateImagePicker(state){
      

      if(state == 'cam'){

        ImagePicker.launchCamera(options, (response) => {
          
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
            const source = response.uri;
            const data = response.data;
            global.chatScreenRef.addImageChat(data,source, false);
          }

        });

      }else{

        ImagePicker.launchImageLibrary(options, (response) => {
          
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
            const uri = response.uri;
            const type = response.type;
            const name = response.fileName;

            const source = {
              uri,
              type,
              name
            }
            
            global.chatScreenRef.cloudinaryUpload(response);

            //const data = response.data;
            //console.log(response);
            //global.chatScreenRef.addImageChat(data,source, false);
          }
        });

      }
    }

    addTextChat =(_chat, _isMine) =>{
      
      var count = this.state.chats.length + 1;
      console.log(_chat);
      this.state.chats.push({
        id:count.toString() , 
        title:[_chat], 
        isMine:_isMine,
        messageType:'text',
        senderid: "",
        receiverId:"",
        timestamp:"",
        photoUrl:""
      });
      var _data = {};
      _data = this.state.chats;
      this.setState({
          chat : _data
      });
      this.refs.chatListRef.scrollToEnd();
    }

    addImageChat =(url, _isMine) =>{

        var count = this.state.chats.length + 1;
        //uri: Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
        this.state.chats.push({
          id:count.toString(),
          title:[''],
          photoUrl:url , 
          isMine:_isMine,
          messageType:'image',
          senderid: "",
          receiverId:"",
          timestamp:"",
        });
        var _data = {};
        _data = this.state.chats;
        this.setState({
            chat : _data
        });
        this.refs.chatListRef.scrollToEnd();
        
        // RNFS.exists(imageFilePath)
        // .then( (result) => {
        //     if(result){
        //       return RNFS.unlink(imageFilePath)
        //         .then(() => {
        //           console.log('FILE DELETED');
        //           RNFS.scanFile(imageFilePath)
        //           .then(() => {
        //             console.log('scanned');
        //           })
        //           .catch(err => {
        //             console.log(err);
        //           });
        //         })
        //         // `unlink` will throw an error, if the item to unlink does not exist
        //         .catch((err) => {
        //           console.log(err.message);
        //         });
        //     }

        //   })
        //   .catch((err) => {
        //     console.log(err.message);
        //   });
    }

    cloudinaryUpload = (photo) => {

      // let base64Img = `data:image/jpg;base64,${photo.data}`;
      
      // const data = new FormData()
      // data.append('file', base64Img)
      // data.append('upload_preset', 'gpcodes')
      // data.append("cloud_name", "ninja3k")

      // axios({
        
      //   method: 'POST',
      //   url: "https://api.cloudinary.com/v1_1/ninja3k/image/upload",
      //   data: data
      // }).then(function (response) {
        
      //   const imageUrl = response.data.secure_url;
      //   global.chatScreenRef.addImageChat(imageUrl, true);
      // })
      // .catch(function (error) {
      //   console.log(error);
      // });

      RNFS.readFile(photo.path, 'base64').then(res => {

          let base64Img = `data:${photo.type};base64,${photo.data}`;
          //console.log(photo);
          const data = new FormData()
          data.append('file', base64Img)
          data.append('upload_preset', 'gpcodes')
          data.append("cloud_name", "ninja3k")

          axios({
          
            method: 'POST',
            url: "https://api.cloudinary.com/v1_1/ninja3k/image/upload",
            data: data
          }).then(function (response) {
            
            const imageUrl = response.data.secure_url;
            global.chatScreenRef.addImageChat(imageUrl, true);
            //console.log()
          })
          .catch(function (error) {
            console.log(error);
          });

      }).catch(err => {
  
        console.log(err.message, err.code);
      });

    
    }

    renderItem = ({ item }) => (
        <ChatTile isMine={item.isMine} chat={item}/>
    )

    render() {
        return (
            
            <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : null} style={styles.container}>
                <View style={styles.chatChannels}>
                    <ChatChannels sideOffest={this.state.channelViewOffsetX}/>
                </View>
                
                <Animated.View style={{flex:1, transform: [{translateX: this.state.chatViewOffsetX}]}}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    
                    <View style={[styles.chat, !isPotriat() ? {maxWidth:"50%" }:{maxWidth:"100%"}]}>
                        <AppHeader onSideBarPressed={() => {this.openChatChannel()}}/>
                        {/* <View style={{height:10, backgroundColor:"green"}}/> */}
                        <View style={{flex:1, backgroundColor:"white",borderRadius:20}}>
                            <FlatList 
                                ref = 'chatListRef'
                                data={this.state.chats}
                                keyExtractor={item => item.id}
                                renderItem={this.renderItem}
                                scrollEnabled={true}
                                onContentSizeChange={()=> this.refs.chatListRef.scrollToEnd()}
                                style={{borderColor:"green"}}
                            />
                            <AppInput keyboardActiveState={this.state.keyboardState == "open"} onSend={(value) => {this.addTextChat(value, true)}} marginTop={5}/>
                        </View>
                        
                    </View>
                </TouchableWithoutFeedback>
                {/* <ViewOverflow>
                  <View style={{width:300, height:300}}></View>
                </ViewOverflow> */}
                </Animated.View>
            </KeyboardAvoidingView>
            

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        
      },
    chat:{
        backgroundColor:"green",
        flexDirection:"column", 
        flex:1,
        padding:5
    },
    chatChannels:{
        flex:1,
        height:'100%',
        width:250,
        position:"absolute",
        backgroundColor:"green"
    }
})
