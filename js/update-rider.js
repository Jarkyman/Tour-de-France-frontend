const riderUrl = baseUrl + updateUrl + "raider/";
let updateForm;

function createFormEventListenerEdit() {
    updateForm = document.getElementById("editRiderForm");
    updateForm.addEventListener("submit", updateButton);
}

async function updateRider(rider) {
    const url = riderUrl + rider.riderId;

    const jsonString = JSON.stringify(rider);
    out(jsonString);

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
            out(rider.firstName + " is updated");
        } else {
            alert("Something went wrong\nERROR status: " + response.status);
        }
    }
    return response;
}

async function updateButton(event) {
    event.preventDefault();
    const form = event.currentTarget;

    try {
        const formData = new FormData(form);
        const plainFormData = Object.fromEntries(formData.entries());
        plainFormData.team = JSON.parse(plainFormData.team);
        out(plainFormData);
        await updateRider(plainFormData);
    } catch (err) {}
}
