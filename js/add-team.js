const url = baseUrl + createUrl + "team";

document.addEventListener("DOMContentLoaded", createFormEventListener);

let teamForm;

/**
 * Creating form and submit handling
 */
function createFormEventListener() {
    teamForm = document.getElementById("addNewRider");
    teamForm.addEventListener("submit", handleTeamFormSubmit);
}

/**
 * Handling form data, and send it to create function
 *
 * @param event
 * @returns {Promise<void>}
 */
async function handleTeamFormSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    try {
        const formData = new FormData(form);
        const responseData = await createTeam(url, formData);
        teamForm.reset();
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
async function createTeam(url, formData) {
    const plainFormData = Object.fromEntries(formData.entries());
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