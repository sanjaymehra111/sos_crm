import React, {useState, useEffect} from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Text} from 'react-native';
import {GetLoggedInUserSpecEmiBillDetails, CreateNewPayment} from '../../services/api/users/userapi'
import {FormatDate} from '../../utils/function'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';
import { ListItem, Avatar, SearchBar, ButtonGroup, Overlay, Button, Input} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export const UserSpecficEmiDetails = (props) => { 

    useEffect(()=>{
        getfuncion();    
    },[])

    const [AllDetails,setAllDetails] =useState([]);
    const [EmiDetails,setEmiDetails] =useState([]);
    const [BillDetails,setBillDetails] =useState([]);

    async function getfuncion(){
        const res = await GetLoggedInUserSpecEmiBillDetails('35');
        setAllDetails([...res]);
        setEmiDetails([...res[0]]);
        setBillDetails([...res[1]]);
    }

    return(

        <View>

<FlatList
            data={BillDetails}
            renderItem={({item})=>{
                var ButtonStatus =  <Button title='' buttonStyle={{padding:0, backgroundColor:'white'}} icon={<MaterialCommunityIcons name="check-decagram" size={25} color="green" />} ></Button>;
                var cur_date = FormatDate(item.date);
                if(item.status == '0'){
                    ButtonStatus = <Button title='' buttonStyle={{padding:0, backgroundColor:'white'}} icon={<MaterialCommunityIcons name="close-octagon" size={25} color="red" />} ></Button>
                }

                
                return( 
                <TouchableOpacity>

                    <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title style={styles.title}><MaterialCommunityIcons name="tablet-cellphone" size={15} color="gray" /> {item.name}</ListItem.Title>
                                <ListItem.Subtitle style={{marginTop:10}}><MaterialCommunityIcons name="currency-inr" size={15} color="gray" /> {item.total_price}</ListItem.Subtitle>
                                <ListItem.Subtitle style={{marginTop:10}}><MaterialCommunityIcons name="account-cash-outline" size={15} color="gray" /> {item.balance}</ListItem.Subtitle>
                            </ListItem.Content>

                            <ListItem.Content>
                                <ListItem.Title style={styles.title}><FontAwesome5 name="user" size={15} color="gray" /> {item.customer_name}</ListItem.Title>
                                <ListItem.Subtitle style={{marginTop:10}}><FontAwesome5 name="mobile-alt" size={15} color="gray" />  {item.customer_contact}</ListItem.Subtitle>
                                <ListItem.Subtitle style={{marginTop:10}}><MaterialCommunityIcons name="calendar-blank" size={15} color="gray" /> {cur_date}</ListItem.Subtitle>
                            </ListItem.Content>

                            {ButtonStatus}
                

                        <ListItem.Chevron />
                    </ListItem>


                </TouchableOpacity>
            )
            }}
            keyExtractor={(item, index) => index.toString()}
           />

        </View>

        )
}

const styles = StyleSheet.create({
    LoginView: {
        backgroundColor:'white',
        flex:1,
        padding:20,
    },
    title: {
        marginTop: 3,
        textTransform:"capitalize"
    }, 
    AddButtonView :{
        position:"absolute",
        bottom:"2%",
        right:"5%",
        borderRadius:100,
        alignItems:'center',
        alignContent:'center',
        backgroundColor:'#2288dc',
        height:70,
        width:70,
    },
    listStyle:{
        flexDirection:"row", 
        justifyContent:'space-between', 
        marginTop:10
    },
    inputFocused: {
        borderBottomColor: '#2288dc',
        borderBottomWidth:2
     },
    inputErr: {
        borderBottomColor: 'red',
    },
    PaymentInput:{
        marginTop:10, 
        marginBottom:-20,
    },
   
    });