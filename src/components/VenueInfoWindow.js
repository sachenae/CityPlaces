
import React, { Component } from 'react'
import { InfoWindow } from 'react-google-maps'

export class VenueInfoWindow extends Component {
  render() {
    const {description, name} = this.props

    return(
      <InfoWindow onCloseClick={this.props.closeWindow}>
        <div className="card border-secondary mb-3" style={{width: `300px`}} >
          <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
            <h4  className="card-header">{name}</h4>
            <p className="card-text">{description}</p>
          </div>
        </div>
      </InfoWindow>
    );
  }
}

export default VenueInfoWindow
