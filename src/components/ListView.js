import React from 'react';
import DetailedItem from './DetailedItem';
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
    }
});

const SimpleItem = ({loc, setActiveLocation}) => (
    <li
        className={`list-item ${css(listStyles.listItem)}`}
        tabIndex="1"
        onClick={e => handler(e, loc.id, setActiveLocation)}
        onFocus={e => handler(e, loc.id, setActiveLocation)}
    >{loc.name}</li>
);

const ListView = ({locations, activeLocation, isLargeScreen, setActiveLocation}) => {
    return (
        <div className={`search-results-wrapper ${css(listStyles.container)}`}>
            <ul className={`list-vew ${css(listStyles.list)}`}>
                {isLargeScreen ?
                    (locations.map(loc => loc.id === activeLocation.id ?
                            <DetailedItem data={activeLocation.data} isLargeScreen={isLargeScreen} key={activeLocation.id}/> :
                            <SimpleItem key={loc.id} loc={loc} setActiveLocation={setActiveLocation}/>
                    )) :
                    // move active location to the top of the list and render it differently on lower screen sizes
                    ([activeLocation, ...locations.filter(loc => loc.id !== activeLocation.id)]
                        .map(loc => {
                            // remove the blank if no activeLocation
                            if (loc.id === '') return null;
                            return loc.id === activeLocation.id ?
                                <DetailedItem data={activeLocation.data} isLargeScreen={isLargeScreen} key={activeLocation.id}/> :
                                <SimpleItem key={loc.id} loc={loc} setActiveLocation={setActiveLocation}/>;
                        })
                    )
                }
            </ul>
        </div>
    )
};

export default ListView;