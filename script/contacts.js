let contacts = [];
let initials = [];
let sortedalphabetically = [];
let letters = [];
let logedInUserInitials3 = [];
/**
 * Asynchronous function that initializes all necessary functions when loading the page
 */
async function init() {
    await loadContacts();
    await extractInitials(sortedalphabetically);
    await loadTasks(); // loads tasks for this page
    renderContacts();
    measureBrowserWidth();
    loadUserData();
}
/**
 * Asynchronous function that refreshes the page
 */
async function refresh() {
    let contactsboxbig = document.getElementById('contactsboxbig');
    contactsboxbig.innerHTML = '';
    let contact = document.getElementById('contactsboxsmall');
    contact.innerHTML = '';
    sortedalphabetically = [];
    await extractInitials(sortedalphabetically);
    await safeContacts();
    await loadContacts();
    renderContacts();
}
/**
 * Function to push the entered contacts into the "contacts" array
 * @param {string} name - This is the name of an existing contact
 * @param {string} email - This is the email of an existing contact
 * @param {number} phone - This is the phone number of an existing contact
 * @param {string} color - - This is the color which gets assigned to an existing contact
 */
function pushToArray(name, email, phone, color) {
    contacts.push(
        {
            'name': name,
            'email': email,
            'phone': phone,
            'color': color,
        }
    );
    safeContacts();
}
/**
 * Asynchronous function to save all contacts from array "contacts" to remote storage
 */
async function safeContacts() {
    await setItem('contact_array', JSON.stringify(contacts));
    await setItem('initials_array', JSON.stringify(initials));
}
/**
 * Asynchronous function to load all contacts from the remote storage and assign them to the "contacts" array
 */
async function loadContacts() {
    contacts = JSON.parse(await getItem('contact_array'));
    initials = JSON.parse(await getItem('initials_array'));
}
/**
 * Asynchronous function to add a new contact to the "contacts" array
 */
async function addContact() {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;

    sortedalphabetically = [];
    if (name != '' && email != '' && phone != '') {
        pushToArray(name, email, phone);
        await safeContacts();
        createdContactSuccessfully();
        hideAddContactCard();
    }
    document.getElementById('form_add_contact').reset();
    await refresh();
    safeContacts();
}
/**
 * Asynchronous function to add a new contact from the Mobile Version to the "contacts" array
 */
async function addContactMobile() {
    let name = document.getElementById('name_mobile').value;
    let email = document.getElementById('email_mobile').value;
    let phone = document.getElementById('phone_mobile').value;

    sortedalphabetically = [];

    if (name != '' && email != '' && phone != '') {
        pushToArray(name, email, phone);
        await safeContacts();
        createdContactSuccessfully();
        hideMobileAddContactCard();
    }
    document.getElementById('form_add_contact_mobile').reset();
    await refresh();
}
/**
 * Function hides "Contact Container"
 */
function hideAddContactCard() {
    document.getElementById("overlay_add_contact").style.display = "none";
}
/**
 * Function hides "MOBILE Contact Container"
 */
function hideMobileAddContactCard() {
    document.getElementById("overlay_add_contact_mobile").style.display = "none";
    document.getElementById("contacts-left").style.position = "initial";
}
/**
 * Function shows "Add Contact Container"
 */
function showAddContactCard() {
    document.getElementById('form_add_contact').reset();
    document.getElementById("addContactCard").style.display = "flex";
    document.getElementById("overlay_add_contact").style.display = "flex";
}
/**
 * Function shows "MOBILE Contact Container"
 */
function showMobileAddContactCard() {
    document.getElementById('form_add_contact_mobile').reset();
    document.getElementById("addContactCard_mobile").style.display = "flex";
    document.getElementById("overlay_add_contact_mobile").style.display = "flex";
    if (matchMedia('only screen and (max-width: 1050px)').matches) {
        document.getElementById("contacts-left").style.position = "fixed";
    }
}
/**
 * Function hides "Edit Contact Container"
 */
function hideEditContactCard() {
    document.getElementById("editContactCard").style.display = "none";
    document.getElementById("overlay_edit_contact").style.display = "none";
}
/**
 * Function shows "Edit Contact Container"
 * @param {number} i - This is the index of an existing contact
 */
function showEditContactCard(i) {
    document.getElementById("overlay_edit_contact").style.display = "flex";
    document.getElementById("editContactCard").style.display = "flex";
    if (matchMedia('only screen and (max-width: 1050px)').matches) {
        document.getElementById("contacts-left").style.position = "fixed";
    }
    renderEditContact(i);
}
/**
 * Function hides MOBILE Version of "Edit Contact Container"
 */
function hideMobileEditContactCard() {
    document.getElementById("editContactCard_mobile").style.display = "none";
    document.getElementById("overlay_edit_contact_mobile").style.display = "none";
    document.getElementById("contacts-left").style.position = "initial";
}
/**
 * Function shows MOBILE Version of "Edit Contact Container"
 * @param {number} i - This is the index of an existing contact
 */
function showMobileEditContactCard(i) {
    document.getElementById("overlay_edit_contact_mobile").style.display = "flex";
    document.getElementById("editContactCard_mobile").style.display = "flex";
    renderEditContactMobile(i);
}
/**
 * Function closes Overlay from "ADD-/EDIT Contact Container"
 */
function closeOverlay() {
    document.getElementById("overlay_add_contact").style.display = "none";
    document.getElementById("overlay_edit_contact").style.display = "none";
}
/**
 * Function closes Overlay from MOBILE version of "ADD-/EDIT Contact Container"
 */
function closeOverlayMobile() {
    document.getElementById("overlay_add_contact_mobile").style.display = "none";
    document.getElementById("overlay_edit_contact_mobile").style.display = "none";
    document.getElementById("contacts-left").style.position = "initial";
}
/**
 * Function whiches hides mobile detail view of a contact
 */
function hideMobileContactView() {
    document.getElementById("contacts-right-mobile").style.display = "none";
    document.getElementById("contactsboxsmall").style.display = "block";
    document.getElementById("contacts-left-wrapper").style.position = "initial";
    document.getElementById("contacts-left").style.position = "initial";
}
/**
 * Function renders a specific contact in the detail view
 * @param {number} i - This is the index of an existing contact
 */
function renderContact(i) {
    document.getElementById("contactsboxbig").style.display = "flex";
    let contactsboxbig = document.getElementById('contactsboxbig');
    contactsboxbig.innerHTML = '';
    contactsboxbig.innerHTML += renderContactTemplate (i);
}
/**
 * Function renders a specific contact in the MOBILE detail view
 * @param {number} i - This is the index of an existing contact
 */
function renderContactMobile(i) {
    if (matchMedia('only screen and (max-width: 1050px)').matches) {
        document.getElementById("contacts-left").style.position = "fixed";
        document.getElementById("addContactBtn").style.display = "none";
        document.getElementById("contacts-right-mobile").style.display = "block";
    }
    let contactsboxbigmobile = document.getElementById('contactsboxbigmobile');
    contactsboxbigmobile.innerHTML = '';
    contactsboxbigmobile.innerHTML += renderContactTemplateMobile (i);
}
/**
 * Asynchronous function renders all existing contacts
 */
async function renderContacts() {
    let contact = document.getElementById('contactsboxsmall');
    contact.innerHTML = '';
    await loadContacts();
    sortedalphabetically = sortContactsAlphabetically(contacts);
    extractInitials(sortedalphabetically);
    const letters = [];
    for (let i = 0; i < sortedalphabetically.length; i++) {
        const element = sortedalphabetically[i];
        let name = element['name'];
        let email = element['email'];
        let phone = element['phone'];
        let initial = initials[i];
        let color = element.color;
    const firstLetter = name.charAt(0).toUpperCase();
    if (!letters.includes(firstLetter)) {
        letters.push(firstLetter);
        createLetterContainer(contact, firstLetter);
}
    if (!color) {
        color = assignRandomColorToDiv(i);
        element.color = color;
    }
    createContactDiv(contact, i, firstLetter, color);
    }
}
/**
   * Function to create the letter container
   * @param {Array} contact - This parameter is a DOM element that is the parent element to which to add the letter container.
   * @param {Array} firstLetter - This parameter is a character (a single letter) that represents the first letter of a name
   */
function createLetterContainer(contact, firstLetter) {
    const containerId = `letter${firstLetter}`;
    const container = document.createElement('div');
    container.id = containerId;
    contact.appendChild(container);

    const letterContainer = document.createElement('div');
    letterContainer.className = 'letter-container';
    letterContainer.innerHTML = firstLetter;
    container.appendChild(letterContainer);

    const letterdevide = document.createElement('div');
    letterdevide.className = 'letter-devide';
    letterdevide.innerHTML = '<hr>';
    container.appendChild(letterdevide);
}
/**
 * Creates the contact div and appends it to the letter container.
 *
 * @param {HTMLElement} contact - The parent element to which the contact div will be added.
 * @param {number} i - The index of the current contact.
 * @param {string} firstLetter - The first letter of the name of the current contact.
 * @param {string} color - The color of the current contact.
 * @returns {void}
 */
function createContactDiv(contact, i, firstLetter, color) {
    const containerId = `letter${firstLetter}`;
    const container = document.getElementById(containerId);

    const contactDiv = document.createElement('div');
    contactDiv.onclick = function () {
        renderContact(i), renderContactMobile(i);
    };
    contactDiv.id = i;
    contactDiv.className = 'contact_small_content flex juststart align';
    contactDiv.innerHTML = renderContactsTemplate(i);
    container.appendChild(contactDiv);
    container.classList.add('letterbox');
}
/**
 * Function renders the "Edit Contact" container
 * @param {number} i - This is the index of an existing contact
 */
function renderEditContact(i) {
    editContactForm = document.getElementById('editContactForm');
    editContactForm.innerHTML = '';
    editContactForm.innerHTML += renderEditContactTemplate(i);
}
/**
 *  Function renders the MOBILE "Edit Contact" container
 * @param {number} i - This is the index of an existing contact
 */
function renderEditContactMobile(i) {
    editContactForm = document.getElementById('editContactForm_mobile');
    editContactForm.innerHTML = '';
    editContactForm.innerHTML +=renderEditContactMobileTemplate(i);    
}
/**
 * Function which deletes a specific contact in the array "contacts" at position [i].
 * @param {number} i - This is the index of an existing contact
 */
async function deleteContact(i) {
    if (contacts.length > 9) {
        contacts.splice(i, 1);
        deletedContactSuccessfully();
    } else {
        alert("For Testreasons we can´t delete a contact if there is only 10 or less available.");
    }
    sortedalphabetically = [];
    await refresh();
    hideEditContactCard();
    hideMobileContactView();
}
/**
 * Function shows a popup for a certain time "created contact successfully"
 */
function createdContactSuccessfully() {
    document.getElementById("addContactCard").style.display = "none";
    document.getElementById('success').style.display = '';
    document.getElementById('success').classList.add("animate-contact");
    setTimeout(() => {
        document.getElementById('success').style.display = 'none';}, 2000);
}
/**
 * Function shows a popup for a certain time "edited contact successfully"
 */
function editedContactSuccessfully() {
    document.getElementById('successEdit').style.display = '';
    document.getElementById('successEdit').classList.add("animate-contact");
    setTimeout(() => {document.getElementById('successEdit').style.display = 'none';}, 2000);
}
/**
 * Function shows a popup for a certain time "deleted contact successfully"
 */
function deletedContactSuccessfully() {
    document.getElementById('successDelete').style.display = '';
    document.getElementById('successDelete').classList.add("animate-contact");
    setTimeout(() => {document.getElementById('successDelete').style.display = 'none';}, 2000);
}
/**
 * Edit function Overwrites the values from the "contacts" array insofar as new data is entered
 * @param {number} i - This is the index of an existing contact 
 */
async function editContact(i) {
    const nameInput = document.getElementById('edit-name');
    const emailInput = document.getElementById('edit-email');
    const phoneInput = document.getElementById('edit-phone');
    const newName = nameInput.value;
    const newEmail = emailInput.value;
    const newPhone = phoneInput.value;
    // Update the existing entry in the array
    contacts[i].name = newName;
    contacts[i].email = newEmail;
    contacts[i].phone = newPhone;
    // Do more actions after array update
    document.getElementById("editContactCard").style.display = "none";
    await refresh();
    hideMobileContactView();
    editedContactSuccessfully();
}
/**
 * Extracts the uppercase initials from the array "contacts"['name']
 * @param {Array} sortedContacts - This is the sorted Contacts Array
 */
async function extractInitials(sortedContacts) {
    initials = sortedContacts.map(contact => {
        const name = contact.name;
        const matches = name.match(/[A-Z]/g);
        const initialsString = matches ? matches.join('') : '';
        return initialsString;
    });
    safeContacts();
}
/**
 * Function assignes random Color to Usercircle
 * @param {number} i - This is the index of an existing contact 
 * @returns - Returns the randomly generated color and assignes it to the Array "contacts"
 */
function assignRandomColorToDiv(i) {
    // Check if the contact already has a color assigned
    if (!contacts[i].color) {
        // Generate random HSL values with fixed saturation and lightness ranges
        var hue = Math.floor(Math.random() * 361); // Random hue between 0 and 360
        var saturation = Math.floor(Math.random() * 51) + 50; // Random saturation between 50 and 100
        var lightness = Math.floor(Math.random() * 26) + 35; // Random lightness between 35 and 60
        // Convert HSL values to a color string
        var color = "hsl(" + hue + ", " + saturation + "%, " + lightness + "%)";
        // Update the corresponding contact object in the "contacts" array with the color
        contacts[i].color = color;
    }
    // Return the assigned color
    return contacts[i].color;
    safeContacts();
}
/**
 * function alphabetically sorts the "contacts" array by the first capital letter of the "name" field and pushes it into a new array named "sortedalphabetically"
 * @param {Array} contacts - This is the "contacts Array"
 * @returns - Return -1 & 1 is used to alphabetically sort the contacts inside the "contacts" Array
 */
function sortContactsAlphabetically(contacts) {
    // Sort the contacts by the first capital letter of the name
    contacts.sort((a, b) => {
        const nameA = a.name.charAt(0).toUpperCase();
        const nameB = b.name.charAt(0).toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });
    // Add the sorted contacts to the "alphabeticallySorted" array
    contacts.forEach(contact => {
        sortedalphabetically.push(contact);
    });
    return sortedalphabetically;
}
/**
 * Function which continuously measures the browser width and fades in and out elements from 1050px wide
 */
function measureBrowserWidth() {
    const maxWidth = 1050;
    function checkWidth() {
        const browserWidth = window.innerWidth;
        if (browserWidth >= maxWidth) {
            hideMobileAddContactCard();
            hideMobileEditContactCard();
            hideMobileContactView();
            document.getElementById("contacts-right-wrapper").style.display = "initial";
        }
        if (browserWidth <= maxWidth) {
            hideAddContactCard();
            hideEditContactCard();
            document.getElementById("contacts-right-wrapper").style.display = "none";
        }
    }
    // Function to initialize the check and continuous monitoring
    function initWidthMonitoring() {
        checkWidth();
        window.addEventListener('resize', checkWidth);
    }
    // Start monitoring the browser width
    initWidthMonitoring();
}
/**
 * Function wich let you add task from rendered contacts
 * @param {number} i - This is the index of an existing contact 
 * @param {*} stati 
 */
function addNewTaskFromContacts(i, stati) {
    memberAssignedTo = [];
    colorsAssignedTo = [];
    assignedTo = [];
    assignedToInitials = [];
    assignedToColors = [];
    assignedTo.push(contacts[i]['name']);
    assignedToInitials.push(initials[i]);
    assignedToColors.push(contacts[i]['color']);
    pushColorToArrayAssignedTo();
    pushMemberToArrayAssignedTo();
    addNewTask(stati);
    renderMembers();
};