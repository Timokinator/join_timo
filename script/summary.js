/**
 * Array to store the logged-in user's data.
 * @type {Array}
 */
let logedInUser = [];

/**
 * Array to store tasks that are in progress.
 * @type {Array}
 */
let tasksInProgress = [];

/**
 * Array to store tasks awaiting feedback.
 * @type {Array}
 */
let tasksAwaitingFeedback = [];

/**
 * Array to store tasks that are yet to be done.
 * @type {Array}
 */
let tasksToDo = [];

/**
 * Array to store tasks that are already done.
 * @type {Array}
 */
let tasksDone = [];

/**
 * Array to store tasks with an urgent priority.
 * @type {Array}
 */
let tasksUrgent = [];

/**
 * Array to store tasks' due dates.
 * @type {Array}
 */
let tasksDates = [];

/**
 * Redirects to the board HTML page.
 */
function linkToBoardHTML() {
    window.location.href = '../html/board.html';
};


/**
 * Initializes the summary view by loading tasks and user data.
 */
async function initSummary() {
    await loadTasks();
    loadTasksInBoard();
    checkAndSortTasks();
    loadTasksInProgress();
    loadTasksAwaitingFeedback();
    loadTasksUrgent();
    loadTasksDueDates();
    loadTasksToDo();
    loadTasksDone();
    loadTasksGreeteng();
    loadUserData();
};


/**
 * Capitalizes the first letter of a string.
 * @param {string} string - The input string.
 * @returns {string} - The input string with the first letter capitalized.
 */
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};


/**
 * Loads the logged-in user's data and displays the username on the summary view.
 */
async function loadUserData() {
    // logedInUser = [];
    logedInUser = JSON.parse(await getItem('user'));
    let currentUser = logedInUser.name;
    let box = document.getElementById('summary_username');

    if (currentUser && box) {
        box.innerHTML = capitalizeFirstLetter(currentUser); 
    } else {
        box.innerHTML = 'Guest';
    }
};


/**
 * Loads the total number of tasks and displays it on the board.
 */
function loadTasksInBoard() {
    let content = document.getElementById('tasks_in_board');
    let amountTasks = tasks.length;
    content.innerHTML = amountTasks;
};


/**
 * Loads the number of tasks in progress and displays it on the summary view.
 */
function loadTasksInProgress() {
    let content = document.getElementById('tasks_in_progress');
    let amountTasks = tasksInProgress.length;
    content.innerHTML = amountTasks;
};


/**
 * Loads the number of tasks awaiting feedback and displays it on the summary view.
 */
function loadTasksAwaitingFeedback() {
    let content = document.getElementById('awaiting_tasks');
    let amountTasks = tasksAwaitingFeedback.length;
    content.innerHTML = amountTasks;
};


/**
 * Loads the number of tasks with an urgent priority and displays it on the summary view.
 */
function loadTasksUrgent() {
    let content = document.getElementById('container_amount_urgent_number');
    let amountTasks = tasksUrgent.length;
    content.innerHTML = amountTasks;
};


/**
 * Loads the due date of the first task and displays it on the summary view.
 */
function loadTasksDueDates() {
    let content = document.getElementById('deadline_summary_date');
    let dueDate = tasksDates[0];
    content.innerHTML = dueDate;
};


/**
 * Loads the number of tasks to be done and displays it on the summary view.
 */
function loadTasksToDo() {
    let content = document.getElementById('summary_todo_text');
    let amountTasks = tasksToDo.length;
    content.innerHTML = amountTasks;
};


/**
 * Loads the number of tasks already done and displays it on the summary view.
 */
function loadTasksDone() {
    let content = document.getElementById('summary_done_text');
    let amountTasks = tasksDone.length;
    content.innerHTML = amountTasks;
};


/**
 * Loads the greeting message and updates it every minute.
 */
function loadTasksGreeteng() {
    implementCurrentTime();
    setInterval(implementCurrentTime, 60000);
};


/**
 * Implements the current time greeting message based on the hour of the day.
 */
function implementCurrentTime() {
    let timeBox = document.querySelector('.summary-good-morning');
    let today = new Date();
    let dateHours = today.getHours();

    if (dateHours >= 0 && dateHours < 12) {
        timeBox.innerHTML = 'Good Morning, ';
    }
    if (dateHours >= 12 && dateHours < 18) {
        timeBox.innerHTML = 'Good day, ';
    }
    if (dateHours >= 18 && dateHours <= 24) {
        timeBox.innerHTML = 'Good Evening, ';
    };
};


/**
 * Array to store unique logged-in users.
 * @type {Array}
 */
let newUser = [];

/**
 * Loads the logged-in user's data and updates the user box.
 */
async function loadLoagedInUser() {
    let currentUser = logedInUser['name'];
    if (!newUser.includes(currentUser)) {
        newUser.push(currentUser);
    }
    let logedInUser = currentUser[0]['name'];

    let userBox = document.getElementById('summary_username');

    if (logedInUser) {
        userBox.innerHTML = capitalizeFirstLetter(logedInUser);
    } else {
        userBox.innerHTML = 'Guest';
    };
};


/**
 * Checks the status and priority of tasks and sorts them into appropriate arrays.
 */
function checkAndSortTasks() {
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];

        if (task['status'] == 'progress') {
            tasksInProgress.push(task);
        } else if (task['status'] == 'awaiting') {
            tasksAwaitingFeedback.push(task);
        } else if (task['status'] == 'todo') {
            tasksToDo.push(task);
        } else if (task['status'] == 'done') {
            tasksDone.push(task);
        };
        
        if (task['prio'] == 'urgent') {
            tasksUrgent.push(task);
        };

        tasksDates.push(task['dueDate']);
        tasksDates.sort();
    };
};