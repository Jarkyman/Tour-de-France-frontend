/**
 * fetching all riders from database
 * @returns {Promise<any>}
 */
async function getAllRiders() {
    return await fetch(baseUrl + "riders").then((response) =>
        response.json()
    );
}