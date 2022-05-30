const findPlayerNavDelete = document.getElementById("deletePlayerNav");


async function deleteRider(rider) {
    out("rider - " + rider);
    const url = baseUrl + deleteUrl + "rider/" + rider.riderId;
    out(url);

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
        out(rider.firstName + " " + rider.lastName + " is deleted");
    }

    await riderSearchList();
    return response;
}
