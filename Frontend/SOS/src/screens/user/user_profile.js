import React, {useState, useEffect} from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, ScrollView} from 'react-native';
import { Button} from 'react-native-elements';
import {GetLoggedInUserCustomerDetails} from '../../services/api/users/userapi'
import {Avatar, Title, Caption} from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import { concat } from 'react-native-reanimated';

export const UserProfile = () => {

    useEffect(()=>{
        getFunction();    
    },[])

    const [name,setName] =useState('');
    const [contact,setContact] =useState();
    const [shop,setShop] =useState();
    const [address,setAddress] =useState();

    async function getFunction(){
        const name = await (await AsyncStorage.getItem('userName')).split('"')[1];
        const contact = await (await AsyncStorage.getItem('userContact')).split('"')[1];
        const shop = await (await AsyncStorage.getItem('userShop')).split('"')[1];
        const address = await (await AsyncStorage.getItem('userAddress')).split('"')[1];

        setName(name);
        setContact(contact);
        setShop(shop);
        setAddress(address);

    }
    return(
        <ScrollView>
        <View style={styles.LoginView}>
            <View style={styles.userInfoSection}>
                <View style={{flexDirection:'row'}}>
                    <Avatar.Image style={{marginTop:5}} source={{ uri:'https://serviceonway.com/serviceonway/files/images/user1.png'}} size={200}/>
                </View>
                <View style={{marginTop:50}}></View>
                <View style={{alignItems:"center"}}>
                    <Title style={styles.title}>{name}</Title>
                    <View style={{marginTop:10, borderColor:'gray', borderWidth:1, width:150}}></View>
                    <View style={{marginTop:20}}></View>

                    <Caption style={styles.caption}>{contact}</Caption>
                    <Caption style={styles.caption}>{shop}</Caption>
                    <Caption style={styles.caption}>{address}</Caption>
                </View>
            
            </View>
        </View>

        </ScrollView>
)
}

const styles = StyleSheet.create({
    LoginView: {
        backgroundColor:'white',
        flex:1,
        padding:20,
        alignItems: 'center'
    },

    userInfoSection: {
      padding: 20,
      marginBottom:10,
    },
    title: {
      fontSize: 25,
      fontWeight: 'bold',
      textTransform:"uppercase"
    },
    caption: {
      fontSize: 15,
      marginTop:5,
      textTransform:"capitalize"
    },

  });