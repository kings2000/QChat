import React from 'react'
import { View , StyleSheet} from 'react-native';

const ChannelTile = (...others) => {
    return (
        <View style={[styles.base, others]}>
            <View style={styles.imageContainer}>

            </View>
            <View style={{width:10}}></View>
            <View style={{flex:1,borderRadius:10,width:"100%", height:"100%" ,backgroundColor:"#0E1428"}}>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    base:{
        backgroundColor:"#7B9E89",
        width:"100%",
        height:30,
        borderRadius:10,
        flexDirection:"row",
        alignItems:"center",
        padding:5
        
    },
    imageContainer:{
        width:60,
        height:60,
        backgroundColor:"#D95D39",
        borderRadius:30,
        overflow:"hidden"
    }
})

export default ChannelTile;