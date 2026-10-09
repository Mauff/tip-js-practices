// Заготовка модуля. throw ниже отмечает отсутствие реализации,
// а не способ обработки некорректных данных в готовом решении.
// Для предусмотренных ошибок необходимо возвращать { ok: false, error: "..." }.
// console.log(), prompt(), document и чтение внешнего состояния здесь не нужны.

// --- Вспомогательные функции для валидации ---

function validateId(id) {
  if (typeof id !== 'number' || !Number.isSafeInteger(id) || id <= 0) {
    return { ok: false, error: "id должен быть положительным безопасным целым числом" };
  }
  return { ok: true };
}

function validateTitle(title) {
  if (typeof title !== 'string') {
    return { ok: false, error: "Название должно быть строкой" };
  }
  const trimmed = title.trim();
  if (trimmed.length < 1 || trimmed.length > 100) {
    return { ok: false, error: "Название после trim() должно быть длиной от 1 до 100 символов" };
  }
  return { ok: true, value: trimmed };
}

function validatePriority(priority) {
  const validPriorities = ["low", "medium", "high"];
  if (!validPriorities.includes(priority)) {
    return { ok: false, error: "Приоритет должен быть одним из: low, medium, high" };
  }
  return { ok: true };
}

// --- 1. createTask ---
export function createTask(id, title, priority = "medium") {
  const idCheck = validateId(id);
  if (!idCheck.ok) return idCheck;

  const titleCheck = validateTitle(title);
  if (!titleCheck.ok) return titleCheck;

  const priorityCheck = validatePriority(priority);
  if (!priorityCheck.ok) return priorityCheck;

  const newTask = {
    id: id,
    title: titleCheck.value,
    completed: false,
    priority: priority
  };

  return { ok: true, task: newTask };
}

// --- 2. findTaskById ---
export function findTaskById(tasks, id) {
  return tasks.find(task => task.id === id);
}

// --- 3. getPendingTasks ---
export function getPendingTasks(tasks) {
  return tasks.filter(task => task.completed === false);
}

// --- 4. getTaskTitles ---
export function getTaskTitles(tasks) {
  return tasks.map(task => task.title);
}

// --- 5. getTaskStats ---
export function getTaskStats(tasks) {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;
  const progress = total === 0 ? 0 : (completed / total) * 100;
  
  return { total, completed, pending, progress };
}

// --- 6. addTask ---
export function addTask(tasks, id, title, priority = "medium") {
  // Проверяем данные через createTask
  const creation = createTask(id, title, priority);
  if (!creation.ok) return creation;

  // Проверяем уникальность id
  const exists = tasks.some(task => task.id === id);
  if (exists) {
    return { ok: false, error: `Задача с id=${id} уже существует` };
  }

  // Возвращаем новый массив с добавленной задачей (без мутации исходного)
  return { ok: true, tasks: [...tasks, creation.task] };
}

// --- 7. setTaskCompleted ---
export function setTaskCompleted(tasks, id, completed) {
  const idCheck = validateId(id);
  if (!idCheck.ok) return idCheck;

  if (typeof completed !== 'boolean') {
    return { ok: false, error: "completed должно быть логическим значением (true/false)" };
  }

  const exists = tasks.some(task => task.id === id);
  if (!exists) {
    return { ok: false, error: `Задача с id=${id} не найдена` };
  }

  // Создаём новый массив с обновлённой задачей (без мутации)
  const updatedTasks = tasks.map(task => 
    task.id === id ? { ...task, completed: completed } : task
  );

  return { ok: true, tasks: updatedTasks };
}

// --- 8. renameTask ---
export function renameTask(tasks, id, title) {
  const idCheck = validateId(id);
  if (!idCheck.ok) return idCheck;

  const titleCheck = validateTitle(title);
  if (!titleCheck.ok) return titleCheck;

  const exists = tasks.some(task => task.id === id);
  if (!exists) {
    return { ok: false, error: `Задача с id=${id} не найдена` };
  }

  const updatedTasks = tasks.map(task => 
    task.id === id ? { ...task, title: titleCheck.value } : task
  );

  return { ok: true, tasks: updatedTasks };
}

// --- 9. removeTask ---
export function removeTask(tasks, id) {
  const idCheck = validateId(id);
  if (!idCheck.ok) return idCheck;

  const exists = tasks.some(task => task.id === id);
  if (!exists) {
    return { ok: false, error: `Задача с id=${id} не найдена` };
  }

  // Возвращаем новый массив без удалённой задачи (иммутабельно)
  const updatedTasks = tasks.filter(task => task.id !== id);

  return { ok: true, tasks: updatedTasks };
}