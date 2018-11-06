import React, {Component} from 'react';
import Map from './components/Map';
import ListView from './components/ListView';
import SearchHeader from './components/SearchHeader';
import LoadingOverlay from './components/LoadingOverlay';
import {fetchById} from './searchAPI';
import MainHeader from "./components/MainHeader";

class App extends Component {

    constructor(props) {
        super(props);
        // used to check subscription to async functions
        this._isMounted = false;

        this.state = {
            locations: [],
            activeLocation: {
                id: '',
                data: {},
                error: false,
                errorMessage: ''
            },
            query: '',
            isLargeScreen: false,
            loading: false
        }
    }

    /**
     * Receives location object, fetches using searchAPI, and updates state with data
     * passed as a prop to child components
     *
     * @param location {Object}
     * @returns {void}
     */
    setActiveLocation = async (location) => {
        // if location id is blank, don't try to fetch
        if (location.id !== '') {
            // set loading to true before we request the remote data
            this.setState({loading: true});
            try {
                const data = await fetchById(location.id);
                // if fetch resolved but return an error from the api
                if (data.error) {
                    console.log('Error from api: ', data.error);
                    this._isMounted && this.setState({
                        loading: false,
                        activeLocation: {
                            id: location.id,
                            data: {},
                            error: true,
                            errorMessage: 'There was an error retrieving location details. Please refresh.'
                        }
                    });
                }
                else {
                    // if all is successful, and app is mounted (subscribed) update with api data
                    this._isMounted && this.setState({loading: false, activeLocation: {error: false, id: location.id, data}});
                }
            } catch (e) {
                // fallback to render error message if failed to load content.
                console.log('Failed to load from app server.', e);
                this._isMounted && this.setState({
                    loading: false,
                    activeLocation: {
                        id: location.id,
                        data: {},
                        error: true,
                        errorMessage: 'There was an error retrieving location details. Please refresh.'
                    }
                });
            }
            // clear state if no id is passed
        } else {
            this.setState({
                loading: false,
                activeLocation: {
                    id: '',
                    data: {},
                    error: false,
                    errorMessage: ''
                }
            });
        }
    };

    /** checks viewport size,
     *
     * @param e {Event}         - window resize event
     * @param inMount {Boolean} - default set to no for eventListener, allows
     *                            passing in true boolean to check the state
     *                            on componentDidMount();
     * @return {Boolean||void}  - calls setState or returns bool
     */
    _checkScreen = (e, inMount = false) => {
        if (inMount === true) return window.innerWidth >= 1024;
        this.setState({isLargeScreen: window.innerWidth >= 1024});
    };

    /** handler which removes animation/focus when clicked outside of interactive
     *  element, sets state back to empty.
     *
     * @param e {Event}
     */
    _checkIfMarkerOrList = e => {
        if (e.target.nodeName !== "LI" || e.target.nodeName !== "SPAN" || e.target.nodeName !== "SVG") {
            this.setState({
                activeLocation: {
                    id: '',
                    data: {},
                    error: false,
                    errorMessage: ''
                }
            })
        }
    };

    /**
     * Method to update app query state, uses lowercase for easier matching
     * @param query
     */
    updateQuery = query => {
        if (query.trim().toLowerCase() !== this.state.query) this.setState({query});
    };

    // sets default App settings, adds event listeners, mounts
    componentDidMount() {
        this._isMounted = true;
        const defaultLocations = [
            {lat: 45.3819299, lng: -122.59601, name: 'Top Notch', id: 'Kdl1pZ2V5tqPrmqnsQig-g'},
            {lat: 45.3800766, lng: -122.5942759, name: 'Happyrock Coffee Roasting', id: 'jTf7X9quu4fLg83pch62nQ'},
            {lat: 45.38244, lng: -122.59235, name: 'John Wetten Elementary', id: 'JBReIa-8xfh5uLoT2kk9dg'},
            {lat: 45.3826177865267, lng: -122.589969411492, name: 'Max Patterson Park', id: 'wCy6Ucv7o3dePxBK0hqqkQ'},
            {lat: 45.38149, lng: -122.58226, name: 'Safeway Food & Drug', id: 'UKmguQPdsC7OWZobSzE9DQ'},
            {lat: 45.38199, lng: -122.58086, name: 'High Rocks Restaurant & Lounge', id: 'P0gBqOZ_HNU4Ze_QPRo4dw'}
        ];
        window.addEventListener('resize', this._checkScreen);
        window.addEventListener('click', this._checkIfMarkerOrList);
        this.setState({locations: defaultLocations, isLargeScreen: this._checkScreen(null, true)});
    }

    // remove event listeners, unmount
    componentWillUnmount() {
        window.removeEventListener('resize', this._checkScreen);
        window.removeEventListener('click', this._checkIfMarkerOrList);
        this._isMounted = false;
    }

    render() {
        const {isLargeScreen, locations, activeLocation, query, loading} = this.state;
        const filteredLocations = query !== '' ? locations.filter(loc => loc.name.toLowerCase().includes(query)) : locations;
        const listViewProps = {
            locations: filteredLocations,
            setActiveLocation: this.setActiveLocation,
            activeLocation,
            isLargeScreen,
            query
        };

        return (
            <React.Fragment>
                <MainHeader/>
                <main>
                    {loading && (<LoadingOverlay isLargeScreen={isLargeScreen}/>)}
                    {isLargeScreen ? (
                        <div className="large-screen-wrapper">
                            <SearchHeader updateQuery={this.updateQuery}/>
                            <ListView {...listViewProps}/>
                        </div>
                    ) : (
                        <SearchHeader updateQuery={this.updateQuery}/>
                    )}
                    <section className="map-wrapper">
                        <Map
                            locations={filteredLocations}
                            activeLocation={activeLocation}
                            setActiveLocation={this.setActiveLocation}
                            isLargeScreen={isLargeScreen}/>
                    </section>
                    {!isLargeScreen && <ListView {...listViewProps}/>}
                </main>
            </React.Fragment>
        )
    }
}

export default App;
