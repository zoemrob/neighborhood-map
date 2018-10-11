import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
import {apikey} from "../apikey";

export default class Map extends Component {
    static defaultProps = {
        key: apikey,
        center: {
            lat:45.3815395,
            lng: -122.5914513
        },
        zoom: 16
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="map-container" style={{height: '90vh', width: '100%'}}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: this.props.key}}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                >
                    <Marker lat={this.props.center.lat} lng={this.props.center.lng}/>
                </GoogleMapReact>
            </div>
        )
    }
}