import React from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
import {gmapsAPIKey} from "../apikeys";
import '../styles/Map.css'

/** Map Component, utilizing google-map-react
 *
 * @param activeLocation {Object}       - App.state.activeLocation metadata
 * @param locations {Array}             - all location objects metadata
 * @param setActiveLocation {Function}  - method to update App.state.activeLocation
 * @param isLargeScreen {Boolean}       - boolean to determine zoom size
 * @param key {String}                  - google maps api key
 * @param center {Object}               - contains default center coordinates
 * @param zoom {Number}                 - default zoom, alternate zoom available to different viewports
 *
 * @constructor
 */
const Map = ({
                 activeLocation,
                 locations,
                 setActiveLocation,
                 isLargeScreen,
                 key = gmapsAPIKey,
                 center = {lat: 45.3815395, lng: -122.588222},
                 zoom = 16
             }) => (
    <div id="map-container" aria-label="locations" role="application">
        <GoogleMapReact
            bootstrapURLKeys={{key: key}}
            defaultCenter={center}
            defaultZoom={zoom}
            zoom={!isLargeScreen ? 15 : null}
            center={activeLocation.id !== '' && !activeLocation.error ? ({
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