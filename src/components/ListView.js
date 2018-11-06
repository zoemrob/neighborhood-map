import React from 'react';
import DetailedItem from './DetailedItem';
import {StyleSheet, css} from 'aphrodite/no-important';

const listStyles = StyleSheet.create({
    container: {
        height: '82vh'
    },
    list: {
        padding: '0',
        margin: '0',
        listStyleType: 'none',
        backgroundColor: '#D7FAD3',//'#EAE7DC',
        height: '100%',
        overflow: 'scroll'
    },
    listItem: {
        fontFamily: '"Playfair Display", serif',
        fontSize: '1.5em',
        padding: '8px 1rem',
        borderBottom: '2px solid #d2cfc6',
        ':hover': {
            backgroundColor: '#C2F7BC',
        }
    },
});

/**
 * event handler that executes callback
 * @param e {Event}
 * @param id {String}
 * @param setActiveLocation {Function}
 */
const handler = (e, id, setActiveLocation) => {
    e.stopPropagation();
    setActiveLocation({id});
};

/**
 * Component for simple list item
 * @param loc {Object}
 * @param setActiveLocation {Function}
 * @param query {String}
 * @constructor
 */
const SimpleItem = ({loc, setActiveLocation, query}) => {
    // if (query.indexOf(' ') >= 0) {
    // future, will support spaces for highlighting and keeping capitalization
    // }

    // form string parts to wrap query section in highlight
    const startIndex = loc.name.toLowerCase().indexOf(query);
    const beg = loc.name.slice(0, startIndex);
    const match = loc.name.slice(startIndex, startIndex + query.length);
    const end = loc.name.slice(startIndex + query.length);
    return (
        <li
            className={`list-item ${css(listStyles.listItem)}`}
            tabIndex="1"
            // on click or enter key, handle event
            onClick={e => handler(e, loc.id, setActiveLocation)}
            onKeyDown={e => {
                if (e.keyCode === 13) handler(e, loc.id, setActiveLocation);
                else { e.stopPropagation(); }
            }}
            // wrap query letters in highlighted text
        >{beg}<b style={{backgroundColor: 'khaki'}}>{match.charAt(0) === query.charAt(0).toUpperCase() ?
            query.charAt(0).toUpperCase() + query.slice(1) : query}</b>{end}</li>
    );
};

/**
 * ListView Component - holds SimpleItems and DetailedItem, filters based on App.state.query
 * @param locations {Array}         - array of location object metadata
 * @param activeLocation {Object}   - App.state.activeLocation metadata
 * @param isLargeScreen {Boolean}   - indicator of screen size for rendering
 * @param setActiveLocation {Function} - used to set App.state.activeLocation
 * @param query {String}            - App.state.query for highlighting SimpleItems
 * @constructor
 */
const ListView = ({locations, activeLocation, isLargeScreen, setActiveLocation, query}) => {
    return (
        <section id="search-results" className={`search-results-wrapper ${css(listStyles.container)}`}>
            <ul className={`list-vew ${css(listStyles.list)}`}>
                {isLargeScreen ?
                    // return DetailedItem for loc.id === activeLocation.id
                    (locations.map(loc => loc.id === activeLocation.id ?
                            <DetailedItem
                                error={activeLocation.error}
                                errorMessage={activeLocation.errorMessage}
                                data={!activeLocation.error ? activeLocation.data : loc}
                                isLargeScreen={isLargeScreen}
                                key={activeLocation.id}
                            /> :
                            <SimpleItem key={loc.id} loc={loc} setActiveLocation={setActiveLocation} query={query}/>
                    )) :
                    // move active location to the top of the list and render it differently on lower screen sizes
                    ([activeLocation, ...locations.filter(loc => loc.id !== activeLocation.id)]
                        .map(loc => {
                            // remove the blank if no activeLocation
                            if (loc.id === '') return null;
                            return loc.id === activeLocation.id ?
                                <DetailedItem error={activeLocation.error} errorMessage={activeLocation.errorMessage} data={!activeLocation.error ? activeLocation.data : loc} isLargeScreen={isLargeScreen} key={activeLocation.id}/> :
                                <SimpleItem key={loc.id} loc={loc} setActiveLocation={setActiveLocation} query={query}/>;
                        })
                    )
                }
            </ul>
        </section>
    )
};

export default ListView;