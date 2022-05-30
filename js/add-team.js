const url = baseUrl + createUrl + "team";

document.addEventListener("DOMContentLoaded", createFormEventListener);

let teamForm;

function createFormEventListener() {
    teamForm = document.getElementById("addNewRider");
    teamForm.addEventListener("submit", handleFormSubmit);
}


async function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    try {
        const formData = new FormData(form);
        const responseData = await postFormDataAsJson(url, formData);
        out(responseData);
        teamForm.reset();
    } catch (err) {
        alert("Something went wrong " + err.message);
        out(err);
    }
}

async function postFormDataAsJson(url, formData) {
    const plainFormData = Object.fromEntries(formData.entries());
    out(plainFormData);
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