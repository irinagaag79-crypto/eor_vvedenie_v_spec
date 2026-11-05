// ==========================================
// ЛОГИКА ПРОГРЕССА И ДАШБОРДА
// ==========================================

// Список всех модулей курса
const MODULES = ['module1', 'module2', 'module3', 'module4'];
let progressChartInstance = null;

// Отметить модуль как пройденный
function markModuleCompleted(moduleName) {
    localStorage.setItem(moduleName, 'true');
    updateDashboard(); // Обновляем дашборд сразу после прохождения
}

// Проверить, пройден ли модуль
function isModuleCompleted(moduleName) {
    return localStorage.getItem(moduleName) === 'true';
}

// Функция инициализации диаграммы при загрузке страницы
function initDashboard() {
    const ctx = document.getElementById('progressChart');
    if (!ctx) return; // Защита, если мы не на главной странице

    // Считаем пройденные модули
    let completed = 0;
    MODULES.forEach(mod => {
        if (isModuleCompleted(mod)) completed++;
    });

    // Инициализируем Chart.js
    progressChartInstance = new Chart(ctx, {
        type: 'doughnut', // Тип "Пончик"
        data: {
            labels: ['Пройдено', 'Осталось'],
            datasets: [{
                data: [completed, MODULES.length - completed],
                backgroundColor: [
                    '#198754', // Зеленый (Bootstrap success) для пройденных
                    '#e9ecef'  // Светло-серый для оставшихся
                ],
                borderWidth: 0,
                cutout: '75%' // Делаем отверстие в центре побольше (для аватара)
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }, // Скрываем легенду, она не нужна
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return ' ' + context.label + ': ' + context.raw;
                        }
                    }
                }
            },
            animation: {
                animateScale: true,
                animateRotate: true
            }
        }
    });

    // Обновляем текст под диаграммой
    const counter = document.getElementById('modules-completed');
    if (counter) counter.textContent = completed;
}

// Функция обновления диаграммы (если прогресс изменился)
function updateDashboard() {
    if (!progressChartInstance) return; // Если диаграммы нет на странице, выходим

    let completed = 0;
    MODULES.forEach(mod => {
        if (isModuleCompleted(mod)) completed++;
    });

    // Обновляем данные на диаграмме
    progressChartInstance.data.datasets[0].data = [completed, MODULES.length - completed];
    progressChartInstance.update();

    // Обновляем текст
    const counter = document.getElementById('modules-completed');
    if (counter) counter.textContent = completed;
}

// Запуск при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    initDashboard();
});