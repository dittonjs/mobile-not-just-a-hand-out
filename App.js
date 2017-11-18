import React, { Component } from 'react';
import { AppRegistry,View,Text,StyleSheet,ScrollView,TouchableOpacity } from 'react-native';
import { StackNavigator,DrawerNavigator  } from 'react-navigation';

import HomeScreen from './home';
import Products from './products';
import Filter from  './filter';

const myDrawer = DrawerNavigator({
  Home: { screen: HomeScreen },
  Products: { screen: Products }, 
},
{
  contentComponent: props => <Filter {...props} />
});

const nativeShop = StackNavigator({
  Home: { screen: myDrawer },
  
 });
export default nativeShop;

