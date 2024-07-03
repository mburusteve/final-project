// client/js/tasks.js
document.getElementById('addTaskForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;
    const budget = document.getElementById('taskBudget').value;

    try {
        const res = await fetch('http://localhost:5000/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ title, description, budget })
        });

        const data = await res.json();
        if (res.ok) {
            alert('Task added successfully');
            location.reload(); // Reload the page to show the new task
        } else {
            alert(data.msg || 'Failed to add task');
        }
    } catch (err) {
        console.error(err);
        alert('Error adding task');
    }
});

// Fetch and display tasks
async function loadTasks() {
    try {
        const res = await fetch('http://localhost:5000/api/tasks', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        const tasks = await res.json();
        const taskList = document.getElementById('taskList');

        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = `${task.title} - ${task.description} - $${task.budget}`;
            taskList.appendChild(li);
        });
    } catch (err) {
        console.error(err);
        alert('Error loading tasks');
    }
}

loadTasks();
