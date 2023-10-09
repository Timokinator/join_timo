/**
 * Closes the edit task form.
 */
function closeEditTask() {
    let content = document.getElementById('container_background_edit_task');
    content.classList.add('d-none');
    initBoard();
};


/**
 * Edits the task with the specified index (j) and opens the edit task form.
 * Closes the task details view before opening the edit task form.
 * @param {number} j - The index of the task in the tasks array to be edited.
 */
async function editTask(j) {
    closeTaskDetail();
    await loadTasks();
    editTaskAddCloseWithEscape();
    let content = document.getElementById('container_background_edit_task');
    content.classList.remove('d-none');
    content.innerHTML = '';
    content.innerHTML = templateEditTask(j);
    loadContactsToForm();
    renderMemberEditTask(j);
    setPrioEditTask(j);
    loadSubtasksEditTask(j);
    setMinimumDateToday();
};


/**
 * Lädt Unteraufgaben für die Aufgabe mit Index 'j' in das Bearbeitungsformular der Aufgabe.
 *
 * @param {number} j - Der Index der Aufgabe im tasks-Array.
 */
function loadSubtasksEditTask(j) {
    let content = document.getElementById('container_subtasks');
    content.innerHTML = '';
    for (let i = 0; i < tasks[j]['subtasks'].length; i++) {
        const subtask = tasks[j]['subtasks'][i];
        let status = 'ungehakt';
        content.innerHTML += templateSubtasksEditTask(j, i, status);
    }

    for (let i = 0; i < tasks[j]['subtasks-done'].length; i++) {
        const subtask = tasks[j]['subtasks-done'][i];
        let status = 'gehakt';
        content.innerHTML += templateSubtasksEditTask(j, i, status);
    };
};



/**
 * Deletes the subtask at index 'i' from the task with index 'j' and reloads the subtasks in the edit task form.
 * @param {number} j - The index of the task in the tasks array.
 * @param {number} i - The index of the subtask to be deleted in the subtasks array.
 */
function deleteSubtaskEditTask(j, i, status) {
    let array;
    if (status == 0) {
        array = 'subtasks'
    } else if (status == 1) {
        array = 'subtasks-done'
    };
    tasks[j][array].splice(i, 1);
    loadSubtasksEditTask(j);
};


/**
 * Ändert den Status einer Unteraufgabe in einer Aufgabe und aktualisiert die Aufgabenliste.
 *
 * @param {number} task - Der Index der Aufgabe, zu der die Unteraufgabe gehört.
 * @param {number} subtask - Der Index der zu ändernden Unteraufgabe.
 * @param {number} status - Der neue Status der Unteraufgabe (0 für erledigt, 1 für ausstehend).
 */
async function changeStatusSubtaskEditTask(task, subtask, status) {
    if (status == 0) {
        tasks[task]['subtasks-done'].push(tasks[task]['subtasks'][subtask]);
        tasks[task]['subtasks'].splice(subtask, 1);
    }
    if (status == 1) {
        tasks[task]['subtasks'].push(tasks[task]['subtasks-done'][subtask]);
        tasks[task]['subtasks-done'].splice(subtask, 1);
    }
    loadSubtasksEditTask(task);
};


/**
 * Adds a new subtask to the task with index 'j' and updates the subtask container in the edit task form.
 * @param {number} j - The index of the task in the tasks array.
 */
function addSubtaskEditTask(j) {
    let subtask = document.getElementById('input_subtask');
    tasks[j]['subtasks'].push(subtask.value);
    subtask.value = '';
    renderSubtasksEditTask(j);
};


/**
 * Renders the subtasks of the task with index 'j' in the edit task form.
 * @param {number} j - The index of the task in the tasks array.
 */
function renderSubtasksEditTask(j) {
    let content = document.getElementById('container_subtasks');
    content.innerHTML = '';
    for (let i = 0; i < tasks[j]['subtasks'].length; i++) {
        const subtask = tasks[j]['subtasks'][i];
        content.innerHTML += templateSubtasksEditTask(j, i);
    };
};


/**
 * Sets the priority button for the task with index 'j' as selected in the edit task form.
 * @param {number} j - The index of the task in the tasks array.
 */
function setPrioEditTask(j) {
    let selectedPrio = tasks[j]['prio'];
    let prioToSelect = document.getElementById('prio_btn_' + selectedPrio);
    prioToSelect.classList.add('prio-selected');
};


/**
 * Renders the selected members for the task with index 'j' in the edit task form.
 * @param {number} j - The index of the task in the tasks array.
 */
function renderMemberEditTask(j) {
    let content = document.getElementById('selected_members_add_task');
    let deleteArea = document.getElementById('click_to_delete_text');
    content.innerHTML = '';
    if (tasks[j]['assignedTo'].length > 0) {
        deleteArea.innerHTML = /*html*/`
            <span>Click to delete (one must remain!)</span>
        `;
    } else {
        deleteArea.innerHTML = '';
    };
    for (let i = 0; i < tasks[j]['assignedTo'].length; i++) {
        const member = tasks[j]['assignedTo'][i];
        content.innerHTML += templateMembersEditTask(i, j);
    };
};


/**
 * Deletes the selected member at index 'i' from the task with index 'j'
 * and reloads the selected members in the edit task form.
 * @param {number} i - The index of the member in the assignedTo array to be deleted.
 * @param {number} j - The index of the task in the tasks array.
 */
function deleteMemberEditTask(i, j) {
    if (tasks[j]['assignedTo'].length > 1) {
        tasks[j]['assignedTo'].splice(i, 1);
        tasks[j]['colors'].splice(i, 1);
        tasks[j]['initials'].splice(i, 1);
    };
    renderMemberEditTask(j);
    document.getElementById('assignedTo_form').value = '';
};


/**
 * Adds the selected member to the task with index 'j' in the edit task form.
 * @param {number} j - The index of the task in the tasks array.
 */
function addMemberEditTask(j) {
    let member = document.getElementById('assignedTo_form');
    for (let i = 0; i < tasks[j]['assignedTo'].length; i++) { // todo mit array
        const assignedMember = memberAssignedTo[i];

        if (tasks[j]['assignedTo'].indexOf(member.value) == -1) {
            tasks[j]['assignedTo'].push(member.value);
            tasks[j]['initials'].push(initials[memberAssignedTo.indexOf(member.value)]);
            tasks[j]['colors'].push(colorsAssignedTo[memberAssignedTo.indexOf(member.value)]);
        };
    };
    renderMemberEditTask(j);
};


/**
 * Adds the possibility to close the edit task form with the escape key.
 */
function editTaskAddCloseWithEscape() {
    window.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            closeEditTask();
        };
    });
};


/**
 * Sets the priority value of a task and updates the selected button style.
 * @param {number} j - The index of the task in the tasks array.
 * @param {string} prio - The priority value to set for the task (e.g., 'urgent', 'medium', 'low').
 */
function setPrioValueEditTask(j, prio) {
    tasks[j]['prio'] = prio;
    let selectedButton = document.getElementById('prio_btn_' + prio);
    resetPrioValue();
    selectedButton.classList.add('prio-selected');
};


/**
 * Safely saves changes made to a task in the edit task form.
 * @param {number} j - The index of the task in the tasks array.
 */
async function safeChangesEditTask(j) {
    let category = document.getElementById('category_form');
    let description = document.getElementById('description_form');
    let dueDate = document.getElementById('dueDate_form');
    let title = document.getElementById('title_form');
    tasks[j]['category'] = category.value;
    tasks[j]['description'] = description.value;
    tasks[j]['dueDate'] = dueDate.value;
    tasks[j]['title'] = title.value;
    await safeTasks();
    closeEditTask();
    initBoard();
};