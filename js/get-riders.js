
async function getAllRiders() {
    let riders = await fetch(baseUrl + "riders").then((response) =>
        response.json()
    );
    return riders;
}