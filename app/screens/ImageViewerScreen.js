import React,{Modal, useState} from 'react'
import { View, StyleSheet, Animated,Dimensions, Image } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import ImageZoom from 'react-native-image-pan-zoom';

const ImageViewerScreen = ({imageUri, setVisible}) => {

    const [visible, setIsVisible] = useState(true);
    const photo = imageUri != "";

    return (
        
        <>
        { <View style={{backgroundColor:"grey", position:"absolute", width:Dimensions.get('window').width, height:Dimensions.get('window').height} }>
            
            <ImageZoom cropWidth={Dimensions.get('window').width}
                        cropHeight={Dimensions.get('window').height}
                        imageWidth={200}
                        imageHeight={200}>
                        { photo && <Image style={{width:200, height:200}}
                        source= {{uri:imageUri}}/>}
                        {!photo && <Image style={{width:200, height:200}}
                        source= {require("../assets/badImage.png")}/>}
            </ImageZoom>
            
            {/* */}
            <View  style={{backgroundColor:"transparent",justifyContent:"flex-end",alignSelf:"center",position:"absolute",width:60, height:60}}>
            <Icon.Button
                onPress={() => {setVisible(false)}}
                    color={"white"} 
                    name={"close"}
                    size={40}
                    backgroundColor="transparent"
                    style={{width:60, height:40, alignSelf:"center"}}
                    />
            </View>
            
        </View>}
        </>
    );
}

const styles = StyleSheet.create({
    container:{
        width:"100%",
        height:"100%",
        backgroundColor:"grey",
        position:"absolute",
        
    },
    closeIcon:{
        alignSelf:"flex-end"
    }

})

export default ImageViewerScreen;