const url = baseUrl + createUrl + "rider";
const selectTeam = document.getElementById('selectTeam');

document.addEventListener("DOMContentLoaded", teamDropdown);
document.addEventListener("DOMContentLoaded", createFormEventListener);

let riderForm;

/**
 * Creating dropdown menu with teams from database
 */
async function teamDropdown() {
    await getAllTeams();
    teams.forEach((team) => {
        let option = document.createElement('option');
        option.value = JSON.stringify(team);
        option.text = team.teamName;
        selectTeam.options.add(option);
    });
}

/**
 * Creating form and submit handling
 */
function createFormEventListener() {
    riderForm = document.getElementById("addNewRider");
    riderForm.addEventListener("submit", handleRiderFormSubmit);
}

/**
 * Handling form data, and send it to create function
 *
 * @param event
 * @returns {Promise<void>}
 */
async function handleRiderFormSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    try {
        const formData = new FormData(form);
        const responseData = await createRider(url, formData);
        riderForm.reset();
    } catch (err) {
        alert("Something went wrong " + err.message);
        out(err);
    }
}

/**
 * Fetching the data to backend, and get response
 *
 * @param url to sendt request
 * @param formData object with data
 * @returns {Promise<Response>}
 */
async function createRider(url, formData) {
    const plainFormData = Object.fromEntries(formData.entries());
    plainFormData.team = JSON.parse(plainFormData.team);
    const formDataJsonString = JSON.stringify(plainFormData);

    const fetchOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: formDataJsonString,
    };

    const response = await fetch(url, fetchOptions);
    if (!response) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }

    return response;
}