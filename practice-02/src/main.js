
import { demoTasks } from './data.js';
import * as service from './task-service.js';

console.log("=== Первый запуск ===");
console.log("Заготовка main.js загружена.");
console.log(`Размер массива demoTasks: ${demoTasks.length}`);
console.log(`Доступные функции: ${Object.keys(service).join(', ')}`);