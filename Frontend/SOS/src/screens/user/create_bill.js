import React from 'react';
import { StyleSheet, View} from 'react-native';
import { Text } from 'react-native-elements';

export const CreateBill = () => {
    return(
            <View style={styles.LoginView}>
                <Text style={{textTransform:'capitalize', fontSize:20}}>
                Create Bill
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
