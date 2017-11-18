import React, { Component } from 'react';
import { AppRegistry,View,Text,StyleSheet,ScrollView,TouchableOpacity } from 'react-native';
import { StackNavigator,DrawerNavigator  } from 'react-navigation';

import MapScreen from './Map';
import Filter from  './filter';

const myDrawer = DrawerNavigator({
  Home: { screen: MapScreen },
},
{
  contentComponent: props => <Filter {...props} />
});

const nativeShop = StackNavigator({
  Home: { screen: myDrawer },
  
 });
export default nativeShop;

