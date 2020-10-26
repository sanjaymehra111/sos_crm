import React, {useState, useEffect} from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Text} from 'react-native';
import {GetLoggedInUserBillDetails, CreateNewPayment} from '../../services/api/users/userapi'
import {FormatDate} from '../../utils/function'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';
import { ListItem, Avatar, SearchBar, ButtonGroup, Overlay, Button, Input} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export const UserViewPayment = (props) => { 

    const [details,setDetails] =useState([]);
    const [paymentdetails,setPaymentdetails] =useState([{}]);

    const [visible, setVisible] = useState(false);
    const [partpayment, setPartpayment] = useState('');
    const [partpaymentErr, setPartpaymentErr] = useState('');
    const [partpaymentFocus, setPartpaymentFocus] = useState(false);
    const [partpaymentErrStyle, setPartpaymentErrStyle] = useState(false);
    const partpaymentinput = React.createRef();
    const [partpaymentdisplay, setPartpaymentdisplay] = useState('none');
    const [EmiDisplay, setEmiDisplay] = useState('none');
    const [RightIconDisplay, setRightIconDisplay] = useState('flex');

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    useEffect(()=>{
        getfuncion();
        setInterval(()=>{
            getfuncion();
        },5000)
    },[])
    
    
    async function getfuncion(){
        const res = await GetLoggedInUserBillDetails();
        setDetails([...res]);
    }


    const SelectCustomer = (item) =>{
        if(item.status == '0' && item.pay_type == 'part'){
            setPartpaymentdisplay('flex')
            setEmiDisplay('none')
        }
        //else if(item.status == '0' && item.pay_type == 'emi'){
        else if(item.pay_type == 'emi'){
            setPartpaymentdisplay('none')
            setEmiDisplay('flex')
        }
        else{
            setPartpaymentdisplay('none')
            setEmiDisplay('none')
        }
            
        setPaymentdetails([item])
        toggleOverlay();
    }


    async function UpdatePaymentDetails(){
        if(partpayment == '' || parseFloat(partpayment) > parseFloat(paymentdetails[0].balance) ){
            setPartpaymentErr('enter valid amount');
            setPartpaymentErrStyle(true);
            partpaymentinput.current.shake();
            partpaymentinput.current.focus();
        }
        else{
            setRightIconDisplay('none')
            setPartpaymentErr('');
            setPartpaymentErrStyle(false);
            var bal = paymentdetails[0].balance - partpayment;
            var total_pay = parseInt(paymentdetails[0].pay) + parseInt(partpayment);
            var res = await CreateNewPayment(paymentdetails[0].id, partpayment, total_pay, bal);
    
            if(res == 'success'){
                setRightIconDisplay('flex')
                setPartpayment('');
                toggleOverlay();
                props.navigation.navigate('UserViewPayment')
            }else{
                setRightIconDisplay('flex')
                alert('Server Error')
            }

        }
    }

    function ShowEmiDetailsFunction(){
        toggleOverlay();
        props.navigation.navigate('UserSpecficEmiDetails', {id:paymentdetails[0].id})
    }

    return(
        <View style={styles.LoginView}>
            <FlatList
            data={details}
            renderItem={({item})=>{
                var ButtonStatus =  <Button title='' buttonStyle={{padding:0, backgroundColor:'white'}} icon={<MaterialCommunityIcons name="check-decagram" size={25} color="green" />} ></Button>;
                var cur_date = FormatDate(item.date);
                if(item.status == '0'){
                    ButtonStatus = <Button title='' buttonStyle={{padding:0, backgroundColor:'white'}} icon={<MaterialCommunityIcons name="close-octagon" size={25} color="red" />} ></Button>
                }

                
                return( 
                <TouchableOpacity onPress={() => SelectCustomer(item)}>

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

            <View style={styles.AddButtonView}>
                <MaterialCommunityIcons name="plus" size={20} color="white" style={{padding:25}}  onPress={()=>{props.navigation.navigate('CreateBill')}} />
            </View>
        <View>
                <Overlay isVisible={visible} overlayStyle={{borderRadius:10}} onBackdropPress={toggleOverlay}>
                <View style={{ padding:40}}>
                        <View style={{alignItems:'center'}}>
                            <Text style={{color:'black', textTransform:'uppercase', marginTop:10, fontSize:22}}>payment details</Text>
                            <Text style={{borderColor:'red', marginTop:10, borderTopWidth:2, width:125}}/>
                        </View>
                        <View>
                            <View style={styles.listStyle}><Text>PRICE</Text><Text><MaterialCommunityIcons name="currency-inr" size={15} color="gray" /> {paymentdetails[0].price}</Text></View>
                            <View style={styles.listStyle}><Text>CGST (9%)</Text><Text><MaterialCommunityIcons name="currency-inr" size={15} color="gray" /> {paymentdetails[0].cgst}</Text></View>
                            <View style={styles.listStyle}><Text>SGST (9%)</Text><Text><MaterialCommunityIcons name="currency-inr" size={15} color="gray" /> {paymentdetails[0].sgst}</Text></View>
                            <View style={styles.listStyle}><Text>IGST (9%)</Text><Text> {paymentdetails[0].igst}</Text></View>
                            <View style={[styles.listStyle]}><Text>TOTAL PRICE</Text><Text><MaterialCommunityIcons name="currency-inr" size={15} color="gray" /> {paymentdetails[0].total_price}</Text></View>
                            <View style={[styles.listStyle, {borderTopWidth:2, borderColor:'gray', marginTop:10, paddingTop:10}]}><Text style={{color:'green'}}>PAID</Text><Text style={{color:'green'}}><MaterialCommunityIcons name="currency-inr" size={15} color="green" /> {paymentdetails[0].pay}</Text></View>
                        </View>

                        <View style={{display:partpaymentdisplay}}>
                            <View style={styles.listStyle}><Text style={{color:'red'}}>BALANCE</Text><Text style={{color:'red'}}><MaterialCommunityIcons name="currency-inr" size={15} color="red" /> {paymentdetails[0].balance}</Text></View>
                            <View style={styles.PaymentInput}>
                                <Input 
                                    value = {partpayment}
                                    ref={partpaymentinput}
                                    onFocus={() => setPartpaymentFocus(true)}
                                    inputContainerStyle={[partpaymentFocus ? styles.inputFocused : {}, partpaymentErrStyle ? styles.inputErr : {}, {marginLeft:-10, marginRight:-10}]}
                                    inputStyle={{fontSize:15, padding:0, paddingRight:10}}
                                    onChangeText = {(partpayment) => setPartpayment(partpayment)}
                                    maxLength={10}
                                    placeholder='Enter Amount'
                                    keyboardType='number-pad'
                                    leftIcon={ <MaterialCommunityIcons name='currency-inr' size={20} color='gray'/>}
                                    errorStyle={{ color: 'red', textTransform:'capitalize' }}
                                    errorMessage={partpaymentErr}
                                    rightIcon={<MaterialCommunityIcons name='checkbox-marked' style={{display:RightIconDisplay}} size={30} color="green" onPress={UpdatePaymentDetails} />}
                                />
                            </View>
                        </View> 


                        <View style={{display:EmiDisplay}}>
                            <View style={styles.listStyle}><Text style={{color:'red'}}>BALANCE</Text><Text style={{color:'red'}}><MaterialCommunityIcons name="currency-inr" size={15} color="red" /> {paymentdetails[0].balance}</Text></View>
                            <View style={styles.PaymentInput}>
                                <Button onPress={()=>ShowEmiDetailsFunction()} buttonStyle={{marginTop:20, borderRadius:20}} title='EMI DETAILS'/>
                            </View>
                        </View> 


                    </View>
                </Overlay>
        </View>
        
        
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