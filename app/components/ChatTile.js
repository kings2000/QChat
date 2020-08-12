import React from 'react'
import { View, StyleSheet, Text } from 'react-native';
import MessageBubble from './MessageBubble';
import UserIcon from './UserIcon';

const ChatTile = ({isMine, chat, showFace = true}) => {
    return (
        <View style={styles.tile}>
            {!isMine && <Text style={{fontSize:12}} >King Gp</Text>}
            <View style={{height:5}}/>
            <View style={[styles.user, isMine?styles.leftTile:styles.rightTile]}>
                {!isMine && <UserIcon/>}
                <View style={{width:20}}/>
                <View style={styles.subView}>
                    <View>
                        <MessageBubble chat={chat}/>
                    </View>
                    <View style={{height:5}}/>
                    <Text style={[{fontSize:10}, isMine?styles.leftTile:styles.rightTile]}>Time since arival</Text>
                 </View>
            </View>
            {/* <View style={{width:15}}/> */}
            
            
        </View>
    );
}

const styles = StyleSheet.create({
    tile:{
        paddingLeft:15,
        paddingTop: 10,
        paddingBottom: 10
    },

    leftTile:{
        alignSelf:"flex-end",
        flexDirection:"row-reverse"
    },
    rightTile:{
        flexDirection : "row",
        alignSelf : "flex-start"
    },

    user:{
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems: "flex-start",
        
    },
    subView:{
        flex: 1,
    }
})

export default ChatTile;