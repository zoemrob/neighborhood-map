import React, {Component} from 'react';
import { fetchById } from '../searchAPI';
import '../styles/Marker.css';

export default class Marker extends Component {
    constructor(props) {
        super(props);
        // prevent memory leak
        this._isMounted = false;

        this.activeRef = React.createRef();
        this.state = {
            yelpData: {},
            error: false,
            errorMessage: '',
        }
    }
    
    handleFocus = e => {
        e.stopPropagation();
        this.props.setActiveLocation(this.props.id);
    };

    async componentDidMount() {
        this._isMounted = true;
        if (this.props.active) this.activeRef.current.focus();

        const data = await fetchById(this.props.id);
        if (data.error) this._isMounted && this.setState({error: true, errorMessage: data.error});
        else { this._isMounted && this.setState({yelpData: data}); }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const { id, name, active } = this.props;

        return (
            <React.Fragment>
                <label
                    htmlFor={id}
                    className="marker-label"
                    style={document.activeElement === this.activeRef.current || active ? {fontWeight: 'bold', fontSize: '1.3em'} : null}
                >{name}</label>
                <span
                    tabIndex="0"
                    className="map-icon"
                    id={id}
                    ref={this.activeRef}
                    onFocus={!active ? this.handleFocus : null}
                >
                    <svg height="24" version="1.1" width="24" xmlns="http://www.w3.org/2000/svg">
                        <g transform="translate(0 -1028.4)">
                            <path d="m12 0c-4.4183 2.3685e-15 -8 3.5817-8 8 0 1.421 0.3816 2.75 1.0312 3.906 0.1079 0.192 0.221 0.381 0.3438 0.563l6.625 11.531 6.625-11.531c0.102-0.151 0.19-0.311 0.281-0.469l0.063-0.094c0.649-1.156 1.031-2.485 1.031-3.906 0-4.4183-3.582-8-8-8zm0 4c2.209 0 4 1.7909 4 4 0 2.209-1.791 4-4 4-2.2091 0-4-1.791-4-4 0-2.2091 1.7909-4 4-4z" fill="#e74c3c" transform="translate(0 1028.4)"/>
                            <path d="m12 3c-2.7614 0-5 2.2386-5 5 0 2.761 2.2386 5 5 5 2.761 0 5-2.239 5-5 0-2.7614-2.239-5-5-5zm0 2c1.657 0 3 1.3431 3 3s-1.343 3-3 3-3-1.3431-3-3 1.343-3 3-3z" fill="#111" transform="translate(0 1028.4)"/>
                        </g>
                    </svg>
                </span>
            </React.Fragment>
        )
    }
}