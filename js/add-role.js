const url = baseUrl + createUrl + "rider";
const selectTeam = document.getElementById('selectTeam');

document.addEventListener("DOMContentLoaded", teamDropdown);
document.addEventListener("DOMContentLoaded", createFormEventListener);

let riderForm;

async function teamDropdown() {
    await getAllTeams();
    teams.forEach((team) => {
        let option = document.createElement('option');
        option.value = JSON.stringify(team);
        option.text = team.teamName;
        selectTeam.options.add(option);
    });
}


function createFormEventListener() {
    riderForm = document.getElementById("addNewRider");
    riderForm.addEventListener("submit", handleFormSubmit);
}


async function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    try {
        const formData = new FormData(form);
        const responseData = await postFormDataAsJson(url, formData);
        out(responseData);
        riderForm.reset();
    } catch (err) {
        alert("Something went wrong " + err.message);
        out(err);
    }
}

async function postFormDataAsJson(url, formData) {
    const plainFormData = Object.fromEntries(formData.entries());
    out(plainFormData);
    plainFormData.team = JSON.parse(plainFormData.team);
    const formDataJsonString = JSON.stringify(plainFormData);
    out(formDataJsonString);

    const fetchOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: formDataJsonString,
    };

    const response = await fetch(url, fetchOptions);
    if (!response) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }

    return response;
}