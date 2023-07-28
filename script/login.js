/**
 * Sets a timeout to remove the landing page image and redirect the user to the login page.
 * The timeout is set to 1000 milliseconds (1 second).
 * 
 * @constant {number} myTimeout - The identifier for the timeout set using setTimeout.
 */
const myTimeout = setTimeout(removeLandingImg, 1000);

/**
 * Removes the landing page image and redirects the user to the login page.
 * This function is called after the timeout (myTimeout) expires.
 * 
 * @returns {void}
 */
function removeLandingImg() {
    // Get the elements with the classes 'landingPageImg' and 'landingImg'
    const landingPageImg = document.querySelector('.landingPageImg');
    const landingImg = document.querySelector('.landingImg');

    // Add the 'd-none' class to hide the landing page image elements
    landingPageImg.classList.add('d-none');
    landingImg.classList.add('d-none');

    // Redirect the user to the login page
    window.location.href = '../html/login.html';
};