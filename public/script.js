// Ініціалізація Telegram WebApp
let tg = window.Telegram.WebApp;

// Елементи DOM
const userNameElement = document.getElementById('user-name');
const userPhotoMainElement = document.getElementById('user-photo-main');
const appContainer = document.querySelector('.app-container');
const modalOverlay = document.getElementById('modal-overlay');
const modalTitle = document.getElementById('modal-title');
const modalContent = document.getElementById('modal-content');
const closeButton = document.querySelector('.close-button');

// Список дозволених користувачів (ID)
const ALLOWED_USERS = [
    8147168546, // Назар Кузьмич
    6329096147, // Аліна Ткач
    5836950765, // Діма Яриш
    7745185733, // Марго Коваленко
    1924433301 // Саша Ткач
];

// Дані для додатка
const APP_DATA = {
    rozklad: {
        "8": {
            "Понеділок": ["Історія України", "Підприємство і Фінансова грамотність", "Українська мова", "Алгебра", "Мистецтво", "Українська література", "Фізика"],
            "Вівторок": ["Фізична культура", "Географія", "Зарубіжна література", "Німецька мова", "Геометрія", "Інформатика / англ. мова", "Англ. мова / інформатика"],
            "Середа": ["Хімія", "Всесвітня історія", "Українська мова", "Біологія", "Алгебра", "Фізика", "Фізична культура"],
            "Четвер": ["Геометрія", "Англійська мова", "Німецька мова", "Українська література", "Географія", "Алгебра", "Біологія", "Фізична культура"],
            "П'ятниця": ["Українська мова", "Історія України", "Хімія", "Інформатика / англ. мова", "Англ.мова/інформатика", "Технології", "Здоров'я, безпека"]
        }
    },
    
    ebooks_8: {
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
    },
    
    bells: [
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
    ],
    
    ministry: {
        "👑 Президент класу": {
            students: ["Мілана Баляс"],
            description: "очолює класне самоврядування; представляє клас на зборах; координує роботу міністрів."
        },
        "⭐ Віце-президент": {
            students: ["Аріна Кухаренко", "Софія Заболотня"],
            description: "допомагає президенту; замінює його у разі відсутності; контролює виконання доручень."
        },
        "🏦 Депутат": {
            students: ["Маргарита Даниленко"],
            description: "організовує і керує міністрами; координує роботу всіх міністерств."
        },
        "📚 Міністерство освіти та науки": {
            students: ["Станіслав Гусєв", "Максим Вашека"],
            description: "організовує допомогу у навчанні; нагадує про домашні завдання; проводить міні-вікторини та брейн-ринги."
        },
        "🎭 Міністерство культури та дозвілля": {
            students: ["Олександр Ткач"],
            description: "організовує свята, конкурси, квести; готує клас до виступів і свят школи; підтримує традиції класу."
        },
        "⚽ Міністерство спорту та здоров'я": {
            students: ["Злата Мелещенко"],
            description: "відповідає за спортивні турніри; організовує руханки та «дні здоров'я»; мотивує вести активний спосіб життя."
        },
        "🌍 Міністерство екології та порядку": {
            students: ["Анастасія Коваль"],
            description: "стежить за чистотою класу; організовує чергування; проводить еко-акції, озеленення."
        },
        "📸 Міністерство медіа та комунікацій": {
            students: ["Марія Мовчан"],
            description: "робить фото і відео з життя класу; оформлює стенди, оголошення; веде щоденник подій класу."
        },
        "💡 Міністерство креативних ідей": {
            students: ["Ліна Ільченко"],
            description: "пропонує нові цікаві заходи; допомагає робити уроки й події яскравими; вносить «родзинку» у класне життя."
        },
        "❤️ Міністерство добрих справ і дружби": {
            students: ["Маргарита Гриценко"],
            description: "організовує допомогу молодшим учням; бере участь у благодійних акціях; пропагує доброту і взаємопідтримку; допомагає уникати конфліктів; організує «дні дружби»; підтримує добру атмосферу в класі."
        }
    }
};

// Перевірка доступу
function checkAccess(userId) {
    return ALLOWED_USERS.includes(userId);
}

// Блокування доступу
function blockAccess() {
    appContainer.innerHTML = `
        <div class="access-denied">
            <div class="denied-content">
                <div class="denied-icon">⛔</div>
                <h2>Доступ заборонено</h2>
                <p>Ви не маєте дозволу на використання цього додатку.</p>
                <p>Зверніться до адміністратора для отримання доступу.</p>
            </div>
        </div>
    `;
}

// Ініціалізація додатку
function initApp() {
    console.log('🔧 Ініціалізація додатка...');
    
    // Отримуємо дані користувача з Telegram
    const user = tg.initDataUnsafe?.user;
    
    if (!user || !checkAccess(user.id)) {
        console.log('🚫 Доступ заборонено для користувача:', user?.id);
        blockAccess();
        return;
    }
    
    console.log('✅ Доступ дозволено для:', user.id);
    
    // Якщо доступ дозволено - продовжуємо
    tg.expand();
    tg.enableClosingConfirmation();
    
    // Оновлюємо інформацію про користувача
    userNameElement.textContent = `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'Учень 8 класу';
    if (user.photo_url) {
        userPhotoMainElement.src = user.photo_url;
    }
    
    // Додаємо обробники подій для карток
    initEventListeners();
    
    console.log('✅ Додаток успішно ініціалізовано');
}

// Ініціалізація обробників подій
function initEventListeners() {
    console.log('🔧 Додавання обробників подій...');
    
    const navCards = document.querySelectorAll('.nav-card');
    console.log('📋 Знайдено карток:', navCards.length);
    
    navCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            const feature = this.getAttribute('data-feature');
            console.log('🖱️ Клік по картці:', feature);
            openFeature(feature);
        });
        
        // Додаємо ефект натискання
        card.style.cursor = 'pointer';
        card.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        card.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Обробник закриття модального вікна
    closeButton.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
    
    // Закриття по ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
    
    console.log('✅ Обробники подій додані');
}

// Відкриття функціоналу за карткою
function openFeature(feature) {
    console.log('🚀 Відкриття функції:', feature);
    
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
        case 'ministry':
            openMinistryModal();
            break;
        case 'info':
            openInfoModal();
            break;
        default:
            console.log('❌ Невідома функція:', feature);
    }
}

// Модальне вікно розкладу
function openScheduleModal() {
    modalTitle.textContent = '📅 Розклад занять 8 класу';
    
    const days = ["Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця"];
    let content = `
        <div class="day-buttons" id="day-buttons">
            ${days.map(day => `<button class="day-button" data-day="${day}">${day}</button>`).join('')}
        </div>
        <div class="schedule-display" id="schedule-display">
            ${renderScheduleTable('Понеділок')}
        </div>
    `;
    
    modalContent.innerHTML = content;
    showModal();
    
    // Додаємо обробники для кнопок днів
    setTimeout(() => {
        const dayButtons = document.querySelectorAll('.day-button');
        dayButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Видаляємо активний клас з усіх кнопок
                dayButtons.forEach(btn => btn.classList.remove('active'));
                // Додаємо активний клас поточній кнопці
                this.classList.add('active');
                
                const day = this.getAttribute('data-day');
                const scheduleDisplay = document.getElementById('schedule-display');
                scheduleDisplay.innerHTML = renderScheduleTable(day);
            });
        });
        
        // Активуємо першу кнопку
        if (dayButtons.length > 0) {
            dayButtons[0].classList.add('active');
        }
    }, 100);
}

// Генерація таблиці розкладу
function renderScheduleTable(day) {
    const lessons = APP_DATA.rozklad["8"][day];
    
    if (!lessons || lessons.length === 0) {
        return `<div class="info-card"><p>На ${day.toLowerCase()} у 8 класі занять немає.</p></div>`;
    }
    
    return `
        <div class="schedule-header">
            <h3>8 клас - ${day}</h3>
        </div>
        <table class="schedule-table">
            <thead>
                <tr>
                    <th>№</th>
                    <th>Предмет</th>
                </tr>
            </thead>
            <tbody>
                ${lessons.map((lesson, index) => `
                    <tr>
                        <td><strong>${index + 1}</strong></td>
                        <td>${lesson}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

// Модальне вікно підручників
function openBooksModal() {
    modalTitle.textContent = '📚 Онлайн підручники 8 класу';
    
    const booksList = Object.entries(APP_DATA.ebooks_8).map(([subject, url]) => `
        <li class="book-item">
            <span class="book-icon">📚</span>
            <a href="${url}" target="_blank" class="book-link">${subject} <span class="external-icon">↗</span></a>
        </li>
    `).join('');
    
    modalContent.innerHTML = `
        <div class="info-card">
            <h3>Підручники 8 класу</h3>
            <p>Доступні електронні версії підручників:</p>
        </div>
        <ul class="book-list">${booksList}</ul>
    `;
    
    showModal();
}

// Модальне вікно розкладу дзвінків
function openBellsModal() {
    modalTitle.textContent = '🔔 Розклад дзвінків';
    
    const bellsList = APP_DATA.bells.map(([lesson, time]) => {
        const isBreak = lesson.includes('перерва');
        return `
            <div class="bell-item">
                <div class="bell-info">
                    <span class="bell-icon">${isBreak ? '🔄' : '📚'}</span>
                    <span>${lesson}</span>
                </div>
                <span class="bell-time">${time}</span>
            </div>
        `;
    }).join('');
    
    modalContent.innerHTML = `
        <div class="info-card">
            <h3>Розклад уроків та перерв</h3>
            <p>Час проведення занять:</p>
        </div>
        <div class="bells-list">${bellsList}</div>
        <div class="info-card">
            <p><strong>⏰ Загальна тривалість навчального дня:</strong> 6:50 год</p>
        </div>
    `;
    
    showModal();
}

// Модальне вікно міністрів класу
function openMinistryModal() {
    modalTitle.textContent = '👥 Міністри класу';
    
    const ministryList = Object.entries(APP_DATA.ministry).map(([position, data]) => `
        <div class="ministry-item">
            <div class="ministry-header">
                <span class="ministry-icon">${position.split(' ')[0]}</span>
                <div class="ministry-info">
                    <h4>${position}</h4>
                    <p class="ministry-students">${data.students.join(', ')}</p>
                </div>
            </div>
            <p class="ministry-description">${data.description}</p>
        </div>
    `).join('');
    
    modalContent.innerHTML = `
        <div class="info-card">
            <h3>🏛 Пам'ятка для міністрів 8 класу</h3>
            <p>Структура класного самоврядування:</p>
        </div>
        <div class="ministry-list">${ministryList}</div>
    `;
    
    showModal();
}

// Модальне вікно інформації
function openInfoModal() {
    modalTitle.textContent = '📋 Інформація';
    
    modalContent.innerHTML = `
        <div class="info-card">
            <h3>ℹ️ Про Study Bot</h3>
            <p>Навчальний помічник для учнів 8 класу</p>
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
                <li>📅 Розклад занять 8 класу</li>
                <li>📖 Онлайн підручники 8 класу</li>
                <li>🔔 Розклад дзвінків та перерв</li>
                <li>👥 Міністри класу 8 класу</li>
            </ul>
        </div>
    `;
    
    showModal();
}

// Показати модальне вікно
function showModal() {
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Закрити модальне вікно
function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Обробка посилань
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.href && !e.target.href.includes(window.location.hostname)) {
        e.preventDefault();
        window.open(e.target.href, '_blank');
    }
});

// Ініціалізація додатку при завантаженні
document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 DOM завантажено');
    initApp();
});

// Обробка помилок
window.addEventListener('error', function(e) {
    console.error('❌ Помилка:', e.error);
});
