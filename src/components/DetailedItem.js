import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import {yelpStarsLarge, yelpStarsSmall, yelpBurst} from "../yelpStars";

const activeStyles = StyleSheet.create({
    activeItem: {
        backgroundColor: '#d2cfc6',
        padding: '1rem',
        textAlign: 'center'
    },
    activeHeader: {
        margin: '0 0 1rem 0',
        fontSize: '1.8rem',
        backgroundColor: '#fff',
        borderRadius: '15px',
        padding: '1rem'
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
        width: '100%'
    },
    values: {
        ':before': {
            content: "'\\A'",
            whiteSpace: 'pre'
        },
        fontSize: '0.9em',
        fontWeight: 'initial',
        textAlign: 'center',
    },
    valueDescription: {
        fontWeight: 'bolder',
    },
    detailWrapper: {
        backgroundColor: '#fff',
        borderRadius: '15px',
        marginTop: '1rem',
        padding: '1rem'
    },
    attrition: {
        textAlign: 'right'
    },
    yelpBurst: {
        maxWidth: '50px'
    }
});



const DetailedItem = ({data, isLargeScreen}) => {
    const {name, phone, rating, location} = data;
    const {display_address} = location;

    return (
        <li className={css(activeStyles.activeItem)}>
            <h2 className={css(activeStyles.activeHeader)}>{name}</h2>
            <div className={css(activeStyles.imageWrapper)}>
                <img alt={"a photo of " + name} src={data.image_url} className={css(activeStyles.image)}/>
            </div>
            <div className={css(activeStyles.detailWrapper)}>
                <p className={css(activeStyles.activeDetails)}>
                    <span className={css(activeStyles.valueDescription)}>Yelp Rating:</span>
                    <br/>
                    <img alt={rating + " star rating"} src={isLargeScreen ? yelpStarsLarge[rating] : yelpStarsSmall[rating]}/>
                </p>
                <p className={css(activeStyles.activeDetails)}>
                    <span className={css(activeStyles.valueDescription)}>Phone:</span>
                    <span className={css(activeStyles.values)}>{phone !== '' ? phone : 'No phone number available'}</span>
                </p>
                <p className={css(activeStyles.activeDetails)}>
                    <span className={css(activeStyles.valueDescription)}>Address:</span>
                    <span className={css(activeStyles.values)}>{display_address[0]}</span>
                    <span className={css(activeStyles.values)}>{display_address[1]}</span>
                </p>
                <aside className={css(activeStyles.attrition)}>
                    Data provided by Yelp
                    <img className={css(activeStyles.yelpBurst)} alt="yelp-burst" src={yelpBurst}/>
                </aside>
            </div>
        </li>
    )
};

export default DetailedItem;