/* templates from addTask.js */

/**
 * Function to create the HTML template for the members' options in the form.
 * @param {Object} contact - The contact object.
 * @returns {string} - The HTML template for the member option.
 */
function templateMembersChose(contact) {
    return /*html*/`
        <option value="${contact['name']}">${contact['name']}</option>
    `;
};


/**
 * Function to create the HTML template for a subtask element.
 * @param {number} i - The index of the subtask.
 * @returns {string} - The HTML template for the subtask element.
 */
function templateSubtasks(i) {
    return /*html*/`
        <div class="text-subtask">
            ${subtasks[i]}
            <img onclick="deleteSubtask(${i})" class="hover" id="delete_btn_subtasks${i}" src="../assets/icons/trash.png" alt="">
        </div>
    `;
};


/**
 * Function to create the HTML template for the selected members.
 * @param {number} i - The index of the selected member.
 * @returns {string} - The HTML template for the selected member element.
 */
function templateMembers(i) {
    return /*html*/`
      <div style="background-color: ${assignedToColors[i]}" onclick=deleteMember(${i}) class="member-add-task">
        <span>${assignedToInitials[i]}</span>
      </div>
    `;
};


/**
 * Function to create the HTML template for the pop-up notification.
 * @returns {string} - The HTML template for the pop-up notification.
 */
function templatePopUpTaskAdded() {
    return /*html*/`
        <div class="pop-up-task-added" id="pop_up_task_added">
                <span class="pop-up-task-added-text">Task added to board</span>
                <img class="pop-up-task-added-img" src="../assets/icons/icon_sidebar_board.svg" alt="">
        </div>
    `;
};


/* templates from board.js */


/**
 * Generates the HTML template for rendering a single task on the board.
 * @param {Object} task - The task object containing task information.
 * @param {number} j - The index of the task in the tasks array.
 * @returns {string} The HTML template for the single task.
 */
function templateSingleTask(task, j) {
    return /*html*/`
        <div draggable="true" class="single-task" onclick="openTask(${j})" ondragstart="startDragging(${j})">
            <div class="${task['category']} category">
                ${task['category'].slice(0, 1).toUpperCase()}${task['category'].slice(1)}
            </div>

            <div class="single-task-title">
                ${task['title']}
            </div>

            <div class="single-task-description">
                ${task['description']}
            </div>

            <div class="single-task-subtasks">
                <div class="progress width-50" role="progressbar" aria-label="Basic example" aria-valuenow="${task['subtasks'].length}/${task['subtasks'].length}" aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar" style="width: ${task['subtasks'].length / task['subtasks'].length * 100}%">
                    </div>
                </div>
                <span class="text-subtasks">${task['subtasks'].length} / ${task['subtasks'].length} Subtasks</span>
                
            </div>

            <div class="container-member-prio">
                <div class="single-task-member" id="single_task_member${j}"></div>
                <div class="single-task-prio" id="single-task-prio${j}"></div>
            </div>

            <div onclick="doNotClose(event)" class="change-status-mobile">
                <span>Change status</span>
                <img onclick="changeStatusClick(${j},'up')" class="img-btn-status-up" src="../assets/icons/icon_arrow_down.png" alt="">
                <img onclick="changeStatusClick(${j},'down')" class="img-btn-status-down" src="../assets/icons/icon_arrow_down.png" alt="">
            </div>
        </div>
    `;
};


/**
 * Generates the HTML template for rendering the task details view.
 *
 * @param {number} j - The index of the task in the tasks array.
 * @returns {string} The HTML template for the task details view.
 */
function templateDetailsTask(j) {
    return /*html*/`
        <!-- HTML template for task details view -->
        <div onclick="doNotClose(event)" class="container-single-task">
            <div class="${tasks[j]['category']} category detail-task-category">
                ${tasks[j]['category'].slice(0, 1).toUpperCase()}${tasks[j]['category'].slice(1)}
            </div>

            <div class="detail-task-title">
                ${tasks[j]['title']}
            </div>

            <div class="detail-task-description">
                ${tasks[j]['description']}
            </div>

            <div class="detail-task-date">
                <span>Due Date:</span>
                ${tasks[j]['dueDate']}
            </div>

            <div class="detail-task-prio">
                <span>Priority:</span>
                <div id="detail_task_prio_img"></div>
            </div>


            <div class="detail-task-subtasks">
                <span>Subtasks</span>
                <div class="detail-task-subtasks-container" id="detail_task_subtasks"></div>
            </div>

            <div class="detail-task-member">
                <span>Assigned to:</span>
                <div class="detail-task-member-container" id="detail_task_member"></div>                
            </div>

            <img class="detail-task-close-btn" onclick="closeTaskDetail()" src="../assets/icons/icon_cross_dark.svg" alt="">
            <div class="container-container-delete-and-edit-task">
                <div class="container-delete-and-edit-task">
                    <div class="container-delete-task">
                        <img onclick="deleteTask(${j})" src="../assets/icons/icon_trash_dark.svg" alt="">
                    </div>

                    <div class="container-edit-task">
                        <img onclick="editTask(${j})" src="../assets/icons/icon_pencil.svg" alt="">
                    </div>


                </div>
            </div>
        </div>
    `;
};


/**
 * Generates the HTML template for the form to add a new task on the board.
 * @param {string[]} stati - An array containing different task statuses: todo, progress, awaiting, done.
 * @returns {string} The HTML template for the add task form.
 */
function templateFormAddTaskBoard(stati) {
    return /*html*/`
        <!-- HTML template for the add task form -->
        <div class="container-formular-task-on-board" onclick="doNotClose(event)">

<img onclick="closeAddTaskBoard()" src="../assets/icons/icon_cross_dark.svg" alt class="detail-task-close-btn">

<span class="title-formular-on-board">Add Task</span>

<form id="form_add_task" class="form-add-task" onsubmit="addTaskAndCloseForm('${stati}'); return false">

    <div class="left_side_desktop-add-task">

        <div class="container-input">
            <span class="form-text-add-task">Title</span>
            <input class="inputfield-add-task" type="text" required placeholder="Enter a title" name=""
                id="title_form">
        </div>

        <div class="container-input">
            <span class="form-text-add-task">Description</span>
            <textarea class="inputfield-add-task" maxlength="200" placeholder="Enter a description" name=""
                id="description_form"></textarea>
        </div>

        <div class="container-input">
            <span class="form-text-add-task">Category</span>
            <select class="inputfield-add-task" type="text" required name="" id="category_form">
                <option value="" disabled selected>Select a category</option>
                <option class="sales" value="sales">Sales</option>
                <option class="marketing" value="marketing">Marketing</option>
                <option class="accounting" value="accounting">Accounting</option>
                <option class="development" value="development">Development</option>
                <option class="purchase" value="purchase">Purchase</option>
            </select>
        </div>

        <div class="container-input">
            <span class="form-text-add-task">Assigned to</span>
            <select oninput="addMember()" class="inputfield-add-task" type="text" required name=""
                id="assignedTo_form">
            </select>

            <div class="" id="click_to_delete_text"></div>

            <div class="selected-members-add-task" id="selected_members_add_task">

            </div>
        </div>
    </div>

    <img class="line-icon-add-task" src="../assets/icons/vertical_line_addTask.svg" alt="">

    <div class="right_side_desktop-add-task">

        <div class="container-input">
            <span class="form-text-add-task">Due date</span>
            <input class="inputfield-add-task" type="date" required placeholder="dd/mm/yyyy" name=""
                id="dueDate_form">
        </div>

        <div class="container-input">
            <span class="form-text-add-task">Prio</span>

            <div class="container-prio-btn-add-task">

                <div id="prio_btn_urgent" class="prio-btn-add-task" onclick="setPrioValue('urgent')">
                    <span class="text-btn-prio-add-task">Urgent</span>
                    <img src="../assets/icons/icon_prio_urgent.svg" alt="">
                </div>

                <div id="prio_btn_medium" class="prio-btn-add-task prio-selected" onclick="setPrioValue('medium')">
                    <span class="text-btn-prio-add-task">Medium</span>
                    <img src="../assets/icons/icon_prio_medium.svg" alt="">
                </div>

                <div id="prio_btn_low" class="prio-btn-add-task" onclick="setPrioValue('low')">
                    <span class="text-btn-prio-add-task">Low</span>
                    <img src="../assets/icons/icon_prio_low.svg" alt="">
                </div>

                <input required id="prio_hidden" type="hidden" value="medium">
            </div>
        </div>

        <div class="container-input pos-relative">
            <span class="form-text-add-task">Subtasks</span>
            <input class="inputfield-add-task" maxlength="30" type="text" placeholder="Add new subtask"
                name="" id="input_subtask">
            <img onclick="addSubtask()" class="btn-plus-add-task" src="../assets/icons/icon_plus_dark.svg"
                alt="">
            <div class="container-subtasks" id="container_subtasks">

            </div>
        </div>
    </div>

    <div class="btn-container-add-task-on-board">
        <button onclick="reset(); resetPrioValue(); resetSubtaskArray(); resetAssignedTo()"
            id="btn_clear_task" type="button" for class="btn-clear">
            <span>Clear</span>
            <img src="../assets/icons/icon_cross_dark.svg" alt="">
        </button>

        <button type="submit" class="btn-create-task" id="btn_add_task_on_board_submit">
            <span>Create Task</span>
            <img src="../assets/icons/icon_check_bright.svg" alt="">
        </button>

    </div>
</form>
</div>

</div>   
    `;
};


/**
 * Generates the HTML template for a single contact option in the "Assigned to" dropdown.
 * @param {Object} contact - The contact object containing contact information (e.g., name).
 * @returns {string} The HTML template for a single contact option in the dropdown.
 */
function templateMembersChose(contact) {
    return /*html*/`
    <option value="${contact['name']}">${contact['name']}</option>
`;
};


/**
 * Generates the HTML template for a single subtask in the edit task form.
 * @param {number} j - The index of the task in the tasks array.
 * @param {number} i - The index of the subtask in the subtasks array.
 * @returns {string} The HTML template for a single subtask in the edit task form.
 */
function templateSubtasksEditTask(j, i) {
    return /*html*/`
        <div class="text-subtask">
            ${tasks[j]['subtasks'][i]}
            <img onclick="deleteSubtaskEditTask(${j}, ${i})" class="hover" id="delete_btn_subtasks${i}" src="../assets/icons/trash.png" alt="">
        </div>
    `;
};


/**
 * Generates the HTML template for a single selected member in the edit task form.
 * @param {number} i - The index of the member in the assignedTo array.
 * @param {number} j - The index of the task in the tasks array.
 * @returns {string} The HTML template for a single selected member in the edit task form.
 */
function templateMembersEditTask(i, j) {
    return /*html*/`
        <div style="background-color: ${tasks[j]['colors'][i]}" onclick=deleteMemberEditTask(${i},${j}) class="member-add-task">
            <span>${tasks[j]['initials'][i]}</span>
        </div>
    `;
};


/**
 * Generates the HTML template for the edit task form.
 * @param {number} j - The index of the task in the tasks array.
 * @returns {string} The HTML template for the edit task form.
 */
function templateEditTask(j) {
    return /*html*/`
        <!-- HTML template for the edit task form -->
        <div class="container-formular-task-on-board" onclick="doNotClose(event)">
            
            <!-- Close button for the edit task form -->
            <img onclick="closeEditTask()" src="../assets/icons/icon_cross_dark.svg" alt="" class="detail-task-close-btn">
      
            <!-- Title of the edit task form -->
            <span class="title-formular-on-board">Edit Task</span>

            <!-- Edit task form -->
            <form id="form_add_task" class="form-add-task" onsubmit="return false">

                <!-- Left side of the form containing task details -->
                <div class="left_side_desktop-add-task">

                    <!-- Input field for the task title -->
                    <div class="container-input">
                        <span class="form-text-add-task">Title</span>
                        <input value="${tasks[j]['title']}" class="inputfield-add-task" type="text" required placeholder="Enter a title" name=""
                            id="title_form">
                    </div>

                    <!-- Text area for the task description -->
                    <div class="container-input">
                        <span class="form-text-add-task">Description</span>
                        <textarea class="inputfield-add-task" maxlength="200" placeholder="Enter a description" name=""
                            id="description_form">${tasks[j]['description']}</textarea>
                    </div>

                    <!-- Dropdown select field for task category -->
                    <div class="container-input">
                        <span class="form-text-add-task">Category</span>
                        <select class="inputfield-add-task" type="text" required name="" id="category_form">
                            <option value="${tasks[j]['category']}" disabled selected>${tasks[j]['category'].slice(0, 1).toUpperCase()}${tasks[j]['category'].slice(1)}</option>
                            <option class="sales" value="sales">Sales</option>
                            <option class="marketing" value="marketing">Marketing</option>
                            <option class="accounting" value="accounting">Accounting</option>
                            <option class="development" value="development">Development</option>
                            <option class="purchase" value="purchase">Purchase</option>
                        </select>
                    </div>

                    <!-- Dropdown select field for assigning the task to a team member -->
                    <div class="container-input">
                        <span class="form-text-add-task">Assigned to</span>
                        <select oninput="addMemberEditTask(${j})" class="inputfield-add-task" type="text" name=""
                            id="assignedTo_form">
                        </select>

                        <!-- Click to delete text for selected team members -->
                        <div class="" id="click_to_delete_text"></div>

                        <!-- Container for displaying selected team members -->
                        <div class="selected-members-add-task" id="selected_members_add_task">

                        </div>
                    </div>
                </div>

                <!-- Vertical line separating the left and right sides of the form -->
                <img class="line-icon-add-task" src="../assets/icons/vertical_line_addTask.svg" alt="">

                <!-- Right side of the form containing task details -->
                <div class="right_side_desktop-add-task">

                    <!-- Input field for the task due date -->
                    <div class="container-input">
                        <span class="form-text-add-task">Due date</span>
                        <input value="${tasks[j]['dueDate']}" class="inputfield-add-task" type="date" required placeholder="dd/mm/yyyy" name=""
                            id="dueDate_form">
                    </div>

                    <!-- Priority buttons for the task -->
                    <div class="container-input">
                        <span class="form-text-add-task">Prio</span>

                        <div class="container-prio-btn-add-task">

                            <!-- Urgent priority button -->
                            <div id="prio_btn_urgent" class="prio-btn-add-task" onclick="setPrioValueEditTask(${j},'urgent')">
                                <span class="text-btn-prio-add-task">Urgent</span>
                                <img src="../assets/icons/icon_prio_urgent.svg" alt="">
                            </div>

                            <!-- Medium priority button -->
                            <div id="prio_btn_medium" class="prio-btn-add-task" onclick="setPrioValueEditTask(${j},'medium')">
                                <span class="text-btn-prio-add-task">Medium</span>
                                <img src="../assets/icons/icon_prio_medium.svg" alt="">
                            </div>

                            <!-- Low priority button -->
                            <div id="prio_btn_low" class="prio-btn-add-task" onclick="setPrioValueEditTask(${j},'low')">
                                <span class="text-btn-prio-add-task">Low</span>
                                <img src="../assets/icons/icon_prio_low.svg" alt="">
                            </div>

                            <!-- Hidden input for storing the priority value (not needed) -->
                            <!-- <input required id="prio_hidden" type="hidden" value="medium"> -->
                        </div>
                    </div>

                    <!-- Input field for adding subtasks to the task -->
                    <div class="container-input pos-relative">
                        <span class="form-text-add-task">Subtasks</span>
                        <input class="inputfield-add-task" maxlength="30" type="text" placeholder="Add new subtask"
                            name="" id="input_subtask">
                        <img onclick="addSubtaskEditTask(${j})" class="btn-plus-add-task" src="../assets/icons/icon_plus_dark.svg"
                            alt="">
                        <!-- Container for displaying subtasks -->
                        <div class="container-subtasks" id="container_subtasks">
                            
                        </div>
                    </div>
                </div>

                <!-- Container for the buttons at the bottom of the form -->
                <div class="btn-container-add-task-on-board">
                    <!-- Reset button to reset the form -->
                    <button onclick="editTask(${j})"
                        id="btn_clear_task" type="button" for class="btn-clear">
                        <span>Reset</span>
                        <img src="../assets/icons/icon_cross_dark.svg" alt="">
                    </button>

                    <!-- Button to save the changes made in the form -->
                    <button onclick="safeChangesEditTask(${j})" class="btn-create-task">
                        <span>Safe Changes</span>
                        <img src="../assets/icons/icon_check_bright.svg" alt="">
                    </button>
                </div>
            </form>
        </div>
    </div>
    `;
};


/**
 * Generate the HTML template for displaying a task's priority as "Urgent".
 *
 * @param {number} j - The index of the task in the 'tasks' array.
 * @returns {string} The HTML template for displaying the task's priority as "Urgent".
 */
function templateDetailTaskPrioUrgent(j) {
    return /*html*/`
    <div class="border-urgent">
        <span>${tasks[j]['prio'].slice(0, 1).toUpperCase()}${tasks[j]['prio'].slice(1)}</span>
        <img src="../assets/icons/icon_prio_urgent.svg" alt="">
    </div>
    `;
};


/**
 * Generate the HTML template for displaying a task's priority as "Medium".
 *
 * @param {number} j - The index of the task in the 'tasks' array.
 * @returns {string} The HTML template for displaying the task's priority as "Medium".
 */
function templateDetailTaskPrioMedium(j) {
    return /*html*/`
    <div class="border-medium">
        <span>${tasks[j]['prio'].slice(0, 1).toUpperCase()}${tasks[j]['prio'].slice(1)}</span>         
        <img class="test" src="../assets/icons/icon_prio_medium.svg" alt="">
    </div>  
    `;
};


/**
 * Generate the HTML template for displaying a task's priority as "Low".
 *
 * @param {number} j - The index of the task in the 'tasks' array.
 * @returns {string} The HTML template for displaying the task's priority as "Low".
 */
function templateDetailTaskPrioLow(j) {
    return /*html*/`
    <div class="border-low">
        <span>${tasks[j]['prio'].slice(0, 1).toUpperCase()}${tasks[j]['prio'].slice(1)}</span>
        <img src="../assets/icons/icon_prio_low.svg" alt="">
    </div>
    `;
};


/**
 * Renders a single member assigned to the task in the task details view.
 *
 * @param {string} member - The name of the member.
 * @param {number} k - The index of the member in the assignedTo array of the task.
 * @param {number} j - The index of the task in the tasks array.
 * @returns {string} The HTML template for the single member in the task details view.
 */
function templateMemberTaskDetail(member, k, j) {
    return /*html*/`
    <div class="container-initials-and-name-member-task-detail">
        <div style="background-color: ${tasks[j]['colors'][k]}" class="font-size-16 single-task-member-member">${tasks[j]['initials'][k]}</div> 
        <span class="font-weight-400">${member.slice(0, 1).toUpperCase()}${member.slice(1)}</span>
    </div>
    `;
};


/**
 * Generate the HTML template for displaying a subtask in the task detail view.
 *
 * @param {string} subtask - The text content of the subtask.
 * @param {number} k - The index of the subtask in the 'subtasks' array of the task.
 * @param {number} j - The index of the task in the 'tasks' array.
 * @returns {string} The HTML template for displaying the subtask in the task detail view.
 */
function templateSubtasksTaskDetail(subtask, k, j) {
    return /*html*/`
        <div class="text-subtask">
            ${subtask}
        </div>
    `;
};