import React,{useState, useEffect, navigation, useMemo, useContext, useReducer} from 'react';
import {View, StyleSheet} from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {createStackNavigator} from '@react-navigation/stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createDrawerNavigator, DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer'
import AsyncStorage from '@react-native-community/async-storage';
import {useTheme, Avatar, Title, Caption, Paragraph, Drawer, Text, TouchableRipple, Switch} from 'react-native-paper'

import {EnterOtp, Login} from '../../screens/user/login'
import Register_User from '../../screens/user/user_registration'
import {UserDashboard} from '../../screens/user/dashboard'
import {UserProfile} from '../../screens/user/user_profile'
import {CreateBill} from '../../screens/user/create_bill'
import {CreateCustomer} from '../../screens/user/create_customer'
import {CreateProduct} from '../../screens/user/create_product'
import {SplashScreen} from '../../screens/splash/splash'
import {Authcontext} from '../../components/context'


const AuthStackScreen = () => {
    const AuthStack = createStackNavigator();
    return(
        <NavigationContainer>
            <AuthStack.Navigator>
                <AuthStack.Screen name='Login' component={Login} options={{title:'Login'}} />
                <AuthStack.Screen name='EnterOtp' component={EnterOtp} options={{title:'Verification'}} />
                <AuthStack.Screen name='Register_User' component={Register_User} options={{title : "User Registration"}} />
                {/* <AuthStack.Screen name='UserDashboard' component={UserDashboard} options={{title : "Dashboard"}} /> */}
            </AuthStack.Navigator>
        </NavigationContainer>
    )
}

const UserDashboardScreen = ({navigation}) => {
    const { SignOut } = useContext(Authcontext)
    
    const Tabs = createBottomTabNavigator();
    const Drawers = createDrawerNavigator();

    const HomeStack = createStackNavigator();
    const ProfileStack = createStackNavigator();


    const HomeStachScreen = (props) =>{
        return(
            <HomeStack.Navigator>
                <HomeStack.Screen name='UserDashboard' component={UserDashboard}
                options={{
                    headerTitle: 'Dashboard',
                    headerRight: () => ( <Icon name="menu" onPress={() => props.navigation.openDrawer()} containerStyle={{marginRight:10}} iconStyle={{color:'#2288dc', fontSize:25}} />),
                }}
                />
            </HomeStack.Navigator>
        )
    }

    const ProfileStachScreen = (props) =>{
        return(
            <ProfileStack.Navigator>
                <ProfileStack.Screen name='UserProfile' component={UserProfile} 
                options={{
                    headerTitle: 'Profile',
                    headerRight: () => ( <Icon onPress={() => props.navigation.openDrawer()} name="menu" containerStyle={{marginRight:10}} iconStyle={{color:'#2288dc', fontSize:25}} />),
                }}
                />
            </ProfileStack.Navigator>
        )
    }

    const BillStachScreen = (props) =>{
        return(
            <ProfileStack.Navigator>
                <ProfileStack.Screen name='CreateBill' component={CreateBill} 
                options={{
                    headerTitle: 'Create Bill',
                    headerRight: () => ( <Icon onPress={() => props.navigation.openDrawer()} name="menu" containerStyle={{marginRight:10}} iconStyle={{color:'#2288dc', fontSize:25}} />),
                    headerLeft: () => ( <Icon onPress={() => props.navigation.navigate('UserDashboard') } name="arrow-back" containerStyle={{marginLeft:10}} iconStyle={{color:'#2288dc', fontSize:25}} />),
                }}
                />
            </ProfileStack.Navigator>
        )
    }

    const ProductStachScreen = (props) =>{
        return(
            <ProfileStack.Navigator>
                <ProfileStack.Screen name='CreateProduct' component={CreateProduct} 
                options={{
                    headerTitle: 'Create Product',
                    headerRight: () => ( <Icon onPress={() => props.navigation.openDrawer()} name="menu" containerStyle={{marginRight:10}} iconStyle={{color:'#2288dc', fontSize:25}} />),
                    headerLeft: () => ( <Icon onPress={() => props.navigation.navigate('UserDashboard') } name="arrow-back" containerStyle={{marginLeft:10}} iconStyle={{color:'#2288dc', fontSize:25}} />),
                }}
                />
            </ProfileStack.Navigator>
        )
    }

    const CustomerStachScreen = (props) =>{
        return(
            <ProfileStack.Navigator>
                <ProfileStack.Screen name='CreateCustomer' component={CreateCustomer} 
                options={{
                    headerTitle: 'Create Customer',
                    headerRight: () => ( <Icon onPress={() => props.navigation.openDrawer()} name="menu" containerStyle={{marginRight:10}} iconStyle={{color:'#2288dc', fontSize:25}} />),
                    headerLeft: () => ( <Icon onPress={() => props.navigation.navigate('UserDashboard') } name="arrow-back" containerStyle={{marginLeft:10}} iconStyle={{color:'#2288dc', fontSize:25}} />),
                }}
                />
            </ProfileStack.Navigator>
        )
    }

    const TabsScreen = () =>{
        return(
        <Tabs.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color}) => {
                        let iconName;
                        if (route.name === 'Home') {
                            iconName = focused ? 'home' : 'home';
                        } 
                        else if (route.name === 'Profile') {
                            iconName = focused ? 'user-alt' : 'user-alt';
                        }
                        return <FontAwesome5 name={iconName} size={15} color={color} />;
                    },
                })}
        
                tabBarOptions={{
                    activeTintColor: '#2288dc',
                    inactiveTintColor: 'gray',
                }}
            
            >
                <Tabs.Screen name='Home' component={HomeStachScreen} />
                <Tabs.Screen name='Profile' component={ProfileStachScreen}/>
            </Tabs.Navigator>
        )
    }

    const CustomDrawerNavigator = (props) => {
        return(
            <View style={{flex:1}}>
                <DrawerContentScrollView {...props}>
                    <View style={styles.drawerContent}>

                        <View style={styles.userInfoSection}>
                            <View style={{flexDirection:'row', marginTop:15}}>
                                <Avatar.Image 
                                    source={{
                                        uri:'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'
                                    }}
                                    size={60}
                                />
                                <View style={{marginLeft:10}}>
                                    <Title style={styles.title}>Nidhi Singh</Title>
                                    <Caption style={styles.caption}>NidhiSingh@gmail.com</Caption>
                                </View>
                            </View>

                            <View style={styles.row}>
                                <View style={styles.section}>
                                    <Paragraph style={[styles.paragraph, styles.caption]}>5</Paragraph>
                                    <Caption style={styles.caption}>Customer</Caption>
                                </View>
                                <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>10</Paragraph>
                                    <Caption style={styles.caption}>Product</Caption>
                                </View>
                            </View>
                        </View> 

                        {/************************** User Info Close **************************/}

                        <Drawer.Section style={styles.drawerSection}>
                            <DrawerItem
                                label='Home'
                                icon={({focused, color, size}) => (
                                    <FontAwesome5 
                                        name='home'
                                        color={color}
                                        size={size}
                                    />
                                )}
                                onPress={()=>{props.navigation.navigate('UserDashboard')}}
                            />

                            <DrawerItem
                                label='Create Bill'
                                icon={({focused, color, size}) => (
                                    <FontAwesome5 
                                        name='receipt'
                                        color={color}
                                        size={size}
                                    />
                                )}
                                onPress={()=>{props.navigation.navigate('CreateBill')}}
                            />

                            <DrawerItem
                                label='Create Product'
                                icon={({focused, color, size}) => (
                                    <FontAwesome5 
                                        name='mobile-alt'
                                        color={color}
                                        size={size}
                                    />
                                )}
                                onPress={()=>{props.navigation.navigate('CreateProduct')}}
                            />

                            <DrawerItem
                                label='Create Customer'
                                icon={({focused, color, size}) => (
                                    <FontAwesome5 
                                        name='user-plus'
                                        color={color}
                                        size={size}
                                    />
                                )}
                                onPress={()=>{props.navigation.navigate('CreateCustomer')}}
                            />

                        </Drawer.Section>

                    </View>    
                </DrawerContentScrollView> 


                <Drawer.Section style={styles.bottomDrawerSection}>
                    <DrawerItem
                        label='Sign Out'
                        icon={({focused, color, size}) => (
                            <FontAwesome5 
                                name='sign-out-alt'
                                color={color}
                                size={size}
                            />
                        )}
                        onPress={() => {SignOut()}}
                    />
                </Drawer.Section>
                

            </View>
        )
    }

    return(
        <NavigationContainer>
             <Drawers.Navigator drawerContent={props => <CustomDrawerNavigator {...props} />}>
                 <Drawers.Screen name='UserDashboard' component={TabsScreen}/>
                 <Drawers.Screen name='CreateBill' component={BillStachScreen}/>
                 <Drawers.Screen name='CreateProduct' component={ProductStachScreen}/>
                <Drawers.Screen name='CreateCustomer' component={CustomerStachScreen}/>
            </Drawers.Navigator>
        </NavigationContainer>

    )

    const StatiDrawer= () =>{
        return(
            <NavigationContainer>
                <Drawers.Navigator>
                    <Drawers.Screen name='Home' component={TabsScreen}
                        options={{
                            title:'Home',
                            drawerIcon:({focused}) => <FontAwesome5 
                                size={20}
                                color={focused ? '#2288dc' : 'gray'}
                                name='home'
                            />
                        }} 
                    />
                    <Drawers.Screen name='Create_Bill' component={BillStachScreen} 
                        options={{
                            title:'Create Bill',
                            drawerIcon:({focused}) => <FontAwesome5 
                                size={20}
                                color={focused ? '#2288dc' : 'gray'}
                                name='receipt'
                            />
                        }} 
                    />
                    <Drawers.Screen name='Create_Product' component={ProductStachScreen} 
                        options={{
                            title:'Create Product',
                            drawerIcon:({focused}) => <FontAwesome5 
                                size={20}
                                color={focused ? '#2288dc' : 'gray'}
                                name='mobile-alt'
                            />
                        }} 
                    />
                    <Drawers.Screen name='Create_Customer' component={CustomerStachScreen}  
                        options={{
                            title:'Create Customer',
                            drawerIcon:({focused}) => <FontAwesome5 
                                size={20}
                                color={focused ? '#2288dc' : 'gray'}
                                name='user-plus'
                            />
                        }} 
                    />

                    <Drawers.Screen name='LogOutStackScreen' component={LogOutStackScreen}  
                        options={{
                            title:'Sign Out',
                            drawerIcon:({focused}) => <FontAwesome5 
                                size={20}
                                color={focused ? '#2288dc' : 'gray'}
                                name='sign-out-alt'
                            />
                        }} 
                    />

    
                </Drawers.Navigator>
            </NavigationContainer>

        )
    }

}

export const CustomeHeader = () =>{

    const initialLoginState = {
        isLoading: true,
        //userName: null,
        userToken: null,
    };

    const loginReducer =(prevState, action) => {
        switch(action.type){
            case 'RETRIEVE_TOKEN':return{
                ...prevState,
                userToken: action.token,
                isLoading: false
            };
            case 'LOGIN':return{
                ...prevState,
                //userName: action.id,
                userToken: action.token,
                isLoading: false
            };
            case 'LOGOUT':return{
                ...prevState,
                //userName: null,
                userToken: null,
                isLoading: false
            };
            case 'REGISTER':return{
                ...prevState,
                //userName: action.id,
                userToken: action.token,
                isLoading: false
            };
        }
    }

    const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

    const authContext = useMemo(() => ({
        SignIn : async(userToken) =>{
            if(userToken == '123456'){
                try {
                    await AsyncStorage.setItem('userToken', userToken)
                } catch (e) {
                    console.log('SignIn UseMemo Error ', e);
                }
                dispatch({type:'LOGIN', token:userToken});
            }
            else
                dispatch({type:'LOGIN'});
            
            
        },

        SignUp : async(userToken) =>{
            if(userToken == '123456'){
                try {
                    await AsyncStorage.setItem('userToken', userToken)
                } catch (e) {
                    console.log('SignIn UseMemo Error ', e);
                }
                dispatch({type:'REGISTER', token:userToken});
            }
            else
            dispatch({type:'REGISTER'});
            
        },

        SignOut: async() =>{
            try {
                await AsyncStorage.removeItem('userToken')
              } catch (e) {
                console.log('SignIn UseMemo Error ', e);
              }
            dispatch({type:'LOGOUT'});
        },
    }),[])  

    useEffect(() => {
        setTimeout( async()=>{

            let userToken;
            try {
                userToken = await AsyncStorage.getItem('userToken')
              } catch (e) {
                console.log('SignIn UseMemo Error ', e);
              }

            dispatch({type:'REGISTER', token:userToken});
            //setIsLoading(false);
        },100)
    },[])

    if(loginState.isLoading){
        return <SplashScreen/>
    }

        return(
            <Authcontext.Provider value={authContext} >
                { loginState.userToken ? <UserDashboardScreen/> : <AuthStackScreen/> }
            </Authcontext.Provider>
        )

}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 12,
      marginTop:-5
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 20,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });