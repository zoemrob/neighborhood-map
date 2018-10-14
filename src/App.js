import React, {Component} from 'react';
import Map from './components/Map';
import ListView from './components/ListView';
import { fetchById } from './searchAPI';
import './App.css';

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
            const data = await fetchById(location.id);
            if (data.error) this._isMounted && this.setState({activeLocation: {
                    error: true,
                    errorMessage: data.error
                }});
            else {
                this._isMounted && this.setState({activeLocation: {id: location.id, data }});
            }
        } else {
            this.setState({activeLocation: {
                id: '',
                data: {},
                error: false,
                errorMessage: ''}
            });
        }
    };

    // reference: https://stackoverflow.com/questions/46586165/react-conditionally-render-based-on-viewport-size
    checkScreen = (e, inMount = false) => {
        if (inMount === true) return window.innerWidth >= 1024;
        this.setState({isLargeScreen: window.innerWidth >= 1024 });
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
        window.addEventListener('resize', this.checkScreen);
        this.setState({locations: defaultLocations, isLargeScreen: this.checkScreen(null, true)});
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.checkScreen);
        this._isMounted = false;
    }

    render() {
        const { isLargeScreen, locations, activeLocation, query } = this.state;
        const filteredLocations = query !== '' ? locations.filter(loc => loc.includes(query)) : locations;
        const listViewProps = {
            locations: filteredLocations,
            activeLocation,
            isLargeScreen
        };

        return (
            <React.Fragment>
                <header className="header">
                    <h1 className="header-text">Map Example</h1>
                </header>
                <main>
                    {isLargeScreen ? (
                        <div className="large-screen-wrapper">
                            <div className="search-wrapper__large-screen">

                            </div>
                            <div className="search-results-wrapper__large-screen">
                                <ListView {...listViewProps}/>
                            </div>
                        </div>
                    ) : (
                        <React.Fragment>
                            <div className="search-wrapper">

                            </div>
                            <div className="search-results-wrapper">
                                <ListView {...listViewProps}/>
                            </div>
                        </React.Fragment>
                    )}
                    <div className="map-wrapper">
                        <Map
                            locations={filteredLocations}
                            activeLocation={activeLocation}
                            setActiveLocation={this.setActiveLocation}
                            isLargeScreen={isLargeScreen}/>
                    </div>
                </main>
            </React.Fragment>
        )
    }
}

export default App;
