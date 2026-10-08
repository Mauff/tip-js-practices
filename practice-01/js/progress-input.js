"use strict";

let totalTasksInput = "7";
let completedTasksInput = "2";

function validateAndParse(input, fieldName) {
    if (typeof input !== 'string') {
        return `Ошибка: ${fieldName} должно быть строкой.`;
    }
   
    const trimmed = input.trim();
   
    if (trimmed === "") {
        return `Ошибка: ${fieldName} не может быть пустым.`;
    }
   
    const num = Number(trimmed);
   
    if (Number.isNaN(num) || !Number.isInteger(num)) {
        return `Ошибка: ${fieldName} должно быть целым числом.`;
    }
   
    if (num < 0 || num > 1000) {
        return `Ошибка: ${fieldName} должно быть в диапазоне от 0 до 1000.`;
    }
   
    return num;
}

let totalTasks = validateAndParse(totalTasksInput, "Общее количество задач");
if (typeof totalTasks === 'string') {
    console.log(totalTasks);
} else {
    let completedTasks = validateAndParse(completedTasksInput, "Выполненные задачи");
    if (typeof completedTasks === 'string') {
        console.log(completedTasks);
    } else if (completedTasks > totalTasks) {
        console.log("Ошибка: выполнено больше, чем существует.");
    } else if (totalTasks === 0 && completedTasks === 0) {
        console.log("Задач пока нет");
    } else {
        const remaining = totalTasks - completedTasks;
        const percent = (completedTasks / totalTasks) * 100;
        const percentFormatted = percent.toFixed(1);
        let status = completedTasks === 0 ? "Не начато" : (completedTasks === totalTasks ? "Завершено" : "В работе");
       
        console.log(`Всего задач: ${totalTasks}`);
        console.log(`Выполнено: ${completedTasks}`);
        console.log(`Осталось: ${remaining}`);
        console.log(`Прогресс: ${percentFormatted}%`);
        console.log(`Статус: ${status}`);
    }
}