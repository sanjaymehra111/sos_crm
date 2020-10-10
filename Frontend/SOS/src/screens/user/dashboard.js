import React, {useState, navigation} from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View} from 'react-native';
import { Text, Avatar } from 'react-native-elements';

export const UserDashboard = ({navigation, route}) => {
     //const user_contact = route.params.cont;
    return(

            <ScrollView>
                <View style={styles.LoginView}>

                    <View style={{height:50}}></View>
                    <Text h4 style={{textTransform:'capitalize'}}>Welcome To User Dashboard </Text>
                    <View style={{height:120}}></View>
                    <Avatar
                        rounded
                        size="xlarge"
                        source={{
                            uri:'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                        }}
                    />

                    <View style={{height:120}}></View>
                        <Text h4 style={{textTransform:'capitalize'}}> Content Will Be Available Soon </Text>
                    <View style={{height:50}}></View>
                        <Text h4 style={{textTransform:'capitalize'}}> Thanks </Text>
                    
               </View>
            </ScrollView>
    )
}
const styles = StyleSheet.create({
    LoginView: {
        padding:20,
        justifyContent: 'center',
        alignItems: 'center'
    },
});
