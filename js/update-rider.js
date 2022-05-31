const riderUrl = baseUrl + updateUrl + "rider/";
let updateForm;

/**
 * Creating form, with submit handeling
 */
function createFormEventListenerEdit() {
    updateForm = document.getElementById("editRiderForm");
    updateForm.addEventListener("submit", updateButton);
}

/**
 * Tage a rider with updated information
 * Send the data to the backend and save it.
 *
 * @param rider updated rider
 * @returns {Promise<Response>}
 */
async function updateRider(rider) {
    const url = riderUrl + rider.riderId;

    delete rider.riderId;

    const jsonString = JSON.stringify(rider);

    const fetchOptions = {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
        },
        body: jsonString,
    };
    //calls API (Backend) and wait for return
    const response = await fetch(url, fetchOptions);

    if (!response) {
        alert("Something went wrong");
    } else {
        if (response.ok) {
            out(rider.firstName + " " + rider.lastName + ": is updated");
        } else {
            alert("Something went wrong\nERROR status: " + response.status);
        }
    }
    await riderSearchList();
    return response;
}

/**
 * handling the submit form, and send data to update function
 *
 * @param event
 * @returns {Promise<void>}
 */
async function updateButton(event) {
    event.preventDefault();
    const form = event.currentTarget;

    try {
        const formData = new FormData(form);
        const plainFormData = Object.fromEntries(formData.entries());
        plainFormData.team = JSON.parse(plainFormData.team);
        await updateRider(plainFormData);
    } catch (err) {
    }
}
