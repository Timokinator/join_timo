/**
 * Ein Array von Zeichenketten, das die IDs der Navigationsleisten (Navbar) auf der Webseite enthält.
 * Diese IDs werden verwendet, um auf die entsprechenden HTML-Elemente zuzugreifen.
 * @type {string[]}
 */
const ids_navbar = [
    'navbar_summary',
    'navbar_board',
    'navbar_add_task',
    'navbar_contacts',
    'navbar_legal',
    'navbar_summary_mobile',
    'navbar_board_mobile',
    'navbar_add_task_mobile',
    'navbar_contacts_mobile'
];


/**
 * Asynchronous function to include HTML content into specific elements that have the "w3-include-html" attribute.
 * This function fetches external HTML files and inserts their content into the selected elements.
 */
async function includeHtml() {
    // Select all elements with the "w3-include-html" attribute.
    let includeElements = document.querySelectorAll('[w3-include-html]');
    // Loop through all found elements with the "w3-include-html" attribute.
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        // Get the value of the "w3-include-html" attribute containing the path to the external HTML file.
        file = element.getAttribute("w3-include-html");
        // Fetch the external HTML file using the Fetch API.
        let resp = await fetch(file);
        // Check if the request was successful (status code 200).
        if (resp.ok) {
            // Insert the content of the external HTML file into the element.
            element.innerHTML = await resp.text();
        } else {
            // If the request fails, insert "Page not found" into the element.
            element.innerHTML = 'Page not found';
        };
    };
};


/**
 * Function to navigate to the summary page.
 */
function toSummary() {
    window.location.href = '../html/summary.html';
};


/**
 * Function to open the submenu based on the given "resolution" parameter (desktop or mobile).
 * @param {string} resolution - The resolution type: 'desktop' or 'mobile'.
 */
function openSubmenu(resolution) {
    let content = document.getElementById('container_submenu_user');
    content.classList.remove('d-none');

    if (resolution == 'desktop') {
        // If the resolution is "desktop", display the desktop submenu.
        content.innerHTML = renderSubmenuDesktop();

    } else if (resolution == 'mobile') {
        // If the resolution is "mobile", display the mobile submenu and close it after 2.5 seconds.
        content.innerHTML = renderSubmenuMobile();
        setTimeout(() => {
            closeSubmenu();
        }, 2500);
    };
};


/**
 * Function that creates and returns the HTML content for the desktop submenu.
 * @returns {string} - The HTML content for the desktop submenu.
 */
function renderSubmenuDesktop() {
    return /*html*/`
        <div onclick="closeSubmenu()" class="submenu">
            <a href="../html/index.html">Log out</a>
        </div >
    `;
};


/**
 * Function that creates and returns the HTML content for the mobile submenu.
 * @returns {string} - The HTML content for the mobile submenu.
 */
function renderSubmenuMobile() {
    return /*html*/`
        <div class="submenu">
            <a href="../html/help.html">Help</a>
            <a href="../html/legal_notice.html">Legal Notice</a>
            <a href="../html/index.html">Log out</a>
        </div >
    `;
};


/**
 * Function to close the submenu.
 */
function closeSubmenu() {
    let content = document.getElementById('container_submenu_user');
    content.classList.add('d-none');
};


/**
 * Markiert die Verknüpfung (Shortcut) in der Seitenleiste und auf mobilen Geräten.
 * Entfernt zuerst jegliche vorherige Markierung und fügt dann die Markierung hinzu.
 * @param {string} id - Die ID des Desktop-Elements der Verknüpfung.
 * @param {string} id_mobile - Die ID des mobilen Elements der Verknüpfung.
 */
function markShortcut(id, id_mobile) {
    setTimeout(() => {
        demarkShortcut();
        document.getElementById(id).classList.add("sidebar-marked");
        document.getElementById(id_mobile).classList.add("container-mobile-links-marked");
    }, 100);
};


/**
 * Entfernt jegliche Markierungen von Verknüpfungen in der Seitenleiste und auf mobilen Geräten.
 */
function demarkShortcut() {
    for (let i = 0; i < ids_navbar.length; i++) {
        const id = ids_navbar[i];
        const element = document.getElementById(id);
        if (element.classList.contains('sidebar-marked')) {
            element.classList.remove('sidebar-marked')
        };
        if (element.classList.contains('container-mobile-links-marked')) {
            element.classList.remove('container-mobile-links-marked')
        };
    };
};

