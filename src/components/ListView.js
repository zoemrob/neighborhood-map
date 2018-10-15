import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

const handler = (e, id, setActiveLocation) => {
    e.stopPropagation();
    setActiveLocation({ id });
};

const listStyles = StyleSheet.create({
    list: {
        padding: '0',
        margin: '0',
        listStyleType: 'none',
        backgroundColor: '#EAE7DC',
        height: '100%'
    },
    listItem: {
        fontSize: '1.5em'
    },
    activeItem: {
        fontSize: '2em'
    }
});

const ListView = ({locations, activeLocation, isLargeScreen, setActiveLocation}) => (
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
        ) : (
           locations.filter(loc => loc.id !== activeLocation.id)
               .map(loc =>
                   <li
                       className={`list-item ${css(listStyles.listItem)}`}
                       key={loc.id}
                       tabIndex="1"
                       onClick={e => handler(e, loc.id, setActiveLocation)}
                       onFocus={e => handler(e, loc.id, setActiveLocation)}
                   >{loc.name}</li>
               )
        )}
    </ul>
);

export default ListView;