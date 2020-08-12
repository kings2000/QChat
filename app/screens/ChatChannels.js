import React from 'react'
import { Text, View, Animated, StyleSheet } from 'react-native';
import ChannelTile from '../components/ChannelTile';

const ChatChannels = ({sideOffest, channels}) => {
    return (
        <View style={{flex:1}}>
            <View style={styles.container}>
                <Animated.View style={[styles.body,{transform:[{translateX: sideOffest}]}]}>
                    <View style={{flex:1}}>
                        <ChannelTile height={70}/>
                    </View>
                </Animated.View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"green",
        flex: 1,
        paddingLeft:10,
        paddingTop:35,
        paddingBottom:5,
        paddingHorizontal:10
    },
    body:{
        flex:1,
        backgroundColor:"white",
        borderRadius:20,
        padding:10,
        paddingTop: 30
    }
})

export default ChatChannels;