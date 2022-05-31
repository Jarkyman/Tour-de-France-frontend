document.addEventListener('DOMContentLoaded', getTopTwenty);

/**
 * Create a list og the 20 best riders
 */
async function getTopTwenty() {
    let riders = await getAllRiders();

    for (let i = riders.length - 1; i > 0; i--) {
        if (riders[i].time === 0) {
            riders.splice(i, 1);
        }
    }

    riders.sort((r1, r2) => r1.time - r2.time);

    if (riders.length > 20) {
        riders.length = 20;
    }

    riders.forEach((rider, index) => {
        createItem(rider, index);
    });
}

/**
 * Creating row for tabel and give it data from rider to every cell
 *
 * @param rider to view
 * @param index of place
 */
function createItem(rider, index) {
    const topList = document.getElementById('topTwentyList');
    let row = topList.insertRow(index)
    let cell0 = row.insertCell(0);
    let cell1 = row.insertCell(1);
    let cell2 = row.insertCell(2);
    let cell3 = row.insertCell(3);
    let cell4 = row.insertCell(4);
    let cell5 = row.insertCell(5);
    let cell6 = row.insertCell(6);
    let cell7 = row.insertCell(7);
    cell0.setAttribute('id', 'topCell' + rider.riderId);
    cell0.innerText = index + 1;
    cell1.innerText = rider.firstName;
    cell2.innerText = rider.lastName;
    cell3.innerText = rider.country;
    cell4.innerText = rider.team.teamName;
    cell5.innerText = rider.time;
    cell6.innerText = rider.points;
    cell7.innerText = rider.mountainPoints;
}