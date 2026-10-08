
// Дополнительное задание (Вариант А): Поиск задач по части названия

export function searchTasks(tasks, query) {
  // Приводим запрос к строке и удаляем пробелы по краям
  const normalizedQuery = String(query).trim().toLowerCase();

  // Если запрос пустой — вернуть новый массив со всеми задачами
  if (normalizedQuery === "") {
    return [...tasks];
  }

  // Фильтруем задачи: ищем вхождение подстроки без учёта регистра
  return tasks.filter(task => 
    task.title.toLowerCase().includes(normalizedQuery)
  );
}