document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            addTaskToDOM(task);
        });
    }

    // Add a task to the DOM
    function addTaskToDOM(task) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task}</span>
            <div>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;
        taskList.appendChild(li);

        // Add event listeners for edit and delete buttons
        li.querySelector('.edit-btn').addEventListener('click', () => editTask(li, task));
        li.querySelector('.delete-btn').addEventListener('click', () => deleteTask(li, task));
    }

    // Add a new task
    function addTask() {
        const task = taskInput.value.trim();
        if (task) {
            const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            tasks.push(task);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            addTaskToDOM(task);
            taskInput.value = '';
        }
    }

    // Edit a task
    function editTask(li, oldTask) {
        const newTask = prompt('Edit task:', oldTask);
        if (newTask !== null && newTask.trim() !== '') {
            const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            const index = tasks.indexOf(oldTask);
            if (index !== -1) {
                tasks[index] = newTask;
                localStorage.setItem('tasks', JSON.stringify(tasks));
                li.querySelector('span').textContent = newTask;
            }
        }
    }

    // Delete a task
    function deleteTask(li, task) {
        if (confirm('Are you sure you want to delete this task?')) {
            const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            const index = tasks.indexOf(task);
            if (index !== -1) {
                tasks.splice(index, 1);
                localStorage.setItem('tasks', JSON.stringify(tasks));
                taskList.removeChild(li);
            }
        }
    }

    // Event listeners
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Initial load
    loadTasks();
});
