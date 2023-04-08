// Get the form and task list elements
const form = document.querySelector('#task-form');
const taskList = document.querySelector('#task-list');

// Initialize an empty tasks array
let tasks = [];

// Function to add a new task
function addTask(event) {
  // Prevent the form from submitting
  event.preventDefault();

  // Get the values from the form
  const name = form.elements['task-name'].value;
  const dueDate = form.elements['due-date'].value;
  const status = form.elements['status'].value;

  // Create a new task object
  const task = { name, dueDate, status };

  // Add the task to the tasks array
  tasks.push(task);

  // Clear the form
  form.reset();

  // Update the task list
  updateTaskList();
}

// Function to update the task list
// Function to update the task list
function updateTaskList() {
    // Clear the existing task list
    taskList.innerHTML = '';
  
    // Loop through the tasks array and create table rows for each task
    tasks.forEach((task, index) => {
      const row = document.createElement('tr');
  
      const nameCell = document.createElement('td');
      nameCell.classList.add('task-name'); // Add 'task-name' class to name cell
      nameCell.textContent = task.name;
      row.appendChild(nameCell);
  
      const dueDateCell = document.createElement('td');
      dueDateCell.classList.add('due-date'); // Add 'due-date' class to due date cell
      dueDateCell.textContent = task.dueDate;
      row.appendChild(dueDateCell);
  
      const statusCell = document.createElement('td');
      statusCell.classList.add('status'); // Add 'status' class to status cell
      statusCell.textContent = task.status;
      row.appendChild(statusCell);
  
      const actionsCell = document.createElement('td');
      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.addEventListener('click', () => editTask(index));
      actionsCell.appendChild(editButton);
  
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => deleteTask(index));
      actionsCell.appendChild(deleteButton);
  
      row.appendChild(actionsCell);
  
      taskList.appendChild(row);
    });
  }
// Function to update the task list
function updateTaskList() {
  // Clear the existing task list
  taskList.innerHTML = '';

  // Loop through the tasks array and create table rows for each task
  tasks.forEach((task, index) => {
    const row = document.createElement('tr');

    const nameCell = document.createElement('td');
    nameCell.classList.add('task-name'); // Add 'task-name' class to name cell
    nameCell.textContent = task.name;
    row.appendChild(nameCell);

    const dueDateCell = document.createElement('td');
    dueDateCell.classList.add('due-date'); // Add 'due-date' class to due date cell
    dueDateCell.textContent = task.dueDate;
    row.appendChild(dueDateCell);

    const statusCell = document.createElement('td');
    statusCell.classList.add('status'); // Add 'status' class to status cell
    statusCell.textContent = task.status;
    row.appendChild(statusCell);

    const actionsCell = document.createElement('td');
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => editTask(index));
    actionsCell.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteTask(index));
    actionsCell.appendChild(deleteButton);

    row.appendChild(actionsCell);

    taskList.appendChild(row);
  });
}
  

// Function to edit a task
function editTask(index) {
    // Get the task to edit
    const task = tasks[index];
  
    // Set the form values to the task values
    form.elements['task-name'].value = task.name;
    form.elements['due-date'].value = task.dueDate;
    form.elements['status'].value = task.status;
  
    // Change the form's submit button value to "Save Changes"
    form.querySelector("input[type='submit']").value = "Save Changes";
  
    // Update the index of the task being edited
    form.dataset.editIndex = index;
  }
  
  // Function to delete a task
  function deleteTask(index) {
    // Remove the task from the tasks array
    tasks.splice(index, 1);
  
    // Update the task list
    updateTaskList();
  }
  
  // Add an event listener to the form submit button
  form.addEventListener('submit', function(event) {
    event.preventDefault();
  
    // Get the form values
    const name = form.elements['task-name'].value;
    const dueDate = form.elements['due-date'].value;
    const status = form.elements['status'].value;
  
    // Get the index of the task being edited
    const editIndex = form.dataset.editIndex;
  
    // If the form is being used to edit a task
    if (editIndex !== undefined) {
      // Update the task in the tasks array
      tasks[editIndex].name = name;
      tasks[editIndex].dueDate = dueDate;
      tasks[editIndex].status = status;
  
      // Change the form's submit button value back to "Add Task"
      form.querySelector("input[type='submit']").value = "Add Task";
  
      // Clear the edit index from the form dataset
      delete form.dataset.editIndex;
    } else {
      // Otherwise, the form is being used to add a new task
      // Create a new task object with the form values
      const task = {
        name: name,
        dueDate: dueDate,
        status: status
      };
  
      // Add the new task object to the tasks array
      tasks.push(task);
    }
  
    // Update the task list
    updateTaskList();
  
    // Clear the form
    form.reset();
  });
  

  // Get the filter elements
const filterNameInput = document.getElementById("filter-name");
const filterStatusSelect = document.getElementById("filter-status");
const filterDueDateInput = document.getElementById("filter-due-date");

// Add event listeners to the filter elements
filterNameInput.addEventListener("input", applyFilters);
filterStatusSelect.addEventListener("change", applyFilters);
filterDueDateInput.addEventListener("change", applyFilters);

// Function to apply the filters
// Function to apply the filters
function applyFilters() {
    // Get all the task rows
    const tasks = document.querySelectorAll("tbody tr");
  
    // Loop through the task rows and apply the filters
    tasks.forEach(function(task) {
      // Get the task name, status, and due date elements
      const taskName = task.querySelector(".task-name");
      const taskStatus = task.querySelector(".status");
      const taskDueDate = task.querySelector(".due-date");
  
      // Check if the task name matches the filter name
      const nameFilter = filterNameInput.value.toLowerCase();
      const nameMatch = taskName.textContent.toLowerCase().includes(nameFilter);
  
      // Check if the task status matches the filter status
      const statusFilter = filterStatusSelect.value.toLowerCase();
      const statusMatch = statusFilter === "" || taskStatus.textContent.toLowerCase() === statusFilter;
  
      // Check if the task due date matches the filter due date
      const dueDateFilter = filterDueDateInput.value;
      const dueDateMatch = !dueDateFilter || new Date(taskDueDate.textContent).getTime() === new Date(dueDateFilter).getTime();
  
      // Show or hide the task row based on the filter matches
      if (nameMatch && statusMatch && dueDateMatch) {
        task.classList.remove("hidden");
      } else {
        task.classList.add("hidden");
      }
    });
  }
  