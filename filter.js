import React, { Component } from 'react';
import { AppRegistry,View,Text,StyleSheet
,Button,TouchableOpacity,StatusBar,Image } from 'react-native';

export default class Filter extends Component{
static navigationOptions= ({navigation}) =>({
		  title: 'Side filter',	
	});  
  
	render(){
		const { navigate } = this.props.navigation;
		return(
	  <View >	
   
      <Text style={styles.pageName}>Filters </Text>
	  <Button
	  onPress={() => navigate('Products',{cat:'Electronics',id:'1'})}
	  color="blue"
	  title="Shelters"
	  />
	  
	    <Button
	  onPress={() => navigate('Products',{cat:'Books',id:'4'})}
	  color="blue"
	  title="Food"
	  />

	  <Button
	  onPress={() => this.setState({
              showGoodOnly: !this.state.showGoodOnly
            })}
	  color="blue"
	  title="Medical Services"
	  />
      </View>
		);
	}
}
const styles = StyleSheet.create({
	pageName:{
		margin:10,fontWeight:'bold',
		color:'#000', textAlign:'center'
	},
});


AppRegistry.registerComponent('filter', () => filter);