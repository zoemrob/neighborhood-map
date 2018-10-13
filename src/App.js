import React, {Component} from 'react';
import Map from './components/Map';
import './App.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            locations: [],
            activeLocation: '',
            isLargeScreen: false
        }
    }

    setActiveLocation = (location) => {
        this.setState({activeLocation: location})
    };

    checkScreen = (e, inMount = false) => {
        if (inMount === true) return window.innerWidth >= 1024;
        this.setState({isLargeScreen: window.innerWidth >= 1024 });
    };

    componentDidMount() {
        const defaultLocations = [
            {lat:45.3800766, lng:-122.5942759, name: 'Happyrock Coffee Roasting', id: 'jTf7X9quu4fLg83pch62nQ'},
            {lat:45.38149, lng:-122.58226, name: 'Safeway', id: 'UKmguQPdsC7OWZobSzE9DQ'}
        ];
        window.addEventListener('resize', this.checkScreen);
        this.setState({locations: defaultLocations, isLargeScreen: this.checkScreen(null, true)});
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.checkScreen);
    }

    render() {
        const { isLargeScreen, locations, activeLocation } = this.state;
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

                            </div>
                        </div>
                    ) : (
                        <React.Fragment>
                            <div className="search-wrapper">

                            </div>
                            <div className="search-results-wrapper">

                            </div>
                        </React.Fragment>
                    )}
                    <div className="map-wrapper">
                        <Map
                            locations={locations}
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
