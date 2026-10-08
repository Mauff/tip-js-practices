"use strict";

let totalTasks = 7;
let completedTasks = 2;

if (typeof totalTasks !== 'number' || !Number.isInteger(totalTasks) || Number.isNaN(totalTasks)) {
    console.log("Ошибка: общее количество задач должно быть целым числом.");
} else if (totalTasks < 0 || totalTasks > 1000) {
    console.log("Ошибка: общее количество задач должно быть в диапазоне от 0 до 1000.");
} else if (typeof completedTasks !== 'number' || !Number.isInteger(completedTasks) || Number.isNaN(completedTasks)) {
    console.log("Ошибка: количество выполненных задач должно быть целым числом.");
} else if (completedTasks < 0 || completedTasks > totalTasks) {
    console.log("Ошибка: выполнено больше, чем существует, или указано отрицательное количество.");
} else if (totalTasks === 0 && completedTasks === 0) {
    console.log("Задач пока нет");
} else {
    const remaining = totalTasks - completedTasks;
    const percent = (completedTasks / totalTasks) * 100;
    const percentFormatted = percent.toFixed(1); 

    let status;
    if (completedTasks === 0) {
        status = "Не начато";
    } else if (completedTasks === totalTasks) {
        status = "Завершено";
    } else {
        status = "В работе";
    }

    console.log(`Всего задач: ${totalTasks}`);
    console.log(`Выполнено: ${completedTasks}`);
    console.log(`Осталось: ${remaining}`);
    console.log(`Прогресс: ${percentFormatted}%`);
    console.log(`Статус: ${status}`);
}