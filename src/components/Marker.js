import React, {Component} from 'react';

export default class Marker extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <span>I'm a marker {this.props.$hover && "that is hovered"}</span>
        )
    }
}