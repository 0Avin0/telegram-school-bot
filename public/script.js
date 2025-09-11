// Ініціалізація Telegram WebApp
let tg = window.Telegram.WebApp;
tg.expand();
tg.enableClosingConfirmation();

// Елементи DOM
const userNameElement = document.getElementById('user-name');
const userIdElement = document.getElementById('user-id');
const userPhotoElement = document.getElementById('user-photo');
const userPhotoMainElement = document.getElementById('user-photo-main');
const featureContentElement = document.getElementById('feature-content');

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

// Поточний активний модальний
let currentModal = null;

// Ініціалізація користувача
function initUser() {
    const user = tg.initDataUnsafe.user;
    if (user) {
        const userName = `${user.first_name} ${user.last_name || ''}`.trim();
        userNameElement.textContent = userName;
        userIdElement.textContent = `ID: ${user.id}`;
        
        if (user.photo_url) {
            userPhotoElement.src = user.photo_url;
            userPhotoMainElement.src = user.photo_url;
        }
    }
}

// Функції для модальних вікон
function openModal(modalId, title, content) {
    // Закриваємо поточний модальний, якщо є
    if (currentModal) {
        closeModal(currentModal);
    }
    
    const modalHtml = `
        <div class="modal-overlay active" id="${modalId}-overlay">
            <div class="modal">
                <div class="modal-header">
                    <h2>${title}</h2>
                    <button class="close-button" onclick="closeModal('${modalId}')">×</button>
                </div>
                <div class="modal-content">
                    ${content}
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    currentModal = modalId;
    
    // Додаємо обробник для закриття по кліку на оверлей
    document.getElementById(`${modalId}-overlay`).addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal(modalId);
        }
    });
}

function closeModal(modalId) {
    const overlay = document.getElementById(`${modalId}-overlay`);
    if (overlay) {
        overlay.classList.remove('active');
        setTimeout(() => {
            overlay.remove();
        }, 300);
    }
    currentModal = null;
}

// Функції для відображення контенту
function showFeature(feature) {
    switch(feature) {
        case 'random':
            showRandomStudent();
            break;
        case 'schedule':
            showSchedule();
            break;
        case 'books':
            showBooks();
            break;
        case 'bells':
            showBells();
            break;
        case 'info':
            showInfo();
            break;
        case 'classes':
            showClasses();
            break;
    }
}

function showRandomStudent() {
    const content = `
        <div class="feature-body">
            <div class="info-card">
                <p>Ця функція доступна у повній версії Telegram бота.</p>
                <p>Використовуйте команду <code>/random_child</code> або кнопку "🎲 Випадковий учень" у меню бота.</p>
            </div>
            <div class="action-buttons">
                <button class="btn primary" onclick="openTelegram()">Відкрити в Telegram</button>
            </div>
        </div>
    `;
    openModal('random-modal', '🎲 Випадковий учень', content);
}

function showSchedule() {
    const content = `
        <div class="schedule-controls">
            <select class="class-selector" id="class-select" onchange="updateSchedule()">
                <option value="5">5 клас</option>
                <option value="6">6 клас</option>
                <option value="7">7 клас</option>
                <option value="8">8 клас</option>
                <option value="9">9 клас</option>
            </select>
            
            <div class="day-buttons" id="day-buttons">
                <button class="day-button active" data-day="Понеділок" onclick="selectDay('Понеділок', this)">Понеділок</button>
                <button class="day-button" data-day="Вівторок" onclick="selectDay('Вівторок', this)">Вівторок</button>
                <button class="day-button" data-day="Середа" onclick="selectDay('Середа', this)">Середа</button>
                <button class="day-button" data-day="Четвер" onclick="selectDay('Четвер', this)">Четвер</button>
                <button class="day-button" data-day="П'ятниця" onclick="selectDay('Пятниця', this)">П'ятниця</button>
            </div>
        </div>
        <div id="schedule-display"></div>
    `;
    openModal('schedule-modal', '📅 Розклад занять', content);
    
    // Відображаємо розклад для першого дня
    setTimeout(updateSchedule, 100);
}

function selectDay(day, element) {
    // Видаляємо активний клас з усіх кнопок
    document.querySelectorAll('.day-button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Додаємо активний клас до обраної кнопки
    element.classList.add('active');
    
    // Оновлюємо розклад
    updateSchedule();
}

function updateSchedule() {
    const classSelect = document.getElementById('class-select');
    const dayButton = document.querySelector('.day-button.active');
    
    if (!classSelect || !dayButton) return;
    
    const selectedClass = classSelect.value;
    const selectedDay = dayButton.dataset.day;
    
    displaySchedule(selectedClass, selectedDay);

function displaySchedule(classNum, day) {
    const scheduleDisplay = document.getElementById('schedule-display');
    
    // Виправлення для П'ятниці
    let actualDay = day;
    if (day === "Пятниця") {
        actualDay = "П'ятниця";
    }
    
    const lessons = rozklad[classNum]?.[actualDay] || [];
    
    if (lessons.length === 0) {
        scheduleDisplay.innerHTML = `
            <div class="info-card">
                <p>На ${actualDay} у ${classNum} класі немає уроків.</p>
            </div>
        `;
        return;
    }
    
    let html = `
        <div class="schedule-header">
            <h3>${classNum} клас - ${actualDay}</h3>
        </div>
        <table class="schedule-table">
            <thead>
                <tr>
                    <th>№</th>
                    <th>Урок</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    lessons.forEach((lesson, index) => {
        html += `
            <tr>
                <td>${index + 1}</td>
                <td>${lesson}</td>
            </tr>
        `;
    });
    
    html += `
            </tbody>
        </table>
    `;
    
    scheduleDisplay.innerHTML = html;
}

function showBooks() {
    let html = `
        <div class="books-list">
            <p style="margin-bottom: 15px; color: var(--text-secondary);">Електронні підручники для 8 класу:</p>
            <ul class="book-list">
    `;
    
    for (const [subject, url] of Object.entries(ebooks_8)) {
        html += `
            <li class="book-item">
                <span class="book-icon">📚</span>
                <a href="${url}" target="_blank" class="book-link" onclick="event.stopPropagation();">${subject}</a>
                <span class="external-icon">↗</span>
            </li>
        `;
    }
    
    html += `
            </ul>
        </div>
    `;
    
    openModal('books-modal', '📖 Онлайн підручники', html);
}

function showBells() {
    let html = `
        <div class="bells-list">
            <ul>
    `;
    
    ROZKLAD_BELLS.forEach(([lesson, time]) => {
        const isBreak = lesson.includes('перерва');
        html += `
            <li class="bell-item">
                <div class="bell-info">
                    <span class="bell-icon">${isBreak ? '🔄' : '📚'}</span>
                    <span class="bell-text">${lesson}</span>
                </div>
                <span class="bell-time">${time}</span>
            </li>
        `;
    });
    
    html += `
            </ul>
            <div class="info-card">
                <p><strong>Загальна тривалість навчального дня:</strong> 6 год 50 хв</p>
            </div>
        </div>
    `;
    
    openModal('bells-modal', '🔔 Розклад дзвінків', html);
}

function showInfo() {
    const content = `
        <div class="info-content">
            <div class="info-card">
                <h3>ℹ️ Про бота</h3>
                <p>School Bot - це навчальний помічник з повним функціоналом для учнів та вчителів.</p>
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
                <h3>🔗 Підтримка</h3>
                <p>Telegram: <a href="https://t.me/random_childbot_support" target="_blank" onclick="event.stopPropagation();">@random_childbot_support</a></p>
                <p>Бот: <a href="https://t.me/your_bot" target="_blank" onclick="event.stopPropagation();">@school_helper_bot</a></p>
            </div>
        </div>
    `;
    openModal('info-modal', '📋 Інформація', content);
}

function showClasses() {
    const content = `
        <div class="feature-body">
            <div class="info-card">
                <p>Ця функція доступна у повній версії Telegram бота.</p>
                <p>Використовуйте команди у боті для керування класами:</p>
                <ul>
                    <li><code>/add_class</code> - додати клас</li>
                    <li><code>/add_children</code> - додати учнів</li>
                    <li><code>/list_class</code> - список класів</li>
                    <li><code>/list_children</code> - список учнів</li>
                    <li><code>/delete_class</code> - видалити клас</li>
                    <li><code>/delete_child</code> - видалити учня</li>
                </ul>
            </div>
            <div class="action-buttons">
                <button class="btn primary" onclick="openTelegram()">Відкрити в Telegram</button>
            </div>
        </div>
    `;
    openModal('classes-modal', '👥 Управління класами', content);
}

function openTelegram() {
    // Спроба відкрити Telegram через deeplink
    const telegramUrl = 'tg://resolve?domain=random_childbot_support';
    window.open(telegramUrl, '_blank');
    
    // Fallback для браузерів
    setTimeout(() => {
        window.location.href = 'https://t.me/random_childbot_support';
    }, 500);
    
    // Закриваємо модальне вікно
    if (currentModal) {
        closeModal(currentModal);
    }
}

// Спеціальна функція для відкриття підтримки
function openSupport() {
    const telegramUrl = 'tg://resolve?domain=random_childbot_support';
    window.open(telegramUrl, '_blank');
    
    setTimeout(() => {
        window.location.href = 'https://t.me/random_childbot_support';
    }, 500);
    
    if (currentModal) {
        closeModal(currentModal);
    }
}

// Обробка подій Telegram WebApp
function setupTelegramEvents() {
    tg.onEvent('viewportChanged', (event) => {
        console.log('Viewport changed:', event);
    });
    
    tg.onEvent('themeChanged', (event) => {
        console.log('Theme changed:', event);
        updateTheme();
    });
}

function updateTheme() {
    const theme = tg.colorScheme;
    if (theme === 'dark') {
        document.documentElement.style.setProperty('--background-color', '#1a1a1a');
        document.documentElement.style.setProperty('--card-color', '#2d2d2d');
        document.documentElement.style.setProperty('--text-primary', '#ffffff');
        document.documentElement.style.setProperty('--text-secondary', '#cccccc');
        document.documentElement.style.setProperty('--border-color', '#444444');
    } else {
        document.documentElement.style.setProperty('--background-color', '#f5f8fa');
        document.documentElement.style.setProperty('--card-color', '#ffffff');
        document.documentElement.style.setProperty('--text-primary', '#223344');
        document.documentElement.style.setProperty('--text-secondary', '#556677');
        document.documentElement.style.setProperty('--border-color', '#e1e8ed');
    }
}

// Ініціалізація при завантаженні сторінки
document.addEventListener('DOMContentLoaded', function() {
    initUser();
    setupTelegramEvents();
    updateTheme();
});

// Обробка кліків по зовнішнім посиланням
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.href && !e.target.href.includes('telegram-school-bot.vercel.app')) {
        e.preventDefault();
        window.open(e.target.href, '_blank');
    }
    
    // Закриваємо модальне вікно при кліку на посилання
    if (e.target.tagName === 'A' && currentModal) {
        closeModal(currentModal);
    }
});

// Закриття модального вікна по клавіші ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && currentModal) {
        closeModal(currentModal);
    }
});
