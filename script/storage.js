/**
 * Constant containing the access token for the external Storage API.
 * @type {string}
 */
const STORAGE_TOKEN = '1V2GXTE2RA1IZFC52LMAMBF71H8ZCVWX64TSIXB5';

/**
 * Constant containing the URL for accessing the external Storage API.
 * @type {string}
 */
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

/**
 * Function to save a value under a specific key in the external Storage API.
 * @param {string} key - The key under which the value will be stored.
 * @param {any} value - The value to be stored.
 * @returns {Promise<object>} - A Promise that resolves to the response data from the API.
 */
async function setItem(key, value) {
    // Create a payload object containing the key, value, and access token.
    const payload = { key, value, token: STORAGE_TOKEN };
    
    // Send a POST request to the external Storage API to store the value.
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) })
        .then(res => res.json());
};


/**
 * Function to retrieve a value from the external Storage API based on a key.
 * @param {string} key - The key associated with the value to be retrieved.
 * @returns {Promise<any>} - A Promise that resolves to the retrieved value from the API.
 * @throws {string} - Throws an error message if the specified key is not found in the API response.
 */
async function getItem(key) {
    // Create the URL for the GET request containing the key and access token.
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    
    // Send a GET request to the external Storage API to retrieve the value.
    return fetch(url)
        .then(res => res.json())
        .then(res => {
            // Check if a value with the specified key was found.
            if (res.data) {
                // If a value is found, return the retrieved value.
                return res.data.value;
            }
            // If no value with the specified key is found, throw an error message.
            throw `Could not find data with key "${key}".`;
        });
};