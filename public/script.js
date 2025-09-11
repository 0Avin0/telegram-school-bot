// Ініціалізація Telegram WebApp
let tg = window.Telegram.WebApp;
tg.expand();
tg.enableClosingConfirmation();

// Елементи DOM
const userNameElement = document.getElementById('user-name');
const userPhotoMainElement = document.getElementById('user-photo-main');

// Поточний активний модальний
let currentModal = null;

// Дані синхронізовані з config.py
const rozklad = {
    "5": {
        "Понеділок": ["Українська мова","Математика","Англійська мова","Мистецтво","Українська література","Пізнаємо природу"],
        "Вівторок": ["Зарубіжна література","Укр. мова / нім. мова","Математика","Фізична культура","Нім. мова / укр. мова","Технології","Технології"],
        "Середа": ["Англійська мова","Інформатика / нім. мова","Математика","Фізична культура","Українська мова","Нім. мова / інформатика"],
        "Четвер": ["Українська література","Математика","Дослід. історію","Англійська мова","Здоров'я, безпека","Мистецтво"],
        "П'ятниця": ["Фізична культура","Математика","Етика","Українська мова","Пізнаємо природу","Англійська мова"]
    },
    "6": {
        "Понеділок": ["Інформатика / нім. мова","Українська мова","Математика","Нім.мова/інформат.","Дослід. історію","Мистецтво","Фізична культура"],
        "Вівторок": ["Технології","Технології","Українська мова","Математика","Зарубіжна література","Мистецтво","Зарубіжна література"],
        "Середа": ["Географія","Математика","Фізична культура","Дослід. історію","Нім. мова / інформатика","Англійська мова","Інформатика/нім.мова"],
        "Четвер": ["Пізнаємо природу","Українська мова","Математика","Здоров'я, безпека","Фізична культура","Українська література","Етика"],
        "П'ятниця": ["Географія","Пізнаємо природу","Англійська мова","Математика","Українська мова","Українська література"]
    },
    "7": {
        "Понеділок": ["Алгебра","Біологія","Німецька мова","Українська література","Англійська мова","Географія","Мистецтво"],
        "Вівторок": ["Українська мова","Зарубіжна література","Інформатика/Англ.мова","Фізика","Англ. мова / інформатика","Зарубіжна література","Фізична культура"],
        "Середа": ["Геометрія","Біологія","Німецька мова","Алгебра","Історія України","Українська мова","Здоров'я, безпека"],
        "Четвер": ["Географія","Хімія","Українська література","Фізична культура","Геометрія","Інформатика / англ. мова","Англ. мова / інформатика"],
        "П'ятниця": ["Алгебра","Українська мова","Фізика","Всесвітня історія","Технології","Біологія","Фізична культура"]
    },
    "8": {
        "Понеділок": ["Історія України","Підприємство і Фінансова грамотність","Українська мова","Англійська мова","Алгебра","Геометрія","Фізична культура"],
        "Вівторок": ["Хімія","Англійська мова","Українська література","Фізика","Біологія","Німецька мова","Географія"],
        "Середа": ["Всесвітня історія","Українська мова","Алгебра","Геометрія","Підприємство і Фінансова грамотність","Фізична культура","Здоров'я, безпека"],
        "Четвер": ["Фізика","Українська література","Англійська мова","Біологія","Хімія","Німецька мова","Зарубіжна література"],
        "П'ятниця": ["Географія","Інформатика/Англ.мова","Англ. мова / інформатика","Алгебра","Українська мова","Фізика","Фізична культура"]
    },
    "9": {
        "Понеділок": ["Англійська мова","Українська мова","Алгебра","Геометрія","Фізика","Хімія","Фізична культура"],
        "Вівторок": ["Українська література","Географія","Історія України","Німецька мова","Біологія","Всесвітня історія","Право"],
        "Середа": ["Алгебра","Геометрія","Фізика","Англійська мова","Українська мова","Хімія","Здоров'я, безпека"],
        "Четвер": ["Біологія","Німецька мова","Українська література","Фізична культура","Право","Інформатика/Англ.мова","Англ. мова / інформатика"],
        "П'ятниця": ["Географія","Всесвітня історія","Алгебра","Українська мова","Фізика","Хімія","Зарубіжна література"]
    },
    "10": {
        "Понеділок": ["Англійська мова","Українська мова","Алгебра","Геометрія","Фізика","Хімія","Фізична культура"],
        "Вівторок": ["Українська література","Географія","Історія України","Німецька мова","Біологія","Всесвітня історія","Право"],
        "Середа": ["Алгебра","Геометрія","Фізика","Англійська мова","Українська мова","Хімія","Здоров'я, безпека"],
        "Четвер": ["Біологія","Німецька мова","Українська література","Фізична культура","Право","Інформатика/Англ.мова","Англ. мова / інформатика"],
        "П'ятниця": ["Географія","Всесвітня історія","Алгебра","Українська мова","Фізика","Хімія","Зарубіжна література"]
    },
    "11": {
        "Понеділок": ["Англійська мова","Українська мова","Алгебра","Геометрія","Фізика","Хімія","Фізична культура"],
        "Вівторок": ["Українська література","Географія","Історія України","Німецька мова","Біологія","Всесвітня історія","Право"],
        "Середа": ["Алгебра","Геометрія","Фізика","Англійська мова","Українська мова","Хімія","Здоров'я, безпека"],
        "Четвер": ["Біологія","Німецька мова","Українська література","Фізична культура","Право","Інформатика/Англ.мова","Англ. мова / інформатика"],
        "П'ятниця": ["Географія","Всесвітня історія","Алгебра","Українська мова","Фізика","Хімія","Зарубіжна література"]
    }
};

const books = {
    "5": {
        "Українська мова": "https://example.com/book5-ukr",
        "Математика": "https://example.com/book5-math",
        "Англійська мова": "https://example.com/book5-english"
    },
    "6": {
        "Українська мова": "https://example.com/book6-ukr",
        "Математика": "https://example.com/book6-math",
        "Англійська мова": "https://example.com/book6-english"
    },
    "7": {
        "Алгебра": "https://example.com/book7-algebra",
        "Геометрія": "https://example.com/book7-geometry",
        "Фізика": "https://example.com/book7-physics"
    }
};

const bells = [
    {"lesson": 1, "start": "8:30", "end": "9:15"},
    {"lesson": 2, "start": "9:25", "end": "10:10"},
    {"lesson": 3, "start": "10:20", "end": "11:05"},
    {"lesson": 4, "start": "11:15", "end": "12:00"},
    {"lesson": 5, "start": "12:10", "end": "12:55"},
    {"lesson": 6, "start": "13:05", "end": "13:50"},
    {"lesson": 7, "start": "14:00", "end": "14:45"}
];

const classes = ["5", "6", "7", "8", "9", "10", "11"];

// Ініціалізація додатку
function initApp() {
    // Отримуємо дані користувача з Telegram
    const user = tg.initDataUnsafe.user;
    
    if (user) {
        userNameElement.textContent = `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'Учень';
        if (user.photo_url) {
            userPhotoMainElement.src = user.photo_url;
        }
    }
    
    // Додаємо обробники подій для карток
    document.querySelectorAll('.nav-card').forEach(card => {
        card.addEventListener('click', () => {
            const feature = card.getAttribute('data-feature');
            openFeature(feature);
        });
    });
}

// Відкриття функціоналу за карткою
function openFeature(feature) {
    switch(feature) {
        case 'schedule':
            openScheduleModal();
            break;
        case 'books':
            openBooksModal();
            break;
        case 'bells':
            openBellsModal();
            break;
        case 'random':
            openRandomStudentModal();
            break;
        case 'classes':
            openClassesModal();
            break;
        case 'info':
            openInfoModal();
            break;
    }
}

// Модальне вікно розкладу
function openScheduleModal() {
    const modalContent = `
        <div class="modal-header">
            <h2>📅 Розклад занять</h2>
            <button class="close-button">&times;</button>
        </div>
        <div class="modal-content">
            <div class="schedule-controls">
                <select class="class-selector" id="schedule-class">
                    ${classes.map(cls => `<option value="${cls}">${cls} клас</option>`).join('')}
                </select>
                <div class="day-buttons">
                    <button class="day-button active" data-day="Понеділок">Понеділок</button>
                    <button class="day-button" data-day="Вівторок">Вівторок</button>
                    <button class="day-button" data-day="Середа">Середа</button>
                    <button class="day-button" data-day="Четвер">Четвер</button>
                    <button class="day-button" data-day="П'ятниця">П'ятниця</button>
                </div>
            </div>
            <div class="schedule-display" id="schedule-display">
                ${renderScheduleTable('5', 'Понеділок')}
            </div>
        </div>
    `;
    
    showModal(modalContent, 'schedule-modal');
    
    // Додаємо обробники подій
    document.getElementById('schedule-class').addEventListener('change', function() {
        const selectedClass = this.value;
        const activeDay = document.querySelector('.day-button.active').getAttribute('data-day');
        document.getElementById('schedule-display').innerHTML = renderScheduleTable(selectedClass, activeDay);
    });
    
    document.querySelectorAll('.day-button').forEach(button => {
        button.addEventListener('click', function() {
            document.querySelectorAll('.day-button').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const selectedClass = document.getElementById('schedule-class').value;
            const day = this.getAttribute('data-day');
            document.getElementById('schedule-display').innerHTML = renderScheduleTable(selectedClass, day);
        });
    });
}

// Генерація таблиці розкладу
function renderScheduleTable(selectedClass, day) {
    const lessons = rozklad[selectedClass] && rozklad[selectedClass][day];
    
    if (!lessons || lessons.length === 0) {
        return `<p>На ${day.toLowerCase()} у ${selectedClass} класі занять немає.</p>`;
    }
    
    let tableHtml = `
        <table class="schedule-table">
            <thead>
                <tr>
                    <th>Урок</th>
                    <th>Час</th>
                    <th>Предмет</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    lessons.forEach((lesson, index) => {
        const bell = bells[index];
        tableHtml += `
            <tr>
                <td>${index + 1}</td>
                <td>${bell ? `${bell.start} - ${bell.end}` : ''}</td>
                <td>${lesson}</td>
            </tr>
        `;
    });
    
    tableHtml += `
            </tbody>
        </table>
    `;
    
    return tableHtml;
}

// Модальне вікно підручників
function openBooksModal() {
    const modalContent = `
        <div class="modal-header">
            <h2>📚 Онлайн підручники</h2>
            <button class="close-button">&times;</button>
        </div>
        <div class="modal-content">
            <div class="schedule-controls">
                <select class="class-selector" id="books-class">
                    ${Object.keys(books).map(cls => `<option value="${cls}">${cls} клас</option>`).join('')}
                </select>
            </div>
            <div class="books-list" id="books-list">
                ${renderBooksList('5')}
            </div>
        </div>
    `;
    
    showModal(modalContent, 'books-modal');
    
    // Додаємо обробники подій
    document.getElementById('books-class').addEventListener('change', function() {
        const selectedClass = this.value;
        document.getElementById('books-list').innerHTML = renderBooksList(selectedClass);
    });
}

// Генерація списку книг
function renderBooksList(selectedClass) {
    const classBooks = books[selectedClass];
    
    if (!classBooks || Object.keys(classBooks).length === 0) {
        return `<p>Для ${selectedClass} класу підручники відсутні.</p>`;
    }
    
    let listHtml = `<ul class="book-list">`;
    
    for (const [subject, url] of Object.entries(classBooks)) {
        listHtml += `
            <li class="book-item">
                <span class="book-icon">📖</span>
                <a href="${url}" target="_blank" class="book-link">${subject} <span class="external-icon">↗</span></a>
            </li>
        `;
    }
    
    listHtml += `</ul>`;
    return listHtml;
}

// Модальне вікно розкладу дзвінків
function openBellsModal() {
    const modalContent = `
        <div class="modal-header">
            <h2>🔔 Розклад дзвінків</h2>
            <button class="close-button">&times;</button>
        </div>
        <div class="modal-content">
            <div class="bells-list">
                ${renderBellsList()}
            </div>
        </div>
    `;
    
    showModal(modalContent, 'bells-modal');
}

// Генерація списку дзвінків
function renderBellsList() {
    let listHtml = '';
    
    bells.forEach(bell => {
        listHtml += `
            <div class="bell-item">
                <div class="bell-info">
                    <span class="bell-icon">🔔</span>
                    <span>${bell.lesson} урок</span>
                </div>
                <span class="bell-time">${bell.start} - ${bell.end}</span>
            </div>
        `;
    });
    
    return listHtml;
}

// Модальне вікно випадкового учня
function openRandomStudentModal() {
    const modalContent = `
        <div class="modal-header">
            <h2>🎲 Випадковий учень</h2>
            <button class="close-button">&times;</button>
        </div>
        <div class="modal-content">
            <div class="info-card">
                <h3>Функціонал у розробці</h3>
                <p>Ця функція буде доступна у наступних оновленнях.</p>
            </div>
            <div class="action-buttons">
                <button class="btn primary" id="random-student-btn">Обрати учня</button>
            </div>
        </div>
    `;
    
    showModal(modalContent, 'random-modal');
    
    // Додаємо обробник подій
    document.getElementById('random-student-btn').addEventListener('click', () => {
        tg.showPopup({
            title: "Випадковий учень",
            message: "Учень №" + (Math.floor(Math.random() * 30) + 1) + " буде відповідати!",
            buttons: [{type: 'ok'}]
        });
    });
}

// Модальне вікно управління класами
function openClassesModal() {
    const modalContent = `
        <div class="modal-header">
            <h2>👥 Управління класами</h2>
            <button class="close-button">&times;</button>
        </div>
        <div class="modal-content">
            <div class="info-card">
                <h3>Доступні класи</h3>
                <p>${classes.join(', ')} класи</p>
            </div>
            <div class="action-buttons">
                <button class="btn primary" id="add-class-btn">Додати клас</button>
                <button class="btn secondary" id="remove-class-btn">Видалити клас</button>
            </div>
        </div>
    `;
    
    showModal(modalContent, 'classes-modal');
    
    // Додаємо обробники подій
    document.getElementById('add-class-btn').addEventListener('click', () => {
        tg.showPopup({
            title: "Додати клас",
            message: "Функція додавання класу у розробці",
            buttons: [{type: 'ok'}]
        });
    });
    
    document.getElementById('remove-class-btn').addEventListener('click', () => {
        tg.showPopup({
            title: "Видалити клас",
            message: "Функція видалення класу у розробці",
            buttons: [{type: 'ok'}]
        });
    });
}

// Модальне вікно інформації
function openInfoModal() {
    const modalContent = `
        <div class="modal-header">
            <h2>📋 Інформація</h2>
            <button class="close-button">&times;</button>
        </div>
        <div class="modal-content">
            <div class="info-card">
                <h3>Про додаток</h3>
                <p>Навчальний портал - це зручний спосіб отримати доступ до розкладу занять, підручників та іншої навчальної інформації.</p>
            </div>
            <div class="info-card">
                <h3>Версія</h3>
                <p>Поточна версія: 1.0</p>
            </div>
            <div class="info-card">
                <h3>Підтримка</h3>
                <p>З питань роботи додатку звертайтеся до @random_childbot_support або @DC_sk8.</p>
            </div>
        </div>
    `;
    
    showModal(modalContent, 'info-modal');
}

// Показати модальне вікно
function showModal(content, modalId) {
    // Закриваємо попереднє модальне вікно, якщо воно є
    if (currentModal) {
        closeModal();
    }
    
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.id = modalId;
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = content;
    
    modalOverlay.appendChild(modal);
    document.body.appendChild(modalOverlay);
    
    // Додаємо обробник закриття
    const closeButton = modal.querySelector('.close-button');
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }
    
    // Додаємо обробник кліку на оверлей
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
    
    // Показуємо модальне вікно
    setTimeout(() => {
        modalOverlay.classList.add('active');
    }, 10);
    
    currentModal = modalOverlay;
}

// Закрити модальне вікно
function closeModal() {
    if (currentModal) {
        currentModal.classList.remove('active');
        setTimeout(() => {
            if (currentModal && currentModal.parentNode) {
                currentModal.parentNode.removeChild(currentModal);
            }
            currentModal = null;
        }, 300);
    }
}

// Ініціалізація додатку при завантаженні
document.addEventListener('DOMContentLoaded', initApp);
