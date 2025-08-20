const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const installBtn = document.getElementById("installBtn");

let deferredPrompt;

// ---- Adicionar Tarefa ----
addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    addTask(taskText);
    taskInput.value = "";
  }
});

function addTask(text) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = text;

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "❌";
  removeBtn.classList.add("remove-btn");

  removeBtn.addEventListener("click", () => {
    li.remove();
  });

  li.appendChild(span);
  li.appendChild(removeBtn);
  taskList.appendChild(li);
}

// ---- Instalar PWA ----
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.style.display = "block";
});

installBtn.addEventListener("click", async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      installBtn.style.display = "none";
    }
    deferredPrompt = null;
  }
});
