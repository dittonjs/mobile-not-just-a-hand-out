import React, { Component } from 'react';
import { AppRegistry,Dimensions,View,Text,StyleSheet
,Button,TouchableOpacity,StatusBar,Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { pins } from './locations';
import Callout from './callout';

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;
const LATITUDE = 41.7418072;
const LONGITUDE = -111.8111708;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
var colors = { 
	'Medical Resources': 'blue',
	'Emergency Shelters': 'green',
	'Food Pantries': 'orange',
	'Outreach Programs': 'red',

	}

export default class Map extends Component{
static navigationOptions= ({navigation}) =>({
		  title: 'Map',	
	});  

	constructor(props) {
    super(props);
    fetch('http://localhost:8000/resources').then((res) => {
      const result = JSON.parse(res['_bodyText']);
      const promises = result.map((resource) => {
        const { street, city, state, zip } = resource.address;
        const address = street + city + state + zip;
        resource.address = address;
        return fetch(`http://maps.google.com/maps/api/geocode/json?address=${address}`).then((res) => {
          const {lat, lng} = JSON.parse(res._bodyText).results[0].geometry.location;
          resource.coodinate = [lat, lng];
        });
      });
      Promise.all(promises).then((results) => {
        this.setState({ resources: result });
      });
    });
    
    this.state = {
      region: {
        // latitude: LATITUDE,
        // longitude: LONGITUDE,
        // latitudeDelta: LATITUDE_DELTA,
        // longitudeDelta: LONGITUDE_DELTA,
        latitude: 40.77096,
        longitude: -73.97702,
        latitudeDelta: 0.0491,
        longitudeDelta: 0.0375,
        // showShelters: false,
        // showFood: false,
        // showOutreach: false,
        // showMedical: false,
        // showRecovery: false,
        // showHousing: false,
      },
    };
  }
  
	render(){
		const { navigate } = this.props.navigation;
		return(
	  <View style={styles.container}>	
	  	<MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          scrollEnabled={true}
          zoomEnabled={true}
          pitchEnabled={true}
          rotateEnabled={true}
          initialRegion={this.state.region}
      >
          
          {pins.map((pin, index) =>
            // If showGoodOnly is true, but the pin is bad - do not show it
            this.state.showShelters && pin.type  || <MapView.Marker
              coordinate={{
                latitude: pin.coordinate[0],
                longitude: pin.coordinate[1],
              }}

              calloutOffset={{ x: -8, y: 28 }}
              pinColor={colors[pin.type]}
              key={index}
            >
            <MapView.Callout tooltip style={styles.callout}>
                <Callout
                  name={pin.name}
                  image={pin.image}
                />
              </MapView.Callout>
            </MapView.Marker>
          )}
        </MapView>
        
      </View>
		);
	}
}
const styles = StyleSheet.create({
	container:{
		display:'flex',alignItems:'center',
		justifyContent:'center'
	},
	cat:{
		backgroundColor:'orange',
		padding:10,margin:10,width:'95%'
	},
	pageName:{
		margin:10,fontWeight:'bold',
		color:'#000', textAlign:'center'
	},
	btnText:{
		color:'#fff',fontWeight:'bold'
	},
	 icon: {
    width: 24,
    height: 24,
  },
  map: {
    width: SCREEN_WIDTH,
    height: height-65,
  },
  callout: {
    width: 160,
  },
});


AppRegistry.registerComponent('Map', () => Map);