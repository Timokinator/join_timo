/**
 * An array containing different task statuses: todo, progress, awaiting, done.
 * @type {string[]}
 */
let stati = ['todo', 'progress', 'awaiting', 'done'];

/**
 * The currently dragged element.
 */
let currentDraggedElement;

/**
 * Initializes the board asynchronously.
 * Loads tasks from storage, renders tasks on the board, and loads contacts.
 * Pushes colors and member names to the assignedTo array.
 * @returns {Promise<void>}
 */
async function initBoard() {
    await loadTasks(); // Load tasks from storage.
    renderTasksBoard(); // Render tasks on the board.
    await loadContacts(); // Load contacts from storage.
    pushColorToArrayAssignedTo(); // Push colors to the assignedTo array.
    pushMemberToArrayAssignedTo(); // Push member names to the assignedTo array.
    await loadUserData();
    setDateToday();
};


/**
 * Renders tasks on the board based on the search query and task status.
 */
function renderTasksBoard() {
    // Get the value of the search input field.
    let search = document.getElementById('search_input_board').value.toLowerCase();

    // Loop through all task statuses (defined in the 'stati' array).
    for (let i = 0; i < stati.length; i++) {
        const status = stati[i]; // Get the current task status.

        // Get the container element for the current status on the board.
        let content = document.getElementById('container_tasks_board_' + status);
        content.innerHTML = ''; // Clear the container's content.

        // Check if there is no search query entered by the user.
        if (search == '') {
            // If there's no search query, render tasks without filtering.
            renderTasksBoardWithoutSearch(content, status);
        } else {
            // If there's a search query, render tasks with filtering based on the query.
            renderTasksBoardWithSearch(content, status, search);
        };
    };
};


/**
 * Renders tasks on the board based on the provided search query and status.
 * @param {Element} content - The container element to render the tasks in.
 * @param {string} status - The status of the tasks to display (e.g., 'todo', 'progress', etc.).
 * @param {string} search - The search query used to filter the tasks based on title or description.
 */
function renderTasksBoardWithSearch(content, status, search) {
    for (let j = 0; j < tasks.length; j++) {
        const task = tasks[j];
        if (task['status'] == status) {
            // Check if the current task's title or description includes the search query (case-insensitive).
            if (task['title'].toLowerCase().includes(search) || task['description'].toLowerCase().includes(search)) {
                // If the search query matches, render the single task.
                content.innerHTML += templateSingleTask(task, j);
                // Add the member assigned to the task and their initials.
                addMemberToSingleTask(task, j);
                // Add the priority (prio) indicator to the single task.
                addPrioToSingleTask(task, j);
            };
        };
    };
};


/**
 * Renders all tasks belonging to a specific status on the board without any search filtering.
 * @param {Element} content - The container element for the current status on the board.
 * @param {string} status - The task status to be rendered.
 */
function renderTasksBoardWithoutSearch(content, status) {
    // Loop through all tasks.
    for (let j = 0; j < tasks.length; j++) {
        const task = tasks[j];
        // Check if the task belongs to the specified status.
        if (task['status'] == status) {
            // If the task belongs to the status, render the task on the board.
            content.innerHTML += templateSingleTask(task, j);
            addMemberToSingleTask(task, j);
            addPrioToSingleTask(task, j);
        };
    };
};


/**
 * Asynchronously changes the status of a task and updates the board.
 *
 * @param {number} j - The index of the task in the tasks array.
 * @param {string} direction - The direction of status change ('up' or 'down').
 * @returns {Promise<void>} A Promise that resolves after the task status has been updated and the board is reinitialized.
 */
async function changeStatusClick(j, direction) {
    let oldStatus = tasks[j]['status'];
    let newStatus;
    if (oldStatus == 'todo') {
        newStatus = changeStatusFromTodo(direction);
    } else if (oldStatus == 'progress') {
        newStatus = changeStatusFromProgress(direction);
    } else if (oldStatus == 'awaiting') {
        newStatus = changeStatusFromAwaiting(direction);
    } else if (oldStatus == 'done') {
        newStatus = changeStatusFromDone(direction);
    };
    tasks[j]['status'] = newStatus;
    await safeTasks(); // Save the updated tasks to storage.
    initBoard(); // Reinitialize the board to reflect the changes.
};


/**
 * Ändert den Status eines Tasks von "To-Do" zu "In Bearbeitung" oder umgekehrt, abhängig von der Richtung.
 * @param {string} direction - Die Richtung, in die der Status geändert werden soll ('up' für "To-Do" zu "In Bearbeitung", 'down' für "In Bearbeitung" zu "To-Do").
 * @returns {string} Der neue Status des Tasks ('todo' oder 'progress').
 */
function changeStatusFromTodo(direction) {
    let newStatus;
    if (direction == 'up') {
        newStatus = 'progress';
    } else {
        newStatus = 'todo';
    };
    return newStatus;
};


/**
 * Ändert den Status eines Tasks von "In Bearbeitung" zu "Warten" oder umgekehrt, abhängig von der Richtung.
 * @param {string} direction - Die Richtung, in die der Status geändert werden soll ('up' für "In Bearbeitung" zu "Warten", 'down' für "Warten" zu "In Bearbeitung").
 * @returns {string} Der neue Status des Tasks ('progress' oder 'awaiting').
 */
function changeStatusFromProgress(direction) {
    let newStatus;
    if (direction == 'up') {
        newStatus = 'awaiting';
    } else {
        newStatus = 'progress';
    };
    return newStatus;
};


/**
 * Ändert den Status eines Tasks von "Warten" zu "Erledigt" oder umgekehrt, abhängig von der Richtung.
 * @param {string} direction - Die Richtung, in die der Status geändert werden soll ('up' für "Warten" zu "Erledigt", 'down' für "Erledigt" zu "Warten").
 * @returns {string} Der neue Status des Tasks ('awaiting' oder 'done').
 */
function changeStatusFromAwaiting(direction) {
    let newStatus;
    if (direction == 'up') {
        newStatus = 'done';
    } else {
        newStatus = 'awaiting';
    };
    return newStatus;
};


/**
 * Ändert den Status eines Tasks von "Erledigt" zu "Warten" oder umgekehrt, abhängig von der Richtung.
 * @param {string} direction - Die Richtung, in die der Status geändert werden soll ('up' für "Erledigt" zu "Warten", 'down' für "Warten" zu "Erledigt").
 * @returns {string} Der neue Status des Tasks ('done' oder 'awaiting').
 */
function changeStatusFromDone(direction) {
    let newStatus;
    if (direction == 'up') {
        newStatus = 'awaiting';
    } else {
        newStatus = 'done';
    };
    return newStatus;
};


/**
 * Adds member information to a single task on the board.
 *
 * @param {object} task - The task object to which members will be added.
 * @param {number} j - The index of the task in the tasks array.
 */
function addMemberToSingleTask(task, j) {
    let content = document.getElementById('single_task_member' + j);
    content.innerHTML = '';

    // Loop through all assigned members for the task.
    for (let k = 0; k < task['assignedTo'].length; k++) {
        const member = task['assignedTo'][k];
        // Add a member element with their initials and background color to the task.
        content.innerHTML += /*html*/`
            <div style="background-color: ${task['colors'][k]}" class="single-task-member-member">${task['initials'][k]}</div>
        `;
    };
};


/**
 * Fügt eine Prioritätsanzeige zu einer einzelnen Aufgabe hinzu.
 * @param {Object} task - Die Aufgabe, der die Prioritätsanzeige hinzugefügt werden soll.
 * @param {number} j - Ein numerischer Wert zur Identifizierung der Aufgabe.
 */
function addPrioToSingleTask(task, j) {
    /**
     * Das HTML-Element, in das die Prioritätsanzeige eingefügt wird.
     * @type {HTMLElement}
     */
    let content = document.getElementById('single-task-prio' + j);

    /**
     * Die Priorität der Aufgabe.
     * @type {string}
     */
    let prio = task['prio'];

    // Lösche den aktuellen Inhalt des Elements
    content.innerHTML = '';

    // Füge das Prioritätsbild basierend auf der Priorität der Aufgabe hinzu
    content.innerHTML += /*html*/`
        <img src="../assets/icons/icon_prio_${prio}.svg" alt="">
    `;
};


/**
 * Opens the task details view with the given task index (j).
 * Adds the ability to close the details view using the escape key.
 *
 * @param {number} j - The index of the task in the tasks array.
 */
function openTask(j) {
    addCloseWithEscape();
    const containerSlideOut = document.getElementById('container_single_task_details');
    containerSlideOut.classList.remove('slide-out');
    const content = document.getElementById('container_single_task_details');
    content.innerHTML = '';
    content.classList.remove('d-none');
    content.classList.add('slide-in');
    content.innerHTML = templateDetailsTask(j);
    addPrioToDetailTask(j);
    addMemberTaskDetail(j);
    addSubtasksTaskDetail(j);
};


/**
 * Closes the task details view.
 * Invokes slideOutTask() to animate the slide-out effect and clears the task details content after 400ms.
 */
function closeTaskDetail() {
    slideOutTask();
    setTimeout(function () { clearHtmlSingleTask() }, 400);
    initBoard();
};


/**
 * Clears the content and hides the task details view.
 */
function clearHtmlSingleTask() {
    const content = document.getElementById('container_single_task_details');
    content.classList.add('d-none');
    content.innerHTML = '';
};


/**
 * Animates the slide-out effect for the task details view.
 */
function slideOutTask() {
    const containerSlideOut = document.getElementById('container_single_task_details');
    containerSlideOut.classList.add('slide-out');
};


/**
 * Adds the ability to close the task details view using the escape key.
 */
function addCloseWithEscape() {
    window.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            closeTaskDetail();
        }
    });
};


/**
 * Prevents the task details view from closing when clicking inside it.
 * @param {Event} event - The click event object.
 */
function doNotClose(event) {
    event.stopPropagation();
};


/**
 * Adds the priority (prio) indicator to the task details view for the specified task.
 *
 * @param {number} j - The index of the task in the tasks array.
 */
function addPrioToDetailTask(j) {
    let content = document.getElementById('detail_task_prio_img');
    content.innerHTML = '';
    if (tasks[j]['prio'] == 'urgent') {
        content.innerHTML += templateDetailTaskPrioUrgent(j);
    } else if (tasks[j]['prio'] == 'medium') {
        content.innerHTML += templateDetailTaskPrioMedium(j);
    } else if (tasks[j]['prio'] == 'low') {
        content.innerHTML += templateDetailTaskPrioLow(j);
    };
};


/**
 * Adds the member(s) assigned to the task in the task details view.
 *
 * @param {number} j - The index of the task in the tasks array.
 */
function addMemberTaskDetail(j) {
    let content = document.getElementById('detail_task_member');
    content.innerHTML = '';
    for (let k = 0; k < tasks[j]['assignedTo'].length; k++) {
        const member = tasks[j]['assignedTo'][k];
        content.innerHTML += templateMemberTaskDetail(member, k, j);
    };
};


/**
 * Add subtasks to the task detail view.
 *
 * @param {number} j - The index of the task in the 'tasks' array.
 */
function addSubtasksTaskDetail(j) {
    let content = document.getElementById('detail_task_subtasks');
    let status;

    content.innerHTML = '';

    // Loop through each subtask of the task (indexed by 'k')
    for (let k = 0; k < tasks[j]['subtasks'].length; k++) {
        const subtask = tasks[j]['subtasks'][k];
        status = 'ungehakt';
        // Generate the HTML template for displaying the subtask using the 'templateSubtasksTaskDetail' function
        content.innerHTML += templateSubtasksTaskDetail(subtask, k, j, status);
    };

    for (let k = 0; k < tasks[j]['subtasks-done'].length; k++) {
        const subtask = tasks[j]['subtasks-done'][k];
        status = 'gehakt';
        // Generate the HTML template for displaying the subtask using the 'templateSubtasksTaskDetail' function
        content.innerHTML += templateSubtasksTaskDetail(subtask, k, j, status);
    };
};


async function changeStatusSubtask(task, subtask, status) {
    if (status == 0) {
        tasks[task]['subtasks-done'].push(tasks[task]['subtasks'][subtask]);
        tasks[task]['subtasks'].splice(subtask,1)
    };
    if (status == 1) {
        tasks[task]['subtasks'].push(tasks[task]['subtasks-done'][subtask]);
        tasks[task]['subtasks-done'].splice(subtask,1)
    };
    await safeTasks();
    addSubtasksTaskDetail(task);
};


/**
 * Deletes the task at the specified index (j).
 * Saves the updated tasks array to the local storage, closes the task details view, and reinitializes the board.
 *
 * @param {number} j - The index of the task in the tasks array.
 */
async function deleteTask(j) {
    tasks.splice(j, 1);
    await safeTasks(); // Save the updated tasks array to the local storage.
    closeTaskDetail(); // Close the task details view.
    initBoard(); // Reinitialize the board.
};


/**
 * Displays the form to add a new task on the board.
 * Adds the ability to close the form using the escape key.
 *
 * @param {string[]} stati - An array containing different task statuses: todo, progress, awaiting, done.
 */
function addNewTask(stati) {
    let content = document.getElementById('container_add_new_task_from_button');
    content.innerHTML = '';
    content.classList.remove('d-none');
    addCloseTaskWithEscape();
    content.innerHTML = templateFormAddTaskBoard(stati);
    loadContactsToForm();
    setMinimumDateToday();
};


/**
 * Adds the ability to close the task form using the escape key.
 */
function addCloseTaskWithEscape() {
    window.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            closeAddTaskBoard();
        }
    });
};


/**
 * Closes the form to add a new task on the board.
 * Hides the form and resets its content.
 */
function closeAddTaskBoard() {
    let content = document.getElementById('container_add_new_task_from_button');
    content.classList.add('d-none');
    resetForm();
};


/**
 * Resets the add task form by clearing the input fields, resetting priority value,
 * subtask array, and assignedTo field.
 */
function resetForm() {
    document.getElementById('form_add_task').reset();
    resetPrioValue();
    resetSubtaskArray();
    resetAssignedTo();
};


/**
 * Adds a new task to the board and closes the add task form.
 * Initializes the board after adding the task if the current page is the board.
 * @param {string} status - The status of the task to be added.
 */
async function addTaskAndCloseForm(status) {
    await addTask(status);
    setTimeout(function () { closeAddTaskBoard() }, 200);
    if (window.location.pathname.includes('board')) {
        location.reload();
    };

};

/**
 * Searches for tasks on the board based on the search query and task status.
 */
function searchTaskFromBoard() {
    let search = document.getElementById('search_input_board').value;
    renderTasksBoard();
};


/**
 * Loads contacts into the add task form's "Assigned to" dropdown.
 */
function loadContactsToForm() {
    let content = document.getElementById('assignedTo_form');
    content.innerHTML = /*html*/`
     <option value="" disabled selected>Select contacts</option>   
    `;
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        content.innerHTML += templateMembersChose(contact);
    };
};