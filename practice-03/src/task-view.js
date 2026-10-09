import { getTaskStats } from "./task-service.js";

// Создание карточки задачи. Обработчики здесь НЕ назначаются.
export function createTaskElement(task) {
  const li = document.createElement("li");
  li.className = "task-card";
  li.dataset.taskId = String(task.id);
  if (task.completed) {
    li.classList.add("is-completed");
  }

  // Название — h3.task-title с текстом (textContent, а не innerHTML!)
  const title = document.createElement("h3");
  title.className = "task-title";
  title.textContent = task.title;
  li.append(title);

  // Статус — span.task-status: «Выполнена» или «В работе»
  const status = document.createElement("span");
  status.className = "task-status";
  status.textContent = task.completed ? "Выполнена" : "В работе";
  li.append(status);

  // Приоритет — span.task-priority: «Низкий», «Средний», «Высокий»
  const priorityLabels = { low: "Низкий", medium: "Средний", high: "Высокий" };
  const priority = document.createElement("span");
  priority.className = "task-priority";
  priority.textContent = priorityLabels[task.priority] ?? task.priority;
  li.append(priority);

  // Контейнер для кнопок
  const actions = document.createElement("div");
  actions.className = "task-actions";

  // Кнопка статуса
  const toggleBtn = document.createElement("button");
  toggleBtn.type = "button";
  toggleBtn.dataset.action = "toggle";
  toggleBtn.setAttribute("aria-pressed", String(task.completed));
  const toggleLabel = document.createElement("span");
  toggleLabel.className = "action-label";
  toggleLabel.textContent = "Выполнена";
  toggleBtn.append(toggleLabel);
  actions.append(toggleBtn);

  // Кнопка удаления
  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.dataset.action = "delete";
  const deleteLabel = document.createElement("span");
  deleteLabel.className = "action-label";
  deleteLabel.textContent = "Удалить";
  deleteBtn.append(deleteLabel);
  actions.append(deleteBtn);

  li.append(actions);

  return li;
}

// Отрисовка списка: заменить дочерние элементы контейнера.
export function renderTaskList(listElement, tasks) {
  const cards = tasks.map(createTaskElement);
  listElement.replaceChildren(...cards);
}

// Обновление сводки.
export function renderSummary(summaryElement, tasks, visibleCount) {
  const stats = getTaskStats(tasks);
  summaryElement.querySelector("[data-stat='total']").textContent = stats.total;
  summaryElement.querySelector("[data-stat='completed']").textContent = stats.completed;
  summaryElement.querySelector("[data-stat='pending']").textContent = stats.pending;
  summaryElement.querySelector("[data-stat='progress']").textContent = `${stats.progress.toFixed(1)}%`;
  summaryElement.querySelector("[data-stat='visible']").textContent = visibleCount;
}

// Сообщение о пустом состоянии.
export function renderEmptyState(messageElement, total, visibleCount) {
  if (total === 0 && visibleCount === 0) {
    messageElement.textContent = "Список задач пуст.";
    messageElement.hidden = false;
  } else if (total > 0 && visibleCount === 0) {
    messageElement.textContent = "Нет задач по выбранному фильтру.";
    messageElement.hidden = false;
  } else {
    messageElement.textContent = "";
    messageElement.hidden = true;
  }
}