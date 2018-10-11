import React, {Component} from 'react';
import Map from './components/Map';
import './App.css';

class App extends Component {

    render() {
        return (
            <React.Fragment>
                <h1>Map Example</h1>
                <Map/>
            </React.Fragment>
        )
    }
}

export default App;
