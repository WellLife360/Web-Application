// JavaScript to handle adding tasks to the To-Do List
const addTaskButton = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const newTaskInput = document.getElementById("newTask");

addTaskButton.addEventListener("click", function() {
    const newTaskText = newTaskInput.value.trim();
    if (newTaskText) {
        const li = document.createElement("li");

        // Create the task text element
        const taskText = document.createElement("span");
        taskText.textContent = newTaskText;
        li.appendChild(taskText);

        // Create the remove button
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.classList.add("remove-btn");
        li.appendChild(removeBtn);

        // Create the edit button
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList.add("edit-btn");
        li.appendChild(editBtn);

        // Remove the task when the remove button is clicked
        removeBtn.addEventListener("click", function() {
            taskList.removeChild(li);
        });

        // Allow editing the task when the edit button is clicked
        editBtn.addEventListener("click", function() {
            const editedText = prompt("Edit task:", taskText.textContent);
            if (editedText !== null && editedText.trim() !== "") {
                taskText.textContent = editedText;
            }
        });

        // Add the new task to the list
        taskList.appendChild(li);

        // Clear the input field
        newTaskInput.value = "";
    }
});


