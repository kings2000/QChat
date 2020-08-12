import React from 'react'
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native';
import Icon from "react-native-vector-icons/AntDesign";

function AppHeader ({title, onSideBarPressed}) {
    return (
        <View style={styles.head}>
            <TouchableHighlight style={styles.barsIcon} onPress={onSideBarPressed} >
                <Icon name="bars" color="white" size={25} />
            </TouchableHighlight>
         <Text style={styles.text}>Gp Clan</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    head:{
        width: "100%",
        height: 30,
        backgroundColor: "green",
        flexDirection:"row",
        justifyContent: "center",
        alignItems: "center",
        
    },
    text:{
        color:"white",
        fontSize: 20,
        fontWeight: "bold",
        
        
    },
    barsIcon:{
        position:"absolute",
        left: 20
    }
})

export default AppHeader;