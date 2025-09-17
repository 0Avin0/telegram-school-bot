// Ініціалізація Telegram WebApp
let tg = window.Telegram.WebApp;
tg.expand();
tg.enableClosingConfirmation();

// Елементи DOM
const userNameElement = document.getElementById('user-name');
const userPhotoMainElement = document.getElementById('user-photo-main');

// Поточний активний модальний
let currentModal = null;

// Дані синхронізовані з config.py бота
const rozklad = {
    "5": {
        "Понеділок": ["Українська мова","Математика","Англійська мова","Мистецтво","Українська література","Пізнаємо природу"],
        "Вівторок": ["Зарубіжна література","Укр. мова / нім. мова","Математика","Фізична культура","Нім. мова / укр. мова","Технології","Технології"],
        "Середа": ["Англійська мова","Інформатика / нім. мова","Математика","Фізична культура","Українська мова","Нім. мова / інформатика"],
        "Четвер": ["Українська література","Математика","Дослід. історію","Англійська мова","Здоров'я, безпека","Мистецтво"],
        "П'ятниця": ["Фізична культура","Математика","Етика","Українська мова","Пізнаємо природу","Аngлійська мова"]
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
        "Понеділок": ["Історія України","Підприємство і Фінансова грамотність","Українська мова","Алгебра","Мистецтво","Українська література","Фізика"],
        "Вівторок": ["Фізична культура","Географія","Зарубіжна література","Німецька мова","Геометрія","Інформатика / англ. мова","Англ. мова / інформатика"],
        "Середа": ["Хімія","Всесвітня історія","Українська мова","Біологія","Алгебра","Фізика","Фізична культура"],
        "Четвер": ["Геометрія","Англійська мова","Німецька мова","Українська література","Географія","Алгебра","Біологія","Фізична культура"],
        "П'ятниця": ["Українська мова","Історія України","Хімія","Інформатика / англ. мова","Англ.мова/інформатика","Технології","Здоров'я, безпека"]
    },
    "9": {
        "Понеділок": ["Біологія","Алгебра","Історія України","Українська література","Фізика","Англ.мова/нім.мова","Нім.мова/англ.мова"],
        "Вівторок": ["Географія","Хімія","Основи здоров'я","Зарубіжна література","Правознавство","Фізична культура","Всесвітня історія"],
        "Середа": ["Українська мова/інформатика","Фізична культура","Алгебра","Інформатика/українська мова","Фізика","Біологія","Англійська мова"],
        "Четвер": ["Фізична культура","Зарубіжна література","Геометрія","Історія України","Мистецтво","Українська література","Фізика"],
        "П'ятниця": ["Геометрія","Англ.мова/нім.мова","Українська мова/інформатика","Хімія","Нім.мова/англ.мова","Інформатика/українська мова","Трудове навчання"]
    }
};

const ebooks_8 = {
    "Інформатика": "https://pidruchnyk.com.ua/3011-informatyka-ryvkind-8-klas-2025.html",
    "Геометрія": "https://pidruchnyk.com.ua/2915-geometriia-burda-8-klas-2025.html",
    "Англійська мова": "https://pidruchnyk.com.ua/2896-angliiska-mova-mitchell-8-klas.html",
    "Технологія (хлопці)": "https://pidruchnyk.com.ua/2953-tekhnologii-bilenko-8-klas-2025.html",
    "Зарубіжна література": "https://pidruchnyk.com.ua/2993-zarubizhna-literatura-milianovska-8-klas-2025.html",
    "Історія України": "https://pidruchnyk.com.ua/3016-istoriia-ukrainy-pometun-8-klas-2025.html",
    "Українська література": "https://pidruchnyk.com.ua/2962-ukrainska-literatura-avramenko-8-klas-2025.html",
    "Німецька мова": "https://pidruchnyk.com.ua/2941-nimecka-sotnykova-8-klas-2025-4rik.html",
    "Технологія (дівчата)": "https://pidruchnyk.com.ua/2951-tekhnologii-khodzycka-8-klas-2025.html",
    "Підприємство та фінансова грамотність": "https://pidruchnyk.com.ua/2948-pidpryiemnyctvo-i-finansova-gramotnist-kuzniecova-8-klas-2025.html",
    "Хімія": "https://pidruchnyk.com.ua/2920-khimiia-midak-8-klas-2025.html",
    "Географія": "https://pidruchnyk.com.ua/2984-geografiia-gilberg-8-klas-2025.html",
    "Біологія": "https://pidruchnyk.com.ua/2925-biologiia-balan-8-klas-2025.html",
    "Мистецтво": "https://pidruchnyk.com.ua/2938-mystectvo-masol-8-klas-2025.html",
    "Фізика": "https://pidruchnyk.com.ua/2971-fizyka-bariakhtar-8-klas-2025.html",
    "Алгебра": "https://pidruchnyk.com.ua/2909-algebra-tarasenkova-8-klas-2025.html",
    "Здоров'я, безпека та добробут": "https://pidruchnyk.com.ua/3000-zdorovia-bezpeka-ta-dobrobut-shyian-8-klas-2025.html",
    "Українська мова": "https://pidruchnyk.com.ua/2899-ukrainska-mova-avramenko-8-klas-2025.html",
    "Громадська освіта": "https://pidruchnyk.com.ua/2988-gromadianska-osvita-vasylkiv-8-klas-2025.html",
    "Всесвітня історія": "https://pidruchnyk.com.ua/2977-vsesvitnia-istoriia-pometun-8-klas-2025.html"
};

const ROZKLAD_BELLS = [
    ["1 урок", "8:30-9:10"],
    ["перерва", "9:10-9:20 (10 хв)"],
    ["2 урок", "9:20-10:00"], 
    ["перерва", "10:00-10:20 (20 хв)"],
    ["3 урок", "10:20-11:00"],
    ["перерва", "11:00-11:15 (15 хв)"],
    ["4 урок", "11:15-11:55"],
    ["перерва", "11:55-12:10 (15 хв)"],
    ["5 урок", "12:10-12:50"],
    ["перерва", "12:50-13:00 (10 хв)"],
    ["6 урок", "13:00-13:40"],
    ["перерва", "13:40-13:50 (10 хв)"],
    ["7 урок", "13:50-14:30"],
    ["перерва", "14:30-14:40 (10 хв)"],
    ["8 урок", "14:40-15:20"]
];

const MINISTRY_8_CLASS = {
    "👑 Президент класу": ["Мілана Баляс"],
    "⭐ Віце-президент": ["Аріна Кухаренko", "Софія Заболотня"],
    "🏦 Депутат": ["Маргарита Даниленko"],
    "📚 Міністерство освіти та науки": ["Станіслав Гусєв", "Максим Вашека"],
    "🎭 Міністерство культури та дозвілля": ["Олександр Ткач"],
    "⚽ Міністерство спорту та здоров'я": ["Злата Мелещенко"],
    "🌍 Міністерство екології та порядку": ["Анастасія Коваль"],
    "📸 Міністерство медіа та комунікацій": ["Марія Мовчан"],
    "💡 Міністерство креативних ідей": ["Ліна Ільченко"],
    "❤️ Міністерство добрих справ і дружби": ["Маргарита Гриценко"]
};

const MINISTRY_DESCRIPTIONS = {
    "👑 Президент класу": "очолює класне самоврядування; представляє клас на зборах; координує роботу міністрів.",
    "⭐ Віце-президент": "допомагає президенту; замінює його у разі відсутності; контролює виконання доручень.",
    "🏦 Депутат": "організовує і керує міністрами; координує роботу всіх міністерств.",
    "📚 Міністерство освіти та науки": "орganізовує допомогу у навчанні; нагадує про домашні завдання; проводить міні-вікторини та брейн-ринги.",
    "🎭 Міністерство культури та дозвілля": "організовує свята, конкурси, квести; готує клас до виступів і свят школи; підтримує традиції класу.",
    "⚽ Міністерство спорту та здоров'я": "відповідає за спортивні турніри; організовує руханки та «дні здоров'я»; мотивує вести активний спосіб життя.",
    "🌍 Міністерство екології та порядку": "стежить за чистотою класу; організовує чергування; проводить еко-акції, озеленення.",
    "📸 Міністерство медіа та комунікацій": "робить фото і відео з життя класу; оформлює стенди, оголошення; веде щоденник подій класу.",
    "💡 Міністерство креативних ідей": "пропонує нові цікаві заходи; допомагає робити уроки й події яскравими; вносить «родзинку» у класне життя.",
    "❤️ Міністерство добрих справ і дружби": "організовує допомогу молодшим учням; бере участь у благодійних акціях; пропагує доброту і взаємопідтримку; допомагає уникати конфліктів; організує «дні дружби»; підтримує добру атмосферу в класі."
};

const classes = ["5", "6", "7", "8", "9"];

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
        case 'ministry':
            openMinistryModal();
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
        return `<div class="info-card"><p>На ${day.toLowerCase()} у ${selectedClass} класі занять немає.</p></div>`;
    }
    
    let tableHtml = `
        <div class="schedule-header">
            <h3>${selectedClass} клас - ${day}</h3>
        </div>
        <table class="schedule-table">
            <thead>
                <tr>
                    <th>№</th>
                    <th>Предмет</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    lessons.forEach((lesson, index) => {
        tableHtml += `
            <tr>
                <td><strong>${index + 1}</strong></td>
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
            <div class="info-card">
                <h3>Підручники 8 класу</h3>
                <p>Доступні електронні версії підручників:</p>
            </div>
            <div class="books-list" id="books-list">
                ${renderBooksList()}
            </div>
        </div>
    `;
    
    showModal(modalContent, 'books-modal');
}

// Генерація списку книг
function renderBooksList() {
    let listHtml = `<ul class="book-list">`;
    
    for (const [subject, url] of Object.entries(ebooks_8)) {
        listHtml += `
            <li class="book-item">
                <span class="book-icon">📚</span>
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
            <div class="info-card">
                <h3>Розклад уроків та перерв</h3>
                <p>Час проведення занять:</p>
            </div>
            <div class="bells-list">
                ${renderBellsList()}
            </div>
            <div class="info-card">
                <p><strong>⏰ Загальна тривалість навчального дня:</strong> 6:50 год</p>
            </div>
        </div>
    `;
    
    showModal(modalContent, 'bells-modal');
}

// Генерація списку дзвінків
function renderBellsList() {
    let listHtml = '';
    
    ROZKLAD_BELLS.forEach(([lesson, time]) => {
        const isBreak = lesson.includes('перерва');
        listHtml += `
            <div class="bell-item">
                <div class="bell-info">
                    <span class="bell-icon">${isBreak ? '🔄' : '📚'}</span>
                    <span>${lesson}</span>
                </div>
                <span class="bell-time">${time}</span>
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
                <h3>Функція для вчителів</h3>
                <p>Випадковий вибір учня з класу для відповіді.</p>
                <p><strong>Використовуйте в Telegram боті:</strong></p>
                <ul>
                    <li>Команду <code>/random_child</code></li>
                    <li>Кнопку "🎲 Випадковий учень"</li>
                </ul>
                <p>Спочатку потрібно додати клас та учнів через команди управління.</p>
            </div>
            <div class="action-buttons">
                <button class="btn primary" onclick="openTelegram()">📱 Перейти в Telegram бота</button>
            </div>
        </div>
    `;
    
    showModal(modalContent, 'random-modal');
}

// Модальне вікно міністрів класу
function openMinistryModal() {
    const modalContent = `
        <div class="modal-header">
            <h2>👥 Міністри класу</h2>
            <button class="close-button">&times;</button>
        </div>
        <div class="modal-content">
            <div class="info-card">
                <h3>🏛 Пам'ятка для міністрів 8 класу</h3>
                <p>Структура класного самоврядування:</p>
            </div>
            <div class="ministry-list">
                ${renderMinistryList()}
            </div>
        </div>
    `;
    
    showModal(modalContent, 'ministry-modal');
}

// Генерація списку міністрів
function renderMinistryList() {
    let listHtml = '';
    
    for (const [position, students] of Object.entries(MINISTRY_8_CLASS)) {
        listHtml += `
            <div class="ministry-item">
                <div class="ministry-header">
                    <span class="ministry-icon">${position.split(' ')[0]}</span>
                    <div class="ministry-info">
                        <h4>${position}</h4>
                        <p class="ministry-students">${students.join(', ')}</p>
                    </div>
                </div>
                <p class="ministry-description">${MINISTRY_DESCRIPTIONS[position]}</p>
            </div>
        `;
    }
    
    return listHtml;
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
                <h3>ℹ️ Про Study Bot</h3>
                <p>Навчальний помічник для учнів та вчителів</p>
            </div>
            
            <div class="info-card">
                <h3>📞 Екстрені служби</h3>
                <ul>
                    <li>🚒 101 - Пожежна служба</li>
                    <li>🚓 102 - Поліція</li>
                    <li>🚑 103 - Швидка допомога</li>
                    <li>⚠️ 104 - Газова служба</li>
                </ul>
            </div>
            
            <div class="info-card">
                <h3>📚 Доступні функції</h3>
                <ul>
                    <li>📅 Розклад занять для 5-9 класів</li>
                    <li>📖 Онлайн підручники 8 класу</li>
                    <li>🔔 Розклад дзвінків та перерв</li>
                    <li>🎲 Випадковий учень (для вчителів)</li>
                    <li>👥 Міністри класу 8 класу</li>
                </ul>
            </div>
        </div>
    `;
    
    showModal(modalContent, 'info-modal');
}

// Відкрити Telegram бота
function openTelegram() {
    const telegramUrl = 'tg://resolve?domain=random_childbot';
    window.open(telegramUrl, '_blank');
    
    setTimeout(() => {
        window.location.href = 'https://t.me/random_childbot';
    }, 500);
    
    if (currentModal) {
        closeModal();
    }
}

// Показати модальне вікно
function showModal(content, modalId) {
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
    
    const closeButton = modal.querySelector('.close-button');
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }
    
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
    
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

// Обробка посилань
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.href && !e.target.href.includes(window.location.hostname)) {
        e.preventDefault();
        window.open(e.target.href, '_blank');
    }
});

// Закриття по ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && currentModal) {
        closeModal();
    }
});
