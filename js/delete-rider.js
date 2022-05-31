const findPlayerNavDelete = document.getElementById("deletePlayerNav");

/**
 * Delete a rider
 *
 * @param rider to delete
 * @returns {Promise<Response>}
 */
async function deleteRider(rider) {
    const url = baseUrl + deleteUrl + "rider/" + rider.riderId;

    const fetchOptions = {
        method: "DELETE",
        headers: {
            "Content-type": "application/json",
        },
    };

    const response = await fetch(url, fetchOptions);
    if (!response) {
        out("Something went wrong with delete json");
    } else {
        out(rider.firstName + " " + rider.lastName + ": is deleted");
    }

    await riderSearchList();
    return response;
}
