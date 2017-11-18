import React, { Component } from 'react';
import { AppRegistry,View,Text,StyleSheet
,Switch,TouchableOpacity,StatusBar,Image } from 'react-native';
import State from './state';

export default class Filter extends Component{
static navigationOptions= ({navigation}) =>({
		  title: 'Side filter',	
	});  

	constructor(props) {
    super(props);
    this.state = {
    	food: true,
    	outreach: true,
    	medical: true,
    	shelters: true,
    };
    this.state.filters = [...State.filters];

  }

  handleChange(value) {
  	if(this.state.filters.includes(value)) {
  		const newFilters = this.state.filters.filter((f) => f != value);
  		this.setState({ filters: newFilters })
  		State.changeFilters(newFilters);
  	} else {
  		const newFilters = [...this.state.filters, value];
  		this.setState({ filters: newFilters })
  		State.changeFilters(newFilters);
  	}
  }
	render(){
		const { navigate } = this.props.navigation;
		return(
	  <View style={styles.main}>	
      	<Text style={styles.pageName}>Filters </Text>
			  <Text>Shelters</Text>
			  <Switch
				  onValueChange={(newValue) => {
				  	this.setState({ shelters: newValue });
				  	this.handleChange('Emergency Shelters')
				  }}
				  tintColor="green"
				  onTintColor="green"
				  value={this.state.shelters}
			  />
				<Text>Food Pantries </Text>
			  <Switch
				  onValueChange={(newValue) => {
				  	this.setState({ food: newValue });
				  	this.handleChange('Food Pantries')
				  }}
				  tintColor="orange"
				  onTintColor="orange"
				  value={this.state.food}
			  />
			  <Text>Outreach Programs</Text>
			  <Switch
				  onValueChange={(newValue) => {
			  		this.setState({ outreach: newValue });
			  		this.handleChange('Outreach Programs')
			  	}}
				  tintColor="red"
				  onTintColor="red"
				  value={this.state.outreach}
			  />
			  <Text>Medical Services</Text>
			  <Switch
				  onValueChange={(newValue) => {
				  	this.setState({ medical: newValue });
				  	this.handleChange('Medical Resources')
				  }}
				  tintColor="blue"
				  onTintColor="blue"
				  value={this.state.medical}
			  />
      </View>
		);
	}
}
const styles = StyleSheet.create({
	main: {
		padding: 10
	},
	pageName:{
		margin:10,fontWeight:'bold',
		color:'#000', textAlign:'center'
	},
});


AppRegistry.registerComponent('filter', () => filter);