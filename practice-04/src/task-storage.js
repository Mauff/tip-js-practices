export const STORAGE_VERSION = 1;

// Все функции принимают объект storage явно, чтобы их можно было проверить
// без обращения к глобальному window.localStorage.

export function isValidTaskList(value) {
  // 1. Это должен быть массив
  if (!Array.isArray(value)) return false;

  const ids = new Set();

  for (const task of value) {
    // 2. Каждый элемент — объект
    if (typeof task !== 'object' || task === null) return false;

    // 3. Проверка id (положительное безопасное целое, уникальное)
    if (!Number.isSafeInteger(task.id) || task.id <= 0) return false;
    if (ids.has(task.id)) return false;
    ids.add(task.id);

    // 4. Проверка title (строка, непустая, до 100 символов)
    if (typeof task.title !== 'string') return false;
    const trimmed = task.title.trim();
    if (trimmed.length < 1 || trimmed.length > 100) return false;

    // 5. Проверка completed (логическое)
    if (typeof task.completed !== 'boolean') return false;

    // 6. Проверка priority
    if (!["low", "medium", "high"].includes(task.priority)) return false;
  }

  return true;
}

export function loadTasks(storage, key, fallbackTasks) {
  // Вспомогательная функция для создания независимой копии
  const copyFallback = () => fallbackTasks.map(task => ({ ...task }));

  try {
    const raw = storage.getItem(key);

    // Нет записи
    if (raw === null) {
      return { ok: true, source: "initial", tasks: copyFallback() };
    }

    // Парсинг JSON
    const parsed = JSON.parse(raw);

    // Проверка структуры
    if (parsed.version !== STORAGE_VERSION) {
      throw new Error("Неизвестная версия хранилища");
    }

    if (!isValidTaskList(parsed.tasks)) {
      throw new Error("Некорректные данные задач в хранилище");
    }

    // Успешное чтение (новая копия)
    return {
      ok: true,
      source: "storage",
      tasks: parsed.tasks.map(task => ({ ...task }))
    };

  } catch (error) {
    // Любая ошибка (нет ключа, битый JSON, версия, схема)
    return {
      ok: false,
      source: "fallback",
      tasks: copyFallback(),
      error: error.message || "Ошибка чтения данных"
    };
  }
}

export function saveTasks(storage, key, tasks) {
  try {
    // Проверяем список перед записью
    if (!isValidTaskList(tasks)) {
      return { ok: false, error: "Некорректный список задач" };
    }

    const wrapper = { version: STORAGE_VERSION, tasks };
    storage.setItem(key, JSON.stringify(wrapper));
    return { ok: true };

  } catch (error) {
    return { ok: false, error: error.message || "Ошибка записи" };
  }
}

export function removeSavedTasks(storage, key) {
  try {
    storage.removeItem(key);
    return { ok: true };
  } catch (error) {
    return { ok: false, error: error.message || "Ошибка удаления" };
  }
}