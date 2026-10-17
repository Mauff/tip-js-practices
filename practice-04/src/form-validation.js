const ALLOWED_PRIORITIES = new Set(["low", "medium", "high"]);

// Чистая проверка данных формы. DOM и показ сообщений выполняются в main.js.
// draft: { id, title, priority }; editingId: null либо id редактируемой задачи.
export function validateTaskDraft(draft, tasks, editingId = null) {
  const errors = {};

  // --- 1. Определяем id ---
  let id;
  
  if (editingId !== null) {
    // Режим редактирования
    if (!Number.isSafeInteger(editingId) || editingId <= 0) {
      errors.id = "Некорректный id редактируемой задачи";
    } else if (!tasks.some(task => task.id === editingId)) {
      errors.id = "Редактируемая задача не найдена";
    } else {
      id = editingId;
    }
  } else {
    // Режим создания: id может быть строкой (из формы) или числом (из тестов)
    const rawId = draft.id;
    const numericId = Number(rawId);

    // Проверяем пустую строку отдельно
    if (rawId === "" || rawId === null || rawId === undefined) {
      errors.id = "Идентификатор не может быть пустым";
    } else if (!Number.isSafeInteger(numericId) || numericId <= 0) {
      errors.id = "Идентификатор должен быть положительным целым числом";
    } else if (tasks.some(task => task.id === numericId)) {
      errors.id = "Задача с таким идентификатором уже существует";
    } else {
      id = numericId;
    }
  }

  // --- 2. Проверяем title ---
  const rawTitle = draft.title;
  if (typeof rawTitle !== "string") {
    errors.title = "Название должно быть строкой";
  } else {
    const trimmed = rawTitle.trim();
    if (trimmed.length < 1 || trimmed.length > 100) {
      errors.title = "Название после trim() должно быть длиной от 1 до 100 символов";
    }
  }

  // --- 3. Проверяем priority ---
  const rawPriority = draft.priority;
  if (!ALLOWED_PRIORITIES.has(rawPriority)) {
    errors.priority = "Приоритет должен быть low, medium или high";
  }

  // --- 4. Возвращаем результат ---
  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    value: {
      id,
      title: draft.title.trim(),
      priority: draft.priority,
    },
  };
}