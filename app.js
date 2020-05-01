const addUser = document.getElementById('add-user'),
    doubleMoney = document.getElementById('double'),
    millionaires = document.getElementById('show-millionaires'),
    sort = document.getElementById('sort'),
    entireWealth = document.getElementById('calculate-wealth'),
    main = document.getElementById('main');


let users = [];

randUser();
randUser();
randUser();


// Generating Random users
async function randUser() {

    const res = await fetch('https://randomuser.me/api/');

    const data = await res.json();

    const name = data.results[0].name;

    const obj = {
        name: `${name.first} ${name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }

    addingUser(obj);
}


// Adding users
function addingUser(obj) {

    users.push(obj);
    updateUI();
}


// Add User Event Listener
addUser.addEventListener('click', () => {

    randUser();
});


// Double money Event Listener
doubleMoney.addEventListener('click', () => {

    users = users.map(user => {
        return { ...user, money: user.money * 2 };
    });

    updateUI();

});


// Millionaire Event Listener
millionaires.addEventListener('click', () => {

    users = users.filter(user => {
        return user.money > 1000000;
    });

    updateUI();
});


// Sort by Richest Event Listener
sort.addEventListener('click', () => {

    users = users.sort((a, b) => {
        return b.money - a.money;
    });

    updateUI();
});


// Entire wealth Event Listener
entireWealth.addEventListener('click', () => {

    const wealth = users.reduce((total, user) => {
        return total += user.money;
    }, 0);

    const wealthElement = document.createElement('div');
    wealthElement.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthElement);
});

// Update UI
function updateUI() {

    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';              // So that list appends below heading

    users.forEach(current => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${current.name}</strong> ${formatMoney(current.money)}`;
        main.appendChild(element);
    });
}


// Format number as money - https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
function formatMoney(amount) {
    return '$' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}



