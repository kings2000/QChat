import React from 'react'

import ImagePicker from 'react-native-image-picker';
import { Image, View, StyleSheet } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";

const MediaCategory = ({onClose, visisble = true}) => {


    return (
        <View style={visisble ?styles.container : styles.containerHide}>
            {visisble && <View style={{flex:1}}>
                <View style={styles.category}>
                    <Icon.Button
                        onPress={() => global.ActivateImagePicker('media')} 
                        name="perm-media"
                        color="grey"
                        size={60}
                        backgroundColor="transparent"
                    />
                    <Icon.Button
                        onPress={() => global.ActivateImagePicker('cam')}
                        name="photo-camera"
                        color="grey"
                        size={60}
                        backgroundColor="transparent"
                    />
                </View>

                <View style={{height:30, justifyContent:"center", alignItems:"center"}}>
                    <Icon.Button
                        onPress={onClose}
                        name="close"
                        color={"red"}
                        size={35}
                        backgroundColor="transparent"
                        />
                </View>
                
            </View>}
        </View>
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
    category:{

        flex:1,
        width: "100%",
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent:"space-evenly",
        alignItems:"center"
    },
})

export default MediaCategory;