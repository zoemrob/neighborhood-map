import React from 'react';

const ListView = ({locations, activeLocation, isLargeScreen}) => (
    <ul className="list-vew">
        {isLargeScreen ? (
            locations.map(loc => (
                loc.id === activeLocation.id ? (
                        <li className="list-item__active" key={activeLocation.id}>
                            <h1 className="list-item__active-header">{activeLocation.data.name}</h1>
                            <span>I am active.</span>
                        </li>
                    ) : (
                        <li className="list-item" key={loc.id}>{loc.name}</li>
                    )))
        ) : (
           locations.filter(loc => loc.id !== activeLocation.id).map(loc => <li className="list-item" key={loc.id}>{loc.name}</li>)
        )}
    </ul>
);
export default ListView;