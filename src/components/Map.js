import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
import {gmapsAPIKey} from "../apikeys";
import '../styles/Map.css'

export default class Map extends Component {
    static defaultProps = {
        key: gmapsAPIKey,
        center: {
            lat: 45.3815395,
            lng: -122.588222
        },
        zoom: 16
    };

    constructor(props) {
        super(props);

        // sourced from: https://medium.com/@jessebeach/dealing-with-focus-and-blur-in-a-composite-widget-in-react-90d3c3b49a9b
        // this.state = {
        //     isManagingFocus: false
        // };
        //
        // this._timeoutId = null;
    }

    // _onFocus = (e) => {
    //     if (this.state.isManagingFocus && e.target.className !== 'map-icon') {
    //         this._timeoutId = setTimeout(() => {
    //             this.setState({isManagingFocus: false});
    //         }, 0);
    //     } else if (!this.state.isManagingFocus && e.target.className === 'map-icon') {
    //         clearTimeout(this._timeoutId);
    //         this.setState({isManagingFocus: true});
    //     }
    // };

    render() {
        const {activeLocation, key, center, zoom, locations, setActiveLocation, isLargeScreen} = this.props;

        return (
            <div id="map-container">
                <GoogleMapReact
                    bootstrapURLKeys={{key: key}}
                    defaultCenter={center}
                    defaultZoom={zoom}
                    zoom={!isLargeScreen ? 15 : null}
                    center={activeLocation.id !== '' ? ({
                            lat: activeLocation.data.coordinates.latitude,
                            lng: activeLocation.data.coordinates.longitude
                        }) : null}
                >
                    {locations.map((loc, i) => {
                        if (activeLocation.id === loc.id) {
                            return (
                                <Marker
                                    key={i}
                                    active={true}
                                    setActiveLocation={setActiveLocation}
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