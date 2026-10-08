import { demoTasks, variantNumber, variantTasks } from "./data.js";
import {
  createTask,
  findTaskById,
  getPendingTasks,
  getTaskTitles,
  getTaskStats,
  addTask,
  setTaskCompleted,
  renameTask,
  removeTask,
} from "./task-service.js";

// ============================================================
// 1. Исходные данные
// ============================================================
console.log("=== Демонстрационный сценарий ПР2 ===");
console.log(`Номер варианта: ${variantNumber}`);
console.log(`Количество задач в общем наборе: ${demoTasks.length}`);
console.log(`Количество задач в индивидуальном наборе: ${variantTasks.length}`);

// Выбираем набор для работы: общий демонстрационный
let currentTasks = demoTasks;

console.log("\n--- Исходный набор ---");
console.log(currentTasks);
console.log("Названия:", getTaskTitles(currentTasks));
console.log("Невыполненные:", getPendingTasks(currentTasks).map(t => t.title));

function printStats(tasks, label) {
  const { total, completed, pending, progress } = getTaskStats(tasks);
  console.log(`\n[${label}] Всего: ${total}, Выполнено: ${completed}, Осталось: ${pending}`);
  if (total === 0) {
    console.log("Задач пока нет");
  } else {
    console.log(`Прогресс: ${progress.toFixed(1)}%`);
  }
}
printStats(currentTasks, "Исходный набор");

// ============================================================
// 2. Добавление задачи id=20
// ============================================================
console.log("\n--- Добавление задачи id=20 ---");
const addResult = addTask(currentTasks, 20, "Добавить проверку", "high");
if (addResult.ok) {
  currentTasks = addResult.tasks;
  console.log("Успешно добавлено.");
} else {
  console.error("Ошибка:", addResult.error);
}
printStats(currentTasks, "После добавления id=20");

// ============================================================
// 3. Установка completed = true для id=4
// ============================================================
console.log("\n--- Установка completed=true для id=4 ---");
const statusResult = setTaskCompleted(currentTasks, 4, true);
if (statusResult.ok) {
  currentTasks = statusResult.tasks;
  console.log("Статус изменён.");
} else {
  console.error("Ошибка:", statusResult.error);
}
printStats(currentTasks, "После выполнения id=4");

// ============================================================
// 4. Переименование id=10
// ============================================================
console.log("\n--- Переименование id=10 ---");
const renameResult = renameTask(currentTasks, 10, "Подготовить инструкцию запуска");
if (renameResult.ok) {
  currentTasks = renameResult.tasks;
  console.log("Название изменено.");
} else {
  console.error("Ошибка:", renameResult.error);
}
printStats(currentTasks, "После переименования id=10");

// ============================================================
// 5. Удаление id=7
// ============================================================
console.log("\n--- Удаление id=7 ---");
const removeResult = removeTask(currentTasks, 7);
if (removeResult.ok) {
  currentTasks = removeResult.tasks;
  console.log("Задача удалена.");
} else {
  console.error("Ошибка:", removeResult.error);
}
printStats(currentTasks, "После удаления id=7");

// ============================================================
// 6. Демонстрация отказа (повторяющийся id)
// ============================================================
console.log("\n--- Демонстрация обработки отказа ---");
const errorResult = addTask(currentTasks, 20, "Дубликат");
if (errorResult.ok) {
  console.error("Этого не должно было произойти!");
} else {
  console.log("Ожидаемая ошибка:", errorResult.error);
}

// ============================================================
// 7. Проверка, что исходный массив не изменился
// ============================================================
console.log("\n--- Проверка исходного массива demoTasks ---");
console.log("Длина demoTasks:", demoTasks.length);
console.log("Первая задача:", demoTasks[0].title);
console.log("Исходный массив не изменился.");

console.log("\nФинальные идентификаторы:", currentTasks.map(t => t.id));
console.log("=== Демонстрация завершена ===");
// ============================================================
// Индивидуальный вариант №5
// ============================================================
console.log("\n\n=== Демонстрация индивидуального варианта №5 ===");
console.log(`Номер варианта: ${variantNumber}`);
console.log("Тема: Разработка командного прототипа");

let variantCurrent = variantTasks;

console.log("\n--- Исходные данные варианта ---");
console.log(variantCurrent);
printStats(variantCurrent, "Исходный вариант");

// Шаг 2 из задания: добавить задачу id = 80
console.log("\n--- Добавление задачи id=80 ---");
const addVariant = addTask(variantCurrent, 80, "Собственное название задачи", "medium");
if (addVariant.ok) {
  variantCurrent = addVariant.tasks;
  console.log("Успешно добавлено.");
} else {
  console.error("Ошибка:", addVariant.error);
}
printStats(variantCurrent, "После добавления id=80");

// Шаг 3: completed = true для id = 11
console.log("\n--- Установка completed=true для id=11 ---");
const setVariant = setTaskCompleted(variantCurrent, 11, true);
if (setVariant.ok) {
  variantCurrent = setVariant.tasks;
  console.log("Статус изменён.");
} else {
  console.error("Ошибка:", setVariant.error);
}

// Шаг 4: переименовать id = 23
console.log("\n--- Переименование id=23 ---");
const renameVariant = renameTask(variantCurrent, 23, "Новое название задачи");
if (renameVariant.ok) {
  variantCurrent = renameVariant.tasks;
  console.log("Название изменено.");
} else {
  console.error("Ошибка:", renameVariant.error);
}

// Шаг 5: удалить id = 37
console.log("\n--- Удаление id=37 ---");
const removeVariant = removeTask(variantCurrent, 37);
if (removeVariant.ok) {
  variantCurrent = removeVariant.tasks;
  console.log("Задача удалена.");
} else {
  console.error("Ошибка:", removeVariant.error);
}

// Шаг 6: повторно добавить id = 80 (отказ)
console.log("\n--- Повторное добавление id=80 ---");
const duplicateVariant = addTask(variantCurrent, 80, "Дубликат");
if (!duplicateVariant.ok) {
  console.log("Ожидаемая ошибка:", duplicateVariant.error);
} else {
  console.error("Этого не должно было произойти!");
}

// Шаг 7: зафиксировать итоги
console.log("\n--- Итоговые задачи варианта ---");
console.log(variantCurrent.map(t => `${t.id}: ${t.title} (${t.priority})`));
printStats(variantCurrent, "Итоговый вариант");

console.log("\nПроверка сохранности variantTasks:");
console.log("Длина исходного variantTasks:", variantTasks.length);
console.log("Первая задача:", variantTasks[0].title);

console.log("\n=== Демонстрация варианта завершена ===");