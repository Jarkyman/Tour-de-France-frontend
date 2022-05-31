let countries = [];

const selectCountries = document.getElementById('selectCountry');
document.addEventListener("DOMContentLoaded", countriesDropdown);

/**
 * Fetch all teams from database and sorts alphabetically
 * @returns {Array} counties sorted
 */
async function getAllCountries() {
    countries = await fetch(baseUrl + "countries").then((response) =>
        response.json()
    );
    countries.sort((c1, c2) => c1.country.localeCompare(c2.country));
    return countries;
}

/**
 * Creating dropdown menu with counties
 */
async function countriesDropdown() {
    await getAllCountries();
    countries.forEach((country) => {
        let option = document.createElement('option');
        option.value = country.country;
        option.text = country.country;
        selectCountries.options.add(option);
    });
}