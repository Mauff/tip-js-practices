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