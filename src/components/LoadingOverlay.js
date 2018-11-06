import React from 'react';
import ReactLoading from 'react-loading';
import {StyleSheet, css} from 'aphrodite/no-important';

const loadingStyles = StyleSheet.create({
    default: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.2)',
        zIndex: '1000',
        overflow: 'none',
        textAlign: 'center'
    },
    iconLargeScreen: {
        position: 'absolute',
        left: '50%',
        marginLeft: '50px',
        top: '40%'
    },
    iconSmallScreen: {
        position: 'absolute',
        left: '40%',
        top: '25%'
    }
});

/** from npm package react-loading
 * LoadingOverlay in case App.state.loading
 *
 * @param isLargeScreen {Boolean}
 * @constructor
 */
const LoadingOverlay = ({isLargeScreen}) => (
    <div className={css(loadingStyles.default)}>
        <ReactLoading
            className={isLargeScreen ? css(loadingStyles.iconLargeScreen) : css(loadingStyles.iconSmallScreen)}
            type="spin"
            color="#fff"
            height="100px"
            width="100px"
        />
    </div>
);

export default LoadingOverlay;