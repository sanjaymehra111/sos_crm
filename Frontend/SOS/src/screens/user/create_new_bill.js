import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';
import {GetLoggedInUserProductDetails, GetLoggedInUserCustomerDetails, CreateNewBill, CreateNewEmiBill} from '../../services/api/users/userapi'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';
import { ListItem, Avatar, SearchBar, ButtonGroup, Overlay, Button, Input, CheckBox} from 'react-native-elements';
import { color } from 'react-native-reanimated';
import RNPickerSelect from 'react-native-picker-select';

var ProductFinalDetails = {data :[{}]};
var CustomerFinalDetails = {data :[{}]};

//ProductFinalDetails.data.push({id:'1',name:'redmi',price:'9999',emi:'1123123122312312312312'})
//CustomerFinalDetails.data.push({id:'1',name:'snj',contact:'9887878767',email:'snj@gmail.com',address:'rajapuri uttam nagar, new dlehi'})

export const CreateBill = (props) => {


    //****************************************** Create Customer  ***************************************/

    const [user, setUser] = useState('');
    const [userErr, setUserErr] = useState('');
    const [userFocus, setUserFocus] = useState(false);
    const [userErrStyle, setUserErrStyle] = useState(false);
    const userinput = React.createRef();
    
    const [contact, setContact] = useState('');
    const [contactErr, setContactErr] = useState('');
    const [contactFocus, setContactFocus] = useState(false);
    const [contactErrStyle, setContactErrStyle] = useState(false);
    const contactinput = React.createRef();

    const [address, setAddress] = useState('');
    const [addressErr, setAddressErr] = useState('');
    const [addressFocus, setAddressFocus] = useState(false);
    const [addressErrStyle, setAddressErrStyle] = useState(false);
    const addressinput = React.createRef();
    
    const [aadhar, setAadhar] = useState('');
    const [aadharErr, setAadharErr] = useState('');
    const [aadharFocus, setAadharFocus] = useState(false);
    const [aadharErrStyle, setAadharErrStyle] = useState(false);
    const aadharinput = React.createRef();

    const [pan, setPan] = useState('');
    const [panErr, setPanErr] = useState('');
    const [panFocus, setPanFocus] = useState(false);
    const [panErrStyle, setPanErrStyle] = useState(false);
    const paninput = React.createRef();

    
    
    
    //****************************************** Create Product  ***************************************/

    const [name, setName] = useState('');
    const [nameErr, setNameErr] = useState('');
    const [nameFocus, setNameFocus] = useState(false);
    const [nameErrStyle, setNameErrStyle] = useState(false);
    const nameinput = React.createRef();


    const [price, setPrice] = useState('');
    const [priceErr, setPriceErr] = useState('');
    const [priceFocus, setPriceFocus] = useState(false);
    const [priceErrStyle, setPriceErrStyle] = useState(false);
    const priceinput = React.createRef();
    

    const [emi, setEmi] = useState('');
    const [emiErr, setEmiErr] = useState('');
    const [emiFocus, setEmiFocus] = useState(false);
    const [emiErrStyle, setEmiErrStyle] = useState(false);
    const emiinput = React.createRef();

    const [gstcheck, setGstcheck] = useState(false);
    const [gstcheckErr, setGstcheckErr] = useState('');
    const [gstcheckFocus, setGstcheckFocus] = useState(false);
    const [gstcheckErrStyle, setGstcheckErrStyle] = useState(false);
    const gstcheckinput = React.createRef();

    const [finalPrice, setFinalPrice] = useState(false);
    const [firstPrice, setFirstPrice] = useState(false);
    const [gst_cgst, setGst_cgst] = useState(false);
    const [gst_sgst, setGst_sgst] = useState(false);
    const [gst_igst, setGst_igst] = useState(false);
    const [GrandTotal, setGrandTotal] = useState(false);


    useEffect(()=>{
        if(price > 0)
            ShowPayDetails();
    },[price, gstcheck])

    function ShowPayDetails(){
        setFirstPrice(price); //847
        setGst_cgst('-'); // 152
        setGst_sgst('-');  // 152
        setGst_igst('-');

        if(gstcheck == true){
            var fp = Math.round(price*100/118);
            setFirstPrice(fp); //847
            setGst_cgst(Number((fp*0.09).toFixed(2))); // 152
            setGst_sgst(Number((fp*0.09).toFixed(2)));  // 152
            setGst_igst('-');
        }
        //const GrandTotal = Math.round(firstPrice+gst_cgst+gst_sgst);
        setGrandTotal(price);
    }

    const [Emipaidamount, setEmipaidamount] = useState('');
    const [Emibalanceamount, setEmibalanceamount] = useState('');
    const [Emimonthamount, setEmimonthamount] = useState('');
    const [Emipayableamount, setEmipayableamount] = useState('');
    const [Emitotalamount, setEmitotalamount] = useState('');
 
    const [PaymentType, setPaymentType] = useState('');
    const [visible, setVisible] = useState(false);
    const [emivisible, setEmiVisible] = useState(false);

    const [partpayment, setPartpayment] = useState('');
    const [partpaymentErr, setPartpaymentErr] = useState('');
    const [partpaymentFocus, setPartpaymentFocus] = useState(false);
    const [partpaymentErrStyle, setPartpaymentErrStyle] = useState(false);
    const partpaymentinput = React.createRef();
    const [partpaymentdisplay, setPartpaymentdisplay] = useState('flex');

    var in_amount = Number(GrandTotal / 2).toFixed(0);
    const [emipayment, setEmipayment] = useState(in_amount.toString());
    const [emipaymentErr, setEmipaymentErr] = useState('');
    const [emipaymentFocus, setEmipaymentFocus] = useState(false);
    const [emipaymentErrStyle, setEmipaymentErrStyle] = useState(false);
    const emipaymentinput = React.createRef();

    const [emipercent, setEmipercent] = useState('3');
    const [emipercentErr, setEmipercentErr] = useState('');
    const [emipercentFocus, setEmipercentFocus] = useState(false);
    const [emipercentErrStyle, setEmipercentErrStyle] = useState(false);
    const emipercentinput = React.createRef();

    const [EmiMonthValue, setEmiMonthValue] = useState('1');
    const [emimonthFocus, setEmimonthFocus] = useState(false);
    const [emimonthErrStyle, setEmimonthErrStyle] = useState(false);
    
    
    function ShowEmiOutput(){
        var total_bal = GrandTotal-emipayment;
        var total_percent = EmiMonthValue*emipercent;
        var emi_pay_amount = (total_bal/100*total_percent)+total_bal;
        var per_month = parseInt(emi_pay_amount) / parseInt(EmiMonthValue);
        var total_pay = parseInt(emi_pay_amount) + parseInt(emipayment);

        setEmipaidamount(Number(emipayment).toFixed(0));
        setEmibalanceamount(Number(total_bal).toFixed(0));
        setEmimonthamount(Number(per_month).toFixed(0));
        setEmipayableamount(Number(emi_pay_amount).toFixed(0))
        setEmitotalamount(Number(total_pay).toFixed(0))
        
    }

    useEffect(()=>{
        if(parseFloat(emipayment) > 0 && parseFloat(emipayment) <= parseFloat(GrandTotal)) 
            ShowEmiOutput();
    },[
        emipayment,emipercent,EmiMonthValue
    ])
 


    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const toggleEmiOverlay = () => {
        setEmiVisible(!emivisible);
    };

    const PaymentFunciton = async (item) =>{
        var check = await CheckUserData();
        if(check == 'success'){
            if(item == 0){
                setPaymentType('full');
                toggleOverlay();
                setPartpaymentdisplay('none');
            }else if(item == 2){
                setPaymentType('part');
                toggleOverlay();
                setPartpaymentdisplay('flex');
            } else{
                setPaymentType('emi');
                toggleEmiOverlay();
            }
        }
    }

    async function PayPaymentFunction(){
        var res;
        if(partpaymentdisplay == 'none'){
            res = await CreateNewBill (ProductFinalDetails.data[0].id, CustomerFinalDetails.data[0].id, CustomerFinalDetails.data[0].name, CustomerFinalDetails.data[0].contact, ProductFinalDetails.data[0].name, ProductFinalDetails.data[0].emi, firstPrice, gst_cgst, gst_sgst, gst_igst, GrandTotal, GrandTotal, '0', PaymentType);

            if(res == 'success'){
                toggleOverlay();
                props.navigation.navigate('UserViewPayment')
            }else{
                alert('Server Error')
            }
    
        }
        else{
            if(partpayment == '' || parseFloat(partpayment) > parseFloat(GrandTotal) ){
                setPartpaymentErr('enter valid amount');
                setPartpaymentErrStyle(true);
                partpaymentinput.current.shake();
                partpaymentinput.current.focus();
            }
            else{
                setPartpaymentErr('');
                setPartpaymentErrStyle(false);
                var bal = GrandTotal - partpayment; 
                res = await CreateNewBill (ProductFinalDetails.data[0].id, CustomerFinalDetails.data[0].id, CustomerFinalDetails.data[0].name, CustomerFinalDetails.data[0].contact, ProductFinalDetails.data[0].name, ProductFinalDetails.data[0].emi, firstPrice, gst_cgst, gst_sgst, gst_igst, GrandTotal, partpayment, bal, PaymentType);

                if(res == 'success'){
                    toggleOverlay();
                    props.navigation.navigate('UserViewPayment')
                }else{
                    alert('Server Error')
                }
        
            }
        }

        //console.log("Res : ", res);
        
    }

    async function PayEmiPaymentFunction(){
        if(emipayment == '' || parseFloat(emipayment) > parseFloat(GrandTotal) ){
            setEmipaymentErr('enter valid amount');
            setEmipaymentErrStyle(true);
            emipaymentinput.current.shake();
            emipaymentinput.current.focus();
        }
        else if(!EmiMonthValue > 0){
            setEmipaymentErr('');
            setEmipaymentErrStyle(false);
            
            setEmimonthErrStyle(true);
        }
        else if(emipercent == '' || !parseFloat(emipercent) > 0 ){
            setEmipaymentErr('');
            setEmipaymentErrStyle(false);
            setEmimonthErrStyle(false);

            setEmipercentErr('enter valid Percent amount');
            setEmipercentErrStyle(true);
            emipercentinput.current.shake();
            emipercentinput.current.focus();
        }
        else{
            
            var emi_bal_amount = Emitotalamount - Emipaidamount;
            res = await CreateNewEmiBill (ProductFinalDetails.data[0].id, CustomerFinalDetails.data[0].id, CustomerFinalDetails.data[0].name, CustomerFinalDetails.data[0].contact, ProductFinalDetails.data[0].name, ProductFinalDetails.data[0].emi, firstPrice, gst_cgst, gst_sgst, gst_igst, /*GrandTotal*/ Emitotalamount, Emipaidamount, EmiMonthValue, emipercent, emi_bal_amount /*Emibalanceamount*/, Emimonthamount, Emipayableamount, Emitotalamount, PaymentType);
            if(res == 'success'){
                setEmipaymentErr('');
                setEmipaymentErrStyle(false);
                setEmimonthErrStyle(false);
                setEmipercentErr('');
                setEmipercentErrStyle(false);
                toggleEmiOverlay();
                props.navigation.navigate('UserViewPayment')
            }else{
                alert('Server Error')
            }
        }
    }

    function CheckUserData(){
        if(user == ''){
            setUserErr('please enter user name');
            setUserErrStyle(true);
            userinput.current.shake();
            userinput.current.focus();
        }

        else if(contact.length != 10){
            setUserErr('');
            setUserErrStyle(false);

            setContactErr('enter a valid contact number');
            setContactErrStyle(true);
            contactinput.current.shake();
            contactinput.current.focus();
        }

        else if(address == ''){
            setContactErrStyle(false);
            setContactErr('');

            setAddressErr('please enter user address');
            setAddressErrStyle(true);
            addressinput.current.shake();
            addressinput.current.focus();
        }

        else if(name == ''){

            setUserErrStyle(false);
            setUserErr('');

            setContactErrStyle(false);
            setContactErr('');
            
            setAddressErrStyle(false);
            setAddressErr('');

            setAadharErrStyle(false);
            setAadharErr('');

            setPanErrStyle(false);
            setPanErr('');

            setNameErr('please enter product name');
            setNameErrStyle(true);
            nameinput.current.shake();
            nameinput.current.focus();
        }

        else if(price == ''){
            setNameErr('');
            setNameErrStyle(false);

            setPriceErr('please enter price');
            setPriceErrStyle(true);
            priceinput.current.shake();
            priceinput.current.focus();
        }
        else{

            setNameErr('');
            setNameErrStyle(false);

            setPriceErr('');
            setPriceErrStyle(false);

            return 'success';
        }


    }

    async function GstCheckFunction(){
        if(gstcheck == true){
            setGstcheck(false);
        }
        else{
            setGstcheck(true);
        }
    }
    return(
        <View style={styles.BillView}>
            <View>
                <ListItem bottomDivider disabled  >
                    <ListItem.Content style={{marginLeft:10, alignItems:"center"}}>
                        <Avatar rounded source={{uri: 'https://serviceonway.com/serviceonway/files/images/user1.png'}} size={100} />
                        <View style={{height:40}}/>
                        
                        <Input 
                            value = {user}
                            ref={userinput}
                            onFocus={() => setUserFocus(true)}
                            inputContainerStyle={[userFocus ? styles.inputFocused : {}, userErrStyle ? styles.inputErr : {}]}
                            onChangeText = {(user) => setUser(user)}
                            maxLength={100}
                            placeholder='User Name*'
                            leftIcon={ <Icon name='user' size={17} color='gray'/>}
                            errorStyle={{ color: 'red', textTransform:'capitalize' }}
                            errorMessage={userErr}
                            style={{fontSize:15}}
                        />


                        <Input 
                            value = {contact}
                            ref={contactinput}
                            onFocus={() => setContactFocus(true)}
                            inputContainerStyle={[contactFocus ? styles.inputFocused : {}, contactErrStyle ? styles.inputErr : {}, {marginTop:-10} ]}
                            onChangeText = {(contact) => setContact(contact)}
                            maxLength={10}
                            keyboardType={'number-pad'}
                            placeholder='User Contact*'
                            leftIcon={ <Icon name='phone' size={17} color='gray'/>}
                            errorStyle={{ color: 'red', textTransform:'capitalize' }}
                            errorMessage={contactErr}
                            style={{fontSize:15}}
                        />

                        <Input 
                            value = {address}
                            ref={addressinput}
                            onFocus={() => setAddressFocus(true)}
                            inputContainerStyle={[addressFocus ? styles.inputFocused : {}, addressErrStyle ? styles.inputErr : {}, {marginTop:-10} ]}
                            onChangeText = {(address) => setAddress(address)}
                            placeholder='User Address*'
                            leftIcon={ <Icon name='map-marker' size={17} color='gray'/>}
                            errorStyle={{ color: 'red', textTransform:'capitalize' }}
                            errorMessage={addressErr}
                            style={{fontSize:15}}
                        />

                        <Input 
                            value = {aadhar}
                            ref={aadharinput}
                            onFocus={() => setAadharFocus(true)}
                            inputContainerStyle={[aadharFocus ? styles.inputFocused : {}, aadharErrStyle ? styles.inputErr : {}, {marginTop:-10} ]}
                            onChangeText = {(aadhar) => setAadhar(aadhar)}
                            maxLength={12}
                            keyboardType={'number-pad'}
                            placeholder='Aadhar Number'
                            leftIcon={ <Icon name='id-card' size={17} color='gray'/>}
                            errorStyle={{ color: 'red', textTransform:'capitalize' }}
                            errorMessage={aadharErr}
                            style={{fontSize:15}}
                        />

                         <Input 
                            value = {pan}
                            ref={paninput}
                            onFocus={() => setPanFocus(true)}
                            inputContainerStyle={[panFocus ? styles.inputFocused : {}, panErrStyle ? styles.inputErr : {}, {marginTop:-10} ]}
                            onChangeText = {(pan) => setPan(pan)}
                            maxLength={12}
                            placeholder='PAN Number'
                            leftIcon={ <Icon name='vcard-o' size={17} color='gray'/>}
                            errorStyle={{ color: 'red', textTransform:'capitalize' }}
                            errorMessage={panErr}
                            style={{fontSize:15}}
                        />
                            
                    <View style={{height:5}}/>
                    </ListItem.Content>
                    <ListItem.Content style={{marginLeft:10, alignItems:"center"}}>
                        <Avatar containerStyle={{marginTop:-20}} rounded source={{uri: 'https://www.tourdemelon.com/wp-content/plugins/maxbuttons/images/gopro/icons/responsive.png'}} size={100} />
                        <View style={{height:40}}/>

                        <Input 
                            value = {name}
                            ref={nameinput}
                            onFocus={() => setNameFocus(true)}
                            inputContainerStyle={[nameFocus ? styles.inputFocused : {}, nameErrStyle ? styles.inputErr : {}, {marginTop:-10} ]}
                            onChangeText = {(name) => setName(name)}
                            maxLength={100}
                            placeholder='Product Name*'
                            leftIcon={ <MaterialCommunityIcons name='devices' size={17} color='gray'/>}
                            errorStyle={{ color: 'red', textTransform:'capitalize' }}
                            errorMessage={nameErr}
                            style={{fontSize:15}}
                        />


                        <Input 
                            value = {price}
                            ref={priceinput}
                            onFocus={() => setPriceFocus(true)}
                            inputContainerStyle={[priceFocus ? styles.inputFocused : {}, priceErrStyle ? styles.inputErr : {}, {marginTop:-10} ]}
                            onChangeText = {(price) => setPrice(price)}
                            maxLength={10}
                            keyboardType='number-pad'
                            placeholder='Product Price*'
                            leftIcon={ <MaterialCommunityIcons name='currency-inr' size={17} color='gray'/>}
                            errorStyle={{ color: 'red', textTransform:'capitalize' }}
                            errorMessage={priceErr}
                            style={{fontSize:15}}
                        />

                        <Input 
                            value = {emi}
                            ref={emiinput}
                            onFocus={() => setEmiFocus(true)}
                            inputContainerStyle={[emiFocus ? styles.inputFocused : {}, emiErrStyle ? styles.inputErr : {}, {marginTop:-10} ]}
                            onChangeText = {(emi) => setEmi(emi)}
                            maxLength={100}
                            placeholder='Product EMI Number'
                            leftIcon={ <MaterialCommunityIcons name='alpha-e-box-outline' size={17} color='gray'/>}
                            errorStyle={{ color: 'red', textTransform:'capitalize' }}
                            errorMessage={emiErr}
                            style={{fontSize:15}}
                        />

                        <CheckBox uncheckedColor="lightgray" title='INCLUDE GST' checkedColor="green" containerStyle={{marginTop:0}} checked={gstcheck} value={gstcheck} onPress={()=> GstCheckFunction()} />

                        <Input disabled inputContainerStyle={[emiFocus ? styles.inputFocused : {}, emiErrStyle ? styles.inputErr : {}, {marginTop:-10, borderBottomWidth:0} ]} />

                      
                    <View style={{height:5}}/>
                    </ListItem.Content>
                </ListItem>

                <View style={{height:20}}/>
                
                <ListItem bottomDivider disabled >
                    <ListItem.Content style={{marginLeft:10}}>
                        <View style={styles.listStyle}><Text>PRICE</Text><Text><MaterialCommunityIcons name="currency-inr" size={15} color="gray" /> {firstPrice}</Text></View>
                        <View style={styles.listStyle}><Text>CGST (9%)</Text><Text><MaterialCommunityIcons name="currency-inr" size={15} color="gray" /> {gst_cgst}</Text></View>
                        <View style={styles.listStyle}><Text>SGST (9%)</Text><Text><MaterialCommunityIcons name="currency-inr" size={15} color="gray" /> {gst_sgst}</Text></View>
                        <View style={styles.listStyle}><Text>IGST (9%)</Text><Text style={{marginRight:'5%'}}> {gst_igst}</Text></View>
                        <Text style={{borderBottomWidth:2, borderColor:'brown', width:'100%'}}/>
                        <View style={styles.listStyle}><Text style={{color:'brown'}}>TOTAL PRICE</Text><Text style={{color:'brown'}}><MaterialCommunityIcons name="currency-inr" size={15} color="brown" /> {GrandTotal}</Text></View>
                        </ListItem.Content>
                </ListItem>
            
            </View>

            <View style={{position:"absolute", bottom:0, width:'100%'}}>
                <ButtonGroup
                    buttons={['Payment','EMI']}
                    onPress={(index) =>PaymentFunciton(index)}
                    buttonStyle={{backgroundColor:'#2288dc', borderRadius:5}}
                    containerStyle={{borderColor:'white',  height:50}}
                    textStyle={{color:'white'}}
                />
            </View>

            <View>
                <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                    <View style={{alignItems:'center', justifyContent:'center', padding:40, height:300}}>
                        <View style={{alignItems:'center'}}>
                            <Text style={{color:'black', textTransform:'uppercase', marginTop:10, fontSize:22}}>CONFIRMATION</Text>
                            <Text style={{borderColor:'red', marginTop:10, borderTopWidth:2, width:125}}/>
                            <Text style={{color:'gray', textTransform:'uppercase', marginTop:10}}><MaterialCommunityIcons name="tablet-cellphone" size={15} color="gray" /> {ProductFinalDetails.data[0].name}</Text>
                            <Text style={{color:'gray', marginTop:10}}><MaterialCommunityIcons name="currency-inr" size={15} color="gray" /> {GrandTotal}</Text>
                        </View>
                        <View style={[styles.PaymentInput, {display:partpaymentdisplay} ]}>
                            <Input 
                                value = {partpayment}
                                ref={partpaymentinput}
                                onFocus={() => setPartpaymentFocus(true)}
                                inputContainerStyle={[partpaymentFocus ? styles.inputFocused : {}, partpaymentErrStyle ? styles.inputErr : {}, {width:170} ]}
                                onChangeText = {(partpayment) => setPartpayment(partpayment)}
                                maxLength={10}
                                placeholder='Enter Amount'
                                keyboardType='number-pad'
                                leftIcon={ <MaterialCommunityIcons name='currency-inr' size={25} color='gray'/>}
                                errorStyle={{ color: 'red', textTransform:'capitalize' }}
                                errorMessage={partpaymentErr}
                            />
                        </View>
                        <View style={{marginTop:20}}>
                            <Button title='CLICK TO CONFIRM' onPress={PayPaymentFunction} buttonStyle={{backgroundColor:'green', width:300, height:60}} />
                        </View>
                    </View>
                </Overlay>
            </View>

            <View>
                <Overlay isVisible={emivisible} onBackdropPress={toggleEmiOverlay}>
                    <View style={{alignItems:'center', justifyContent:'center', padding:40}}>
                        <View style={{alignItems:'center'}}>
                            <Text style={{color:'black', textTransform:'uppercase', marginTop:10, fontSize:22}}>EMI CONFIRMATION</Text>
                            <Text style={{borderColor:'red', marginTop:10, borderTopWidth:2, width:125}}/>
                        </View>
                        <View style={{alignItems:'center', flexDirection:'row'}}>
                            <Text style={{color:'gray', textTransform:'uppercase', marginTop:10}}><MaterialCommunityIcons name="tablet-cellphone" size={15} color="gray" /> {ProductFinalDetails.data[0].name}</Text>
                            <Text style={{color:'gray', marginTop:10,marginLeft:100}}><MaterialCommunityIcons name="currency-inr" size={15} color="gray" /> {GrandTotal}</Text>
                        </View>

                        <View style={[styles.EmiPaymentInputStyle]}>
                            <Input 
                                value = {emipayment}
                                ref={emipaymentinput}
                                onFocus={() => setEmipaymentFocus(false)}
                                inputContainerStyle={[emipaymentFocus ? styles.inputFocused : {}, emipaymentErrStyle ? styles.inputErr : {}]}
                                onChangeText = {(emipayment) => setEmipayment(emipayment)}
                                maxLength={10}
                                placeholder='Initial Amount'
                                keyboardType='number-pad'
                                leftIcon={ <MaterialCommunityIcons name='currency-inr' size={25} color='gray'/>}
                                errorStyle={{ color: 'red', textTransform:'capitalize' }}
                                errorMessage={emipaymentErr}
                            />
                        </View>

                        <View style={[styles.EmiPaymentInputStyle, styles.EmiPaymentInputStyle2]}>
                            <RNPickerSelect
                                onValueChange={(value) =>  setEmiMonthValue(value)}
                                placeholder={{ label: 'Select Period'}}
                                key={EmiMonthValue}
                                value={EmiMonthValue}
                                onFocus={() => setEmimonthFocus(true)}
                                style={{viewContainer:[{borderBottomWidth:1, borderBottomColor:'gray', width:'95%'}, emimonthErrStyle ? {borderBottomColor:'red'} : {}]}}
                                color='red'
                                items={[
                                    { label: '1 Month', value: '1' },
                                    { label: '2 Month', value: '2' },
                                    { label: '4 Month', value: '4' },
                                    { label: '6 Month', value: '6' },
                                    { label: '10 Month',value: '10'},
                                    { label: '1 Year', value: '12' },
                                    { label: '2 Year', value: '24' },
                                    { label: '3 Year', value: '36' },
                                ]}
                            />
                        </View>

                        <View style={[styles.ShowPaymentInputStyle2]}>
                            <Input 
                                value = {emipercent}
                                ref={emipercentinput}
                                onFocus={() => setEmipercentFocus(false)}
                                inputContainerStyle={[emipercentFocus ? styles.inputFocused : {}, emipercentErr ? styles.inputErr : {}]}
                                onChangeText = {(emipercent) => setEmipercent(emipercent)}
                                maxLength={2}
                                placeholder='Percent Per Month'
                                keyboardType='number-pad'
                                leftIcon={ <MaterialCommunityIcons name='percent-outline' size={25} color='gray'/>}
                                errorStyle={{ color: 'red', textTransform:'capitalize' }}
                                errorMessage={emipercentErr}
                            />
                        </View>

                        <View style={[styles.ShowPaymentInputStyle3]}>
                            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                                <Text>Total</Text>
                                <Text><MaterialCommunityIcons name='currency-inr' size={13} color='gray'/> {GrandTotal}</Text>
                            </View>

                            <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:5}}>
                                <Text>Paid</Text>
                                <Text><MaterialCommunityIcons name='currency-inr' size={13} color='gray'/> {Emipaidamount}</Text>
                            </View>

                            <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:5}}>
                                <Text>Balance</Text>
                                <Text><MaterialCommunityIcons name='currency-inr' size={13} color='gray'/> {Emibalanceamount}</Text>
                            </View>

                            <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:5, borderTopColor:'gray', borderTopWidth:1}}></View>
                            
                            <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:5}}>
                                <Text>Per Month</Text>
                                <Text><MaterialCommunityIcons name='currency-inr' size={13} color='gray'/> {Emimonthamount}</Text>
                            </View>

                            <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:5}}>
                                <Text>Payable Amount</Text>
                                <Text><MaterialCommunityIcons name='currency-inr' size={13} color='gray'/> {Emipayableamount}</Text>
                            </View>

                            <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:5, borderTopColor:'gray', borderTopWidth:1}}></View>

                            <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:5}}>
                                <Text style={{color:'red'}}>Total Amount</Text>
                                <Text style={{color:'red'}}><MaterialCommunityIcons name='currency-inr' size={13} color='red'/> {Emitotalamount}</Text>
                            </View>

                        </View>


                        <View style={{marginTop:20}}>
                            <Button title='CLICK TO CONFIRM' onPress={PayEmiPaymentFunction} buttonStyle={{backgroundColor:'green', width:300, height:60}} />
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
        zIndex:1,
    },
    BillView: {
        backgroundColor:'lightgray',
        backgroundColor:'white',
        flex:1,
        
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
        width:'100%', 
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
        marginBottom:-20
    },
    EmiPaymentInputStyle:{
        marginTop:10, 
        marginBottom:-20,
        width:'90%'
    },

    EmiPaymentInputStyle2:{
        marginTop:5, 
        marginLeft:15
    },

    ShowPaymentInputStyle2:{
        marginTop:30, 
        width:'90%',
    },

    ShowPaymentInputStyle3:{
        width:'90%',
        backgroundColor:'#DAF5F5',
        padding:10,
        marginTop:20, 
        
    }

});

