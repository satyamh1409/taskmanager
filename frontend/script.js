const apiUrl = 'http://localhost:5000/tasks';

document.addEventListener('DOMContentLoaded', () => {
    fetchTasks();
});

function fetchTasks() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(tasks => {
            const taskList = document.getElementById('task-list');
            taskList.innerHTML = '';
            tasks.forEach(task => {
                const taskItem = document.createElement('div');
                taskItem.classList.add('task-item');
                taskItem.innerHTML = `
                    <div>
                        <h3>${task.title}</h3>
                        <p>${task.description}</p>
                        <small>Due: ${new Date(task.dueDate).toLocaleDateString()}</small>
                    </div>
                    <div>
                        <button onclick="editTask(${task.id})">Edit</button>
                        <button onclick="deleteTask(${task.id})">Delete</button>
                    </div>
                `;
                taskList.appendChild(taskItem);
            });
        });
}

function showAddTaskForm() {
    document.getElementById('form-title').innerText = 'Add Task';
    document.getElementById('task-id').value = '';
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('due-date').value = '';
    document.getElementById('task-form').style.display = 'block';
}

function hideTaskForm() {
    document.getElementById('task-form').style.display = 'none';
}

function submitTask() {
    const id = document.getElementById('task-id').value;
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const dueDate = document.getElementById('due-date').value;

    const task = { title, description, dueDate };

    if (id) {
        fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task)
        }).then(() => {
            fetchTasks();
            hideTaskForm();
        });
    } else {
        fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task)
        }).then(() => {
            fetchTasks();
            hideTaskForm();
        });
    }
}

function editTask(id) {
    fetch(`${apiUrl}/${id}`)
        .then(response => response.json())
        .then(task => {
            document.getElementById('task-id').value = task.id;
            document.getElementById('title').value = task.title;
            document.getElementById('description').value = task.description;
            document.getElementById('due-date').value = task.dueDate;
            document.getElementById('form-title').innerText = 'Edit Task';
            document.getElementById('task-form').style.display = 'block';
        });
}

function deleteTask(id) {
    fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    }).then(() => fetchTasks());
}
