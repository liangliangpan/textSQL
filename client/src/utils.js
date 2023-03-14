// Utils for the client side

/**
 * Formatted Zipcodes for Mapbox
 * @param {*} zips
 * @returns {string[]} – The formatted zipcodes
 */
export const getZipcodesMapboxFormatted = (zips) => {
    return zips.map((x) => '<at><openparen>' + x['zipcode'] + '<closeparen>')
}

/**
 * Gets the zipcode's latitude longitude from the query search results
 * @param {*} result - The search results
 * @returns {object[]} – The formatted zipcodes
 */
export const getZipcodes = (result) => {
    let zipcode_index = result.column_names.indexOf('zip_code')
    if (zipcode_index == -1 || !result.results) return []

    return result.results.map((x) => {
        return { zipcode: x['zip_code'], lat: x['lat'], long: x['long'] }
    })
}

/**
 * Gets the cities latitude longitude from the query search results
 * @param {*} result – The search results
 * @returns {object[]} – The zipcodes
 */
export const getCities = (result) => {
    let city_index = result.column_names.indexOf('city')
    if (city_index == -1 || !result.results) return []

    return result.results.map((x) => {
        return { city: x['city'], lat: x['lat'], long: x['long'] }
    })
}

/**
 * Query sanitization
 * @param {*} q – The query
 * @returns {string} – The sanitized query
 */
export const cleanupQuery = (q) => {
    let cleanedQuery = q.replaceAll(/\barea\b/gi, 'zipcode')
    cleanedQuery = cleanedQuery.replaceAll(/\bareas\b/gi, 'zipcodes')
    cleanedQuery = cleanedQuery.replaceAll(/\bneighborhood\b/gi, 'zipcode')
    cleanedQuery = cleanedQuery.replaceAll(/\bneighborhoods\b/gi, 'zipcodes')
    cleanedQuery = cleanedQuery.replaceAll(/\bpart of\b/gi, 'zipcode of')
    cleanedQuery = cleanedQuery.replaceAll(/\bparts of\b/gi, 'zipcodes of')
    return cleanedQuery
  }
