/*global google*/
import React from 'react'
import { withGoogleMap, withScriptjs, GoogleMap, DirectionsRenderer } from 'react-google-maps';
import { VenueMarker } from './VenueMarker';
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer")
const { compose, withHandlers, withProps, lifecycle} = require("recompose")




 
const MyMap = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAxlHPHrZBPgk8Vho3gc6RylhUDY1Zp1jU&v=3.exp&libraries=geometry,drawing,places", 
  }),
  withHandlers({
    onMarkerClustererClick: () => (markerClusterer) => {
      const clickedMarkers = markerClusterer.getMarkers()
      console.log(`Current clicked markers length: ${clickedMarkers.length}`)
      console.log(clickedMarkers)
    },
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidUpdate() { 
        let ways = [];
      let points = [...this.props.waypts]
      for (let i in points) {
        ways.push({location: new google.maps.LatLng(points[i].lat,  points[i].lng), stopover : true})
       }
    
      const DirectionsService = new google.maps.DirectionsService();
      DirectionsService.route({
        origin: new google.maps.LatLng(this.props.currentLocation.lat, this.props.currentLocation.lng),
        destination: new google.maps.LatLng(this.props.currentLocation.lat, this.props.currentLocation.lng),
        waypoints: ways,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.WALKING,
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
      this.setState({
            directions: {...result},
            markers: true
          })
        } else {
          console.error(`error fetching directions ${result}`);
        }
      });
    }
  })
)(props => (
  <GoogleMap
    defaultCenter={{lat: props.currentLocation.lat, lng: props.currentLocation.lng}}
    defaultZoom={props.zoom}
    ref={props.onMapMounted}
    >
    <MarkerClusterer
      onClick={props.onMarkerClustererClick}
      averageCenter
      enableRetinaIcons
      gridSize={60}
    >
    {
      props.places.length > 0 && props.places.map(place => (
        <VenueMarker 
        key={`place${place.id}`}
        id={place.id}
        lat={place.location.lat}
        lng={place.location.lng}
        description={place.description}
        name={place.name}
          />
      ))
    }
    </MarkerClusterer>
    {props.directions && <DirectionsRenderer directions={props.directions} suppressMarkers={props.markers}/>}
  </GoogleMap>
));

export default MyMap;