/** default headers */
const url = 'http://localhost:6001';
const headers = {
    'Accept': 'application/json'
};

/**
 * fetches from express backend by yelpId
 * @param id {String}           - yelpId
 * @returns {Promise||Object}   - yelp data or error data
 */
export async function fetchById(id) {
    try {
        const response = await fetch(`${url}/search/${id}`, {...headers});
        return await response.json();
    } catch (e) {
        console.log(e);
        return {error: `fetch failed to load for ${id}.`};
    }
}

/**
 * fetches from express backend by search terms
 * NOT IN USE
 * @param name {String}         - business name
 * @returns {Promise||Object}   - yelp data or error data
 */
export async function fetchByName(name) {
    const encoded = encodeURIComponent(name);
    try {
        const response = await fetch(`${url}/search/name/${encoded}`, {...headers});
        return await response.json();
    } catch (e) {
        console.log(e);
        return {error: `fetch failed to load for ${name}`};
    }
}
/* for browser fetching, formatted to test in console.

async function fetchByName(name) {
    const encoded = encodeURIComponent(name);
    try {
        const response = await fetch(`http://localhost:6001/search/name/${encoded}`, {'Accept': 'application/json'});
        const data = await response.json();
        return data;
    } catch (e) {
        console.log(e);
        return {error: `fetch failed to load for ${name}`};
    }
}
 */