document.addEventListener('DOMContentLoaded', setShirts);

/**
 * Calls all 4 shirt methods.
 */
async function setShirts() {
    await yellowShirt();
    await dottedShirt();
    await greenShirt();
    await whiteShirt();
}

/**
 * Finds the rider with the shortest time, and set it to the yellow shirt
 */
async function yellowShirt() {
    const yellowShirtName = document.getElementById('yellowShirtCardName');
    const yellowShirtTeam = document.getElementById('yellowShirtCardTeam');
    let yellowRider;
    let riders = await getAllRiders();

    for (let i = riders.length - 1; i > 0; i--) {
        if (riders[i].time === 0) {
            riders.splice(i, 1);
        }
    }

    riders.sort((r1, r2) => r1.time - r2.time);
    yellowRider = riders[0];
    yellowShirtName.innerText = yellowRider.firstName + " " + yellowRider.lastName;
    yellowShirtTeam.innerText = yellowRider.team.teamName;

    const cellField = document.getElementById('topCell' + yellowRider.riderId);
    if (cellField) {
        let icon = document.createElement('img');
        icon.src = "../img/Yellow.jpeg";
        icon.classList.add('shirt-icon');
        cellField.appendChild(icon);
    }

}

/**
 * Finds the rider with the most mountain points, and set it to the dotted shirt
 */
async function dottedShirt() {
    const dottedShirtName = document.getElementById('dottedShirtCardName');
    const dottedShirtTeam = document.getElementById('dottedShirtCardTeam');
    let dottedRider;
    let riders = await getAllRiders();
    riders.sort((r1, r2) => r1.mountainPoints - r2.mountainPoints);
    dottedRider = riders[riders.length - 1];
    dottedShirtName.innerText = dottedRider.firstName + " " + dottedRider.lastName;
    dottedShirtTeam.innerText = dottedRider.team.teamName;

    const cellField = document.getElementById('topCell' + dottedRider.riderId);
    if (cellField) {
        let icon = document.createElement('img');
        icon.src = "../img/Dotted.jpeg";
        icon.classList.add('shirt-icon');
        cellField.appendChild(icon);
    }
}

/**
 * Finds the rider with the most points, and set it to the green shirt
 */
async function greenShirt() {
    const greenShirtName = document.getElementById('greenShirtCardName');
    const greenShirtTeam = document.getElementById('greenShirtCardTeam');
    let greenRider;
    let riders = await getAllRiders();
    riders.sort((r1, r2) => r1.points - r2.points);
    greenRider = riders[riders.length - 1];
    greenShirtName.innerText = greenRider.firstName + " " + greenRider.lastName;
    greenShirtTeam.innerText = greenRider.team.teamName;

    const cellField = document.getElementById('topCell' + greenRider.riderId);
    if (cellField) {
        let icon = document.createElement('img');
        icon.src = "../img/Green.jpeg";
        icon.classList.add('shirt-icon');
        cellField.appendChild(icon);
    }
}

/**
 * Finds the rider with the shortest time that's under 26 years old, and set it to the white shirt
 */
async function whiteShirt() {
    const whiteShirtName = document.getElementById('whiteShirtCardName');
    const whiteShirtTeam = document.getElementById('whiteShirtCardTeam');
    let whiteRider;
    let riders = await getAllRiders();

    for (let i = riders.length - 1; i > 0; i--) {
        if (riders[i].time === 0) {
            riders.splice(i, 1);
        }
    }

    let ungDate = new Date(subtractYears(26, new Date(Date.now())));
    let ungList = [];
    riders.forEach((rider) => {
        if (isUng(ungDate, rider)) {
            ungList.push(rider);
        }
    });
    ungList.sort((r1, r2) => r1.time - r2.time);

    if (ungList.length > 0) {
        whiteRider = ungList[0];
        whiteShirtName.innerText = whiteRider.firstName + " " + whiteRider.lastName;
        whiteShirtTeam.innerText = whiteRider.team.teamName;

        const cellField = document.getElementById('topCell' + whiteRider.riderId);
        if (cellField) {
            let icon = document.createElement('img');
            icon.src = "../img/White.jpeg";
            icon.classList.add('shirt-icon');
            cellField.appendChild(icon);
        }

    } else {
        whiteShirtName.innerText = "No ung players";
        whiteShirtTeam.innerText = "Team";
    }

}

/**
 * Check if the rider is under 26 years old
 * @param ungDate date from 26 yeas ago
 * @param rider to check
 * @returns {boolean} true if unger
 */
function isUng(ungDate, rider) {
    if (new Date(rider.birthday) > ungDate) {
        return true;
    }
}

/**
 * Subtract a given year from a date
 * @param numOfYears years to subtract
 * @param date date
 * @returns {Date} subtracted date
 */
function subtractYears(numOfYears, date = new Date()) {
    date.setFullYear(date.getFullYear() - numOfYears);

    return date;
}