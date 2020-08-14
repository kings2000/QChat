import React, { Component } from 'react'
import { View, StyleSheet, Dimensions, Button, Text, TouchableNativeFeedback } from 'react-native';

export class ContextMenu extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={styles.ball}>
                <View style={{width:"100%", height:10,alignSelf:"center" ,marginHorizontal:10 ,backgroundColor:"white"}}>
                    <View style={[styles.trainsgle, ]}>
                        </View>
                    </View>
                <View style={styles.buttonContainer}>
                    <View style={styles.buttons}>
                        <TouchableNativeFeedback>
                            <Text style={styles.text}>copy</Text>
                        </TouchableNativeFeedback>
                    </View>
                    <View style={styles.buttons}>
                    <TouchableNativeFeedback>
                            <Text style={styles.text}>Translate</Text>
                        </TouchableNativeFeedback>
                    </View>
                    {/* <View style={styles.buttons}>
                    <TouchableNativeFeedback>
                            <Text style={styles.text}>Report</Text>
                        </TouchableNativeFeedback>
                    </View> */}
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    ball:{
        
        justifyContent:"flex-end",
        alignSelf: "center",
        padding:10,
        backgroundColor:"red",
        height: 60,
        maxWidth: "80%",
        transform: [
            {translateX: 0},
            {translateY: 0}
        ]
    },
    buttonContainer:{
        //marginTop: 5,
        flexDirection: "row",
        backgroundColor:"black",
        
        borderWidth:5,
        borderRadius:10,

    },
    buttons:{
        marginHorizontal:2,
        backgroundColor:"black",
        flexDirection:"row",
        paddingHorizontal:10,
        height:25,
        fontSize:40,
        alignItems: 'center',
        justifyContent:"center",
        borderRadius:5,
        borderWidth:1,
        borderColor:"grey"
    },
    trainsgle:{
        position:"absolute",
        width :10,
        height:10,
        alignSelf:"center",
        borderLeftWidth: 10,
        borderLeftColor:"transparent",
        borderRightWidth: 10,
        borderRightColor:"transparent",
        borderBottomWidth: 10,
        borderBottomColor:"black",
        
    },
    text:{
        color:"white",
        
    }
})