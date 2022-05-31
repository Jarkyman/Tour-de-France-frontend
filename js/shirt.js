document.addEventListener('DOMContentLoaded', setShirts);

async function setShirts() {
    await yellowShirt();
    await dottedShirt();
    await greenShirt();
    await whiteShirt();
}

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
}

async function dottedShirt() {
    const dottedShirtName = document.getElementById('dottedShirtCardName');
    const dottedShirtTeam = document.getElementById('dottedShirtCardTeam');
    let dottedRider;
    let riders = await getAllRiders();
    riders.sort((r1, r2) => r1.mountainPoints - r2.mountainPoints);
    dottedRider = riders[riders.length-1];
    dottedShirtName.innerText = dottedRider.firstName + " " + dottedRider.lastName;
    dottedShirtTeam.innerText = dottedRider.team.teamName;
}

async function greenShirt() {
    const greenShirtName = document.getElementById('greenShirtCardName');
    const greenShirtTeam = document.getElementById('greenShirtCardTeam');
    let greenRider;
    let riders = await getAllRiders();
    riders.sort((r1, r2) => r1.points - r2.points);
    greenRider = riders[riders.length-1];
    greenShirtName.innerText = greenRider.firstName + " " + greenRider.lastName;
    greenShirtTeam.innerText = greenRider.team.teamName;
}

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

    whiteRider = ungList[0];
    whiteShirtName.innerText = whiteRider.firstName + " " + whiteRider.lastName;
    whiteShirtTeam.innerText = whiteRider.team.teamName;
}

function isUng(ungDate, rider){
    if (new Date(rider.birthday) > ungDate) {
        return true;
    }
}

function subtractYears(numOfYears, date = new Date()) {
    date.setFullYear(date.getFullYear() - numOfYears);

    return date;
}