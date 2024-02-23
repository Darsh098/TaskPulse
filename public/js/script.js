// Function to change the selected color based on priority
function changeSelectedColor(ddl, index) {
    if (index == 0) {
        ddl.style.backgroundColor = "#ffdada";
        ddl.style.color = "#f86c6b";
    } else if (index == 1) {
        ddl.style.backgroundColor = "#fff0ab";
        ddl.style.color = "#f8cb00";
    } else if (index == 2) {
        ddl.style.backgroundColor = "#cfedda";
        ddl.style.color = "#4dbd74";
    }
    ddl.style.fontWeight = 800;
}

// Execute when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    let ddl = document.getElementById('task-priority');

    // Set the selected index to 0 and change the color initially
    ddl.selectedIndex = 0;
    changeSelectedColor(ddl, ddl.selectedIndex);

    // Add an event listener to change the color on dropdown change
    ddl.addEventListener('change', () => {
        changeSelectedColor(ddl, ddl.selectedIndex);
    });

    // Select the cancel button
    const cancelButton = document.getElementById('addCancel');

    // Add a click event listener to the cancel button
    cancelButton.addEventListener('click', function () {
        // Call the cancelEdit function to clear the form fields
        cancelAdd();
    });
});

// Function to handle the cancel action
function cancelAdd() {
    let taskForm = document.getElementById('taskForm');
    const editTaskTitleInput = document.getElementById('task-title');
    let taskProcess = document.getElementById('taskProcess');
    const editTaskDescriptionInput = document.getElementById('task-description');
    const editTaskPrioritySelect = document.getElementById('task-priority');
    let addSubmit = document.getElementById('addSubmit');

    // Clear the values of the input fields
    taskForm.action = "/tasks";
    taskProcess.innerText = "Add New Task";
    editTaskTitleInput.value = '';
    editTaskDescriptionInput.value = '';
    editTaskPrioritySelect.value = 'high';
    addSubmit.textContent = "Add Task";
}

function editTask(id, title, description, priority) {
    let addContainer = document.getElementById('addContainer');
    let taskForm = document.getElementById('taskForm');
    let taskProcess = document.getElementById('taskProcess');
    let taskTitle = document.getElementById('task-title');
    let taskDescription = document.getElementById('task-description');
    let taskPriority = document.getElementById('task-priority');
    let addSubmit = document.getElementById('addSubmit');

    let taskId = taskForm.querySelector('input[name="taskId"]');
    if (!taskId) {
        taskId = document.createElement('input');
        taskId.type = 'hidden';
        taskId.name = 'taskId';
        taskForm.appendChild(taskId);
    }
    taskId.value = id;

    taskProcess.innerText = "Edit Task";
    taskForm.action = "/tasks/edit"
    taskTitle.value = title;
    taskDescription.value = description;
    taskPriority.value = priority;
    addSubmit.textContent = "Update Task";
}

function deleteTask(taskId) {
    fetch('/tasks/delete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ taskId: taskId }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            location.reload();
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function markAsComplete(taskId) {
    fetch('/tasks/complete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ taskId: taskId }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            location.reload();
        })
        .catch(error => {
            console.error('Error:', error);
        });
}



function logout() {
    // Redirect to the logout
    window.location.href = "/logout";
}

