let logedInUserInitials = [];

let currenrUserInitials = [];

async function loadInitials() {
    try {
        const user = await getItem('user');
        if (user) {
            currenrUserInitials = JSON.parse(user);
            loadUserInitials2();
        }
    } catch (e) {
        console.warn('Fehler ist ' + e);
    };
};


/**
 * Capitalizes the first letter of a string.
 * @param {string} string - The input string.
 * @returns {string} - The input string with the first letter capitalized.
 */
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Loads the logged-in user's data and displays the username on the summary view.
 */
async function loadUserInitials2() {
    let currentUser = await currenrUserInitials.name;
    const names = currentUser.split(' ');
    const initials = names.map(name => name.charAt(0).toUpperCase());
    const newInitials = initials.join(' ');
    const withoutSpaces = newInitials.replace(/\s/g, '');


    let userBox = document.querySelector('.userInitials');
    let userMobileBox = document.querySelector('.userInitialsMobile');

    if (currentUser) {
        userBox.innerHTML = capitalizeFirstLetter(withoutSpaces);
        userMobileBox.innerHTML = capitalizeFirstLetter(withoutSpaces);
    } else {
        userBox.innerHTML = 'G';
        userMobileBox.innerHTML = 'G';
    };
};


/**
 * Function to get the initials of the current user.
 * @param {string} currentUser - The current user's name.
 */
function getInitials(currentUser) {
    const names = currentUser.split(' ');
    const initials = names.map(name => name.charAt(0).toUpperCase());
    const newInitials = initials.join(' ');
    const withoutSpaces = newInitials.replace(/\s/g, '');

    logedInUserInitials.push(withoutSpaces);
    loadUserInitials();
};


/**
 * Asynchronous function to load the user initials.
 */
async function loadUserInitials() {
    let box = document.querySelector('.userInitials');
    let box2 = document.querySelector('.userInitialsMobile');
    box.innerHTML = '';
    box2.innerHTML = ''; //Timo

    if (logedInUserInitials != null) {
        for (let i = 0; i < logedInUserInitials.length; i++) {
            const element = logedInUserInitials[i];
            box.innerHTML =  `<span>${element}</span>`;
            box2.innerHTML = `<span>${element}</span>`;
        }
    } else {
        box.innerHTML =  `<span>G</span>`;
        box2.innerHTML = `<span>G</span>`;
    };
};


/**
 * Loads the user data for the logged-in user.
 * Updates the user initials display.
 */
async function loadUserData() {
    logedInUser = [];
    logedInUser = JSON.parse(await getItem('user'));
    let currentUser = logedInUser.name;
    let userBox = document.querySelector('.userInitials');
    let userMobileBox = document.querySelector('.userInitialsMobile');
    let box = document.getElementById('summary_username');

    if (currentUser) {
        userBox.innerHTML = capitalizeFirstLetter(currentUser);
        userMobileBox.innerHTML = capitalizeFirstLetter(currentUser);
        if (box) {
            box.innerHTML = capitalizeFirstLetter(currentUser);
        };
    } else {
        userBox.innerHTML = 'G';
        userMobileBox.innerHTML = 'G';
    };

    if (currentUser != null) {
        getInitials(currentUser);
    };
};