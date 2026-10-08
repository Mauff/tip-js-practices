"use strict";

const totalTasks = 7;
const completedTasks = 2;
const dailyLimit = 2;

if (typeof totalTasks !== 'number' || !Number.isInteger(totalTasks) || Number.isNaN(totalTasks)) {
    console.log("Ошибка: общее количество задач должно быть целым числом.");
} else if (totalTasks < 0 || totalTasks > 1000) {
    console.log("Ошибка: общее количество задач должно быть в диапазоне от 0 до 1000.");
} else if (typeof completedTasks !== 'number' || !Number.isInteger(completedTasks) || Number.isNaN(completedTasks)) {
    console.log("Ошибка: количество выполненных задач должно быть целым числом.");
} else if (completedTasks < 0 || completedTasks > totalTasks) {
    console.log("Ошибка: выполнено больше, чем существует, или указано отрицательное количество.");
} else if (typeof dailyLimit !== 'number' || !Number.isInteger(dailyLimit) || Number.isNaN(dailyLimit)) {
    console.log("Ошибка: дневная норма должна быть целым числом.");
} else if (dailyLimit < 1 || dailyLimit > 1000) {
    console.log("Ошибка: дневная норма должна быть в диапазоне от 1 до 1000.");
} else {
    let remaining = totalTasks - completedTasks;
    let days = 0;

    if (remaining === 0) {
        console.log("Все задачи уже выполнены.");
        console.log("Потребуется дней: 0");
    } else {
        console.log(`Осталось задач: ${remaining}`);
       
        while (remaining > 0) {
            days++;
            let tasksToday = Math.min(remaining, dailyLimit);
            remaining -= tasksToday;
           
            console.log(`День ${days}: выполнено ${tasksToday}, осталось ${remaining}`);
        }
       
        console.log(`Потребуется дней: ${days}`);
    }
}