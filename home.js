import React, { Component } from 'react';
import { AppRegistry,Dimensions,View,Text,StyleSheet
,Button,TouchableOpacity,StatusBar,Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;
const LATITUDE = 41.7418072;
const LONGITUDE = -111.8111708;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class home extends Component{
static navigationOptions= ({navigation}) =>({
		  title: 'Map',	
	});  

	constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
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
          <MapView.Marker
            title="This is a title"
            description="This is a description"
            coordinate={this.state.region}
          />
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
    height: height - 75,
  },
});


AppRegistry.registerComponent('home', () => home);