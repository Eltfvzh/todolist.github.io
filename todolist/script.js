document.getElementById('taskInput').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

let taskInput = document.getElementById('taskInput');
let dateInput = document.getElementById('dateInput');
let timeInput = document.getElementById('timeInput');
let pointsDisplay = document.getElementById('points');
let levelDisplay = document.getElementById('level');

let statusNotifikasi = false;

function notifikasi() {
    if (statusNotifikasi) {
        alert("notifikasi telah dimatikan");
        statusNotifikasi = false;
    } else {
        alert("notifikasi telah dinyalakan");
        statusNotifikasi = true;
    }
}

let tasks = JSON.parse(localStorage.getItem('Test')) || [];
let points = JSON.parse(localStorage.getItem('Points')) || 0;
let level = JSON.parse(localStorage.getItem('Level')) || 1;

function createTaskElement(item, index) {
    let li = document.createElement('li');
    li.innerHTML = `
        <div class="task-details">
            <span>${item.nama}</span>
            <small>${item.tanggal ? `tanggal: ${item.tanggal} ${item.waktu}` : ''}</small>
        </div>
        <button class="Complete" onclick="completeTask(${index})">Complete</button>
        <button class="Edit" onclick="editTask(${index})">Edit</button>
        <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
    `;
    return li;
}

function showTask(tasks) {
    let taskList = document.getElementById('List');
    taskList.innerHTML = '';
    tasks.forEach((item, index) => {
        taskList.appendChild(createTaskElement(item, index));
    });
}

function addTask() {
    let taskText = taskInput.value.trim();
    let taskDate = dateInput.value;
    let taskTime = timeInput.value;

    if (taskText === '') {
        alert('Please enter a task');
        return;
    }

    let data = { nama: taskText, tanggal: taskDate, waktu: taskTime, done: false };
    tasks.push(data);
    localStorage.setItem('Test', JSON.stringify(tasks));

    let taskList = document.getElementById('List');
    taskList.appendChild(createTaskElement(data, tasks.length - 1));

    if (statusNotifikasi) {
        new Notification('Task Added', { body: taskText });
    }

    taskInput.value = '';
    dateInput.value = '';
    timeInput.value = '';
}

function completeTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('Test', JSON.stringify(tasks));
    showTask(tasks);
    addPoints(10);
    levelUp();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('Test', JSON.stringify(tasks));
    showTask(tasks);
}

function editTask(index) {
    let task = tasks[index];
    taskInput.value = task.nama;
    dateInput.value = task.tanggal;
    timeInput.value = task.waktu;

    deleteTask(index);

    document.getElementById('addButton').textContent = 'Update Task';
    document.getElementById('addButton').onclick = function() {
        updateTask(index);
    };
}

function updateTask(index) {
    let taskText = taskInput.value.trim();
    let taskDate = dateInput.value;
    let taskTime = timeInput.value;

    if (taskText === '') {
        alert('Please enter a task');
        return;
    }

    let data = { nama: taskText, tanggal: taskDate, waktu: taskTime, done: false };
    tasks.splice(index, 0, data);
    localStorage.setItem('Test', JSON.stringify(tasks));

    taskInput.value = '';
    dateInput.value = '';
    timeInput.value = '';

    document.getElementById('addButton').textContent = 'Tambahkan List';
    document.getElementById('addButton').onclick = addTask;

    showTask(tasks);
}

function addPoints(point) {
    points += point;
    localStorage.setItem('Points', JSON.stringify(points));
    pointsDisplay.textContent = `Points: ${points}`;
}

function levelUp() {
    level++;
    localStorage.setItem('Level', JSON.stringify(level));
    let levelName = getLevelName(level);
    levelDisplay.textContent = `Level: ${level} (${levelName})`;
}

function getLevelName(level) {
    if (level === 1) return "Newbie";
    if (level === 2) return "Beginner";
    if (level === 3) return "Intermediate";
    if (level === 4) return "Advanced";
    return "Expert";
}

showTask(tasks);
pointsDisplay.textContent = `Points: ${points}`;
let levelName = getLevelName(level);
levelDisplay.textContent = `Level: ${level} (${levelName})`;
