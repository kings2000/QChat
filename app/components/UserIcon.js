import React from 'react'
import { View , StyleSheet} from 'react-native';

function UserIcon() {
    return (
        <View style={styles.icon}>

        </View>
    );
}

const styles = StyleSheet.create({
    icon:{
        height : 50,
        width: 50,
        backgroundColor: "grey",
        borderRadius: 25
    }
})

export default UserIcon;