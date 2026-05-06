const STORAGE_KEY = "task-manager.tasks";

const taskForm = document.querySelector("#taskForm");
const taskInput = document.querySelector("#taskInput");
const taskList = document.querySelector("#taskList");
const emptyState = document.querySelector("#emptyState");
const totalCount = document.querySelector("#totalCount");
const activeCount = document.querySelector("#activeCount");
const completedCount = document.querySelector("#completedCount");
const clearCompletedButton = document.querySelector("#clearCompleted");
const filterButtons = document.querySelectorAll(".filter-btn");

let tasks = loadTasks();
let currentFilter = "all";

render();

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = taskInput.value.trim();
  if (!text) {
    return;
  }

  tasks.unshift({
    id: crypto.randomUUID(),
    text,
    completed: false,
    createdAt: new Date().toISOString(),
  });

  taskInput.value = "";
  saveTasks();
  render();
  taskInput.focus();
});

taskList.addEventListener("change", (event) => {
  const checkbox = event.target.closest("[data-action='toggle']");
  if (!checkbox) {
    return;
  }

  const taskId = checkbox.closest("[data-task-id]").dataset.taskId;
  tasks = tasks.map((task) =>
    task.id === taskId ? { ...task, completed: !task.completed } : task,
  );
  saveTasks();
  render();
});

taskList.addEventListener("click", (event) => {
  const deleteButton = event.target.closest("[data-action='delete']");
  if (!deleteButton) {
    return;
  }

  const taskId = deleteButton.closest("[data-task-id]").dataset.taskId;
  tasks = tasks.filter((task) => task.id !== taskId);
  saveTasks();
  render();
});

clearCompletedButton.addEventListener("click", () => {
  const hasCompleted = tasks.some((task) => task.completed);
  if (!hasCompleted) {
    return;
  }

  tasks = tasks.filter((task) => !task.completed);
  saveTasks();
  render();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    filterButtons.forEach((candidate) => {
      candidate.classList.toggle("active", candidate === button);
    });
    render();
  });
});

function render() {
  const filteredTasks = tasks.filter((task) => {
    if (currentFilter === "active") {
      return !task.completed;
    }

    if (currentFilter === "completed") {
      return task.completed;
    }

    return true;
  });

  taskList.innerHTML = filteredTasks
    .map(
      (task) => `
        <li class="task-item ${task.completed ? "completed" : ""}" data-task-id="${task.id}">
          <input class="task-check" type="checkbox" data-action="toggle" ${task.completed ? "checked" : ""} aria-label="Mark task complete" />
          <div class="task-content">
            <span class="task-text">${escapeHtml(task.text)}</span>
            <span class="task-meta">Created ${formatDate(task.createdAt)}</span>
          </div>
          <div class="task-actions">
            <button class="icon-btn delete" type="button" data-action="delete" aria-label="Delete task">Delete</button>
          </div>
        </li>
      `,
    )
    .join("");

  emptyState.hidden = filteredTasks.length > 0;

  const completedTasks = tasks.filter((task) => task.completed).length;
  totalCount.textContent = String(tasks.length);
  activeCount.textContent = String(tasks.length - completedTasks);
  completedCount.textContent = String(completedTasks);
  clearCompletedButton.disabled = completedTasks === 0;
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function loadTasks() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function formatDate(value) {
  const date = new Date(value);
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function escapeHtml(value) {
  const element = document.createElement("div");
  element.textContent = value;
  return element.innerHTML;
}