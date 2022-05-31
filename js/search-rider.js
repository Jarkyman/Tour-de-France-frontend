const searchUrl = baseUrl + "riders/"

const searchField = document.getElementById('searchRider');
document.addEventListener('DOMContentLoaded', riderSearchList);
searchField.addEventListener('input', riderSearchList);

let riders = [];

/**
 * getting search value and fetching from the backend
 */
async function riderSearchList() {
    riders = await fetch(searchUrl + searchField.value).then((response) =>
        response.json()
    );
    riders.sort((r1, r2) => r1.firstName.localeCompare(r2.firstName));

    addAllRiders(riders);
}