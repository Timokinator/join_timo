/**
 * Template for the Function which returns HTML Block to render specific Contact
 * @param {number} i - This is the index of an existing contact
 */
function renderContactTemplate (i) {
    return /*html*/`
    <div class="contact_big">
    <div class="flex align fdr">
        <div style="background-color:${contacts[i]['color']}" id="usercircle${i}" class="usercircle">${initials[i]}</div>
            <div class="flex juststart alignstart fdc gap5">          
                <div class="contactNameBig FS47-500">${contacts[i]['name']}</div>
                <div onclick="addNewTaskFromContacts(${i},'todo')" class="FS16-400 lightblue cursor">+ Add Task</div>
            </div>
    </div>
    <div class="flex align fdr">
        <div class="flex align fdr gap59">
            <div class="FS21-400">Contact Information</div>
            <div class="flex align fdr gap6 cursor">
                <img onclick="showEditContactCard (${i})" src="../assets/icons/icon_edit_contact_pencil.svg">
                <div onclick="showEditContactCard (${i})" class="FS16-400">Edit Contact</div>
            </div>
        </div>
    </div>
    <p class="FS16-700">Email</p>
    <a class="FS16-400 lightblue" href="mailto:${contacts[i]['email']}">${contacts[i]['email']}</a>
    <p class="FS16-700">Phone</p>
    <div class="FS16-400">${contacts[i]['phone']}</div>
`;
};

/**
 * Template for the Function which returns HTML Block to render specific Contact of the mobile view
 * @param {number} i - This is the index of an existing contact
 */
function renderContactTemplateMobile (i) {
    return /*html*/`
    <div class="contact_big_mobile flex juststart fdc">
            <div class="flex align fdr">
                <div style="background-color:${contacts[i]['color']}" id="usercircle${i}" class="usercircle_Mobile">${initials[i]}</div>
                    <div class="flex juststart alignstart fdc gap5">          
                        <div class="FS36-400">${contacts[i]['name']}</div>
                        <div onclick="addNewTaskFromContacts(${i},'todo')" class="FS16-400 lightblue cursor">+ Add Task</div>
                    </div>
            </div>
            <div class="flex align fdr">
                <div class="flex align fdr gap59">
                    <div class="FS20-400">Contact Information</div>
                </div>
            </div>
            <p class="FS16-700">Email</p>
            <a class="FS16-400 lightblue" href="mailto:${contacts[i]['email']}">${contacts[i]['email']}</a>
            <p class="FS16-700">Phone</p>
            <div class="FS16-400">${contacts[i]['phone']}</div>
            <div class="icon_container">
                <div onclick="deleteContact(${i})" class="trash-container"><img class="icon_mobile_Trashcan"src="../assets/icons/icon_contact_trashcan.svg"></div>
                <div onclick="showMobileEditContactCard(${i})" class="pencil-container"><img class="icon_mobile_Pencil" src="../assets/icons/icon_contact_pencil_white.svg"><div>
            </div>
        `;
};

/**
 * Template for the Function which renders the "Edit Contact" container
 * @param {number} i - This is the index of an existing contact
 */
function renderEditContactTemplate(i) {
    editContactRight_left = document.getElementById('editContactRight_left');
    editContactRight_left.innerHTML = '';
    editContactRight_left.innerHTML += `<div style="background-color:${contacts[i]['color']}" id="usercircle${i}" class="usercircle_edit_contact">${initials[i]}</div>`;
    return /*html*/`
    <img onclick="hideEditContactCard();closeOverlay();" class="close_symbol_edit" src="../assets/icons/icon_add_contact_X.svg">
                    <form id="form_edit_contact" class="editContactRight_right" onsubmit="editContact(${i});closeOverlay();return false;">
                        <input class="inputDesktop" id="edit-name" type="text" value="${contacts[i]['name']}" required pattern="[A-Z][a-zA-Z ]*">
                        <input class="inputDesktop" id="edit-email" type="email" value="${contacts[i]['email']}" required>
                        <input class="inputDesktop" id="edit-phone" type="tel"  value="${contacts[i]['phone']}" required pattern="[0-9]+">
                            <div class="flex">
                                <button type="button" onclick="deleteContact(${i});closeOverlay()" class="delete_btn">Delete</button>
                                <button type="submit" class="save_btn">Save</button>
                            </div>
                            <img class="icon-name-add-contact" src="../assets/icons/icon_add_contact_user.svg" alt="">
                            <img class="icon-email-add-contact" src="../assets/icons/icon_add_contact_mail.svg" alt="">
                            <img class="icon-phone-add-contact" src="../assets/icons/icon_add_contact_phone.svg" alt="">
                    </form>
    `;
};

/**
 * Template for the Function which renders the MOBILE "Edit Contact" container
 * @param {number} i - This is the index of an existing contact
 */
function renderEditContactMobileTemplate(i) {
    editContactRight_left = document.getElementById('editContactRight_mobile_usercircle');
    editContactRight_left.innerHTML = '';
    editContactRight_left.innerHTML += `<div style="background-color:${contacts[i]['color']}" id="usercircle${i}" class="usercircle_edit_contact addContactImg">${initials[i]}</div>`;
    return /*html*/`
    <form id="form_edit_contact_mobile" class="editContactBottomMobileDown" onsubmit="editContact(${i});hideMobileEditContactCard();return false;">
        <input class="inputMobile" id="edit-name" type="text" value="${contacts[i]['name']}" required pattern="[A-Z][a-zA-Z ]*">
        <input class="inputMobile" id="edit-email" type="email" value="${contacts[i]['email']}" required>
        <input class="inputMobile" id="edit-phone" type="tel"  value="${contacts[i]['phone']}" required pattern="[0-9]+">
            <div class="btn_mobile_edit_contact">
                <button onclick="deleteContact(${i});closeOverlayMobile()" class="delete_btn">Delete</button>
                <button type="submit" class="save_btn">Save</button>
            </div>
            <img class="icon-name-edit-contact-mobile" src="../assets/icons/icon_add_contact_user.svg" alt="">
            <img class="icon-email-edit-contact-mobile" src="../assets/icons/icon_add_contact_mail.svg" alt="">
            <img class="icon-phone-edit-contact-mobile" src="../assets/icons/icon_add_contact_phone.svg" alt="">
    </form>
`;
};

/**
 * Template for Asynchronous function renders all existing contacts
 */
function renderContactsTemplate (i) {
    let color = sortedalphabetically[i].color;
    if (!color) {
        color = assignRandomColorToDiv(i);
        sortedalphabetically[i].color = color;
    }
    return /*html*/`
    <div style="background-color:${sortedalphabetically[i].color}" id="usercircle${i}" class="usercircle_small">${initials[i]}</div>
    <div>
        <div class="FS21-400">${sortedalphabetically[i]['name']}</div>
        <div>
        <a class="FS16-400" href="mailto:${sortedalphabetically[i]['email']}">${sortedalphabetically[i]['email']}</a>
        </div>
    </div>`;
};