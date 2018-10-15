import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';

const handler = (e, id, setActiveLocation) => {
    e.stopPropagation();
    setActiveLocation({id});
};

const listStyles = StyleSheet.create({
    container: {
        height: '90%'
    },
    list: {
        padding: '0',
        margin: '0',
        listStyleType: 'none',
        backgroundColor: '#EAE7DC',
        height: '100%'
    },
    listItem: {
        fontSize: '1.5em',
        padding: '8px 1rem',
        borderBottom: '2px solid #d2cfc6'
    },
    activeItem: {
        fontSize: '2em',
        backgroundColor: '#d2cfc6',
        padding: '1rem'
    }
});

const ListView = ({locations, activeLocation, isLargeScreen, setActiveLocation}) => (
    <div className={`search-results-wrapper ${css(listStyles.container)}`}>
        <ul className={`list-vew ${css(listStyles.list)}`}>
            {isLargeScreen ? (
                locations.map(loc => (
                    loc.id === activeLocation.id ? (
                        <li className={`list-item__active ${css(listStyles.activeItem)}`}
                            key={activeLocation.id}
                        >
                            <h2 className="list-item__active-header">{activeLocation.data.name}</h2>
                            <span>I am active.</span>
                        </li>
                    ) : (
                        <li
                            className={`list-item ${css(listStyles.listItem)}`}
                            key={loc.id}
                            tabIndex="1"
                            onClick={e => handler(e, loc.id, setActiveLocation)}
                            onFocus={e => handler(e, loc.id, setActiveLocation)}
                        >{loc.name}</li>
                    )))
            ) : // move active location to the top of the list and render it differently on lower screen sizes
                ([activeLocation, ...locations.filter(loc => loc.id !== activeLocation.id)]
                        .map(loc => (
                            // don't render if there is no active location
                            loc.id === activeLocation.id && loc.id !== '' ? (
                                <li className={`list-item__active ${css(listStyles.activeItem)}`}
                                    key={activeLocation.id}
                                >
                                    <h2 className="list-item__active-header">{activeLocation.data.name}</h2>
                                    <span>I am active.</span>
                                </li>
                            ) : (
                                <li
                                    className={`list-item ${css(listStyles.listItem)}`}
                                    key={loc.id}
                                    tabIndex="1"
                                    onClick={e => handler(e, loc.id, setActiveLocation)}
                                    onFocus={e => handler(e, loc.id, setActiveLocation)}
                                >{loc.name}</li>
                            )))
            )}
        </ul>
    </div>
);

export default ListView;