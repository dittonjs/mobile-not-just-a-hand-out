import React, { Component } from 'react';
import { AppRegistry,Dimensions,View,Text,StyleSheet
,Button,TouchableOpacity,StatusBar,Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { pins } from './locations';
import Callout from './callout';
import State from './state';

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;
const LATITUDE = 40.7591642;
const LONGITUDE = -111.879133;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
var colors = { 
	'Medical Resource': 'red',
	'Emergency Shelter': 'orange',
	'Food Pantry': 'lightsteelblue',
	'Outreach Program': 'green',
	'Event':'blue',
	"Prepared Meals": 'purple',
	"Personal Care":'pink',
	"Addiction Recovery":'cyan',
	"Education and Legal Service":'brown',
	"Housing Service":'goldenrod',
	"Employment Service":'magenta',
	"Veteran Service":'darkgreen',
	}

export default class Map extends Component{
static navigationOptions= ({navigation}) =>({
		  title: 'Map',	
	});  

	constructor(props) {
    super(props);
    State.subscribe(this)
    fetch('http://localhost:8000/resources').then((res) => {
    	
      const result = JSON.parse(res['_bodyText']);
      const promises = result.map((resource) => {
        const { street, city, state, zip } = resource.address;
        const address = street + ' ' + city + ' ' + state + ' ' + zip;
        resource.address = address;
        return fetch(`http://maps.google.com/maps/api/geocode/json?address=${address}`).then((res) => {
          const {lat, lng} = JSON.parse(res._bodyText).results[0].geometry.location;
          resource.coordinate = [lat, lng];
        });
      });
      Promise.all(promises).then(() => {
        this.setState({ resources: result });
      });
    });

    this.state = {
    	resources:[],
    	filters: State.filters,

      initialPosition: {
      	latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
      },
      markerPosition: {
      	latitude: 0,
      	longitude: 0,
      },
    };
  }

  watchID: ?number = null

  componentDidMount(){
  	navigator.geolocation.getCurrentPosition((position) => {
  		var lat = parseFloat(position.coords.latitude)
  		var long = parseFloat(position.coords.longitude)

  		var initialRegion = {
  			latitude: lat,
  			longitude: long,
  			latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
  		}

  		this.setState({initialPosition: initialRegion})
  		this.setState({markerPosition: initialRegion})

  	},(error) => alert(JSON.stringify(error)), {
  		enableHighAccuracy: true,
  		timeout: 20000, 
  		maximumAge: 1000
  	})

  	this.watchID = navigator.geolocation.watchPosition((position) => {
			var lat = parseFloat(position.coords.latitude)
			var long = parseFloat(position.coords.longitude)
  		
  		var lastRegion = {
  			latitude: lat,
  			longitude: long,
  			latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
  		}

  		this.setState({initialPosition: lastRegion})
  		this.setState({markerPosition: lastRegion})
  	})
  }

  componentWillUnmount(){
  	navigator.geolocation.clearWatch(this.watchID)
  }
  
  get resources(){
  	if(this.state.filters.length === 0){
  		return this.state.resources
  	}
  	return this.state.resources.filter((resource)=> (
  			this.state.filters.includes(resource.type)
  		))
  }

  handleUpdate(filters){
  	this.setState({filters})
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
          region={this.state.initialPosition}
      >
          
          {this.resources.map((pin, index) =>
            <MapView.Marker
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
                	type={pin.type}
                  name={pin.name}
                  address={pin.address}
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