/**
 * An array that stores the list of users.
 * 
 * @type {Array}
 */
let users = [];

/**
 * An array that stores the information of the currently logged-in user.
 * 
 * @type {Array}
 */
let currentUser = [];

/**
 * An array that stores the information of the guest user.
 * 
 * @type {Array}
 */
let guestUser = [];

/**
 * Asynchronously loads the saved users from the local storage.
 * If there are saved users, it updates the 'users' array with the loaded data.
 * 
 * @async
 * @returns {Promise<void>}
 */
async function loadSavedUsers() {
    // Check if there are saved users in the local storage
    if (users != null) {
        // Load the saved users and update the 'users' array with the loaded data
        users = JSON.parse(await getItem('users'));
    };
};


/**
 * Asynchronous function that handles user registration.
 * It retrieves user registration information from input fields, validates the password,
 * adds the new user to the 'users' array, saves the updated 'users' array to local storage,
 * resets the registration form, and redirects the user to the login page with a success message.
 * If the password and confirm password do not match, it displays an alert and clears the input fields.
 * 
 * @async
 * @returns {Promise<void>}
 */
async function register() {
    // Retrieve user registration information from input fields
    let userName = document.getElementById('inputName');
    let email = document.getElementById('inputEmail');
    let password = document.getElementById('inputPassword').value;
    let confirmPassword = document.querySelector('.confirmPasswordBox').value;

    // Validate if the password and confirm password match
    if (password === confirmPassword) {
        // Add the new user to the 'users' array
        users.push({
            email: email.value,
            password: password,
            name: userName.value
        });

        // Save the updated 'users' array to local storage
        await setItem('users', JSON.stringify(users));

        // Reset the registration form
        resetForm(userName, email, password);

        // Reload the 'users' array from local storage
        users = JSON.parse(await getItem('users'));

        // Redirect the user to the login page with a success message
        window.location.href = 'login.html?msg=You have successfully registered';
    } else {
        // Display an alert if the password and confirm password do not match
        alert("Password and confirm password don't match!");
        // Clear the input fields for password and confirm password
        password.value = '';
        confirmPassword.value = '';
        // Return from the function
        return;
    };
};


/**
 * Resets the registration form by clearing the values of the input fields.
 * 
 * @param {HTMLInputElement} userName - The input field for the user's name.
 * @param {HTMLInputElement} email - The input field for the user's email.
 * @param {HTMLInputElement} password - The input field for the user's password.
 */
function resetForm(userName, email, password) {
    // Clear the values of the input fields
    email.value = '';
    password.value = '';
    userName.value = '';
};


/**
 * Loads the login HTML page, displays success messages if available in the URL parameters.
 */
function loadLogInHTML() {
    const urlParams = new URLSearchParams(window.location.search);
    const msg = urlParams.get('msg');
    const password = urlParams.get('password');
    let msgBox = document.querySelector('.msgBox');

    // Display success message for registration
    if (msg === 'Du hast dich erfolgreich registriert') {
        msgBox.classList.remove('visible');
        msgBox.innerHTML = msg;
    } else {
        msgBox.classList.add('visible');
    };

    // Display success message for password reset
    if (password === 'Du hast dein Password erfolgreich zurückgesetzt') {
        msgBox.classList.remove('visible');
        msgBox.innerHTML = password;
    } else {
        msgBox.classList.add('visible');
    };
};


/**
 * Initializes the application by loading users' information.
 */
async function init() {
    loadUsers();
};


/**
 * Gets users' information.
 */
async function getUsersInfo() {
    loadUsers();
};


/**
 * Gets the current user's data.
 */
async function getUserData() {
    loadUsers();
};


/**
 * Loads users' data from local storage.
 * @throws {Error} If there's an error parsing the data.
 */
async function loadUsers() {
    try {
        users = JSON.parse(await getItem('users'));
    } catch (e) {
        console.error('Loading error:', e);
        throw new Error('Error loading users data');
    };
};


/**
 * This function search for User Data and than tried with that data to log in in to JOIN
 * @date 7/15/2023 - 9:37:56 AM
 *
 */
async function logIn() {
    let email = document.getElementById('email');
    let password = document.getElementById('password');

    let user = users.find(u => u.email == email.value && u.password == password.value);
    if (user) {
        await setItem('user', JSON.stringify(user));
        currentUser = JSON.parse(await getItem('user'));
        window.location.href = 'summary.html';
        email.value = '';
        password.value = '';
    } else {
        failedLogIn(email, password);
    };
};


/**
 * Number of failed login attempts.
 * @type {number}
 */
let counter = 0;


/**
 * Displays a warning message and updates the login attempts counter for failed login attempts.
 * If the number of attempts exceeds 2, the user is redirected to the "forgetPassword.html" page.
 * @param {HTMLInputElement} email - The input field for the email.
 * @param {HTMLInputElement} password - The input field for the password.
 */
function failedLogIn(email, password) {
    let warningbox = document.querySelector('.warningBox');
    let counterBox = document.querySelector('.counter');
    
    if (counter < 2) {
        // Display warning message
        warningbox.style.display = 'block';
        
        // Update login attempts counter
        counterBox.textContent = counter + 1 + '/3 Versuchen';
        counter++;
        
        // Clear email and password input fields
        email.value = '';
        password.value = '';
    } else {
        // Redirect to "forgetPassword.html" page
        window.location.href = 'forgetPassword.html';
        counter = 0; // Reset the login attempts counter
    };
};


/**
 * Logs in the user as a guest. If a guest user is already logged in, it clears the guest user data and logs in the current user as a guest.
 * After logging in as a guest, it redirects the user to the "summary.html" page.
 */
async function guestLogIn() {
    if (guestUser != null) {
        // Get the current user data
        currentUser = JSON.parse(await getItem('user'));
        
        // Add the current user to the guestUser array
        guestUser.push(currentUser);
        
        // Clear the guestUser array
        guestUser = [];
        
        // Save the updated guestUser array to localStorage
        await setItem('user', JSON.stringify(guestUser));
        
        // Redirect to the "summary.html" page
        window.location.href = 'summary.html';
    } else {
        // If no guest user data is present, simply redirect to the "summary.html" page
        window.location.href = 'summary.html';
    };
};


/**
 * Sends an email for password reset.
 * It retrieves the email entered in the input field with the ID "email".
 * It checks if the entered email matches any user's email in the "users" array.
 * If the email is not found in the "users" array, it displays an error message.
 * If the email is found in the "users" array, it redirects the user to the "resetPassword.html" page.
 */
async function sendEmail() {
    // Get the value of the email input field
    let forgotEmail = document.getElementById('email');
    
    // Get the element representing the hidden password reset box
    let hidenBox = document.querySelector('.forgotPasswordBox');
    
    // Find the user with the entered email in the "users" array
    let user = await users.find(u => u.email == forgotEmail.value);
    
    if (user == undefined) {
        // If the email is not found in the "users" array, display an error message
        console.log('User not found');
        hidenBox.style.display = 'block';
    } else {
        // If the email is found in the "users" array, redirect the user to the "resetPassword.html" page
        window.location.href = 'resetPassword.html';
        console.log(user);
    };
};


/**
 * Resets the user's password.
 * It retrieves the new password and confirm password entered in the input fields with the IDs "newPassword" and "confirmPassword", respectively.
 * It checks if the new password matches the confirm password.
 * If the passwords match, it redirects the user to the "login.html" page with a success message.
 * If the passwords don't match, it displays an error message.
 */
function resetPassword() {
    // Get the values of the new password and confirm password input fields
    let newPassword = document.getElementById('newPassword').value;
    let confirmPassword = document.getElementById('confirmPassword').value;

    if (newPassword == confirmPassword) {
        // If the passwords match, redirect the user to the "login.html" page with a success message
        window.location.href = 'login.html?password=Your password has been successfully reset.';
        // Clear the input fields
        newPassword.value = '';
        confirmPassword.value = '';
    } else {
        // If the passwords don't match, display an error message
        document.querySelector('.resetBox').style.display = 'block';
        // Clear the input fields
        newPassword.value = '';
        confirmPassword.value = '';
    };
};