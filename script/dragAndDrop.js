/**
 * Sets the currently dragged element's index to 'j'.
 * @param {number} j - The index of the currently dragged task in the tasks array.
 */
function startDragging(j) {
    currentDraggedElement = j;
};


/**
 * Allows dropping elements during drag and drop operations.
 * @param {Event} ev - The drag event object.
 */
function allowDrop(ev) {
    ev.preventDefault();
};


/**
 * Moves the currently dragged task to the specified status and saves the updated tasks array.
 * @param {string} status - The status to which the task will be moved.
 */
function moveTaskTo(status) {
    tasks[currentDraggedElement]['status'] = status;
    safeTasks(); // Save the updated tasks array to local storage.
    document.getElementById('container_tasks_board_' + status).classList.remove('highlight');
    renderTasksBoard();
};


/**
 * Highlights the container for the specified status to indicate the potential drop target during drag and drop.
 * @param {string} status - The status for which the container should be highlighted.
 */
function highlight(status) {
    let container = document.getElementById('container_tasks_board_' + status);
    container.classList.add('highlight');
};


/**
 * Removes the highlight from the container for the specified status after the drag and drop operation.
 * @param {string} status - The status for which the container should have the highlight removed.
 */
function unsetHighlight(status) {
    let container = document.getElementById('container_tasks_board_' + status);
    container.classList.remove('highlight');
};