import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';

const activeStyles = StyleSheet.create({
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

const DetailedItem = ({data, isLargeScreen}) => {
    const {name, phone} = data;
    return (
        <li className={css(activeStyles.activeItem)}>
            <h2 className={css(activeStyles.activeHeader)}>{name}</h2>
            <p className={css(activeStyles.activeDetails)}>Phone: {phone !== '' ? phone : 'No phone number available'}</p>
        </li>
    )
};

export default DetailedItem;