import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import {yelpStarsLarge, yelpStarsSmall, yelpBurst} from "../yelpStars";

const activeStyles = StyleSheet.create({
    activeItem: {
        backgroundColor: '#ADF5A5',
        padding: '1rem',
        textAlign: 'center'
    },
    activeHeader: {
        fontFamily: '"Playfair Display", serif',
        margin: '0 0 1rem 0',
        fontSize: '1.8rem',
        backgroundColor: '#ECFDEA',
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
        ':after': {
            content: "':'"
        },
        fontWeight: 'bolder',
    },
    detailWrapper: {
        backgroundColor: '#ECFDEA',
        borderRadius: '15px',
        marginTop: '1rem',
        padding: '1rem'
    },
    attrition: {
        textAlign: 'right'
    },
    yelpBurst: {
        maxWidth: '50px'
    },
    reviewCount: {
        color: 'darkgrey',
        fontSize: '0.8em'
    }
});


/**
 * DetailedItem Component - displays yelpAPI data from App.state.activeLocation.data
 *
 * @param error {Boolean}       - indication of error fetching data
 * @param errorMessage {String} - if error, the message
 * @param data {Object}         - App.state.activeLocation.data metadata
 * @param isLargeScreen {Boolean} - Screen size check for rendering
 * @constructor
 */
const DetailedItem = ({error, errorMessage, data, isLargeScreen}) => {
    // if there is an error, return a simpler view with the error message
    if (error) {
        return (
            <li className={css(activeStyles.activeItem)}>
                <article id="item-detail">
                    <h2 className={css(activeStyles.activeHeader)}>{data.name}</h2>
                    <p className={css(activeStyles.activeDetails)}>{errorMessage}</p>
                </article>
            </li>
        );
    }
    const {name, phone, rating, location, url, review_count} = data;
    const {display_address} = location;

    return (
        <li className={css(activeStyles.activeItem)}>
            <article id="item-detail">
                <h2 className={css(activeStyles.activeHeader)}>{name}</h2>
                <div className={css(activeStyles.imageWrapper)}>
                    <img alt={"a photo of " + name} src={data.image_url} className={css(activeStyles.image)}/>
                </div>
                <div className={css(activeStyles.detailWrapper)}>
                    <p className={css(activeStyles.activeDetails)}>
                        <span className={css(activeStyles.reviewCount)} aria-label="location reviews">{review_count} Reviews</span>
                        <br />
                        <img alt={rating + " star rating"} src={isLargeScreen ? yelpStarsLarge[rating] : yelpStarsSmall[rating]}/>
                    </p>
                    <p className={css(activeStyles.activeDetails)}>
                        <label className={css(activeStyles.valueDescription)} id="phone-label">Phone</label>
                        <span aria-labelledby="phone-label" className={css(activeStyles.values)}>{phone !== '' ? phone : 'No phone number available'}</span>
                    </p>
                    <p className={css(activeStyles.activeDetails)}>
                        <label id="address-label" className={css(activeStyles.valueDescription)}>Address</label>
                        <span aria-labelledby="address-label" className={css(activeStyles.values)}>{display_address[0]}</span>
                        <span aria-labelledby="address-label" className={css(activeStyles.values)}>{display_address[1]}</span>
                    </p>
                    <p className={css(activeStyles.activeDetails)}>
                        <a href={url}>Link to Yelp Listing</a>
                    </p>
                    <aside className={css(activeStyles.attrition)}>
                        Data provided by Yelp
                        <img className={css(activeStyles.yelpBurst)} alt="yelp-burst" src={yelpBurst}/>
                    </aside>
                </div>
            </article>
        </li>
    )
};

export default DetailedItem;