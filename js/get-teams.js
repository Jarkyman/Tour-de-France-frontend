let teams = [];

/**
 * Fetch all teams
 * @returns {Promise<*|*[]>}
 */
async function getAllTeams() {
    teams = await fetch(baseUrl + "teams").then((response) =>
        response.json()
    );
    return teams;
}