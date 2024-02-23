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

    const editTaskTitleInput = document.getElementById('task-title');
    const editTaskDescriptionInput = document.getElementById('task-description');
    const editTaskPrioritySelect = document.getElementById('task-priority');

    // Clear the values of the input fields
    editTaskTitleInput.value = '';
    editTaskDescriptionInput.value = '';
    editTaskPrioritySelect.value = 'high';
}
