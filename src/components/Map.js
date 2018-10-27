import React from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
import {gmapsAPIKey} from "../apikeys";
import '../styles/Map.css'

const Map = ({
                 activeLocation,
                 locations,
                 setActiveLocation,
                 isLargeScreen,
                 key = gmapsAPIKey,
                 center = {lat: 45.3815395, lng: -122.588222},
                 zoom = 16
             }) => (
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
);
export default Map;