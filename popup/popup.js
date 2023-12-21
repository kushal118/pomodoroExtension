let tasks = []
const addTaskBtn = document.getElementById("add-task-btn")
addTaskBtn.addEventListener("click", () => addTask())
chrome.storage.sync.get(["tasks"], (res) => {
    tasks = res.tasks ? res.tasks : []
    renderTasks()
})

function saveTasks() {
    chrome.storage.sync.set({
        tasks,
    })
}

function renderTask(taskLength) {
    const taskRow = document.createElement("div")
    const text = document.createElement("input")
    text.type = "text"
    text.value = tasks[taskLength]
    text.placeholder = "Enter a task..."
    text.addEventListener("change", () => {
        tasks[taskLength] = text.value
        saveTasks()
    })
    const deletedBtn = document.createElement('input')
    deletedBtn.type = "button"
    deletedBtn.value = "x"
    deletedBtn.addEventListener("click", () => {
        deleteTask()
    })
    taskRow.appendChild(text)
    taskRow.appendChild(deletedBtn)

    const taskContainer = document.getElementById("task-container")
    taskContainer.appendChild(taskRow)

}

function addTask() {
    const taskLength = tasks.length
    tasks.push("")
    renderTask(taskLength)
    saveTasks()
}

function deleteTask(taskLength) {
    tasks.splice(taskLength, 1)
    renderTasks()
    saveTasks()
}

function renderTasks() {
    const taskContainer = document.getElementById('task-container')
    taskContainer.textContent = ""
    tasks.forEach((taskText, taskLength) => {
        renderTask(taskLength)
    })
}