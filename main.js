let tasks = [
    {
        taskName: "task 1",
        taskDesc: "task 1",
        taskStatus: false
    },
    {
        taskName: "task 2",
        taskDesc: "task 2",
        taskStatus: true
    },
    {
        taskName: "task 3",
        taskDesc: "task 3",
        taskStatus: false
    }
];

let taskName = document.getElementById("taskName");
let taskDesc = document.getElementById("taskDesc");
let taskForm = document.getElementById("taskForm");
let tasksTable = document.getElementById("tasksTable");
let addBtn = document.getElementById("addBtn");

let allBtn = document.getElementById("allBtn");
let doneBtn = document.getElementById("doneBtn");
let createdBtn = document.getElementById("createdBtn");

let currentFilter = "all";
let editIndex = -1;

function displayTasks() {

    tasksTable.innerHTML = "";

    tasks.forEach(function (el, index) {

        if (currentFilter === "done" && el.taskStatus === false) {
            return;
        }

        if (currentFilter === "created" && el.taskStatus === true) {
            return;
        }

        let row = document.createElement("tr");

        let nameCell = document.createElement("td");
        nameCell.textContent = el.taskName;

        let descCell = document.createElement("td");
        descCell.textContent = el.taskDesc;

        let statusCell = document.createElement("td");
        let statusBtn = document.createElement("button");

        if (el.taskStatus === true) {
            statusBtn.textContent = "Done";
            statusBtn.className = "status-btn status-done";
        } else {
            statusBtn.textContent = "Created";
            statusBtn.className = "status-btn status-created";
        }

        statusBtn.addEventListener("click", function () {

            el.taskStatus = !el.taskStatus;

            displayTasks();
        });

        statusCell.appendChild(statusBtn);

        let actionsCell = document.createElement("td");

        let deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
        deleteBtn.className = "delete-btn";

        deleteBtn.addEventListener("click", function () {

            tasks.splice(index, 1);

            displayTasks();
        });

        let editBtn = document.createElement("button");
        editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
        editBtn.className = "edit-btn";

        editBtn.addEventListener("click", function () {

            taskName.value = el.taskName;
            taskDesc.value = el.taskDesc;

            editIndex = index;

            addBtn.textContent = "Save Changes";
        });

        actionsCell.appendChild(deleteBtn);
        actionsCell.appendChild(editBtn);

        row.appendChild(nameCell);
        row.appendChild(descCell);
        row.appendChild(statusCell);
        row.appendChild(actionsCell);

        tasksTable.appendChild(row);
    });
}

taskForm.addEventListener("submit", function (event) {

    event.preventDefault();

    let name = taskName.value.trim();
    let desc = taskDesc.value.trim();

    if (name === "" || desc === "") {
        return;
    }

    if (editIndex === -1) {

        let newTask = {
            taskName: name,
            taskDesc: desc,
            taskStatus: false
        };

        tasks.push(newTask);

    } else {

        tasks[editIndex].taskName = name;
        tasks[editIndex].taskDesc = desc;

        editIndex = -1;

        addBtn.textContent = "Add";
    }

    taskForm.reset();

    currentFilter = "all";

    displayTasks();
});

allBtn.addEventListener("click", function () {

    currentFilter = "all";

    displayTasks();
});

doneBtn.addEventListener("click", function () {

    currentFilter = "done";

    displayTasks();
});

createdBtn.addEventListener("click", function () {

    currentFilter = "created";

    displayTasks();
});

displayTasks();