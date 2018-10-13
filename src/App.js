import React, {Component} from 'react';
import Map from './components/Map';
import './App.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            locations: [],
            activeLocation: ''
        }
    }

    setActiveLocation = (location) => {
        this.setState({activeLocation: location})
    };

    componentDidMount() {
        const defaultLocations = [
            {lat:45.3800766, lng:-122.5942759, name: 'Happyrock Coffee Roasting', id: 'jTf7X9quu4fLg83pch62nQ'},
            {lat:45.38149, lng:-122.58226, name: 'Safeway', id: 'UKmguQPdsC7OWZobSzE9DQ'}
        ];
        this.setState({locations: defaultLocations});
    }

    render() {
        const { locations, activeLocation } = this.state;
        return (
            <React.Fragment>
                <header className="header">
                    <h1 className="header-text">Map Example</h1>
                </header>
                <main>
                    <div className="list-wrapper">

                    </div>
                    <div className="map-wrapper">
                        <Map
                            locations={locations}
                            activeLocation={activeLocation}
                            setActiveLocation={this.setActiveLocation}/>
                    </div>
                </main>
            </React.Fragment>
        )
    }
}

export default App;
