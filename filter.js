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
    	events: true,
    	meals: true,
    	care: true,
    	recovery: true, 
    	legal: true,
    	housing: true, 
    	employ: true,
    	veteran: true,
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
				  	this.handleChange('Emergency Shelter')
				  }}
				  tintColor="orange"
				  onTintColor="orange"
				  value={this.state.shelters}
			  />
				<Text>Food Pantries</Text>
			  <Switch
				  onValueChange={(newValue) => {
				  	this.setState({ food: newValue });
				  	this.handleChange('Food Pantry')
				  }}
				  tintColor="lightsteelblue"
				  onTintColor="lightsteelblue"
				  value={this.state.food}
			  />
			  <Text>Outreach Programs</Text>
			  <Switch
				  onValueChange={(newValue) => {
			  		this.setState({ outreach: newValue });
			  		this.handleChange('Outreach Program')
			  	}}
				  tintColor="green"
				  onTintColor="green"
				  value={this.state.outreach}
			  />
			  <Text>Medical Services</Text>
			  <Switch
				  onValueChange={(newValue) => {
				  	this.setState({ medical: newValue });
				  	this.handleChange('Medical Resource')
				  }}
				  tintColor="red"
				  onTintColor="red"
				  value={this.state.medical}
			  />
			  <Text>Events</Text>
			  <Switch
				  onValueChange={(newValue) => {
				  	this.setState({ events: newValue });
				  	this.handleChange('Event')
				  }}
				  tintColor="blue"
				  onTintColor="blue"
				  value={this.state.events}
			  />
			  <Text>Prepared Meals</Text>
			  <Switch
				  onValueChange={(newValue) => {
				  	this.setState({ meals: newValue });
				  	this.handleChange('Prepared Meals')
				  }}
				  tintColor="purple"
				  onTintColor="purple"
				  value={this.state.meals}
			  />
				<Text>Personal Care</Text>
			  <Switch
				  onValueChange={(newValue) => {
				  	this.setState({ care: newValue });
				  	this.handleChange('Personal Care')
				  }}
				  tintColor="pink"
				  onTintColor="pink"
				  value={this.state.care}
			  />
			  <Text>Addiction Recovery</Text>
			  <Switch
				  onValueChange={(newValue) => {
			  		this.setState({ recovery: newValue });
			  		this.handleChange('Addiction Recovery')
			  	}}
				  tintColor="cyan"
				  onTintColor="cyan"
				  value={this.state.recovery}
			  />
			  <Text>Education and Legal Services</Text>
			  <Switch
				  onValueChange={(newValue) => {
				  	this.setState({ legal: newValue });
				  	this.handleChange('Education and Legal Service')
				  }}
				  tintColor="brown"
				  onTintColor="brown"
				  value={this.state.legal}
			  />
			  <Text>Housing Services</Text>
			  <Switch
				  onValueChange={(newValue) => {
				  	this.setState({ housing: newValue });
				  	this.handleChange('Housing Service')
				  }}
				  tintColor="goldenrod"
				  onTintColor="goldenrod"
				  value={this.state.housing}
			  />
			  <Text>Employment Services</Text>
			  <Switch
				  onValueChange={(newValue) => {
				  	this.setState({ employ: newValue });
				  	this.handleChange('Employment Service')
				  }}
				  tintColor="magenta"
				  onTintColor="magenta"
				  value={this.state.employ}
			  />
			  <Text>Veteran Service</Text>
			  <Switch
				  onValueChange={(newValue) => {
				  	this.setState({ veteran: newValue });
				  	this.handleChange('Veteran Service')
				  }}
				  tintColor="darkgreen"
				  onTintColor="darkgreen"
				  value={this.state.veteran}
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