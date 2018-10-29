import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';

const handler = (e, id, setActiveLocation) => {
    e.stopPropagation();
    setActiveLocation({id});
};

const listStyles = StyleSheet.create({
    container: {
        height: '90%',
        overflow: 'scroll'
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
        backgroundColor: '#d2cfc6',
        padding: '1rem',
    },
    activeHeader: {
        margin: '0',
        fontSize: '1.7rem'
    },
    activeDetails: {
        fontSize: '1.5rem',
        margin: '0'
    }
});
// TODO: refactor activeDetails into Component
const ListView = ({locations, activeLocation, isLargeScreen, setActiveLocation}) => {
    return (
        <div className={`search-results-wrapper ${css(listStyles.container)}`}>
            <ul className={`list-vew ${css(listStyles.list)}`}>
                {isLargeScreen ? (
                        locations.map(loc => {
                            if (loc.id === activeLocation.id) {
                                const {name, phone} = activeLocation.data;
                                return (
                                    <li className={css(listStyles.activeItem)} key={activeLocation.id}>
                                        <h2 className={css(listStyles.activeHeader)}>{name}</h2>
                                        <p className={css(listStyles.activeDetails)}>Phone: {phone !== '' ? phone : 'No phone number available'}</p>
                                    </li>
                                )
                            } else {
                                return (
                                    <li
                                        className={`list-item ${css(listStyles.listItem)}`}
                                        key={loc.id}
                                        tabIndex="1"
                                        onClick={e => handler(e, loc.id, setActiveLocation)}
                                        onFocus={e => handler(e, loc.id, setActiveLocation)}
                                    >{loc.name}</li>)
                            }
                        })) : // move active location to the top of the list and render it differently on lower screen sizes
                    ([activeLocation, ...locations.filter(loc => loc.id !== activeLocation.id)]
                            .map(loc => {
                                if (loc.id === '') return null;
                                if (loc.id === activeLocation.id) {
                                    const {name, phone} = activeLocation.data;
                                    return (
                                        <li className={css(listStyles.activeItem)} key={activeLocation.id}>
                                            <h2 className={css(listStyles.activeHeader)}>{name}</h2>
                                            <p className={css(listStyles.activeDetails)}>Phone: {phone !== '' ? phone : 'No phone number available'}</p>
                                        </li>
                                    )
                                } else {
                                    return (
                                        <li
                                            className={`list-item ${css(listStyles.listItem)}`}
                                            key={loc.id}
                                            tabIndex="1"
                                            onClick={e => handler(e, loc.id, setActiveLocation)}
                                            onFocus={e => handler(e, loc.id, setActiveLocation)}
                                        >{loc.name}</li>)
                                }
                            })
                    )}
            </ul>
        </div>
    )
};

export default ListView;