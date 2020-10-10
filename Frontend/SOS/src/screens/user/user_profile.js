import React from 'react';
import { StyleSheet, View} from 'react-native';
import { Text } from 'react-native-elements';

export const UserProfile = () => {
    return(
            <View style={styles.LoginView}>
                <Text style={{textTransform:'capitalize', fontSize:20}}>
                User Profile
                </Text>
                
            </View>
    )
}

const styles = StyleSheet.create({
    LoginView: {
        backgroundColor:'white',
        flex:1,
        padding:20,
        justifyContent: 'center',
        alignItems: 'center'
    },
});
