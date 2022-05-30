const tableRiders = document.getElementById('tableRiders');
document.addEventListener('DOMContentLoaded', fillDropDownEdit);

function addAllRiders() {
    clearTable();

    for (let i = 0; i < riders.length; i++) {
        let row = tableRiders.insertRow(i);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);
        let cell6 = row.insertCell(5);
        let cell7 = row.insertCell(6);
        let cell8 = row.insertCell(7);
        cell1.innerText = riders[i].firstName;
        cell2.innerText = riders[i].lastName;
        cell3.innerText = riders[i].country;
        cell4.innerText = riders[i].team.teamName;
        cell5.innerText = riders[i].time;
        cell6.innerText = riders[i].points;
        cell7.innerText = riders[i].mountainPoints;
        cell8.appendChild(editButton(row.rowIndex, riders[i]));
    }

}

function editButton(index, rider) {
    let edit = document.createElement('button');
    let icon = document.createElement('i');
    edit.type = 'button';
    edit.setAttribute('id', 'Edit' + index);
    edit.classList.add('btn', 'btn-primary');
    icon.classList.add('fa-solid', 'fa-pen-to-square');
    edit.appendChild(icon);
    edit.setAttribute('data-bs-toggle', 'modal');
    edit.setAttribute('data-bs-target', '#editRider');
    edit.onclick = () => {
        fillForm(rider)
    };
    return edit;
}

async function fillForm(rider) {
    const raiderId = document.getElementById('riderId');
    const firstName = document.getElementById('firstNameEdit');
    const lastName = document.getElementById('lastNameEdit');
    const birthday = document.getElementById('birthdayEdit');
    const countrySelect = document.getElementById('selectCountryEdit');
    const teamSelect = document.getElementById('selectTeamEdit');

    raiderId.value = rider.riderId;
    firstName.value = rider.firstName;
    lastName.value = rider.lastName;
    birthday.value = rider.birthday;
    countrySelect.value = rider.country;
    teamSelect.value = JSON.stringify(rider.team);

    createFormEventListenerEdit();
}

async function fillDropDownEdit() {
    const countrySelect = document.getElementById('selectCountryEdit');
    const teamSelect = document.getElementById('selectTeamEdit');

    let teams = await getAllTeams();
    teams.forEach((team) => {
        let option = document.createElement('option');
        option.value = JSON.stringify(team);
        option.text = team.teamName;
        teamSelect.options.add(option);
    });

    let countries = await getAllCountries();
    countries.forEach((country) => {
        let option = document.createElement('option');
        option.value = country.country;
        option.text = country.country;
        countrySelect.options.add(option);
    });
}

async function getAllCountries() {
    let countries = await fetch(baseUrl + "countries").then((response) =>
        response.json()
    );
    countries.sort((c1, c2) => c1.country.localeCompare(c2.country));
    return countries;
}

function clearTable() {
    for (let i = tableRiders.rows.length - 1; i >= 0; i--) {
        tableRiders.deleteRow(i);
    }
}
