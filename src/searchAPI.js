const url = 'http://localhost:6001';
const headers = {
    'Accept': 'application/json'
};

export async function fetchById(id) {
    try {
        const response = await fetch(`${url}/search/${id}`, {...headers});
        return await response.json();
    } catch (e) {
        console.log(e);
        return {error: `fetch failed to load for ${id}.`};
    }
}

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
/* for browser fetching

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