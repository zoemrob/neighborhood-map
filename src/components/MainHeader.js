import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';

const header = StyleSheet.create({
    el: {
        textAlign: 'center',
        backgroundColor: '#D7FAD3'
    },
    text: {
        fontFamily: '"Playfair Display", serif',
        textDecoration: 'underline',
        margin: '0',
        padding: '.67em 0'
    }
});

/** simple jsx render for App header
 *
 * @constructor
 */
const MainHeader = () => (
    <header className={css(header.el)}>
        <h1 className={css(header.text)}>Gladstone Neighborhood Map</h1>
    </header>
);
export default MainHeader;