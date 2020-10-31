import React, {useState, navigation} from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View} from 'react-native';
import { Text, Avatar } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export const UserDashboard = ({navigation, route}) => {
     //const user_contact = route.params.cont;
    return(

            <ScrollView>
                <View style={styles.LoginView}>

                    <View style={{height:10}}></View>
                    <Text h4 style={{textTransform:'capitalize'}}>Pay Via </Text>
                    <View style={{height:10}}></View>

               </View>

               <View style={{flexDirection:"row", justifyContent:'space-evenly', backgroundColor:'lightgray', paddingTop:20, paddingBottom:20}}>
                    <View>
                        <Avatar
                            rounded
                            size="large"
                            source={{
                                uri:'https://www.searchpng.com/wp-content/uploads/2018/11/phone-pe.png',
                            }}
                        />
                    </View>  

                    <View>
                        <Avatar
                            rounded
                            size="large"
                            source={{
                                uri:'https://www.searchpng.com/wp-content/uploads/2019/02/Google-Pay-Logo-Icon-PNG.png',
                            }}
                        />
                    </View>  

                    <View>
                        <Avatar
                            rounded
                            size="large"
                            source={{
                                uri:'https://cdn2.iconfinder.com/data/icons/social-icons-circular-color/512/paytm-512.png',
                            }}
                        />
                    </View>  
                </View>  


                <View style={styles.LoginView}>

                    <View style={{height:50}}></View>
                    <Text h4 style={{textTransform:'capitalize'}}>Products</Text>
                    <View style={{height:10}}></View>

               </View>

               <View style={{flexDirection:"row", justifyContent:'space-evenly', backgroundColor:'lightgray', paddingTop:20, paddingBottom:20}}>
                    <View>
                        <Avatar
                            rounded
                            size="large"
                            source={{
                                uri:'https://upload.wikimedia.org/wikipedia/commons/2/2d/Mobile-Smartphone-icon.png',
                            }}
                        />
                    </View>  

                    <View>
                        <Avatar
                            rounded
                            size="large"
                            source={{
                                uri:'https://www.pngitem.com/pimgs/m/298-2989348_laptop-circle-icon-png-transparent-png.png',
                            }}
                        />
                    </View>  

                    <View>
                        <Avatar
                            rounded
                            size="large"
                            source={{
                                uri:'https://icons-for-free.com/iconfiles/png/512/device+smart+smartwatch+time+watch+icon-1320086001337623237.png',
                            }}
                        />
                    </View>  
                </View>  


                <View style={styles.LoginView}>

                    <View style={{height:50}}></View>
                    <Text h4 style={{textTransform:'capitalize'}}>Many More</Text>
                    <View style={{height:10}}></View>

               </View>

               <View style={{flexDirection:"row", justifyContent:'space-evenly', backgroundColor:'lightgray', paddingTop:20, paddingBottom:20}}>
                    <View>
                        <Avatar
                            rounded
                            size="large"
                            source={{
                                uri:'https://img.pngio.com/money-icon-png-at-getdrawingscom-free-money-icon-png-images-of-cash-icon-png-512_512.png',
                            }}
                        />
                    </View>  

                    <View>
                        <Avatar
                            rounded
                            size="large"
                            source={{
                                uri:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Circle-icons-creditcard.svg/1024px-Circle-icons-creditcard.svg.png',
                            }}
                        />
                    </View>  

                    <View>
                        <Avatar
                            rounded
                            size="large"
                            source={{
                                uri:'https://www.kindpng.com/picc/m/279-2797776_pay-transparent-png-mobile-payment-icon-png-png.png',
                            }}
                        />
                    </View>  
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
