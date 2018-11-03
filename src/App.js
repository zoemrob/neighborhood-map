import React, {Component} from 'react';
import Map from './components/Map';
import ListView from './components/ListView';
import SearchHeader from './components/SearchHeader';
import LoadingOverlay from './components/LoadingOverlay';
import {fetchById} from './searchAPI';

class App extends Component {

    constructor(props) {
        super(props);
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
            isLargeScreen: false
        }
    }

    setActiveLocation = async (location) => {
        if (location.id !== '') {
            this.setState({loading: true});
            const data = await fetchById(location.id);
            if (data.error) this._isMounted && this.setState({
                loading: false,
                activeLocation: {
                    error: true,
                    errorMessage: data.error
                }
            });
            else {
                this._isMounted && this.setState({loading: false, activeLocation: {id: location.id, data}});
            }
        } else {
            this.setState({
                activeLocation: {
                    id: '',
                    data: {},
                    error: false,
                    errorMessage: ''
                }
            });
        }
    };

    // reference: https://stackoverflow.com/questions/46586165/react-conditionally-render-based-on-viewport-size
    _checkScreen = (e, inMount = false) => {
        if (inMount === true) return window.innerWidth >= 1024;
        this.setState({isLargeScreen: window.innerWidth >= 1024});
    };

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

    updateQuery = query => {
        if (query.trim().toLowerCase() !== this.state.query) this.setState({query});
    };

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

    componentWillUnmount() {
        window.removeEventListener('resize', this._checkScreen);
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
                <header className="header" style={{height: '8vh'}}>
                    <h1 className="header-text">Map Example</h1>
                </header>
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
                    <div className="map-wrapper">
                        <Map
                            locations={filteredLocations}
                            activeLocation={activeLocation}
                            setActiveLocation={this.setActiveLocation}
                            isLargeScreen={isLargeScreen}/>
                    </div>
                    {!isLargeScreen && <ListView {...listViewProps}/>}
                </main>
            </React.Fragment>
        )
    }
}

export default App;
