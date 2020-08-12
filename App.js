import React,{useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image, 
  Dimensions
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { ChatScreen } from './app/screens/ChatScreen';
import ImageViewerScreen from './app/screens/ImageViewerScreen';

export default function App(){

  const [visible, setIsVisible] = useState(false);
  const [sourceImage, setSourceImage] = useState(false);
  global.showImage = function(image){;
    setSourceImage(image);
    setIsVisible(true);
  }
  

  return (
    <>
      <StatusBar barStyle="dark-content" showHideTransition={"slide"} hidden/>
      <SafeAreaView style={{flex : 1, backgroundColor:"white"}}>
        <ChatScreen/>
        {visible && <ImageViewerScreen setVisible={() => setIsVisible(false)} imageUri={sourceImage}/>}
      </SafeAreaView>
    </>
  );
};

