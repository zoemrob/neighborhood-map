import React, {Component} from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';

const inputStyles = StyleSheet.create({
    main: {
        transition: 'all 0.3s ease',
        width: '75%',
        fontSize: '1.5rem',
        padding: '8px 8px 8px 24px',
        margin: '8px auto',
        borderRadius: '5px',
        border: 'none',
        ':focus': {
            outline: 'none',
            boxShadow: '0 5px 5px 0 rgba(0,0,0,0.2)',
            backgroundColor: 'rgba(255,255,255,0.85)',
            borderRadius: '20px',
            transform: 'scale(1.1)'
        }
    }

});

/**
 * SearchHeader Component
 * holds input for filtering locations and search for specifics
 * @constructor
 */
export default class SearchHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: ''
        }
    }

    /**
     * event handler for input, calls setState
     * @param e {Event}
     */
    _handleInput = e => {
        e.stopPropagation();
        if (e.target.value !== this.state.query) this.setState({query: e.target.value});
    };

    componentDidUpdate(prevProps, prevState) {
        // if state updated and query is different, update App
        if (prevState.query !== this.state.query) this.props.updateQuery(this.state.query);
    }

    render() {
        return (
            <section id="search-input" className="search-wrapper" style={{textAlign: 'center', backgroundColor: '#D7FAD3', height: '8vh'}}>
                <input
                    tabIndex="1"
                    className={css(inputStyles.main)}
                    id="search-input"
                    placeholder="Search"
                    type="text"
                    value={this.state.query}
                    onChange={this._handleInput}
                />
            </section>
        );
    }
}