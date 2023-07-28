/**
 * Represents the current date.
 * 
 * @type {Date}
 */
let currentDate;

/**
 * An array to store tasks.
 * @type {Array}
 */
let tasks = [];

/**
 * An array to store subtasks.
 * @type {Array}
 */
let subtasks = [];

/**
 * An array to store assigned members.
 * @type {Array}
 */
let assignedTo = [];

/**
 * An array to store initials of logged-in users.
 * @type {Array}
 */
let logedInUserInitials2 = [];

/**
 * An array to store initials of assigned members.
 * @type {Array}
 */
let assignedToInitials = [];

/**
 * An array to store colors of assigned members.
 * @type {Array}
 */
let assignedToColors = [];

/**
 * An array to store contacts for the form.
 * @type {Array}
 */
let contactsForm = [];

/**
 * An array to store assigned members for a task.
 * @type {Array}
 */
let memberAssignedTo = [];

/**
 * An array to store colors of assigned members for a task.
 * @type {Array}
 */
let colorsAssignedTo = [];

/**
 * Function to add a task to the tasks array.
 * @param {string} title - The title of the task.
 * @param {string} description - The description of the task.
 * @param {string} category - The category of the task.
 * @param {Array} member - The members assigned to the task.
 * @param {string} dueDate - The due date of the task.
 * @param {string} prio - The priority of the task.
 * @param {Array} subtasks - The subtasks of the task.
 * @param {string} status - The status of the task.
 * @param {Array} colors - The colors of assigned members.
 * @param {Array} initialsMembers - The initials of assigned members.
 */
function pushTaskToArray(title, description, category, member, dueDate, prio, subtasks, status, colors, initialsMembers) {
    tasks.push({
        'title': title,
        'description': description,
        'category': category,
        'assignedTo': member,
        'dueDate': dueDate,
        'prio': prio,
        'subtasks': subtasks,
        'status': status,
        'initials': initialsMembers,
        'colors': colors,
    });
};


/**
 * Function to add members to the memberAssignedTo array.
 */
function pushMemberToArrayAssignedTo() {
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        memberAssignedTo.push(contact['name']);
    };
};


/**
 * Function to add colors to the colorsAssignedTo array.
 */
function pushColorToArrayAssignedTo() {
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        colorsAssignedTo.push(contact['color']);
    };
};


/**
 * Asynchronous function to save the tasks array to Local Storage.
 */
async function safeTasks() {
    await setItem('task_array', JSON.stringify(tasks));
};


/**
 * Asynchronous function to initialize adding a task.
 */
async function initAddTask() {
    await loadTasks();
    await loadContacts();
    await loadContactsToForm();
    pushMemberToArrayAssignedTo();
    pushColorToArrayAssignedTo();
    //loadUserData();
    setDateToday();
    setMinimumDateToday();
};


/**
 * Asynchronous function to load tasks from Local Storage.
 */
async function loadTasks() {
    tasks = JSON.parse(await getItem('task_array'));
};


/**
 * Function to load contacts into the form.
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


/**
 * Function to set the priority value.
 * @param {string} prio - The priority value.
 */
function setPrioValue(prio) {
    document.getElementById('prio_hidden').value = prio;
    let selectedButton = document.getElementById('prio_btn_' + prio);
    resetPrioValue();
    selectedButton.classList.add('prio-selected');
};


/**
 * Function to reset the priority value.
 */
function resetPrioValue() {
    document.getElementById('prio_btn_urgent').classList.remove('prio-selected');
    document.getElementById('prio_btn_medium').classList.remove('prio-selected');
    document.getElementById('prio_btn_low').classList.remove('prio-selected');
};


/**
 * Function to reset the subtask array and its container.
 */
function resetSubtaskArray() {
    subtasks = [];
    document.getElementById('container_subtasks').innerHTML = '';
};


/**
 * Function to add a new subtask.
 */
function addSubtask() {
    let subtask = document.getElementById('input_subtask');
    subtasks.push(subtask.value);
    subtask.value = '';
    renderSubtasks();
};


/**
 * Function to render the subtasks.
 */
function renderSubtasks() {
    let content = document.getElementById('container_subtasks');
    content.innerHTML = '';

    for (let i = 0; i < subtasks.length; i++) {
        const subtask = subtasks[i];
        content.innerHTML += templateSubtasks(i);
    };
};


/**
 * Function to delete a subtask.
 * @param {number} i - The index of the subtask to be deleted.
 */
function deleteSubtask(i) {
    subtasks.splice(i, 1);
    renderSubtasks();
};


/**
 * Function to add a task.
 * @param {string} setStatus - The status of the task.
 */
async function addTask(setStatus) {
    let title = document.getElementById('title_form').value;
    let description = document.getElementById('description_form').value;
    let category = document.getElementById('category_form').value;
    let member = assignedTo;
    let dueDate = document.getElementById('dueDate_form').value;
    let prio = document.getElementById('prio_hidden').value;
    let subtasks_task = subtasks;
    let status = setStatus;
    let colors = assignedToColors;
    let initialsMembers = assignedToInitials;

    if (title != '' && category != '' && assignedTo != '' && dueDate != '') {
        pushTaskToArray(title, description, category, member, dueDate, prio, subtasks_task, status, colors, initialsMembers);
        await safeTasks();
        document.getElementById('form_add_task').reset();
        resetPrioValue();
        resetSubtaskArray();
        resetAssignedTo();
        resetAssignedToArrays();
        taskAddedPopUp();
    };
};


/**
 * Function to add a member.
 */
function addMember() {
    let member = document.getElementById('assignedTo_form');

    for (let i = 0; i < memberAssignedTo.length; i++) {
        const assignedMember = memberAssignedTo[i];

        if (assignedTo.indexOf(member.value) == -1) {
            assignedTo.push(member.value);
            assignedToInitials.push(initials[memberAssignedTo.indexOf(member.value)]);
            assignedToColors.push(colorsAssignedTo[memberAssignedTo.indexOf(member.value)]);
        }
    };
    renderMembers()
};


/**
 * Function to render the selected members.
 */
function renderMembers() {
    let content = document.getElementById('selected_members_add_task');
    let deleteArea = document.getElementById('click_to_delete_text');
    content.innerHTML = '';

    if (assignedTo.length > 0) {
        deleteArea.innerHTML = /*html*/`
            <span>Click to delete</span>
        `;
    } else {
        deleteArea.innerHTML = '';
    };

    for (let i = 0; i < assignedTo.length; i++) {
        const member = assignedTo[i];
        content.innerHTML += templateMembers(i);
    };
};


/**
 * Function to reset the selected members.
 */
function resetAssignedTo() {
    assignedTo = [];
    assignedToColors = [];
    assignedToInitials = [];
    renderMembers();
};


/**
 * Function to reset the arrays for the selected members, subtasks, and priorities.
 */
function resetAssignedToArrays() {
    resetAssignedTo();
    resetSubtaskArray();
    resetPrioValue();
    resetAssignedToInitials();
    resetAssignedToColors();
};


/**
 * Function to reset the initialsMembers array.
 */
function resetAssignedToInitials() {
    assignedToInitials = [];
};


/**
 * Function to reset the colors array.
 */
function resetAssignedToColors() {
    assignedToColors = [];
};


/**
 * Function to delete a member.
 * @param {number} i - The index of the member to be deleted.
 */
function deleteMember(i) {
    assignedTo.splice(i, 1);
    assignedToColors.splice(i, 1);
    assignedToInitials.splice(i, 1);
    renderMembers();
    document.getElementById('assignedTo_form').value = '';
};


/**
 * Function to display a pop-up notification that the task has been added.
 */
function taskAddedPopUp() {
    let popup = document.getElementById('container_pop_up_add_task');
    popup.innerHTML = templatePopUpTaskAdded();
    popup.classList.remove('d-none');

    setTimeout(() => {
        popup.classList.add('d-none');
    }, 2000);
};


/**
 * Sets the `currentDate` variable to the current date in ISO 8601 format (YYYY-MM-DD).
 */
function setDateToday() {
    currentDate = new Date().toJSON().slice(0, 10);
};

/**
 * Sets the minimum date for the `dueDate_form` input field to the `currentDate`.
 */
function setMinimumDateToday() {
    let dateField = document.getElementById('dueDate_form');
    dateField.min = currentDate;
};