import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';

const activeStyles = StyleSheet.create({
    activeItem: {
        backgroundColor: '#d2cfc6',
        padding: '1rem',
    },
    activeHeader: {
        margin: '0',
        fontSize: '1.7rem',
        textAlign: 'center'
    },
    activeDetails: {
        fontSize: '1.5rem',
        margin: '0'
    },
    imageWrapper: {
        width: '100%',
        maxHeight: '300px',
        overflow: 'hidden'
    },
    image: {
        width: '100%',
    }
});

const DetailedItem = ({data, isLargeScreen}) => {
    const {name, phone} = data;
    return (
        <li className={css(activeStyles.activeItem)}>
            <h2 className={css(activeStyles.activeHeader)}>{name}</h2>
            <div className={css(activeStyles.imageWrapper)}>
                <img src={data.image_url} className={css(activeStyles.image)}/>
            </div>
            <p className={css(activeStyles.activeDetails)}>Phone: {phone !== '' ? phone : 'No phone number available'}</p>
        </li>
    )
};

export default DetailedItem;