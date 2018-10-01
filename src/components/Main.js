import React, {Component} from 'react'
// import axios from "axios"; 
import superagent from 'superagent'
import MyMap from './MyMap';
import Info from './Info';
import Selection from './Selection';

 
class Main extends Component {

  constructor(props) {
    super(props)

    this.state = {
      currentLatLng: {
        lat: 0,
        lng: 0
      },
      waypts: {
        lat: 0,
        lng: 0
      },
      placeData: [],
      selectedPlaces:[]
    };
  }

  showCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.setState(prevState => ({
            currentLatLng: {
              ...prevState.currentLatLng,
              lat: position.coords.latitude,
              lng: position.coords.longitude
            },
            isMarkerShown: true
          }))
        }
      )
    } else {
      error => console.log(error)
    }
  }

  // handleMapChanged() {
  //   this.fetchPlacesFromApi()
  // }
 
  handleMapMounted(map) {
    this.map = map
  }
 
  // handleMapFullyLoaded() {
  //   if (this.mapFullyLoaded)
  //     return
  //       this.mapFullyLoaded = true
  //       this.handleMapChanged()
  // }
 
 

//  fetchPlacesFromApi() {
//   this.setState({ places: [] });
  
//     fetch(`../src/data.json?`,
//     { method: 'GET' })
//     .then((res) => res.json()) 
//     .then((res) => {
//       this.setState({ places: res });
//       // console.log(JSON.stringify(res));  
//     });
//    }
  
componentDidMount(){
  this.showCurrentLocation()
    console.log('componentDidMount')
  superagent
  .get(`../src/data.json`)
  .query(null)
  .set('Accept', 'text/json')
  .end((error, response) => {
      const placeData = response.body
      this.setState({
          placeData: placeData
      })
  })
}
  
selectionAddedHandler = (obj) => {
  const selectedPlaces = [...this.state.selectedPlaces]
  const waypts = [...this.state.waypts]
  selectedPlaces.push(obj)
  waypts.push(obj.location)
  this.setState({
    selectedPlaces: [...selectedPlaces],
    waypts: [...waypts]
  })
  
  console.log(selectedPlaces)
}

selectionRemovedHandler = (obj) => {
  const selectedPlaces = [...this.state.selectedPlaces]
  const waypts = [...this.state.waypts]
  const index = selectedPlaces.findIndex(el => el.id === obj.id)
  selectedPlaces.splice(index, 1)
  waypts.splice(index, 1)
  this.setState({
    selectedPlaces: [...selectedPlaces],
    waypts: [...waypts]
  })
  console.log(selectedPlaces)
}


 
  render() {
   const {lat, lng} = this.state.currentLatLng;
   

 
  return(
        <div className="row">
          <div className="col-md-6">
          
            <MyMap
                currentLocation={this.state.currentLatLng}
                waypts={this.state.waypts}
                onMapMounted={this.handleMapMounted.bind(this)} 
                places={this.state.placeData}
                zoom={14}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `820px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
            
           

          </div>
          <div className="col-md-6"> 
            <Selection selected={this.state.selectedPlaces} selectionRemoved={this.selectionRemovedHandler} />
            <Info placeData={this.state.placeData} selectionAdded={this.selectionAddedHandler} /> 
          </div>
        </div> 
    );
  }
}
 
export default Main