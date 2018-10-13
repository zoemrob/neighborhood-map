import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
import {gmapsAPIKey} from "../apikeys";
import '../styles/Map.css'

export default class Map extends Component {
    static defaultProps = {
        key: gmapsAPIKey,
        center: {
            lat:45.3815395,
            lng: -122.588222
        },
        zoom: 16
    };

    constructor(props) {
        super(props);
    }



    render() {
        const { activeLocation, key, center, zoom, locations, setActiveLocation, isLargeScreen } = this.props;

        return (
            <div id="map-container">
                <GoogleMapReact
                    bootstrapURLKeys={{ key: key}}
                    defaultCenter={center}
                    defaultZoom={isLargeScreen ? zoom : 15}
                >
                    {locations.map((loc, i) => {
                        if (activeLocation === loc.id) {
                            return (
                                <Marker
                                    key={i}
                                    active={true}
                                    {...loc}
                                />)
                        }
                        return <Marker key={i} active={false} setActiveLocation={setActiveLocation} {...loc}/>
                    })}
                </GoogleMapReact>
            </div>
        )
    }
}